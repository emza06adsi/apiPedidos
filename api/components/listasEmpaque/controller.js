const TABLA = 'cliente';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store=require('../../../sotore/gadolDbMysql')
    }

    function listEmpaques() {
        return store.listEmpaques(TABLA);
    }

    function getEmpaquesCliente(id) {
        return store.getEmpaquesCliente(TABLA,id);
    }
    
    function getEmpaquesFecha(id) {
        return store.getEmpaquesFecha(TABLA,id);
    }

    function insertDatos(data) {
       console.log(data.NOMBRE)
       console.log(data.CODIGO_GRAVACION)

      let  listaData={
            NOMBRE: data.NOMBRE,
            CODIGO_GRAVACION: data.CODIGO_GRAVACION,
            CODIGO_CLIENTE:  data.CODIGO_CLIENTE,
            NOMBRE_PEDIDO: data.NOMBRE_PEDIDO,
            REFERENCIA_PEDIDO: data.REFERENCIA_PEDIDO,
            NOMBRE_CLIENTE_CAJA: data.NOMBRE_CLIENTE_CAJA,
            NOMBRE_GADOL:  data.NOMBRE_GADOL,
            NOMBRE_OASIS_CAJA: data.NOMBRE_OASIS_CAJA,
            CODIGO_OASIS:  data.CODIGO_OASIS,
            NOMBRE_OASIS:  data.NOMBRE_OASIS,
            CODIGO_ANTIGUO_OASIS:  data.CODIGO_ANTIGUO_OASIS,
            CANTIDAD:  data.CANTIDAD,
            NOMBRE_CLIENTE:  data.NOMBRE_CLIENTE,
            COLOR_CLIENTE:  data.COLOR_CLIENTE,
            FECHA_INGRESO: data.FECHA_INGRESO,
            NOMBRE_TALLA: data.NOMBRE_TALLA,
        }
        console.log(listaData[0]+'  insertDatos')
        return store.insertDatos(TABLA,listaData);
    }

    return {
        listEmpaques,
        getEmpaquesCliente,
        getEmpaquesFecha,
        insertDatos
    };
}
