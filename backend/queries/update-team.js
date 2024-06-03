const sql = require('mssql');
const config = require('../db/config');

async function UpdateTeam(teamData) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Prepare the SQL query with placeholders for each field
    const query = `
      UPDATE [dev_pingodocs_dk_db_prod].[dbo].[1Team] (
        ,[Name]
        ,[TeamIdentifier]
        ,[SubName]
        ,[BrandColorInHex]
        ,[IsMasterTeam]
        ,[IsTeamPortalStylingEnabled]
        ,[DigitalSignatureWithSubscriptionMaxMonthly]
        ,[LogoUrl]
      ) 
      VALUES (
        @Name,
        @TeamIdentifier,
        @SubName,
        @BrandColorInHex,
        @IsMasterTeam,
        @IsTeamPortalStylingEnabled,
        @DigitalSignatureWithSubscriptionMaxMonthly,
        @LogoUrl
      );
    `;
    
    // Execute the query with inputs
    const result = await pool.request()
      .input('Name', sql.NVarChar(sql.MAX), teamData.Name)
      .input('TeamIdentifier', sql.NVarChar(sql.MAX), teamData.TeamIdentifier)
      .input('SubName', sql.NVarChar(sql.MAX), teamData.SubName)
      .input('BrandColorInHex', sql.NVarChar(sql.MAX), teamData.BrandColorInHex)
      .input('IsMasterTeam', sql.Bit, teamData.IsMasterTeam)
      .input('IsTeamPortalStylingEnabled', sql.Bit, teamData.IsTeamPortalStylingEnabled)
      .input('DigitalSignatureWithSubscriptionMaxMonthly', sql.Int, teamData.DigitalSignatureWithSubscriptionMaxMonthly)
      .input('LogoUrl', sql.NVarChar(sql.MAX), teamData.LogoUrl)
      .query(query);
    
    // Return a success message
    return { message: 'Team updated with user inputs'};
  } catch (error) {
    console.error('Error updating team:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

module.exports = UpdateTeam;
