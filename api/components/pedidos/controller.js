const store = require('../../../sotore/gadolDbMysql');

module.exports = function (injectedStore) {

    if (!store) {
        store = require('../../../sotore/gadolDbMysql')
    }


    function listarPedidos() {
        return store.listarPedidos();
    }
    function listarPedidosId(id) {
        return store.listarPedidosId(id);
    }

    async function crearPedidos(data) {
        pedido = {
            fecha: data.fecha,
            estado: "no_enviado",
            usuario: data.id_usuario
        }
        let cantidad = data.productos.length
        let valor = 0;
        for (let i = 0; i < cantidad; i++) {
            valor += data.productos[i].producto_cantidad * data.productos[i].producto_valor;
        }
        pedido.valor = valor

        let id = await store.crearPedidos(pedido)
        console.log(id[0][0].ped_id)
        for (let i = 0; i < cantidad; i++) {

            await store.crearPaquetes(
                data.productos[i].usuario_id,
                data.productos[i].producto_cantidad,
                data.productos[i].producto_id,
                id[0][0].ped_id)
        }

        // return 
        // let query=store.crearPedidos(pedido);
        // console.log(query)

    }

    function paquetesPorId(id) {
        return store.paquetesPorId(id)
    }

    function PedidosActivos() {
        return store.PedidosActivos();
    }
    async function PedidosInactivos() {
        return store.PedidosInactivos();
    }
    function modificarEstadoPedido(data) {
        return store.modificarEstadoPedido(data);
    }
    function entregarPedido(data) {
        return store.entregarPedido(data);
    }

    function eliminarPedidos(data) {
        return store.eliminarPedidos(data);
    }

    return {
        listarPedidos,
        listarPedidosId,
        crearPedidos,
        modificarEstadoPedido,
        eliminarPedidos,
        entregarPedido,
        PedidosActivos,
        PedidosInactivos,
        paquetesPorId,
    };
}