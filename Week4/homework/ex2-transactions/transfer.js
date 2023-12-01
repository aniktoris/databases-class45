const { main } = require('./setup.js');
const { client } = require('./setup.js');

async function transfer(
  fromAccountNo,
  toAccountNo,
  amount,
  fromRemark,
  toRemark,
) {
  const accountsCollection = client.db('databaseWeek4').collection('accounts');
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const latestChangeNoFrom = await accountsCollection
        .aggregate([
          { $match: { account_number: fromAccountNo } },
          { $unwind: '$account_changes' },
          { $sort: { 'account_changes.change_number': -1 } },
          { $limit: 1 },
        ])
        .toArray();

      await accountsCollection.updateOne(
        { account_number: fromAccountNo },
        {
          $inc: { balance: amount * -1 },
          $push: {
            account_changes: {
              change_number:
                latestChangeNoFrom[0].account_changes.change_number + 1,
              amount: amount,
              changed_date: new Date(),
              remark: fromRemark,
            },
          },
        },
        { session },
      );

      const latestChangeNoTo = await accountsCollection
        .aggregate([
          { $match: { account_number: toAccountNo } },
          { $unwind: '$account_changes' },
          { $sort: { 'account_changes.change_number': -1 } },
          { $limit: 1 },
        ])
        .toArray();

      await accountsCollection.updateOne(
        { account_number: toAccountNo },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number:
                latestChangeNoTo[0].account_changes.change_number + 1,
              amount: amount,
              changed_date: new Date(),
              remark: toRemark,
            },
          },
        },
        { session },
      );
    });
  } catch (err) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}

async function runTransactions() {
  try {
    await main();
    await transfer(101, 102, 1000, 'Withdrawal', 'Deposit');
  } catch (err) {
    console.error(`The error occurred: ${err}`);
  } finally {
    client.close();
  }
}

runTransactions();
