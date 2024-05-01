require('dotenv').config({ path: '../.env' });

//sql configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

module.exports = config;