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
            connection.query(`call Ingresar_auth(?,?,?)`, [data.us_id, data.us_correo, data.us_contrasena], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

    })
}

function query(table, query) {

    return new Promise((resolve, reject) => {
        connection.query(`call query(?)`, query, (err, res) => {
            if (err) {
                console.log(err)

                return reject(err);
            }
            else {
                console.log(res[0])
                resolve(res[0] || null);
            }
        })
    })
}

// USUARIO

function listarProductos() {
    return new Promise((resolve, reject) => {
        connection.query(`call listarProductosTodos `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function productosid(id) {
    return new Promise((resolve, reject) => {
        connection.query(`call listarProductosid(${id}) `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function ingresarProductos(img,data) {
    
    return new Promise((resolve, reject) => {
        connection.query(`call ingresarProductos(?,?,?,?,?,?)`, [data.codigo, data.tipo, data.nombre, data.cantidad, data.precio,img], (err, result) => {
            if (err) return reject(err);
            resolve(data);
        })

    })
}


// function ingresarProductos(data) {
//     return new Promise((resolve, reject) => {
//         connection.query(`call ingresarProductos(?,?,?,?,?)`, [data.pro_id, data.pro_tipo_producto, data.pro_nombre, data.pro_cantidad, data.pro_valor], (err, result) => {
//             if (err) return reject(err);
//             resolve(data);
//         })

//     })
// }


async function agregarProductos(data) {
    cantidadActual= await productosid(data.pro_id)
    console.log(cantidadActual[0][0].pro_cantidad)
    data.pro_cantidad+=cantidadActual[0][0].pro_cantidad;
    return new Promise((resolve, reject) => {
        connection.query(`call agregarProductos(?,?)`, [data.pro_id, data.pro_cantidad], (err, result) => {
            if (err) return reject(err);
            resolve(data);
        })

    })
}

async function venderProductos(data) {
    cantidadActual= await productosid(data.pro_id)
    console.log(cantidadActual[0][0].pro_cantidad)
    data.pro_cantidad=cantidadActual[0][0].pro_cantidad-data.pro_cantidad;
    return new Promise((resolve, reject) => {
        connection.query(`call agregarProductos(?,?)`, [data.pro_id, data.pro_cantidad], (err, result) => {
            if (err) return reject(err);
            resolve(data);
        })

    })
}

function listarPedidos() {
    return new Promise((resolve, reject) => {
        connection.query(`call listarPedidos()`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}


function listarPedidosId(id) {
    return new Promise((resolve, reject) => {
        connection.query(`call listarPedidosId(${id})`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

function crearPedidos(data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
        connection.query(
            `call crearPedidos(?,?,?,?,?,?)`,
            [
                data.fecha,
                data.valor,
                data.estado,
                data.usuario,
                data.ubicacion,
                data.contacto
            ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}
function crearPaquetes(usuario,canidad,idProducto,idPedido) {
    // console.log(`${cantidad},${valor},${idProducto},${isPedido}`)
    return new Promise((resolve, reject) => {
        connection.query(`call crearpaquetes(?,?,?)`,[canidad,idProducto,idPedido], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}
function PedidosActivos() {
    return new Promise((resolve, reject) => {
        connection.query(`call PedidosActivos()`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}
function PedidosInactivos() {
    return new Promise((resolve, reject) => {
        connection.query(`call PedidosInactivos()`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}
function entregarPedido(data) {
    return new Promise((resolve, reject) => {
        connection.query(`call entregarPedido(?)`,[data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    })
}

function paquetesPorId(id) {
    return new Promise((resolve, reject) => {
        connection.query(`call paquetesId(${id}) `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

// EMPAQUES
//pedidos

module.exports = {
    list,
    get,
    query,
    insert,
    listarProductos,
    productosid,
    ingresarProductos,
    agregarProductos,
    venderProductos,
    listarPedidos,
    listarPedidosId,
    crearPedidos,
    crearPaquetes,
    PedidosActivos,
    PedidosInactivos,
    entregarPedido,
    paquetesPorId,
};
