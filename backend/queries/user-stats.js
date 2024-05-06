const sql = require('mssql');
const config = require('../db/config');

async function getCustomerData(filterParams) {
  try {
    await sql.connect(config);
    let query = `SELECT TOP (5000) 
      [Id]
      ,[CreatedOnUtc]
      ,[UserSubscriptionType]
      ,[UserCreatedFromType]
      FROM [setup_pingodocs_dk_db_test].[dbo].[Customer]`;

    // Filter
    if (filterParams) {
      const { CreatedOnUtc, LastLoginDateUtc, LastActivityDateUtc, Company, UserSubscriptionType, UserCreatedFromType } = filterParams;
      query += ` WHERE 1=1`;
      if (CreatedOnUtc) query += ` AND [CreatedOnUtc] = '${CreatedOnUtc}'`;
      if (LastLoginDateUtc) query += ` AND [LastLoginDateUtc] = '${LastLoginDateUtc}'`;
      if (LastActivityDateUtc) query += ` AND [LastActivityDateUtc] = '${LastActivityDateUtc}'`;
      if (Company) query += ` AND [Company] = '${Company}'`;
      if (UserSubscriptionType) query += ` AND [UserSubscriptionType] = '${UserSubscriptionType}'`;
      if (UserCreatedFromType) query += ` AND [UserCreatedFromType] = '${UserCreatedFromType}'`;
    }

    const result = await sql.query(query);
    sql.close();
    return result.recordset;
  } catch (err) {
    console.error('Failed to connect:', err);
    throw err;
  }
}

module.exports = getCustomerData;
