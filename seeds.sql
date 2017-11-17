use c6mw1yoy0se23py8;

INSERT INTO community (card_title, card_text, card_value)
VALUES ("Back Taxes!", "You owe $150 in backtaxes!", 150),
("@$<ERROR>!@#!", "ERROR CODE:2010 PAY $100 TO REMOVE VIRUS", 100);

INSERT INTO chance (card_title, card_text, card_value)
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
