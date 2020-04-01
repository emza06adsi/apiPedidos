const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

// USUARIO 
function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`call selectUsuarios `, (err, data) => {
           if (err) return reject(err);
           resolve(data);
       })
   })
}

function get(id) {
    // console.log(id)
    return new Promise((resolve, reject) => {
         connection.query(`call USUARIOS_POR_UNIDAD(${id})`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO usuarios SET ?`, data, (err, result) => {
            if (err) return reject(err);
            connection.query(`call Ingresar_auth(?,?,?)`, [data.us_id,data.us_correo,data.us_contrasena], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        
    })
}



function query(table, query) {
    
    return new Promise((resolve, reject) => {
        connection.query(`call query(?)`, query, (err, res) => {
            if (err){
                console.log(err)
            
                return reject(err);} 
          else{
            console.log(res[0])
            resolve(res[0] || null);
          }
        })
    })
}

// USUARIO

// EMPAQUES

module.exports = {
    list,
    get,
    query,
    insert,
};
