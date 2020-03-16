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
 INNER JOIN pedido ON cliente.ID = pedido.ID_CLIENTE
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

function getResumenFacturas(TABLA,id) {
    console.log(id)
    return new Promise((resolve, reject) => {
         connection.query(`
    SELECT 
        cliente.NOMBRE,
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
    FROM tallas
        INNER JOIN productos on tallas.ID = productos.ID_TALLAS
        INNER JOIN productos_cajas on  productos.ID = productos_cajas.ID_PRODUCTO
        INNER JOIN cajas ON productos_cajas.ID_CAJA= cajas.ID 
        INNER JOIN pedido_cajas ON cajas.ID = pedido_cajas.ID_CAJAS
        INNER JOIN pedido ON pedido_cajas.ID_CAJAS = pedido.ID
        INNER JOIN cliente on pedido.ID_CLIENTE= cliente.ID
    where productos.FECHA_INGRESO="${id[0]}" AND cliente.NOMBRE="${id[1]}"`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function getDataIco(TABLA,id) {
    console.log(id)
    return new Promise((resolve, reject) => {
         connection.query(`select * from productos_por_referencia WHERE ID = ${id}`,
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

async function insertListaEmpaque(fecha,data) {
    // console.log(data)
//    console.log(fecha)
data.map( async data => {
    
    let CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO=data.children[3].value.split('-')
    let NOMBREOASISCAJAyNOMBRECLIENTECAJA=data.children[15].value.split('-')
    let vectorRefeerncia=data.children[17].value.split('-')
    let nombreCliente=data.children[18].value.slice(0,3)
      
    let numeroCliente;
    let datosJson = {
        NOMBRE_cliente:nombreCliente,
        CODIGO_GRAVACION_PEDIDO:data.children[12].value,
        CODIGO_CLIENTE_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[1],
        NOMBRE_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[0],
        REFERENCIA_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[2],
        NOMBRE_OASIS_CAJA:NOMBREOASISCAJAyNOMBRECLIENTECAJA[0] ,
        NOMBRE_GADOL_CAJA: data.children[16].value,
        NOMBRE_CLIENTE_CAJA: NOMBREOASISCAJAyNOMBRECLIENTECAJA[1],
        CODIGO_OASIS_PRODUCTO: data.children[16].value,
        NOMBRE_OASIS_PRODUCTO: data.children[17].value,
        CODIGO_ANTIGUO_OASIS_PRODUCTO:data.children[18].value ,
        CANTIDAD_PRODUCTO: data.children[19].value,
        NOMBRE_CLIENTE_PRODUCTO:data.children[17].value,
        COLOR_CLIENTE_PRODUCTO: "0",
        REFERENCIA_CLIENTE_PRODUCTO: vectorRefeerncia[1],
        FECHA_INGRESO: fecha,
        CODIGO_TALLA: data.children[8].value,
        NOMBRE_TALLA: data.children[9].value
      };
  
      let codigoCliente=await clienteId(datosJson.NOMBRE_cliente);
   if(codigoCliente.length==0){
        numeroCliente=6
    }else{
        numeroCliente=codigoCliente[0]['ID']
    }    
 
       insertPedido(datosJson,numeroCliente)
       insertCaja(datosJson)
      let idPedido=await idPedidoS();
      let idCaja=await idCajaS();
        console.log(idCaja)
        console.log(idPedido)
      
        insertPedidoCaja(idPedido,idCaja)
       insertProductos(datosJson)
      let idProducto=await idProductoS();
      
      return new Promise((resolve, reject) => {

        connection.query(`
        INSERT INTO productos_cajas(
            ID_PRODUCTO,
            ID_CAJA)VALUES(
            ${idProducto[0]['COUNT(ID)']},
            ${idProducto[0]['COUNT(ID)']});`
        )
    })   
      
   
 
});

}

function insertPedido(data,numeroCliente) {
    console.log("se insertoo")
    // console.log(data.CODIGO_CLIENTE_PEDIDO)
    // console.log(data.NOMBRE_PEDIDO)
    // console.log(data.REFERENCIA_PEDIDO)

    return new Promise((resolve, reject) => {
        
            connection.query(`
        INSERT INTO pedido (
            CODIGO_GRAVACION,
            CODIGO_CLIENTE,
            NOMBRE_PEDIDO,
            REFERENCIA_PEDIDO,
            ID_CLIENTE)
            VALUES("${data.CODIGO_GRAVACION_PEDIDO}",
            "${data.CODIGO_CLIENTE_PEDIDO}",
            "${data.NOMBRE_PEDIDO}",
            "${data.REFERENCIA_PEDIDO}",
            ${numeroCliente});`
        , (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
    
}
function insertCaja(data) {
    // console.log(data.NOMBRE_OASIS_CAJA)
    // console.log(data.NOMBRE_GADOL_CAJA)
    // console.log(data.NOMBRE_CLIENTE_CAJA)
    return new Promise((resolve, reject) => {
        connection.query(`
            
        INSERT INTO cajas(
                NOMBRE_OASIS_CAJA,
                NOMBRE_GADOL,
                NOMBRE_CLIENTE_CAJA
            )  VALUES(
                "${data.NOMBRE_OASIS_CAJA}",
                "${data.NOMBRE_GADOL_CAJA }",
                "${data.NOMBRE_CLIENTE_CAJA }"
            );`
        , (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })

    

}
function insertPedidoCaja(idPedido,idCaja) {
    // console.log(idPedido[0]['COUNT(ID)']+1)
    // console.log(idCaja[0]['COUNT(ID)']+1)
    return new Promise((resolve, reject) => {
        connection.query(`
        INSERT INTO pedido_cajas(
            ID_PEDIDO,
            ID_CAJAS
        )  VALUES(
            ${idPedido[0]['COUNT(ID)']},
            ${idPedido[0]['COUNT(ID)'] }
        );`
        , (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
function insertProductos(data) {
    // console.log(data.CODIGO_OASIS_PRODUCTO)
    // console.log(data.NOMBRE_OASIS_PRODUCTO)
    // console.log(data.CODIGO_ANTIGUO_OASIS_PRODUCTO)
    // console.log(data.CANTIDAD_PRODUCTO)
    // console.log(data.NOMBRE_CLIENTE_PRODUCTO)
    // console.log(data.COLOR_CLIENTE_PRODUCTO)
    // console.log(data.CODIGO_TALLA +"codigo talla"+ data.NOMBRE_TALLA)
    // console.log(data.REFERENCIA_CLIENTE_PRODUCTO)
    // console.log(data.FECHA_INGRESO)
    return new Promise((resolve, reject) => {
        connection.query(`
    INSERT INTO productos(
            CODIGO_OASIS,
            NOMBRE_OASIS,
            CODIGO_ANTIGUO_OASIS,
            CANTIDAD,
            NOMBRE_CLIENTE,
            COLOR_CLIENTE,
            ID_TALLAS,
            REFERENCIA_CLIENTE,
            FECHA_INGRESO
        )  VALUES(
            "${data.CODIGO_OASIS_PRODUCTO}",
            "${data.NOMBRE_OASIS_PRODUCTO}",
            "${data.CODIGO_ANTIGUO_OASIS_PRODUCTO}",
            ${data.CANTIDAD_PRODUCTO},
            "${data.NOMBRE_CLIENTE_PRODUCTO}",
            "${data.COLOR_CLIENTE_PRODUCTO}",
            ${data.CODIGO_TALLA},
            "${data.REFERENCIA_CLIENTE_PRODUCTO}",
            "${data.FECHA_INGRESO}"
        );`
        , (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
    
}

function idPedidoS() {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT COUNT(ID) FROM pedido`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
};

function idCajaS() {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT COUNT(ID) FROM pedido`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function idProductoS() {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT COUNT(ID) FROM productos`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
function clienteId(nombre) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT  ID FROM cliente WHERE NOMBRE="${nombre}"`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}
// INSERT INTO `gd_database.cajas`(NOMBRE_OASIS,NOMBRE_GADOL,NOMBRE_CLIENTE)VALUES(`316`,`23`,`3481`);
    // INSERT INTO `gd_database.cliente`(NOMBRE,REFERENCIA_PEDIDO)VALUES(`PRIORITY`,`0`);
    // INSERT INTO `gd_database.pedido`(CODIGO_GRAVACION,CODIGO_CLIENTE,NOMBRE_PEDIDO,ID_CLIENTE)VALUES(`168`,`9`,`PW`, 1,1	);
    // INSERT INTO `gd_database.pedido_cajas`(ID_PEDIDO,ID_CAJAS)VALUES(1,1);
    // INSERT INTO `productos`(CODIGO_OASIS,NOMBRE_OASIS,CODIGO_ANTIGUO_OASIS,CANTIDAD,NOMBRE_CLIENTE,COLOR_CLIENTE,ID_TALLAS)
    // VALUES
    // ("6037825","BLUSA M3/4 ESTAMPADO LILA REF. JENNY","PMU010040013",1,"BLUSA M3/4 ESTAMPADO LILA REF. JENNY (ADARA EST)","0","0",1	);
    // INSERT INTO `productos`(CODIGO_OASIS,NOMBRE_OASIS,CODIGO_ANTIGUO_OASIS,CANTIDAD,NOMBRE_CLIENTE,COLOR_CLIENTE,ID_TALLAS)
    // INSERT INTO "productos_cajas"(ID_PRODUCTO,ID_CAJA)VALUES(1,1);
    // INSERT INTO `gd_database.tallas`(CODIGO,NOMBRE)VALUES(`6`,`0L`);

    
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

//    if(data.NOMBRE_cliente=="PRIORITY"){
//         codigoCliente=1
//    }else if(data.NOMBRE_cliente=="ALL SEASON"){
//         codigoCliente=2
//    }else if(data.NOMBRE_cliente=="CINTAS"){
//         codigoCliente=3
//    } else if(data.NOMBRE_cliente=="EL BODEGON"){
//         codigoCliente=4
//    } else if(data.NOMBRE_cliente=="ICO UNIFORMS"){
//         codigoCliente=5
//    }else{
//         codigoCliente=6
//    }

module.exports = {
    list,
    get,
    upsert,
    query,
    listEmpaques,
    getEmpaquesCliente,
    getEmpaquesFecha,
    insertListaEmpaque,
    getResumenFacturas,
    getDataIco,
};