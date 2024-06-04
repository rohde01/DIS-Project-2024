const sql = require('mssql');
const config = require('../db/config');

async function UpdateTeamUsers(teamUserData) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Prepare the SQL query with placeholders for each field
    let query = `
      UPDATE [dev_pingodocs_dk_db_prod].[dbo].[Customer]
      SET 
    `;

    let inputs = pool.request();

    if (teamUserData.UserSubscriptionType !== "") {
      query += `UserSubscriptionType = @UserSubscriptionType,`;
      inputs = inputs.input('UserSubscriptionType', sql.Int, teamUserData.UserSubscriptionType);
    }

    if (teamUserData.IsFreemiumPlusMember !== "") {
      query += `IsFreemiumPlusMember = @IsFreemiumPlusMember,`;
      inputs = inputs.input('IsFreemiumPlusMember', sql.Int, teamUserData.IsFreemiumPlusMember);
    }

    if (teamUserData.IsFreemiumPlusComplyMember !== "") {
      query += `IsFreemiumPlusComplyMember = @IsFreemiumPlusComplyMember,`;
      inputs = inputs.input('IsFreemiumPlusComplyMember', sql.Int, teamUserData.IsFreemiumPlusComplyMember);
    }

    if (teamUserData.IsOfficeCommunityUser !== "") {
      query += `IsOfficeCommunityUser = @IsOfficeCommunityUser,`;
      inputs = inputs.input('IsOfficeCommunityUser', sql.Int, teamUserData.IsOfficeCommunityUser);
    }

    if (teamUserData.OfficeCommunityName !== "") {
      query += `OfficeCommunityName = @OfficeCommunityName,`;
      inputs = inputs.input('OfficeCommunityName', sql.NVarChar, teamUserData.OfficeCommunityName);
    }

    // Remove the last comma and add the rest of the query
    query = query.slice(0, -1) + `
      FROM [dev_pingodocs_dk_db_prod].[dbo].[Customer]
      INNER JOIN [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser]
      ON [dev_pingodocs_dk_db_prod].[dbo].[Customer].Id = [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser].CustomerId
      WHERE [dev_pingodocs_dk_db_prod].[dbo].[1TeamUser].TeamId = @SpecificTeamId;
    `;

    inputs = inputs.input('SpecificTeamId', sql.Int, teamUserData.SpecificTeamId);

    // Execute the query with inputs
    const result = await inputs.query(query);
    
    // Return a success message with the number of users updated
    return { message: `${result.rowsAffected[0]} users updated successfully!`};
  } catch (error) {
    console.error('Error updating users:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

module.exports = UpdateTeamUsers;