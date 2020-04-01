const store = require('../../../sotore/gadolDbMysql');
// const nanoId = require('nanoid');
const AUTH = require(`../auth`)
const TABLA = `usuarios`;


module.exports = function (injectedStore) {

    // let store=injectedStore;

    if (!store) {
        store = require('../../../sotore/gadolDbMysql')
    }

    function list() {
        console.log("usurios")
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(id);
    }


    async function upsert(body) {
        const user = {
            us_id: body.id,
            us_nombre: body.nombre,
            us_contrasena: body.contrasena,
            us_correo: body.correo,
            us_telefono: body.telefono,
            us_direccion: body.direccion || "",
            us_tipo_usuario: "cliente",
        };


        if (body.contrasena || body.nombre) {
            return    await AUTH.upsert(user
                // {
                //     "us_id": user.us_id,
                //     "us_nombre": user.us_nombre,
                //     "us_contrasena": user.us_contrasena
                // }
            )
        }


        //  user;
    }


    return {
        list,
        get,
        upsert
    };
}
