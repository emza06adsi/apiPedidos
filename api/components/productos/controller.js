// const TABLA = "cliente";
let fs = require('fs')
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../sotore/gadolDbMysql");
  }

  function listarProductos() {
    return store.listarProductos();
  }

  function productosid(id) {
    return store.productosid(id);
  }

  // codigo: '11912705',
  // nombre: 'Esteban',
  // precio: '4654',
  // file: '

  function ingresarProductos(data) {
    // let base64String = data.file
    // let base64img = base64String.split(';base64,').pop();
    // fs.writeFile(`api/components/productos/publicomg/${data.codigo}_${data.nombre}.jpg`,base64img,{encoding:'base64'},function(err){
      // if(err){
      //   console.log(err)
      // }
      // else{
      //  let img=`https://api-a-tu-servicio.herokuapp.com/api/tienda/imagenes/${data.codigo}_${data.nombre}.jpg`;   
       
       
      //  return store.ingresarProductos(img,data);   
       return store.ingresarProductos(data);   
       
      }
    })
    
  }

  function agregarProductos(data) {
    // return store.productosid(id);
    console.log(data)
    // return store.agregarProductos(data);
  }

  function venderProductos(data) {
    return store.venderProductos(data);
  }

  //   function getEmpaquesFecha(id) {
  //     return store.getEmpaquesFecha(TABLA, id);
  //   }
  //   function getResumenFacturas(id) {
  //     // arregloData=id.split("&")
  //     // var fecha=arregloData[0]
  //     // var cliente=arregloData[1]
  //   console.log(id)
  //    let datos=id.split('*')
  //     return store.getResumenFacturas(TABLA,datos);
  //   }
  //   function getDataIco(id) {
  //     return store.getDataIco(TABLA,id);
  //   }

  //   function insertDatos(data,fecha) {
  //     // console.log(fecha)
  //     // console.log(data)
  //     return store.insertListaEmpaque(fecha, data);

  //     // console.lo g(data.children[0].value)


  // //   let CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO=data.children[3].value.split('-')
  // //   let NOMBREOASISCAJAyNOMBRECLIENTECAJA=data.children[15].value.split('-')
  // //   let vectorRefeerncia=data.children[17].value.split('-')
  // //   let nombreCliente=data.children[18].value.slice(0,3)

  // //   let datosJson = {
  // //     NOMBRE_cliente:nombreCliente,
  // //     CODIGO_GRAVACION_PEDIDO:data.children[12].value,
  // //     CODIGO_CLIENTE_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[1],
  // //     NOMBRE_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[0],
  // //     REFERENCIA_PEDIDO: CODIGOCLIENTEPEDIDOYNOMBREPEDIDOYREFERENCIA_PEDIDO[2],
  // //     NOMBRE_OASIS_CAJA:NOMBREOASISCAJAyNOMBRECLIENTECAJA[0] ,
  // //     NOMBRE_GADOL_CAJA: data.children[16].value,
  // //     NOMBRE_CLIENTE_CAJA: NOMBREOASISCAJAyNOMBRECLIENTECAJA[1],
  // //     CODIGO_OASIS_PRODUCTO: data.children[16].value,
  // //     NOMBRE_OASIS_PRODUCTO: data.children[17].value,
  // //     CODIGO_ANTIGUO_OASIS_PRODUCTO:data.children[18].value ,
  // //     CANTIDAD_PRODUCTO: data.children[19].value,
  // //     NOMBRE_CLIENTE_PRODUCTO:data.children[17].value,
  // //     COLOR_CLIENTE_PRODUCTO: "0",
  // //     REFERENCIA_CLIENTE_PRODUCTO: vectorRefeerncia[1],
  // //     FECHA_INGRESO: fecha,
  // //     CODIGO_TALLA: data.children[8].value,
  // //     NOMBRE_TALLA: data.children[9].value
  // //   };
  // // console.log(datosJson)
  //     //  store.insertListaEmpaque(TABLA, datosJson);

  //     // let listaData = {
  //     //   NOMBRE_cliente: data.NOMBRE_cliente,
  //     //   CODIGO_GRAVACION_PEDIDO: data.CODIGO_GRAVACION_PEDIDO,
  //     //   CODIGO_CLIENTE_PEDIDO: data.CODIGO_CLIENTE_PEDIDO,
  //     //   NOMBRE_PEDIDO: data.NOMBRE_PEDIDO,
  //     //   REFERENCIA_PEDIDO: data.REFERENCIA_PEDIDO,
  //     //   NOMBRE_OASIS_CAJA: data.NOMBRE_OASIS_CAJA,
  //     //   NOMBRE_GADOL_CAJA: data.NOMBRE_GADOL_CAJA,
  //     //   NOMBRE_CLIENTE_CAJA: data.NOMBRE_CLIENTE_CAJA,
  //     //   CODIGO_OASIS_PRODUCTO: data.CODIGO_OASIS_PRODUCTO,
  //     //   NOMBRE_OASIS_PRODUCTO: data.NOMBRE_OASIS_PRODUCTO,
  //     //   CODIGO_ANTIGUO_OASIS_PRODUCTO: data.CODIGO_ANTIGUO_OASIS_PRODUCTO,
  //     //   CANTIDAD_PRODUCTO: data.CANTIDAD_PRODUCTO,
  //     //   NOMBRE_CLIENTE_PRODUCTO: data.NOMBRE_CLIENTE_PRODUCTO,
  //     //   COLOR_CLIENTE_PRODUCTO: data.COLOR_CLIENTE_PRODUCTO,
  //     //   REFERENCIA_CLIENTE_PRODUCTO: data.REFERENCIA_CLIENTE_PRODUCTO,
  //     //   FECHA_INGRESO: data.FECHA_INGRESO,
  //     //   CODIGO_TALLA: data.CODIGO_TALLA,
  //     //   NOMBRE_TALLA: data.NOMBRE_TALLA
  //     // };
  //     // // let datodGadol=JSON.stringify(listaData)
  //     // // console.log(listaData);
  //     // console.log(listaData)

  //   }

  return {
    listarProductos,
    productosid,
    ingresarProductos,
    agregarProductos,
    venderProductos,
    // getEmpaquesCliente,
    // getEmpaquesFecha,
    // insertDatos,
    // getResumenFacturas,
    // getDataIco, 
  };
};
