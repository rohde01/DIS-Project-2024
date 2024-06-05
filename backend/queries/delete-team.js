const sql = require('mssql');
const config = require('../db/config');

async function DeleteTeams(TeamIdList) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Check if the TeamIdList array is empty
    if (!Array.isArray(TeamIdList) || TeamIdList.length === 0) {
      throw new Error('TeamIdList is empty or not an array');
    }

    // Prepare the SQL query with placeholders for each field
    let query = `
      DELETE FROM [dev_pingodocs_dk_db_prod].[dbo].[1Team]
      WHERE Id IN (${TeamIdList.map((_, i) => `@TeamId${i}`).join(', ')});`;

    let inputs = pool.request();

    // Add each team ID as a separate parameter
    TeamIdList.forEach((teamId, i) => {
      inputs.input(`TeamId${i}`, sql.Int, teamId);
    });

    // Execute the query with inputs
    const result = await inputs.query(query);
    
    // Return a success message with the number of teams deleted
    return { message: `${result.rowsAffected[0]} teams deleted successfully!`};
  } catch (error) {
    console.error('Error deleting teams:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

module.exports = DeleteTeams;
