// VARIABLES =====================================================
const connection = require('./db_connection');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// ROUTINGS ======================================================
// GET all list books
app.get('/books', (req, res) => {
    let query = "SELECT * FROM books;";
    connection.query(query, function(err, result, fields) {
        res.status(200).send({'books': result, 'status': 200, 'message': 'Get books are successfully.'});
    });
});

// GET book by ID
app.get('/books/:bookID', (req, res) => {
    let bookID = req.params.bookID;
    let query = "SELECT * FROM books WHERE book_id=?;";
    connection.query(query, bookID, function(err, result, fields) {
        res.status(200).send({'book': result[0], 'status': 200, 'message': 'Get books are successfully.'});
    });
});

// CREATE new book
app.post('/books', (req, res) => {
    let title = req.body.title;
    let query = "INSERT INTO books (title) value (?);";
    connection.query(query, title, function(err, result, fields) {
        res.status(200).send({'status': 200, 'message': 'Create book is successfully.'});
    });
});

// DELETE book
app.delete('/books', (req, res) => {
    let bookID = req.query.bookID;
    let query = "DELETE FROM books WHERE book_id=?;";
    connection.query(query, bookID, function(err, result, fields) {
        res.status(200).send({'status': 200, 'message': 'Delete book is successfully.'});
    });
});

// UPDATE book
app.put('/books/:bookID', (req, res) => {
    let bookID = parseInt(req.params.bookID);
    let newTitle = req.body.title;
    let query = "UPDATE books SET title=? WHERE book_id=?;";
    connection.query(query, [newTitle, bookID], function(err, result, fields) {
        res.status(200).send({'status': 200, 'message': 'Update book is successfully.'});
    });
});

// SEARCH list books by TITLE
app.get('/searchBooks', (req, res) => {
    let title = req.query.title;
    let query = "SELECT * FROM books WHERE title LIKE ?;";
    connection.query(query, ["%" + title + "%"], function(err, result, fields) {
        res.status(200).send({'search_books': result, 'status': 200, 'message': 'Search books are successfully.'});
    });
});

// AUTO =====================================================
app.listen(PORT, () => {console.log('app listen to port: ' + PORT)});