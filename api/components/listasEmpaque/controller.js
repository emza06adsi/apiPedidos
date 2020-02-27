const TABLA = 'cliente';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store=require('../../../sotore/gadolDbMysql')
    }

    function list() {
        return store.list(TABLA);
    }

    return {
        list,
    };
}

// const store =require('../../../sotore/gadolDbMysql');

// const TABLA =`cliente`;
// module.exports= function (injectedStore) {

//     let store=injectedStore;

//     if(!store){
//         store=require('../../../sotore/gadolDbMysql')
//     }


//     function list() {
//     console.log("aca toy")
//         store.list(TABLA)
//     }

//     return{
//         list,
//     }
// }
