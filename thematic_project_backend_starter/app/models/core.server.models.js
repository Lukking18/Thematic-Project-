const db = require('../../database')
const crypto = require('crypto');

const searchMovies = (done) => {
    const sql = "SELECT * FROM Movies";


    db.all(sql, (err, rows) => {
        if (err) return done(err); 
        return done(null, rows); 
    });
};

module.exports = {
    searchMovies
};