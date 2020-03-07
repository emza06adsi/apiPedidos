const TABLA = "cliente";

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../sotore/gadolDbMysql");
  }

  function listEmpaques() {
    return store.listEmpaques(TABLA);
  }

  function getEmpaquesCliente(id) {
    return store.getEmpaquesCliente(TABLA, id);
  }

  function getEmpaquesFecha(id) {
    return store.getEmpaquesFecha(TABLA, id);
  }
  function getEmpaquesFechaCliente(id) {
    arregloData=id.split("&")
    var fecha=arregloData[0]
    var cliente=arregloData[1]
    return store.getEmpaquesFechaCliente(TABLA,fecha, cliente);
  }

  function insertDatos(data) {
    console.log(data.NOMBRE);
    console.log(data.CODIGO_GRAVACION);

    let listaData = {
      NOMBRE_cliente: data.NOMBRE_cliente,
      CODIGO_GRAVACION_PEDIDO: data.CODIGO_GRAVACION_PEDIDO,
      CODIGO_CLIENTE_PEDIDO: data.CODIGO_CLIENTE_PEDIDO,
      NOMBRE_PEDIDO: data.NOMBRE_PEDIDO,
      REFERENCIA_PEDIDO: data.REFERENCIA_PEDIDO,
      NOMBRE_OASIS_CAJA: data.NOMBRE_OASIS_CAJA,
      NOMBRE_GADOL_CAJA: data.NOMBRE_GADOL_CAJA,
      NOMBRE_CLIENTE_CAJA: data.NOMBRE_CLIENTE_CAJA,
      CODIGO_OASIS_PRODUCTO: data.CODIGO_OASIS_PRODUCTO,
      NOMBRE_OASIS_PRODUCTO: data.NOMBRE_OASIS_PRODUCTO,
      CODIGO_ANTIGUO_OASIS_PRODUCTO: data.CODIGO_ANTIGUO_OASIS_PRODUCTO,
      CANTIDAD_PRODUCTO: data.CANTIDAD_PRODUCTO,
      NOMBRE_CLIENTE_PRODUCTO: data.NOMBRE_CLIENTE_PRODUCTO,
      COLOR_CLIENTE_PRODUCTO: data.COLOR_CLIENTE_PRODUCTO,
      REFERENCIA_CLIENTE_PRODUCTO: data.REFERENCIA_CLIENTE_PRODUCTO,
      FECHA_INGRESO: data.FECHA_INGRESO,
      CODIGO_TALLA: data.CODIGO_TALLA,
      NOMBRE_TALLA: data.NOMBRE_TALLA
    };
    // data=JSON.stringify(listaData)
    console.log(data + "  insertDatos");
    return store.insertListaEmpaque(TABLA, listaData);
  }

  return {
    listEmpaques,
    getEmpaquesCliente,
    getEmpaquesFecha,
    insertDatos,
    getEmpaquesFechaCliente
  };
};
