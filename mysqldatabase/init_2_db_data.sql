USE demonestjs;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS book_ownerships;

CREATE TABLE users
(
    username VARCHAR(30) PRIMARY KEY,
    displayname VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE books
(
    id INT PRIMARY KEY AUTO_INCREMENT,
	title TEXT NOT NULL,
    author TEXT NOT NULL
);

CREATE TABLE book_ownerships
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_username VARCHAR(30),
    book_id INT,
    CONSTRAINT FK_Users_BookOwnerships FOREIGN KEY (user_username) REFERENCES users(vc_username),
    CONSTRAINT FK_Books_BookOwnerships FOREIGN KEY (book_id) REFERENCES books(i_id),
    is_bought BOOLEAN,
    is_signed BOOLEAN,
    is_lent BOOLEAN,
    d_acquired DATE,
    d_read DATE
);

INSERT INTO users VALUES("Maxime", "Kiaryx0"), ("Amine", "Aminel"), ("Candice", "Candylol17");
INSERT INTO books(t_title, t_author) VALUES("Fate/Stay Night Heaven's Feel", "Taskohna"), ("Prison School", "Hiramoto, Akira"), ("Dragon Ball Super", "Toriyama, Akira");
INSERT INTO book_ownerships(vc_user_username, i_book_id, is_bought) VALUES("Maxime", "1", TRUE), ("Maxime", "2", TRUE), ("Amine", "1", TRUE);