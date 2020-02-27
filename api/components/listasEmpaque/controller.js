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
        listaData={

        }
    }

    return {
        listEmpaques,
        getEmpaquesCliente,
        getEmpaquesFecha
    };
}
