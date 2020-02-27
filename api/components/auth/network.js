const express =require('express');
const response=require(`../../../network/response`)
const Controller =require(`./index`);
const router=express.Router()

router.post('/login',function (req,res) {
    // console.log('los datos ingresan')
    console.log(req.body.username+' ?? '+req.body.password)
     Controller.login(req.body.username,req.body.password)
    .then(token=>{
        response.success(req,res,token,200);
    })
    .catch(e=>{
        response.error(req,res,'info no valida',400)
    })
    })



module.exports=router