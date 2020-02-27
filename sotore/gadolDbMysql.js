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

// USUARIO

// EMPAQUES

function listEmpaques(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`
        SELECT cliente.NOMBRE,
        pedido.CODIGO_GRAVACION,
        pedido.CODIGO_CLIENTE,
        pedido.NOMBRE_PEDIDO,
        pedido.REFERENCIA_PEDIDO,
        cajas.NOMBRE_CLIENTE_CAJA,
        cajas.NOMBRE_GADOL,
        cajas.NOMBRE_OASIS_CAJA,
        productos.CODIGO_OASIS,
        productos.NOMBRE_OASIS,
        productos.CODIGO_ANTIGUO_OASIS,
        productos.CANTIDAD,
        productos.NOMBRE_CLIENTE,
        productos.COLOR_CLIENTE,
        productos.FECHA_INGRESO,
        tallas.NOMBRE_TALLA
        
  FROM ${table}
 INNER JOIN pedido ON cliente.ID = pedido.ID
 INNER JOIN pedido_cajas ON pedido_cajas.ID_PEDIDO = pedido.ID
 INNER JOIN cajas ON cajas.ID= pedido_cajas.ID_CAJAS
 INNER JOIN productos_cajas ON productos_cajas.ID_CAJA = cajas.ID
 INNER JOIN productos ON productos.ID= productos_cajas.ID_PRODUCTO
 INNER JOIN tallas ON tallas.ID = productos.ID_TALLAS
`, (err, data) => {
            if (err) return reject(err);
           console.log(data)
            resolve(data);
        })
    })
}


function getEmpaquesCliente(table, id) {
    return new Promise((resolve, reject) => {
         connection.query(`
         SELECT cliente.NOMBRE,
         pedido.CODIGO_GRAVACION,
         pedido.CODIGO_CLIENTE,
         pedido.NOMBRE_PEDIDO,
         pedido.REFERENCIA_PEDIDO,
         cajas.NOMBRE_CLIENTE_CAJA,
         cajas.NOMBRE_GADOL,
         cajas.NOMBRE_OASIS_CAJA,
         productos.CODIGO_OASIS,
         productos.NOMBRE_OASIS,
         productos.CODIGO_ANTIGUO_OASIS,
         productos.CANTIDAD,
         productos.NOMBRE_CLIENTE,
         productos.COLOR_CLIENTE,
         productos.FECHA_INGRESO,
         tallas.NOMBRE_TALLA
         
   FROM ${table}
  INNER JOIN pedido ON cliente.ID = pedido.ID
  INNER JOIN pedido_cajas ON pedido_cajas.ID_PEDIDO = pedido.ID
  INNER JOIN cajas ON cajas.ID= pedido_cajas.ID_CAJAS
  INNER JOIN productos_cajas ON productos_cajas.ID_CAJA = cajas.ID
  INNER JOIN productos ON productos.ID= productos_cajas.ID_PRODUCTO
  INNER JOIN tallas ON tallas.ID = productos.ID_TALLAS
         WHERE cliente.ID=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
function getEmpaquesFecha(table, id) {
    return new Promise((resolve, reject) => {
         connection.query(`
         SELECT cliente.NOMBRE,
         pedido.CODIGO_GRAVACION,
         pedido.CODIGO_CLIENTE,
         pedido.NOMBRE_PEDIDO,
         pedido.REFERENCIA_PEDIDO,
         cajas.NOMBRE_CLIENTE_CAJA,
         cajas.NOMBRE_GADOL,
         cajas.NOMBRE_OASIS_CAJA,
         productos.CODIGO_OASIS,
         productos.NOMBRE_OASIS,
         productos.CODIGO_ANTIGUO_OASIS,
         productos.CANTIDAD,
         productos.NOMBRE_CLIENTE,
         productos.COLOR_CLIENTE,
         productos.FECHA_INGRESO,
         tallas.NOMBRE_TALLA
         
   FROM ${table}
  INNER JOIN pedido ON cliente.ID = pedido.ID
  INNER JOIN pedido_cajas ON pedido_cajas.ID_PEDIDO = pedido.ID
  INNER JOIN cajas ON cajas.ID= pedido_cajas.ID_CAJAS
  INNER JOIN productos_cajas ON productos_cajas.ID_CAJA = cajas.ID
  INNER JOIN productos ON productos.ID= productos_cajas.ID_PRODUCTO
  INNER JOIN tallas ON tallas.ID = productos.ID_TALLAS
         WHERE productos.FECHA_INGRESO="${id}"`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
// empaques


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


module.exports = {
    list,
    get,
    upsert,
    query,
    listEmpaques,
    getEmpaquesCliente,
    getEmpaquesFecha
};