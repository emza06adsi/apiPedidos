// const TABLA = "cliente";
let fs = require('fs')
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../sotore/gadolDbMysql");
  }

  function listarDomiservicio() {
    return store.listarDomiservicio();
  }

  function ingresarDomiservicio(data) {
    // console.log(data)
    return store.ingresarDomiservicio(data);
  }
  
  return {
    listarDomiservicio,
    ingresarDomiservicio,
  };
};
