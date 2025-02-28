CREATE TABLE customerRegister(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	address VARCHAR(100),
	email VARCHAR(50) UNIQUE,
	DOB VARCHAR(15),
	gender VARCHAR(10),
	age VARCHAR(2),
	cardHolderName VARCHAR(50),
	CardNumber VARCHAR(20),
	expireDate VARCHAR(15),
	cvv CHAR(3)
);