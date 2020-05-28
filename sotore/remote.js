const recuest = require('request');

function createRemoteDB(host,port) {
    const URL = 'http://'+host+':'+ port;

 function list(table) {
  return   req('GET',table)
 }   
 function req(method, table,data) {
     let url=URL + '/'+table;
     body='';
     return new Promise((resolve,reject)=>{
      recuest({
          
        method,
        headers: {
            'content-type': 'application/json'
        },
        url,
        body,
      }, (err,req,body)=>{
          if(err){
              console.log('error con la db remota',err);
              return reject(err.messaje);
          }
          const resp = JSON.parse(body);
          return resolve(resp.body)
      }) 
     })
 }
 function get(table,id) {

 }
//  function upsert(table,data) {}
//  function query(table,query,join) {}
return {
    list,
}

}


module.exports = createRemoteDB