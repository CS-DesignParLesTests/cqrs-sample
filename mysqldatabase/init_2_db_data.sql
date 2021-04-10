USE demonestjs;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS book_ownership;

CREATE TABLE user
(
    username VARCHAR(30) PRIMARY KEY,
    displayname VARCHAR(30) NOT NULL
);

CREATE TABLE book
(
    id VARCHAR(36) PRIMARY KEY,
	title TEXT NOT NULL,
    author TEXT NOT NULL
);

CREATE TABLE book_ownership
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_username VARCHAR(30),
    book_id VARCHAR(36),
    CONSTRAINT FK_Users_BookOwnerships FOREIGN KEY (user_username) REFERENCES user(username),
    CONSTRAINT FK_Books_BookOwnerships FOREIGN KEY (book_id) REFERENCES book(id),
    is_bought BOOLEAN,
    is_signed BOOLEAN,
    is_lent BOOLEAN,
    d_acquired DATE,
    d_read DATE
);

INSERT INTO user VALUES("Maxime", "Kiaryx0"), ("Amine", "AmineI"), ("Candice", "Candylol17");
INSERT INTO book VALUES("bc5722e6-2d22-4516-a8a4-4ffe90ce8ebb", "Fate/Stay Night Heaven's Feel", "Taskohna"), ("bc5722e6-2d22-4516-a8a4-4ffe90ce8ecc", "Prison School", "Hiramoto, Akira"), ("bc5722e6-2d22-4516-a8a4-4ffe90ce8edd", "Dragon Ball Super", "Toriyama, Akira");
INSERT INTO book_ownership(id, vc_user_username, i_book_id, is_bought) VALUES(1, "Maxime", "bc5722e6-2d22-4516-a8a4-4ffe90ce8ebb", TRUE), (2, "Maxime", "bc5722e6-2d22-4516-a8a4-4ffe90ce8ecc", TRUE), (3, "Amine", "bc5722e6-2d22-4516-a8a4-4ffe90ce8ebb", TRUE);