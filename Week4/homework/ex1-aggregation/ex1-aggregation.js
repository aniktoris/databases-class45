db.population_pyramid.aggregate([
  { $match: { Country: 'Netherlands' } },
  {
    $group: { _id: '$Year', countPopulation: { $sum: { $add: ['$M', '$F'] } } },
  },
  { $sort: { _id: 1 } },
]);

db.population_pyramid.aggregate([
  {
    $match: {
      $and: [
        {
          Country: {
            $in: [
              'AFRICA',
              'ASIA',
              'EUROPE',
              'LATIN AMERICA AND THE CARIBBEAN',
              'NORTHERN AMERICA',
              'OCEANIA',
            ],
          },
        },
        { Age: '100+' },
        { Year: 2020 },
      ],
    },
  },
  {
    $addFields: {
      TotalPopulation: {
        $add: ['$M', '$F'],
      },
    },
  },
  { $sort: { Country: 1 } },
]);
