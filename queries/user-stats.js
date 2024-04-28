require('dotenv').config({ path: '../.env' });

const sql = require('mssql')

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

//get all customers
async function testConnection() {
    try {
        await sql.connect(config)
        const result = await sql.query(`SELECT TOP (5000) 
        [Id]
        ,[Email]
        ,[CreatedOnUtc]
        ,[LastLoginDateUtc]
        ,[LastActivityDateUtc]
        ,[FirstName]
        ,[LastName]
        ,[Company]
        ,[UserSubscriptionType]
        ,[City]
        ,[PostalCode]
        ,[Phone]
        ,[UserCreatedFromType]
        ,[IsFreemiumPlusMember]
        ,[IsFreemiumPlusComplyMember]
        ,[IsOfficeCommunityUser]
        ,[OfficeCommunityName]
        FROM [setup_pingodocs_dk_db_test].[dbo].[Customer] where UserSubscriptionType != '0'`)
        console.log(result.recordset.length)
        sql.close()
    } catch (err) {
        console.error('Failed to connect:', err)
    }
}




testConnection()
