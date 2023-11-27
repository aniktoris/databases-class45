1. What columns violate 1NF? 

  food_code, food_description

1. What entities do you recognize that could be extracted?

  Dinners, Venues, Food

1. Name all the tables and columns that would make a 3NF compliant solution.

  Members (id PK, member_name, member_address) 
  Dinners (id PK, dinner_date, venue_code FK, member_id FK) 
  Venues (code PK, venue_description) 
  Food (code PK, food_description)
  DinnerFood (dinner_id FK, food_code FK)
