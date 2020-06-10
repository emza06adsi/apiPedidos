const express = require ('express');
const response=require(`../../../network/response`)
const Controler = require('./index');
const router = express.Router();

router.get('/',listarDomiservicio)
router.post('/',ingresarDomiservicio)

function listarDomiservicio(req,res,next) {
    Controler.listarDomiservicio()
    .then((lista)=>{
        response.success(req,res,lista,200)
    })
    .catch(next);
}
function ingresarDomiservicio(req,res,next) {
    Controler.ingresarDomiservicio(req.body)
        .then((data)=>{
            response.success(req,res,data,200)
        })
        .catch(next)
    }
    
module.exports =router;