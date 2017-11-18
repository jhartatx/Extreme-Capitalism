-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS c6mw1yoy0se23py8;
-- Creates the "todolist" database --
CREATE DATABASE c6mw1yoy0se23py8;



use c6mw1yoy0se23py8;

CREATE TABLE players(
user_id INTEGER (1) PRIMARY KEY AUTO_INCREMENT,
user_name VARCHAR (50) NOT NULL,
user_money INTEGER (255),
is_turn BOOLEAN,
pos_id INTEGER (2) NOT NULL,
in_jail INTEGER (1) NOT NULL
);


CREATE TABLE places(
pos_id INTEGER (2) PRIMARY KEY AUTO_INCREMENT NOT NULL,
id_grp INTEGER (1),
c_owner VARCHAR (50),
rent_lvl INTEGER (1) NOT NULL,
name VARCHAR (255) NOT NULL,
rent INTEGER (255),
active BOOLEAN
);

CREATE TABLE community_cards(
com_id INTEGER (2) PRIMARY KEY AUTO_INCREMENT NOT NULL,
card_title VARCHAR (255) NOT NULL,
card_text TEXT NOT NULL,
card_value INTEGER (255) DEFAULT NULL
);

CREATE TABLE chance_cards(
cha_id INTEGER (2) PRIMARY KEY AUTO_INCREMENT NOT NULL,
card_title VARCHAR (255) NOT NULL,
card_text TEXT NOT NULL,
card_value INTEGER (255) DEFAULT NULL
);

INSERT INTO community_cards (card_title, card_text, card_value)
VALUES ("Back Taxes!", "You owe $150 in backtaxes!", 150),
("@$<ERROR>!@#!", "ERROR CODE:2010 PAY $100 TO REMOVE VIRUS", 100);

INSERT INTO chance_cards (card_title, card_text, card_value)
VALUES ("Advance to Go", "Advance to Go. Collect $200", 200),
("Surprise Vacation!", "Take your family on a scurprise vacation. Advance to Disney World", 200);

INSERT INTO players(user_name, user_money, is_turn, pos_id, in_jail)
VALUES("Paul1", 1500, true, 1, 0),
("Emma2", 1500, false, 1, 0),
("David", 1500, false, 1, 0),
("Just Justin", 1500, false, 1, 0);

INSERT INTO places(id_grp, c_owner, rent_lvl, name, rent, active)
VALUES(1, "bank", 0, "Austin", 100, false),
(1, "bank", 0, "Taj Mahal", 200, false),
(1, "bank", 0, "Maldives", 250, false),
(2, "bank", 0, "Great Wall of China", 300, false);
