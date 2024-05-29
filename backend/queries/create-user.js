const sql = require('mssql');
const config = require('../db/config');

async function CreateCustomer(userData) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Prepare the SQL query with placeholders for each field
    const query = `
      INSERT INTO [app_pingodocs_dk_db_prod].[dbo].[Customer] (
        [CustomerGuid],
        [Username],
        [Email],
        [Password],
        [PasswordFormatId],
        [PasswordSalt],
        [Active],
        [CreatedOnUtc],
        [ConsentToGdpr],
        [HasActiveDigitalSignatureWithSubscription],
        [DigitalSignatureWithSubscriptionMaxMonthly],
        [FremiumUserMaxMonthly],
        [UserSubscriptionType],
        [AllowUploadDocuments],
        [UserRegisteredFromType],
        [Position],
        [HourWage],
        [SecretaryName],
        [SecretaryEmail],
        [SecretaryPhoneNumber],
        [MailWorkflowAproved],
        [MailMustReview],
        [MailReviewAproved],
        [MailWorkflowComment],
        [MailDocumentInvitation],
        [MailWorkflowShared],
        [MailBusinessRegKycDk],
        [EarlyDownloadType],
        [CompanyAccessFilter],
        [UserType],
        [HasTasksEnabled],
        [UserCode],
        [UserIntegrationType],
        [FirstName],
        [LastName],
        [Company],
        [Address],
        [City],
        [PostalCode],
        [Phone],
        [LanguageId],
        [VatNumber],
        [PasswordRecoveryToken],
        [UserCreatedFromType],
        [IsFreemiumPlusMember],
        [TwoFactorState],
        [TwoFactorFirstReminderDate],
        [TwoFactorSecondReminderDate],
        [TwoFactorFirstReminderShownDate],
        [TwoFactorSecondReminderShownDate],
        [TwoFactorLatestValidationDate],
        [TwoFactorSecretEncrypted],
        [IsFreemiumPlusComplyMember],
        [MailWorkflowAprovedThatWasStartetFromExternalSolution],
        [SsoCallBackAppName],
        [SsoCallbackSecret],
        [SsoCallbackUrl],
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
        @PasswordSalt,
        @Active,
        @CreatedOnUtc,
        @ConsentToGdpr,
        @HasActiveDigitalSignatureWithSubscription,
        @DigitalSignatureWithSubscriptionMaxMonthly,
        @FremiumUserMaxMonthly,
        @UserSubscriptionType,
        @AllowUploadDocuments,
        @UserRegisteredFromType,
        @Position,
        @HourWage,
        @SecretaryName,
        @SecretaryEmail,
        @SecretaryPhoneNumber,
        @MailWorkflowAproved,
        @MailMustReview,
        @MailReviewAproved,
        @MailWorkflowComment,
        @MailDocumentInvitation,
        @MailWorkflowShared,
        @MailBusinessRegKycDk,
        @EarlyDownloadType,
        @CompanyAccessFilter,
        @UserType,
        @HasTasksEnabled,
        @UserCode,
        @UserIntegrationType,
        @FirstName,
        @LastName,
        @Company,
        @Address,
        @City,
        @PostalCode,
        @Phone,
        @LanguageId,
        @VatNumber,
        @PasswordRecoveryToken,
        @UserCreatedFromType,
        @IsFreemiumPlusMember,
        @TwoFactorState,
        @TwoFactorFirstReminderDate,
        @TwoFactorSecondReminderDate,
        @TwoFactorFirstReminderShownDate,
        @TwoFactorSecondReminderShownDate,
        @TwoFactorLatestValidationDate,
        @TwoFactorSecretEncrypted,
        @IsFreemiumPlusComplyMember,
        @MailWorkflowAprovedThatWasStartetFromExternalSolution,
        @SsoCallBackAppName,
        @SsoCallbackSecret,
        @SsoCallbackUrl,
        @SsoIncludeFilesInCallBack,
        @SingleSignOnState,
        @MailAddAttachments,
        @MailThatWasStartetFromExternalSolutionAddAttachments,
        @IsOfficeCommunityUser,
        @OfficeCommunityName
      )
    `;

    // Execute the query with inputs
    await pool.request()
      .input('CustomerGuid', sql.UniqueIdentifier, userData.CustomerGuid) // i need to generate one
      .input('Username', sql.NVarChar, userData.email) // Add correct data here
      .input('Email', sql.NVarChar, userData.email)
      .input('Password', sql.NVarChar, userData.password)
      .input('PasswordFormatId', sql.Int, 1)
      //.input('PasswordSalt', sql.NVarChar, userData.PasswordSalt) //figure out
      .input('Active', sql.Bit, 1) 
      //.input('CreatedOnUtc', sql.DateTime, userData.CreatedOnUtc) // make a timpstamp utc
      .input('ConsentToGdpr', sql.Bit, 0) 
      .input('HasActiveDigitalSignatureWithSubscription', sql.Bit, 0)
      .input('DigitalSignatureWithSubscriptionMaxMonthly', sql.Int, 1) 
      //.input('FremiumUserMaxMonthly', sql.Int, userData.FremiumUserMaxMonthly) // Add correct data here
      .input('UserSubscriptionType', sql.Int, userData.subscriptionType)
      //.input('UserRegisteredFromType', sql.NVarChar, userData.UserRegisteredFromType)
      .input('Position', sql.NVarChar, userData.position)
      .input('HourWage', sql.Decimal, userData.wage)
      .input('UserType', sql.NVarChar, 'standard')
      .input('FirstName', sql.NVarChar, userData.firstName)
      .input('LastName', sql.NVarChar, userData.lastName)
      .input('Company', sql.NVarChar, userData.company)
      .input('Address', sql.NVarChar, userData.address)
      .input('City', sql.NVarChar, userData.city) 
      .input('PostalCode', sql.NVarChar, userData.postalCode) 
      .input('UserCreatedFromType', sql.NVarChar, 1)
      .input('IsFreemiumPlusMember', sql.Bit, userData.IsFreemiumPlusMember) 
      .input('IsFreemiumPlusComplyMember', sql.Bit, userData.IsFreemiumPlusComplyMember) 
      .input('IsOfficeCommunityUser', sql.Bit, userData.isOfficeCommunityMember) 
      .input('OfficeCommunityName', sql.NVarChar, userData.officeCommunityName) 
      .query(query);

    // Return a success message
    return { message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = CreateCustomer;
