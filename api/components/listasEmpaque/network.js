const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get("/", listEmpaques);
router.get("/cliente/:id", getEmpaquesCliente);
router.get("/fecha/:id", getEmpaquesFecha);
// router.get('/fecha/fechaCliente/:id',getEmpaquesFechaCliente);

router.post("/", postinsertDatos);
// functions

// router.get('/fecha/fechaCliente/:id',getEmpaquesFechaCliente);
router.get("/fecha/fecha/:id", getResumenFacturas);

// funciones listas de empaque

function listEmpaques(req, res, next) {
  Controller.listEmpaques()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function getEmpaquesCliente(req, res, next) {
  Controller.getEmpaquesCliente(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function getEmpaquesFecha(req, res, next) {
  Controller.getEmpaquesFecha(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function getResumenFacturas(req, res, next) {
  console.log(`entro`);
  Controller.getResumenFacturas(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

async function postinsertDatos(req, res, next) {
  var datos = req.body;

  let datosJson = datos.DATOS.badge;

  let datosObject = JSON.parse(datosJson);
  let fecha = datos.FECHA.fecha;
  i = 0;
  datosObject.map(data => {
    Controller.insertDatos(data,fecha)
    //   .then(user => {
    //     response.success(req, res, user, 200);
    //   })
    //   .catch(next);
    
    
        // console.log(data)
       i++
        console.log(i)
  });
  // console.log(datos)
  //    var texto =JSON.parse(datos)
  //     console.log(texto[0])

  //    console.log(datos[0].children[9])
  //    console.log(datos[1].children[9])
  //    console.log(datos[2].children[9])
  //    console.log(datos[3].children[9])
  // for(let i=0;i<datos.leng;i++){

  // }
  // await console.log(datos)

  // console.log(PromiseRejectionEvent())
}

module.exports = router;
