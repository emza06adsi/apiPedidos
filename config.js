module.exports={
    api:{
        port:process.env.PORT || 3001,
    },
    jwt:{
        // secret:process.env.JWT_SECRET || 'notasecret',
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql:{
        host:process.env.MYSQL_HOST || `bpqq1lclzymnzyu5dbdf-mysql.services.clever-cloud.com`,
        user:process.env.MYSQL_USER || `uojfc3y3b2vqa0sq`,
        password:process.env.MYSQL_PASS || `fvTHJcMNXsDsmksbJMBK`,
        database:process.env.MYSQL_DB || `bpqq1lclzymnzyu5dbdf`,
    },
    mysqlService:{
        host:process.env.MYSQL_SRV_HOST || `localhost`,
        port:process.env.MYSQL_SRV_PORT || 3000,
    }
}

// mysql:{
//     host:process.env.MYSQL_HOST || `remotemysql.com`,
//     user:process.env.MYSQL_USER || `Q6kM2OVWiB`,
//     password:process.env.MYSQL_PASS || `u0DUiHktka`,
//     database:process.env.MYSQL_DB || `Q6kM2OVWiB`,
// },