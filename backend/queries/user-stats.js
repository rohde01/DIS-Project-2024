const sql = require('mssql');
const config = require('../db/config');

async function getCustomerData(filterParams) {
  try {
    await sql.connect(config);
    let query = `SELECT 
      [Id]
      ,[CreatedOnUtc]
      FROM [app_pingodocs_dk_db_prod].[dbo].[Customer]`;

      //setup: setup_pingodocs_dk_db_test
      //prod: app_pingodocs_dk_db_prod

    // Filter
    if (filterParams) {
      const { CreatedOnUtc, LastLoginDateUtc, LastActivityDateUtc, Company, UserSubscriptionType, UserCreatedFromType } = filterParams;
      query += ` WHERE 1=1`;
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
