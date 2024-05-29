const sql = require('mssql');
const config = require('../db/config');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


function hashPassword(password) {
  return crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
}

async function CreateCustomer(userData) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Convert string values to integers
    const isFreemiumPlusMember = parseInt(userData.IsFreemiumPlusMember, 10);
    const isFreemiumPlusComplyMember = parseInt(userData.IsFreemiumPlusComplyMember, 10);
    const isOfficeCommunityMember = parseInt(userData.isOfficeCommunityMember, 10);
    const UserSubscriptionType = parseInt(userData.UserSubscriptionType, 10);

    // Log input data
    console.log('Input data:', {
      CustomerGuid: uuidv4(),
      Username: userData.email,
      Email: userData.email,
      Password: userData.password,
      PasswordFormatId: 1,
      Active: 1,
      Deleted: 0,
      IsSystemAccount: 0,
      CreatedOnUtc: new Date().toISOString(),
      LastActivityDateUtc: new Date().toISOString(),
      ConsentToGdpr: 1,
      HasActiveDigitalSignatureWithSubscription: 1,
      DigitalSignatureWithSubscriptionMaxMonthly: 1,
      FremiumUserMaxMonthly: 1,
      UserSubscriptionType: userData.subscriptionType,
      AllowUploadDocuments: 0,
      UserRegisteredFromType: 0,
      Position: userData.position || null,
      HourWage: userData.wage || null,
      MailWorkflowAproved: 1,
      MailMustReview: 1,
      MailReviewAproved: 1,
      MailWorkflowComment: 1,
      MailDocumentInvitation: 1,
      MailWorkflowShared: 1,
      MailBusinessRegKycDk: 1,
      EarlyDownloadType: 0,
      UserType: 0,
      HasTasksEnabled: 0,
      UserIntegrationType: 0,
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Company: userData.company,
      Address: userData.address || null,
      City: userData.city || null,
      PostalCode: userData.postalCode || null,
      UserCreatedFromType: 0,
      IsFreemiumPlusMember: isFreemiumPlusMember,
      IsFreemiumPlusComplyMember: isFreemiumPlusComplyMember,
      MailWorkflowAprovedThatWasStartetFromExternalSolution: 0,
      SsoIncludeFilesInCallBack: 0,
      SingleSignOnState: 0,
      MailAddAttachments: 1,
      MailThatWasStartetFromExternalSolutionAddAttachments: 0,
      IsOfficeCommunityUser: isOfficeCommunityMember || 0,
      OfficeCommunityName: userData.officeCommunityName || null
    });

    // Prepare the SQL query with placeholders for each field
    const query = `
      INSERT INTO [dev_pingodocs_dk_db_prod].[dbo].[Customer] (
        [CustomerGuid],
        [Username],
        [Email],
        [Password],
        [PasswordFormatId],
        [Active],
        [Deleted],
        [IsSystemAccount],
        [CreatedOnUtc],
        [LastActivityDateUtc],
        [ConsentToGdpr],
        [HasActiveDigitalSignatureWithSubscription],
        [DigitalSignatureWithSubscriptionMaxMonthly],
        [FremiumUserMaxMonthly],
        [UserSubscriptionType],
        [AllowUploadDocuments],
        [UserRegisteredFromType],
        [Position],
        [HourWage],
        [MailWorkflowAproved],
        [MailMustReview],
        [MailReviewAproved],
        [MailWorkflowComment],
        [MailDocumentInvitation],
        [MailWorkflowShared],
        [MailBusinessRegKycDk],
        [EarlyDownloadType],
        [UserType],
        [HasTasksEnabled],
        [UserIntegrationType],
        [FirstName],
        [LastName],
        [Company],
        [Address],
        [City],
        [PostalCode],
        [UserCreatedFromType],
        [IsFreemiumPlusMember],
        [IsFreemiumPlusComplyMember],
        [MailWorkflowAprovedThatWasStartetFromExternalSolution],
        [SsoIncludeFilesInCallBack],
        [SingleSignOnState],
        [MailAddAttachments],
        [MailThatWasStartetFromExternalSolutionAddAttachments],
        [IsOfficeCommunityUser],
        [OfficeCommunityName]
      ) VALUES (
        @CustomerGuid,
        @Username,
        @Email,
        @Password,
        @PasswordFormatId,
        @Active,
        @Deleted,
        @IsSystemAccount,
        @CreatedOnUtc,
        @LastActivityDateUtc,
        @ConsentToGdpr,
        @HasActiveDigitalSignatureWithSubscription,
        @DigitalSignatureWithSubscriptionMaxMonthly,
        @FremiumUserMaxMonthly,
        @UserSubscriptionType,
        @AllowUploadDocuments,
        @UserRegisteredFromType,
        @Position,
        @HourWage,
        @MailWorkflowAproved,
        @MailMustReview,
        @MailReviewAproved,
        @MailWorkflowComment,
        @MailDocumentInvitation,
        @MailWorkflowShared,
        @MailBusinessRegKycDk,
        @EarlyDownloadType,
        @UserType,
        @HasTasksEnabled,
        @UserIntegrationType,
        @FirstName,
        @LastName,
        @Company,
        @Address,
        @City,
        @PostalCode,
        @UserCreatedFromType,
        @IsFreemiumPlusMember,
        @IsFreemiumPlusComplyMember,
        @MailWorkflowAprovedThatWasStartetFromExternalSolution,
        @SsoIncludeFilesInCallBack,
        @SingleSignOnState,
        @MailAddAttachments,
        @MailThatWasStartetFromExternalSolutionAddAttachments,
        @IsOfficeCommunityUser,
        @OfficeCommunityName
      )
    `;
    
    // Log the query
    console.log('SQL Query:', query);

    // Execute the query with inputs
    await pool.request()
      .input('CustomerGuid', sql.UniqueIdentifier, uuidv4())
      .input('Username', sql.NVarChar(1000), userData.email)
      .input('Email', sql.NVarChar(1000), userData.email)
      .input('Password', sql.NVarChar(sql.MAX), hashPassword(userData.password))
      .input('PasswordFormatId', sql.Int, 1)
      .input('Active', sql.Bit, 1)
      .input('Deleted', sql.Bit, 0) 
      .input('IsSystemAccount', sql.Bit, 0)
      .input('CreatedOnUtc', sql.DateTime, new Date().toISOString()) 
      .input('LastActivityDateUtc', sql.DateTime, new Date().toISOString())
      .input('ConsentToGdpr', sql.Bit, 1)
      .input('HasActiveDigitalSignatureWithSubscription', sql.Bit, 1)
      .input('DigitalSignatureWithSubscriptionMaxMonthly', sql.Int, 1)
      .input('FremiumUserMaxMonthly', sql.Int, 1)
      .input('UserSubscriptionType', sql.Int, userData.subscriptionType)
      .input('AllowUploadDocuments', sql.Bit, 0)
      .input('UserRegisteredFromType', sql.Int, 0) 
      .input('Position', sql.NVarChar(sql.MAX), userData.position || null)
      .input('HourWage', sql.NVarChar(sql.MAX), userData.wage || null)
      .input('MailWorkflowAproved', sql.Bit, 1)
      .input('MailMustReview', sql.Bit, 1) 
      .input('MailReviewAproved', sql.Bit, 1) 
      .input('MailWorkflowComment', sql.Bit, 1) 
      .input('MailDocumentInvitation', sql.Bit, 1) 
      .input('MailWorkflowShared', sql.Bit, 1) 
      .input('MailBusinessRegKycDk', sql.Bit, 1) 
      .input('EarlyDownloadType', sql.Int, 0)
      .input('UserType', sql.Int, 0)
      .input('HasTasksEnabled', sql.Bit, 0)
      .input('UserIntegrationType', sql.Int, 0)
      .input('FirstName', sql.NVarChar(sql.MAX), userData.firstName)
      .input('LastName', sql.NVarChar(sql.MAX), userData.lastName)
      .input('Company', sql.NVarChar(sql.MAX), userData.company)
      .input('Address', sql.NVarChar(sql.MAX), userData.address || null)
      .input('City', sql.NVarChar(sql.MAX), userData.city || null)
      .input('PostalCode', sql.NVarChar(sql.MAX), userData.postalCode || null)
      .input('UserCreatedFromType', sql.Int, 0)
      .input('IsFreemiumPlusMember', sql.Bit, isFreemiumPlusMember)
      .input('IsFreemiumPlusComplyMember', sql.Bit, isFreemiumPlusComplyMember)
      .input('MailWorkflowAprovedThatWasStartetFromExternalSolution', sql.Bit, 0)
      .input('SsoIncludeFilesInCallBack', sql.Bit, 0)
      .input('SingleSignOnState', sql.Bit, 0) 
      .input('MailAddAttachments', sql.Bit, 1)
      .input('MailThatWasStartetFromExternalSolutionAddAttachments', sql.Bit, 0) // Assuming default value
      .input('IsOfficeCommunityUser', sql.Bit, isOfficeCommunityMember || 0)
      .input('OfficeCommunityName', sql.NVarChar(sql.MAX), userData.officeCommunityName || null)
      .query(query);
    
    // Return a success message
    return { message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}

module.exports = CreateCustomer;
