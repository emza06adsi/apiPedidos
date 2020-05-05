const db ={
    'user':[
        {id:'1', name:'esteban'},
        {id:'2', name:'mario'},
        {id:'3', name:'marisol'},
    ], 
};
// ñistar datos
async function list(tabla) {
    return db[tabla]|| []
}
// traer datos
async function get(tabla,id) {
   let col = await list(tabla)
    return col.filter(item =>item.id=== id)[0] || null
}
// modificar datos
async function upsert(tabla, data) {
    if(!db[tabla]){
        db[tabla]=[];
    }
    db[tabla].push(data)
    console.log(db);
    console.log(db.id);
    // return data
}
// eliminar datos 
async  function remove(tabla,id) {
    return true
}

async function query(tabla,q) {
    let col = await list(tabla)
    let keys = Object.keys(q);
    let key=keys[0]

    return col.filter(item =>item[key]=== q[key])[0] || null
}

module.exports={
    list,
    get,
    upsert,
    remove,
    query,
};