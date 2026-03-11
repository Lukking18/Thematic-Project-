const db = require('../../database')


const searchMovies = (searchText, done) => {
    const sql = "SELECT * FROM Movies WHERE title LIKE ?";

    const params = [`%${searchText}%`];

    db.all(sql, params, (err, rows) => {
        if (err) return done(err); 
        return done(null, rows); 
    });
};

module.exports = {
    searchMovies
};