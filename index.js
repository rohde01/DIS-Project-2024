require('dotenv').config();

const sql = require('mssql')

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

async function testConnection() {
    try {
        await sql.connect(config)
        const result = await sql.query('SELECT 1 as number')
        console.log(result)
        sql.close()
    } catch (err) {
        console.error('Failed to connect:', err)
    }
}

testConnection()
