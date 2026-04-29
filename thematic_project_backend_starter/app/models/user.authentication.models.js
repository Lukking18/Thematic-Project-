const db = require('../../database');

const getIdFromToken = (token,done) => {
    const sql = "SELECT user_id FROM users WHERE session_token=?"
    const params = [token]

    db.get(sql,params,(err,row)=>{
        if(err){
            return done(err)
        } else if(!row){
            return done(null,null)
        } else{
            return done(null, row.user_id)
        }
    })
}

module.exports = {
    getIdFromToken,
}