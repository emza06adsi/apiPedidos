const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', listEmpaques);
router.get('/cliente/:id',getEmpaquesCliente);
router.get('/fecha/:id',getEmpaquesFecha);
router.get('/fecha/fechaCliente/:id',getEmpaquesFechaCliente);

router.post('/',postinsertDatos);
// functions

function listEmpaques(req, res, next) {
    Controller.listEmpaques()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function getEmpaquesCliente(req,res,next) {
    Controller.getEmpaquesCliente(req.params.id)
    .then((user)=>{
        response.success(req,res,user,200)
    })
    .catch(next);
}


function getEmpaquesFecha(req,res,next) {
    Controller.getEmpaquesFecha(req.params.id)
    .then((user)=>{
        response.success(req,res,user,200)
    })
    .catch(next);
}


function getEmpaquesFechaCliente(req,res,next) {
    Controller.getEmpaquesFechaCliente(req.params.id)
    .then((user)=>{
        response.success(req,res,user,200)
    })
    .catch(next);
}

function postinsertDatos(req, res,next) {
    Controller.insertDatos(req.body)
    .then((user)=>{
        response.success(req,res,user,200)
    })
    .catch(next);
}

module.exports = router;
