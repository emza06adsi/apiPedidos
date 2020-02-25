const store =require('../../../sotore/gadolDbMysql');
const nanoId =require('nanoid');
const AUTH =require(`../auth`)
const TABLA =`user`;


module.exports= function (injectedStore) {

    let store=injectedStore;

    if(!store){
        store=require('../../../sotore/gadolDbMysql')
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA,id);
    }
    

   async function upsert(body) {
        const user={
         id:body.id,
         name: body.name,
         username:body.username
        };
        // if(body.id){
        //     user.id=body.id
        // }
        // else{
        //     user.id=nanoId();
        // }

        if (body.password || body.username){
            await AUTH.upsert(
                {
                    id:user.id,
                    username:user.username,
                    password:body.password,
                }
            )
            
        }
        

        return store.upsert(TABLA,user);
    }


    return{
        list,
        get,
        upsert
    };  
}
