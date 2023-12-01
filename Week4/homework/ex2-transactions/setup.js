const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: ServerApiVersion.v1,
});

async function cleanupAccounts(client) {
  try {
    await client.db('databaseWeek4').collection('accounts').deleteMany({});
  } catch (err) {
    console.error(`Error cleaning up accounts collection: ${err}`);
  }
}

async function createManyAccounts(client, accounts) {
  const result = await client
    .db('databaseWeek4')
    .collection('accounts')
    .insertMany(accounts);

  console.log(`Created new accounts ${result.insertedCount}`);
}

async function main() {
  try {
    await client.connect();

    await cleanupAccounts(client);

    await createManyAccounts(client, [
      {
        account_number: 101,
        balance: 15000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date('2023-07-20'),
            remark: 'Withdrawal',
          },
        ],
      },
      {
        account_number: 102,
        balance: 13500,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date('2023-07-20'),
            remark: 'Deposit',
          },
        ],
      },
    ]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { main, client };
