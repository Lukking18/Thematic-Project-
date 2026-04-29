const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'Thematic project database.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message);
        throw err;
    }else{
        console.log('Connected to the Thematic Project Database');
    }
})

module.exports = db;