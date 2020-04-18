const express = require ('express');
const bodyParser= require(`body-parser`);
const config=require('../config.js');
// const formidableMiddleware = require('express-formidable');
// const user =require(`../components/user/network`);

const user =require('./components/user/network');
const auth =require('./components/auth/network');
const tienda =require('./components/productos/network');
const pedidos=require('./components/pedidos/nertwork');
const errors = require (`../network/errors`);

const app= express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');

    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();                                                                 

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
        // res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use(bodyParser.json());
// app.use(formidableMiddleware({
//     encoding: 'utf-8',
//     uploadDir: 'productos/public',
//     multiples: true
// }));
//router

app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/tienda',tienda);
app.use('/api/pedidos',pedidos);
app.use(errors);
app.listen( config.api.port,()=>{
    console.log('Api escuchando en el puerto',config.api.port);
})
// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });
// res.header('Access-Control-Allow-Origin', '*');

//     // authorized headers for preflight requests
//     // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();

// app.listen(3000)