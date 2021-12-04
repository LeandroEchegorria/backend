var pool = require('./bd'); //llamado datos BD


async function getNovedades () {
    
        var query = 'select * from novedades'; 
        var rows = await pool.query(query);
        return rows;
       
}

async function insertNovedad(obj){
        try {
                var query = "insert into novedades set ?";
                var rows = await pool.query(query, [obj]);
                return rows;                
        } catch (error) {
                console.log(error);
                throw error;
        }
}

async function deleteNovedadbyId (id) {
    
        var query = 'delete from novedades where id = ? '; 
        var rows = await pool.query(query, [id]);
        return rows;
       
}

module.exports = {getNovedades, insertNovedad, deleteNovedadbyId}