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

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
         connection.query(`SELECT * FROM ${table} WHERE id="${id}"`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    console.log('update')
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    console.log(table) 
    console.log(data.id) 

    const row = await get(table, data.id);
    console.log(row)
    if (row.length === 0) {
      return insert(table, data);
    } else {
      return update(table, data);
    }
  }

// async function upsert(table, data) {

//     // console.log(data)
//     // console.log("----")
//     // console.log(data.id)
//     // console.log("----")
//     // console.log(table)
//    let datadb= await 
//     console.log('los datos ya estan en datadb')
//     console.log(datadb)
//     // if (data && data.id) {
//     //     console.log("existe")
//     //     return update(table, data);
//     // } else {
//     //     console.log("no existe")
//     //     return insert(table, data);
//     // }
// }

// }

function query(table, query) {
    
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
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

module.exports = {
    list,
    get,
    upsert,
    query
};