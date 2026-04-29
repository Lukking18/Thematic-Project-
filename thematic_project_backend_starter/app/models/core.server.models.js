const db = require('../../database')


const searchMovies = (searchText, searchReleaseDate, searchBudgetMin, searchBudgetMax, searchRevenueMin, searchRevenueMax, done) => {
    let sql = "SELECT m.*, c.actors, d.director_name FROM Movies AS m LEFT JOIN Movie_cast AS c ON m.movie_id = c.id LEFT JOIN directors AS d ON m.movie_id = d.movie_id WHERE 1=1 ";


    const params = [];

    if (searchText) {
        sql += " AND ( m.title LIKE ? OR m.genres LIKE ? OR c.actors LIKE ? OR d.director_name LIKE ?) ";
        params.push(`%${searchText}%`, `%${searchText}%`, `%${searchText}%`, `%${searchText}%`);
    }

    /*if (searchGenre) {
        sql += " AND m.genres LIKE ?"
        params.push(`%${searchGenre}%`);
    }
    */    

    if (searchReleaseDate) {
        sql += " AND m.release_date LIKE ?"
        params.push(`%${searchReleaseDate}%`);
    }

    if (searchBudgetMin && !searchBudgetMax) {
        sql += " AND m.budget > ?"
        params.push(Number(searchBudgetMin));
    }

    if (!searchBudgetMin && searchBudgetMax) {
        sql += " AND m.budget < ?"
        params.push(Number(searchBudgetMax));
    }

    if (searchBudgetMin && searchBudgetMax) {
        sql += " AND m.budget BETWEEN ? AND ?"
        params.push(Number(searchBudgetMin), Number(searchBudgetMax));
    }

    if (searchRevenueMin && !searchRevenueMax) {
        sql += " AND m.revenue > ?"
        params.push(Number(searchRevenueMin));
    }

    if (!searchRevenueMin && searchRevenueMax) {
        sql += " AND m.revenue < ? AND m.revenue != 0"
        params.push(Number(searchRevenueMax));
    }

    if (searchRevenueMin && searchRevenueMax) {
        sql += " AND m.revenue BETWEEN ? AND ?"
        params.push(Number(searchRevenueMin), Number(searchRevenueMax));
    }

    sql += " LIMIT 100"

    /*
    if (searchActor){
        sql += " AND c.actors LIKE ?"
        params.push(`%${searchActor}%`);
    }

    if (searchDirector){
        sql += " AND d.director_name LIKE ?"
        params.push(`%${searchDirector}%`);
    }
    */

   
    db.all(sql, params, (err, rows) => {
        if (err) return done(err); 
        return done(null, rows); 
    });
};

// Films directed by a selected director 
// Search for a specific film title, actor or director. 

const getSingleMovie = (movie_id, done) => {

    const sql = "SELECT m.*, c.actors, d.director_name FROM Movies AS m LEFT JOIN Movie_cast AS c ON m.movie_id = c.id LEFT JOIN directors AS d ON m.movie_id = d.movie_id  WHERE m.movie_id = ?"

    db.get(sql, [movie_id],(err,row) => {
        if(err){
            return done(err);
        } if(!row){
            return done(null,null);
        }else{
            return done(null,row);
        }
    
    });
}
module.exports = {
    searchMovies,
    getSingleMovie
}