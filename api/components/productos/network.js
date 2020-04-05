const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get("/", productos);
router.get("/:id", productosid);
router.post("/", ingresarProductos)
router.put("/",agregarProductos)
router.put("/venta",venderProductos)
// router.get("/cliente/:id", getEmpaquesCliente);
// router.get("/fecha/:id", getEmp      aquesFecha);
// router.get('/fecha/fechaCliente/:id',getEmpaquesFechaCliente);

// router.post("/", postinsertDatos);
// functions

// router.get('/fecha/fechaCliente/:id',getEmpaquesFechaCliente);
// router.get("/fecha/ico/:id", getDataIco);
// router.get("/fecha/fecha/:id", getResumenFacturas);

// funciones listas de empaque

function productos(req, res, next) {
  // res.send(`${45}`)
  Controller.listarProductos()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function productosid(req, res, next) {
  // res.send(`${45}`)
  Controller.productosid(req.params.id)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function ingresarProductos(req, res, next) {
  // res.send(req.body)
  Controller.ingresarProductos(req.body)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function agregarProductos(req, res, next) {
  // res.send(req.body)
  Controller.agregarProductos(req.body)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function venderProductos(req, res, next) {
  // res.send(req.body)
  Controller.venderProductos(req.body)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

// function getEmpaquesFecha(req, res, next) {
//   Controller.getEmpaquesFecha(req.params.id)
//     .then(user => {
//       response.success(req, res, user, 200);
//     })
//     .catch(next);
// }

// function getResumenFacturas(req, res, next) {
//   console.log(`entro`);
//   Controller.getResumenFacturas(req.params.id)
//     .then(user => {
//       response.success(req, res, user, 200);
//     })
//     .catch(next);
// }


// function getDataIco(req, res, next) {
//   console.log(`entro`);
//   Controller.getDataIco(req.params.id)
//     .then(user => {
//       response.success(req, res, user, 200);
//     })
//     .catch(next);
// }

// async function postinsertDatos(req, res, next) {
//   var datos = req.body;

//   let datosJson = datos.DATOS.badge;

//   let datosObject = JSON.parse(datosJson);
//   let fecha = datos.FECHA.fecha;
//   i = 0;
//   // datosObject.map(data => {
//     Controller.insertDatos(datosObject,fecha)
//       .then(user => {
//         response.success(req, res, user, 200);
//       })
//       .catch(next);
    
    
//         // console.log(data)
//        i++
//         console.log(i)
//   // });
//   // console.log(datos)
//   //    var texto =JSON.parse(datos)
//   //     console.log(texto[0])

//   //    console.log(datos[0].children[9])
//   //    console.log(datos[1].children[9])
//   //    console.log(datos[2].children[9])
//   //    console.log(datos[3].children[9])
//   // for(let i=0;i<datos.leng;i++){

//   // }
//   // await console.log(datos)

//   // console.log(PromiseRejectionEvent())
// }

module.exports = router;
