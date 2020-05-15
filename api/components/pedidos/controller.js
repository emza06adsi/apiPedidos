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
        
        // console.log(data)
        // return(data)
        
        pedido = {
            fecha: data.pedido.fecha,
            estado: "no_enviado",
            usuario: "1023955260"
        }
        console.log(pedido)
        let cantidad = data.pedido.productos.length
        console.log(cantidad)
        let valor = 0;
        for (let i = 0; i < cantidad; i++) {
            valor += data.pedido.productos[i].producto_cantidad * data.pedido.productos[i].pro_valor;
        }
        pedido.valor = valor
        console.log(pedido)
        let id = await store.crearPedidos(pedido)
        console.log(id[0][0].ped_id)
        // console.log(pedido.usuario)
        for (let i = 0; i < cantidad; i++) {

            await store.crearPaquetes(
                    pedido.usuario,
                    data.pedido.productos[i].producto_cantidad,
                    data.pedido.productos[i].pro_id,
                    id[0][0].ped_id
                )
        }

        return data
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