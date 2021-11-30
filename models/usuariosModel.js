var pool = require('./bd'); //llamado datos BD
var md5 = require('md5');

async function getUserByUsernameAndPassword (user, password) {
    try {
        var query = 'select * from usuarios where usuario = ? and password= ? limit 1'; //con el ? tomas el valor del input
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error){
        console.log(error);
    }
}

module.exports = {getUserByUsernameAndPassword}