const bcrypt = require(`bcrypt`);
const auth = require('../../../auth/index')
const TABLA ='auth'


module.exports= function (injectedStore) {

    let store=injectedStore;

    if(!store){
        store=require('../../../sotore/gadolDbMysql')
    }
    // async function login(username, password){
    //     const data = await store.query(TABLE, {username: username});
    //     return bcrypt.compare(password, data.password)
    //         .then(sonIguales => {
    //             if(sonIguales === true){
    //                 console.log('Este sería el cambio')
    //                 return auth.sign(JSON.parse(JSON.stringify(data)));
    //             }else{
    //                 thrownewError('Información inválida')
    //             }
    //         });
    // }
   async function login(username,password) {
    console.log('ingres2o')
    console.log(username+'??'+password)
        const data= await store.query(TABLA,{username:username})
        console.log(data.password)
        let retorna = bcrypt.compareSync(password, data.password)
        console.log(retorna)
            if(retorna==true){
                //  return auth.sign(data)
                 return auth.sign(JSON.parse(JSON.stringify(data)));
                }  
            else{
                throw new Error ('info123 invalida')
            }
        // bcrypt.compareSync(password, data.password) 
        // .then(igual=>{
        //         if(igual===true){
        //             console.log(bcrypt.compareSync(password, data.password))
        //             // generar token 
        //         return auth.sign(data)
        //         } else{
        //             throw new Error ('info123 invalida')
        //         };
        //     });
            
        // return data
    }

   async function upsert(data){
        const authData={
            id:data.id,
        }
        if(data.username){
            authData.username= data.username;
        }
        if(data.password){
            authData.password=await bcrypt.hash(data.password,5);
            
        }
    return store.upsert(TABLA,authData)
    }
    return{
        login,
        upsert,
        
    }
}
