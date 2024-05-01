const sql = require('mssql');
const config = require('../db/config');

async function getCustomerData() {
  try {
    await sql.connect(config);
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
    ,[UserCreatedFromType]
    FROM [setup_pingodocs_dk_db_test].[dbo].[Customer] where UserSubscriptionType != '0'`);
    sql.close();
    return result.recordset;
  } catch (err) {
    console.error('Failed to connect:', err);
    throw err;
  }
}

module.exports = getCustomerData;
