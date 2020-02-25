module.exports={
    api:{
        port:process.env.API_PORT || 3000,
    },
    jwt:{
        secret:process.env.JWT_SECRET || 'notasecret',
    },
    mysql:{
<<<<<<< HEAD
        host : process.env.MYSQL_HOST ||`127.0.0.1`,
        user : process.env.MYSQL_USER ||`root`,
        password : process.env.MYSQL_PASS ||`toor`,
        database : process.env.DB ||`gd_database`,
=======
        host:process.env.MYSQL_HOST || `127.0.0.1`,
        user:process.env.MYSQL_USER || `root`,
        password:process.env.MYSQL_PASS || `toor`,
        database:process.env.MYSQL_DB || `gd_database`,
>>>>>>> prueba
    }
}