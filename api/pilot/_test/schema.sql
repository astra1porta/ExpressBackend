CREATE TABLE dbo.Pilots(
  crewId integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  airline VARCHAR(2) NOT NULL,
  firstName varchar(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  fleet varchar(3) NOT NULL,
  seat varchar(3) NOT NULL,
  domicile VARCHAR(3) NOT NULL,
  trainingFacility VARCHAR(500),
  company VARCHAR(100) NOT NULL,
  address1 VARCHAR(100) NOT NULL,
  address2 VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  postalCode VARCHAR(25),
  areaCode varchar(3),
  prefix VARCHAR(3),
  suffix VARCHAR(4)
)