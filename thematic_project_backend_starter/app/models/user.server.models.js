const db = require('../../database')
const crypto = require('crypto');

const getHash = function(password,salt){
    return crypto.pbkdf2Sync(password, salt, 1000000, 256, 'sha256').toString('hex');
}

const createAccount = (user, done) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = "INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?,?,?,?,?)";
    let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];

    db.run(sql, values, function(err){
        if(err) return done(err);
        return done(null, this.lastID);
    });
}


const testDuplicateEmail = (email, done) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.get(sql,[email],(err,row) => {
        if(err){
            return done(err);
        } if(!row){
            return done(null,null);
        } else {
            return done(null, row);
        }
    });
}


const authenticateUser = (email, password, done) => {
    const sql = "SELECT user_id, password, salt FROM users WHERE email = ?"

    db.get(sql, [email], (err,row) =>{
        if(err) return done(err);
        if(!row) return done(null,null);

        if(row.salt == null) row.salt = ''

        let salt = Buffer.from(row.salt, 'hex')

        if(row.password === getHash(password,salt)){
            return done(null, row.user_id)
        } else{
            return done(null,null);
        }
    });
}


const getToken = (id, done) => {
    const sql = "SELECT session_token FROM users WHERE user_id = ?"

    db.get(sql,[id], (err,row) => {
        if(err){
            return done(err)
        } else if(!row){
            return done(null,null)
        }else{
            return done(null, row.session_token)
        }
    });
}

const setToken = (id,done) => {
    let token = crypto.randomBytes(16).toString('hex');
    
    const sql = "UPDATE users SET session_token = ? WHERE user_id = ?"


    db.run(sql,[token, id], (err) =>{
        return done(err,token)
    });
}


const removeToken = (token, done) => {
    const sql = "UPDATE users SET session_token = null WHERE session_token = ?"

    db.run(sql,[token],(err) =>{
        return done(err)
    })
}

module.exports = {
    createAccount,
    testDuplicateEmail,
    authenticateUser,
    getToken,
    setToken,
    removeToken,
}

