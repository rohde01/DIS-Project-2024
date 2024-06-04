const sql = require('mssql');
const config = require('../db/config');

async function UpdateTeamUsers(teamUserData) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Prepare the SQL query with placeholders for each field
    const query = `
      UPDATE [dev_pingodocs_dk_db_prod].[dbo].[Customer]
      SET 
        UserSubscriptionType = @UserSubscriptionType,
        IsFreemiumPlusMember = @IsFreemiumPlusMember,
        IsFreemiumPlusComplyMember = @IsFreemiumPlusComplyMember,
        IsOfficeCommunityUser = @IsOfficeCommunityUser,
        OfficeCommunityName = @OfficeCommunityName
      FROM [dev_pingodocs_dk_db_prod].[dbo].[Customer]
      INNER JOIN [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser]
      ON [dev_pingodocs_dk_db_prod].[dbo].[Customer].Id = [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser].CustomerId
      WHERE [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser].TeamId = @SpecificTeamId;
    `;

    // Execute the query with inputs
    const result = await pool.request()
      .input('UserSubscriptionType', sql.Int, teamUserData.UserSubscriptionType)
      .input('IsFreemiumPlusMember', sql.Int, teamUserData.IsFreemiumPlusMember)
      .input('IsFreemiumPlusComplyMember', sql.Int, teamUserData.IsFreemiumPlusComplyMember)
      .input('IsOfficeCommunityUser', sql.Int, teamUserData.IsOfficeCommunityUser)
      .input('OfficeCommunityName', sql.NVarChar, teamUserData.OfficeCommunityName)
      .input('SpecificTeamId', sql.Int, teamUserData.SpecificTeamId)
      .query(query);
    
    // Return a success message with the number of users updated
    return { message: `${result.rowsAffected[0]} users updated successfully!`};
  } catch (error) {
    console.error('Error updating users:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

module.exports = UpdateTeamUsers;
