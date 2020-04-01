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
    console.log(username+" "+password)
    
        const data= await store.query(TABLA,username)
            console.log(data[0].auth_password)
        let retorna = bcrypt.compareSync(password,data[0].auth_password)

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
   console.log(data.us_contrasena)
        // const authData={
        //     id:"data.id",
        // }
        // if(data.username){
        //     authData.username= data.username;
        // }
        // if(data.contrasena){
            data.us_contrasena=await bcrypt.hash(data.us_contrasena,5);
            
        // }
        console.log(data.us_contrasena)
    // return store.upsert(TABLA,authData)
    return store.insert(data)    
}
    return{
        login,
        upsert,
        
    }
}
