const express = require ('express');
const bodyParser= require(`body-parser`);
const config=require('../config.js');
// const user =require(`../components/user/network`);
const user =require('./components/user/network');
const auth =require('./components/auth/network');
const listasEmpaque =require('./components/listasEmpaque/network');
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

//router

app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/listasEmpaque',listasEmpaque);
app.use(errors);
app.listen(process.env.API_PORT || 4567,()=>{
    console.log('Api escuchando en el puerto',config.api.port);
})
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