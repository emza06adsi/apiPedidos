// const store = require('../../../store/gadolDbMysql');
// const ctrl = require('./controller');

// module.exports = ctrl(store);

const store= require(`../../../sotore/gadolDbMysql`)
const ctrl=require('./controller');


module.exports=ctrl(store); 