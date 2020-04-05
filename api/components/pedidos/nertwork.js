const express = require ('express');
const response=require(`../../../network/response`)
const Controler = require('./index');
const router = express.Router();


router.get("/",listarPedidos)
router.get("/:id",listarPedidosId)
router.post("/crearPedidos",crearPedidos)
router.put("/modificarEstadoPedido",modificarEstadoPedido)
router.delete("/eliminarPedidos",eliminarPedidos)
router.get("/PedidosActivos",PedidosActivos)

function PedidosActivos(req,res,next) {
    
    
    // Controler.PedidosActivos()
    // .then((lista)=>{
    //     response.success(req,res,lista,200)
    // })
    // .catch(next)
}

function listarPedidos(req,res,next) {
    Controler.listarPedidos()
    .then((lista)=>{
        response.success(req,res,lista,200)
    })
    .catch(next);
}

function listarPedidosId(req,res,next) {
    Controler.listarPedidosId(req.params.id)
    .then((pedido)=>{
        response.success(req,res,pedido,200)
    })
    .catch(next)
}

function crearPedidos(req,res,next) {
// res.send(req.body)
    //    console.log(req.body)
Controler.crearPedidos(req.body)
    .then((data)=>{
        response.success(req,res,data,200)
    })
    .catch(next)
}

function modificarEstadoPedido(req,res,next) {
    Controler.modificarEstadoPedido(req.body)
    .then((datos)=>{
        response.success(req,res,datos,200)
    })
    .catch(next)
}

function entregarPedido(req,res,next) {
    Controler.entregarPedido(req.body)
    .then((datos)=>{
        response.success(req,res,datos,200)
    })
    .catch(next)
}
function eliminarPedidos(req,res,next) {
    Controler.eliminarPedidos(req.body)
    .then((datos)=>{
        response.success(req,res,datos,200)
    })
    .catch(next)
}

module.exports =router;