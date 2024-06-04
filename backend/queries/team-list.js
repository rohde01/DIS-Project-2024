const sql = require('mssql');
const config = require('../db/config');


async function getTeamList() {
    try {
      await sql.connect(config);
      let query = `SELECT 
        [Id]
        ,[Name]
        FROM [dev_pingodocs_dk_db_prod].[dbo].[1Team]`;
    
      const result = await sql.query(query);
      sql.close();
      return result.recordset;
    } catch (err) {
      console.error('Failed to connect:', err);
      throw err;
    }
}
module.exports = getTeamList;