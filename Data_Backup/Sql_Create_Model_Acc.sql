drop TABLE [dbo].[A_ACCOUNT]
go
drop TABLE [dbo].[A_ACCOUNT_YEAR]
go

drop TABLE [dbo].[A_JOURNAL_HEADER]
go

drop TABLE [dbo].[A_JOURNAL_DETAIL]
go

drop TABLE [dbo].[E_D_G_TypeTempExcel]
go

drop TABLE [dbo].[E_D_G_CreateTempExcelACC]
go
 
drop TABLE [dbo].[E_G_LogUploadExcel]
go
 
drop TABLE [dbo].[A_TR_ReceiptNote]
go
 
drop TABLE [dbo].[D_G_FamilyZone]
go
 
drop TABLE [dbo].[D_G_Zones]
go
 
drop TABLE [dbo].[G_Employees]
go
 
drop TABLE [dbo].[G_TypeEmployees]
go







CREATE TABLE [dbo].[A_ACCOUNT](
	[COMP_CODE] [int] NOT NULL,
	[ACC_CODE] [nvarchar](25) NOT NULL,
	[ACC_DESCA] [nvarchar](max) NULL,
	[ACC_DESCL] [nvarchar](max) NULL,
	[ACC_GROUP] [int] NULL,
	[ACC_TYPE] [int] NULL,
	[ACC_LEVEL] [int] NULL,
	[ACC_ACTIVE] [bit] NULL,
	[PARENT_ACC] [nvarchar](20) NULL,
	[DETAIL] [bit] NULL,
	[CREATED_BY] [nvarchar](20) NULL,
	[CREATED_AT] [smalldatetime] NULL,
	[UPDATED_BY] [nvarchar](20) NULL,
	[LAST_UPDATE] [smalldatetime] NULL,
	[CCDT_TYPE] [nvarchar](10) NULL,
	[CUR_CODE] [nvarchar](3) NULL,
	[FinancialAmount] [numeric](18, 2) NULL,
	[FinancialDistAmount] [numeric](18, 2) NULL,
	[FinancialCollectAmount] [numeric](18, 2) NULL,
	[FinancialRemCollectAmount]  AS (isnull([FinancialDistAmount],(0))-isnull([FinancialCollectAmount],(0))),
	[FinancialPayAmount]  AS (isnull([FinancialAmount],(0))),
	[FinancialPaidAmount] [numeric](18, 2) NULL,
	[FinancialRemainAmount]  AS (isnull([FinancialAmount],(0))-isnull([FinancialPaidAmount],(0))),
	[FinancialLastRemain]  AS (isnull([FinancialAmount],(0))-isnull([FinancialCollectAmount],(0))),
	[CustodyDebit] [numeric](18, 2) NULL,
	[CustodyCredit] [numeric](18, 2) NULL,
	[CustodyRemain]  AS (isnull([CustodyCredit],(0))-isnull([CustodyDebit],(0))),
	[LoanDebit] [numeric](18, 2) NULL,
	[LoanCredit] [numeric](18, 2) NULL,
	[LoanRemain]  AS (isnull([LoanCredit],(0))-isnull([LoanDebit],(0))),
	[IDExcel] [int] NULL,
 CONSTRAINT [PK_A_ACCOUNT] PRIMARY KEY CLUSTERED 
(
	[COMP_CODE] ASC,
	[ACC_CODE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[A_ACCOUNT_YEAR](
	[COMP_CODE] [int] NOT NULL,
	[ACC_CODE] [nvarchar](25) NOT NULL,
	[FIN_YEAR] [int] NOT NULL,
	[OpenDebit] [numeric](18, 2) NULL,
	[OpenCredit] [numeric](18, 2) NULL,
	[OPENING_BALANCE]  AS (isnull([OpenCredit],(0))-isnull([OpenDebit],(0))),
	[CREDIT] [numeric](18, 2) NULL,
	[DEBIT] [numeric](18, 2) NULL,
	[ACC_LIMIT] [numeric](19, 2) NULL,
	[REMARKS] [nvarchar](300) NULL,
 CONSTRAINT [PK_A_ACCOUNT_YEAR] PRIMARY KEY CLUSTERED 
(
	[COMP_CODE] ASC,
	[ACC_CODE] ASC,
	[FIN_YEAR] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



CREATE TABLE [dbo].[A_JOURNAL_HEADER](
	[VoucherID] [int] IDENTITY(1,1) NOT NULL,
	[COMP_CODE] [int] NULL,
	[VOUCHER_CODE] [int] NULL,
	[VOUCHER_DATE] [smalldatetime] NULL,
	[VOUCHER_DESC] [nvarchar](300) NULL,
	[VOUCHER_STATUS] [tinyint] NULL,
	[TYPE_CODE] [int] NULL,
	[REF_CODE] [nvarchar](10) NULL,
	[CREATED_BY] [nvarchar](20) NULL,
	[CREATED_AT] [smalldatetime] NULL,
	[UPDATED_BY] [nvarchar](20) NULL,
	[UPDATED_AT] [smalldatetime] NULL,
	[POSTED_BY] [nvarchar](20) NULL,
	[POSTED_AT] [smalldatetime] NULL,
	[BOOK_TR_NO] [int] NULL,
	[SOURCE_TYPE] [nvarchar](10) NULL,
	[TotalDebit] [numeric](18, 2) NULL,
	[TotalCredit] [numeric](18, 2) NULL,
	[VOUCHER_DATEH] [nvarchar](50) NULL,
	[AUTHORISED_BY] [nvarchar](20) NULL,
	[AUTHORISED_AT] [smalldatetime] NULL,
	[Status_Trigger] [int] NULL,
 CONSTRAINT [PK_A_JOURNAL_HEADER_1] PRIMARY KEY CLUSTERED 
(
	[VoucherID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[A_JOURNAL_HEADER] ADD  CONSTRAINT [DF_A_JOURNAL_HEADER_VOUCHER_STATUS]  DEFAULT ((0)) FOR [VOUCHER_STATUS]
GO

ALTER TABLE [dbo].[A_JOURNAL_HEADER] ADD  CONSTRAINT [DF__A_JOURNAL__BOOK___740F363E]  DEFAULT ((0)) FOR [BOOK_TR_NO]
GO




CREATE TABLE [dbo].[A_JOURNAL_DETAIL](
	[VoucherDetailID] [int] IDENTITY(1,1) NOT NULL,
	[VoucherID] [int] NULL,
	[COMP_CODE] [int] NULL,
	[VOUCHER_CODE] [int] NULL,
	[ACC_CODE] [nvarchar](25) NULL,
	[VOUCHER_SERIAL] [int] NULL, 
	[DEBIT] [numeric](18, 2) NULL,
	[CREDIT] [numeric](18, 2) NULL,
	[DESCL] [nvarchar](300) NULL,
	[DESCA] [nvarchar](300) NULL, 
	[Trans_ID] [int] NULL, 
	[Trans_No] [int] NULL,  
	[Trans_Type] [nvarchar](100) NULL, 
	[CC_CODE] [nvarchar](10) NULL,
	[CCDT_CODE] [nvarchar](10) NULL, 
 CONSTRAINT [PK_A_JOURNAL_DETAIL_1] PRIMARY KEY CLUSTERED 
(
	[VoucherDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[A_JOURNAL_DETAIL] ADD  CONSTRAINT [DF_A_JOURNAL_DETAIL_DEBIT]  DEFAULT ((0)) FOR [DEBIT]
GO

ALTER TABLE [dbo].[A_JOURNAL_DETAIL] ADD  CONSTRAINT [DF_A_JOURNAL_DETAIL_CREDIT]  DEFAULT ((0)) FOR [CREDIT]
GO
 
GO



CREATE TABLE [dbo].[E_D_G_TypeTempExcel](
	[IDTypeTemp] [int] IDENTITY(1,1) NOT NULL,
	[ExType] [int] NULL,
	[CompCode] [int] NULL,
	[DescA] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
 CONSTRAINT [PK_E_D_G_TypeTempExcel] PRIMARY KEY CLUSTERED 
(
	[IDTypeTemp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

 


CREATE TABLE [dbo].[E_D_G_CreateTempExcel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[IDTypeTemp] [int] NULL,
	[Serial] [int] NULL,	
	[NameTitle] [nvarchar](500) NULL,
	[Remark] [nvarchar](1000) NULL,
	[TrType] [nvarchar](50) NULL, 
 CONSTRAINT [PK_E_D_G_CreateTempExcel] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO






CREATE TABLE [dbo].[E_D_G_CreateTempExcelACC](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[IDTypeTemp] [int] NULL,
	[Serial] [int] NULL,	
	[NameTitle] [nvarchar](500) NULL,
	[Remark] [nvarchar](1000) NULL,
	[TrType] [nvarchar](50) NULL,
	[ACC_Type] [int] NULL,
	[ACC_IsCredit] [bit] NULL,
 CONSTRAINT [PK_E_D_G_CreateTempExcelACC] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO







CREATE TABLE [dbo].[E_G_LogUploadExcel](
	[IDExcel] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[IDTypeTemp] [int] NULL,
	[NameExcel] [nvarchar](200) NULL,
	[TrDate] [smalldatetime] NULL,
	[TrType] [int] NULL,
	[Status] [int] NULL,
	[Remark] [nvarchar](200) NULL,
	[CreatedAt] [smalldatetime] NULL,
	[CreatedBy] [nvarchar](200) NULL,
	[UpdatedAt] [smalldatetime] NULL,
	[UpdatedBy] [nvarchar](200) NULL,
	[DescError] [nvarchar](200) NULL,
	[IsPostDirectJournal] [bit] NULL,
	[LastCountLoop] [int] NULL,
 CONSTRAINT [PK_E_G_LogUploadExcel] PRIMARY KEY CLUSTERED 
(
	[IDExcel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO






CREATE TABLE [dbo].[A_TR_ReceiptNote](
	[TransactionID] [int] IDENTITY(1,1) NOT NULL,
	[TrNo] [int] NULL,
	[RefNo] [nvarchar](100) NULL,
	[TransactionDate] [date] NULL,
	[CompCode] [int] NULL,
	[TrType] [int] NULL,
	[IsCash] [bit] NULL,
	[Type] [int] NULL,
	[CashTypeID] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[BeneficiaryName] [nvarchar](max) NULL,
	[Amount] [decimal](18, 2) NULL,
	[DueAmount] [decimal](18, 2) NULL,
	[Status] [int] NULL,
	[Remarks] [nvarchar](4000) NULL,
	[IDUserCreate] [int] NULL,
	[CreatedAt] [smalldatetime] NULL,
	[CreatedBy] [nvarchar](200) NULL,
	[UpdatedAt] [smalldatetime] NULL,
	[UpdatedBy] [nvarchar](200) NULL, 
	[IDPeriod] [nvarchar](100) NULL,
	[From_ACC_CODE] [nvarchar](100) NULL,
	[To_ACC_CODE] [nvarchar](100) NULL,
	[From_Acc_IsCredit] [bit] NULL,
	[IDExcel] [int] NULL,
 CONSTRAINT [PK__A_TR_ReceiptNote] PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[A_TR_ReceiptNote] ADD  CONSTRAINT [DF__A_TR_ReceiptNote]  DEFAULT ((0)) FOR [IsCash]
GO





--***********************************************************************************************************************************************************************************



CREATE TABLE [dbo].[D_G_FamilyZone](
	[FamilyZoneID] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[ZoneCode] [nvarchar](50) NULL,
	[DescA] [nvarchar](200) NULL,
	[Active] [bit] NULL,
	[Remarks] [nvarchar](4000) NULL,
 CONSTRAINT [PK_FamilyZone] PRIMARY KEY CLUSTERED 
(
	[FamilyZoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



CREATE TABLE [dbo].[D_G_Zones](
	[ZoneID] [int] IDENTITY(1,1) NOT NULL,
	[FamilyZoneID] [int] NULL,
	[CompCode] [int] NULL,
	[ZoneCode] [nvarchar](50) NULL,
	[DescA] [nvarchar](200) NULL,
	[Active] [bit] NULL,
	[Remarks] [nvarchar](4000) NULL,
 CONSTRAINT [PK_Zones] PRIMARY KEY CLUSTERED 
(
	[ZoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


--***********************************************************************************************************************************************************************************





--***********************************************************************



CREATE TABLE [dbo].[G_TypeEmployees](
	[IDTypeEmp] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[EmpType] [int] NULL, 
	[DescA] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
	[ISActive] [bit] NULL, 
 CONSTRAINT [PK_G_TypeEmployees] PRIMARY KEY CLUSTERED 
(
	[IDTypeEmp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
 
CREATE TABLE [dbo].[G_Employees](
	[EmpID] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode]   [bigint] NOT NULL, 
	[CompCode] [int] NOT NULL, 
	[Emp_Name] [nvarchar](max) NULL,
	[EmpType] [int] NULL, 
	[Status] [int] NULL, 
	[Address] [nvarchar](100) NULL,
	[Mobile] [nvarchar](15) NULL,
	[Mobile2] [nvarchar](15) NULL, 
	[Email] [nvarchar](30) NULL,  
	[ManagedBy] [nvarchar](20) NULL,
	[LoginUrl] [bit] NULL,
	[Remarks] [nvarchar](200) NULL,
	[ManagerID] [int] NULL,
	[SupervisorID] [int] NULL,
	[FamilyZoneID] [int] NULL,
	[ZoneID] [int] NULL,  
	[CreatedAt] [smalldatetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[UpdatedAt] [smalldatetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[Profile_Img] [nvarchar](1000) NULL,
	[FrontID_Img] [nvarchar](1000) NULL,
	[BackID_Img] [nvarchar](1000) NULL, 
	[Gender] [int] NULL,
	[IDNO] [nvarchar](25) NULL,
	[FrontDrivLicense_Img] [nvarchar](1000) NULL,
	[BackDrivLicense_Img] [nvarchar](1000) NULL,
	[FrontVicLicense_Img] [nvarchar](1000) NULL,
	[BackVicLicense_Img] [nvarchar](1000) NULL, 
	[Salary] [decimal](18, 2) NULL,  
	[AccTransferNo] [nvarchar](100) NULL,
	[AccNameTransfer] [nvarchar](100) NULL, 
    [ACC_CODE] [nvarchar](50) NULL,  
	[Custody_Code] [nvarchar](50) NULL,
	[Loan_Code] [nvarchar](50) NULL, 
	[IDExcel] [int] NULL, 
 CONSTRAINT [PK_G_Employees] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

 

 delete [G_Employees] 

INSERT INTO [dbo].[G_Employees]
           ([EmpCode]
           ,[CompCode]
           ,[Emp_Name]
           ,[Status]  
           ,[EmpType]) 
   select  SalesManCode as  [EmpCode]
           ,[CompCode]
           ,SalesManName as [Emp_Name]
           ,1 [Status]  
           ,3 [EmpType] from [dbo].[D_A_SalesMan]

		   go 

		   --drop TABLE [dbo].[D_A_SalesMan]

--***********************************************************************




--CREATE TABLE [dbo].[D_G_TypeAccTrans](
--	[IDType] [int] IDENTITY(1,1) NOT NULL,
--	[CompCode] [int] NULL,
--	[Serial] [int] NULL,
--	[TypeDesc] [nvarchar](100) NULL,
--	[Symbols] [nvarchar](25) NULL,
--	[Remark] [nvarchar](200) NULL,
--	[ACC_CODE] [nvarchar](25) NULL,
--	[User_Type] [int] NULL,
--	[Show_User_info] [int] NULL,
--	[IDTypeCovenant] [int] NULL,
--	[Color] [nvarchar](100) NULL,
--	[FontColor] [nvarchar](100) NULL,
--	[Is_Active] [bit] NULL,
-- CONSTRAINT [PK_G_TypeTrans] PRIMARY KEY CLUSTERED 
--(
--	[IDType] ASC
--)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
--) ON [PRIMARY]
--GO







--********************************************************************************************************************


DROP INDEX Index_USERS1 ON G_USERS;
DROP INDEX Index_USERS2 ON G_USERS;
DROP INDEX [NonClusteredIndex-20241008-221003] ON G_USERS;
DROP INDEX [NonClusteredIndex-20241008-220849] ON G_USERS;


ALTER TABLE G_USERS
DROP COLUMN 
             USERID
			,CompCode
            ,City
			,[Address] 
			,[Mobile]
			,[Mobile2] 
			,[Tel] 
			,[ManagedBy]
			,[LoginUrl] 
			,[Remarks] 
			,[AccountantID] 
			,[SupervisorID] 
			,[FamilyZoneID]  
			,[ZoneID]
			,[CashBoxID] 
			,[CompName] 
			,[IDNO]
			,Gender
			,[FrontID_Img] 
			,[BackID_Img]  
			,[FrontDrivLicense_Img]
			,[BackDrivLicense_Img] 
			,[FrontVicLicense_Img] 
			,[BackVicLicense_Img]  
			,[DeliveryType]        
			,[LastPeriodSalary]    
			,[LastIDSalary]        
			,[Language]            
			,[AccTransferNo]       
			,[AccNameTransfer]     
			,[ACC_CODE]            
			,[Custody_Code]        
			,[Loan_Code]           
			,[IsRolePosted]     
go
 

ALTER TABLE G_USERS
ADD EmpID BIGINT;

go

 
 ALTER VIEW [dbo].[GQ_USERS]
AS
SELECT   
    ID , 
	dbo.G_USERS.EmpID as EmpID,
	Emp.EmpCode as EmpCode,
    USER_CODE,
    USER_PASSWORD,
    USER_NAME,
    USER_ACTIVE, 
    G_USERS.Email,
    JobTitle,
    USER_TYPE,
    Tokenid,
    G_USERS.Profile_Img,
    G_USERS.UpdatedBy,
    G_USERS.UpdatedAt,
    G_USERS.CreatedBy,
    G_USERS.CreatedAt,
    FirstLogin,
    LastLogin,
    CHANGE_PASS_DATE,
    DepartmentName,
    USER_PASSWORD2, 
    G_USERS.Status, 
    '' AS DescZone,
    '' AS DescFamilyZone,
    RoleIds
FROM dbo.G_USERS  
left Join G_Employees Emp
				  on dbo.G_USERS.EmpID  = Emp.EmpID 
GO
 


 ALTER VIEW [dbo].[IQ_G_RoleUsersAllDataComp]
AS
SELECT 
    dbo.G_RoleUsers.IDUser,
    MAX(dbo.G_RoleUsers.RoleId) AS RoleId,
    STRING_AGG(CAST(dbo.G_RoleUsers.RoleId AS VARCHAR), ',') AS RoleIds,
    STRING_AGG(dbo.G_Role.DescA, ',') AS RoleDescA,
    STRING_AGG(dbo.G_Role.DescE, ',') AS RoleDescE,
    MAX(dbo.G_USERS.USER_NAME) AS NameUser,
    dbo.G_RoleUsers.CompCode,
    MAX(dbo.G_COMPANY.NameA) AS CompNameA,
    MAX(dbo.G_COMPANY.NameE) AS CompNameE,
    MAX(dbo.G_USERS.EmpID) AS EmpID,
	MAX(Emp.EmpCode) AS EmpCode,
    MAX(dbo.G_USERS.USER_CODE) AS USER_CODE,
    MAX(dbo.G_USERS.USER_PASSWORD) AS USER_PASSWORD,
    MAX(dbo.G_USERS.Email) AS Email,
    MAX(dbo.G_USERS.USER_PASSWORD2) AS USER_PASSWORD2,
    dbo.G_USERS.USER_ACTIVE,
    MAX(dbo.G_USERS.Status) AS Status,
    MAX(dbo.G_USERS.DepartmentName) AS DepartmentName,
    MAX(dbo.G_USERS.JobTitle) AS JobTitle,
    MAX(dbo.G_USERS.USER_TYPE) AS USER_TYPE,
    MAX(dbo.G_USERS.CHANGE_PASS_DATE) AS CHANGE_PASS_DATE,
    MAX(dbo.G_USERS.LastLogin) AS LastLogin,
    MAX(dbo.G_USERS.FirstLogin) AS FirstLogin,
    MAX(dbo.G_USERS.CreatedAt) AS CreatedAt,
    MAX(dbo.G_USERS.UpdatedAt) AS UpdatedAt,
    MAX(dbo.G_USERS.CreatedBy) AS CreatedBy,
    MAX(dbo.G_USERS.UpdatedBy) AS UpdatedBy,
    MAX(dbo.G_USERS.Profile_Img) AS Profile_Img,
    MAX(dbo.G_USERS.Tokenid) AS Tokenid, 
    MAX(dbo.G_USERS.IDExcel) AS IDExcel
FROM dbo.G_COMPANY
INNER JOIN dbo.G_RoleUsers ON dbo.G_COMPANY.COMP_CODE = dbo.G_RoleUsers.CompCode
INNER JOIN dbo.G_USERS ON dbo.G_RoleUsers.IDUser = dbo.G_USERS.ID
left Join G_Employees Emp  on dbo.G_USERS.EmpID  = Emp.EmpID 
INNER JOIN dbo.G_Role ON dbo.G_RoleUsers.RoleId = dbo.G_Role.RoleId
WHERE 
    dbo.G_USERS.USER_ACTIVE = 1 AND 
    dbo.G_RoleUsers.ISActive = 1 AND 
    dbo.G_COMPANY.IsActive = 1 AND 
    dbo.G_Role.IsAvailable = 1
GROUP BY 
    dbo.G_RoleUsers.IDUser,
    dbo.G_RoleUsers.CompCode,
    dbo.G_USERS.USER_ACTIVE
GO




ALTER VIEW [dbo].[IQ_G_RoleUsersComp]
AS
SELECT dbo.G_RoleUsers.IDUser, MAX(dbo.G_RoleUsers.RoleId) AS RoleId, STRING_AGG(CAST(dbo.G_RoleUsers.RoleId AS VARCHAR), ',') AS RoleIds, STRING_AGG(dbo.G_Role.DescA, ',') AS RoleDescA, STRING_AGG(dbo.G_Role.DescE, ',') 
                  AS RoleDescE, dbo.G_COMPANY.NameA AS CompNameA, dbo.G_COMPANY.NameE AS CompNameE, dbo.G_USERS.EmpID,Emp.EmpCode, dbo.G_USERS.USER_CODE, dbo.G_USERS.USER_PASSWORD, dbo.G_USERS.Email, 
                  dbo.G_USERS.USER_NAME AS NameUser, dbo.G_RoleUsers.CompCode
FROM     dbo.G_COMPANY INNER JOIN
                  dbo.G_RoleUsers ON dbo.G_COMPANY.COMP_CODE = dbo.G_RoleUsers.CompCode INNER JOIN
                  dbo.G_USERS ON dbo.G_RoleUsers.IDUser = dbo.G_USERS.ID left Join G_Employees Emp
				  on dbo.G_USERS.EmpID  = Emp.EmpID 
				  INNER JOIN
                  dbo.G_Role ON dbo.G_RoleUsers.RoleId = dbo.G_Role.RoleId
WHERE  (dbo.G_USERS.USER_ACTIVE = 1) AND (dbo.G_RoleUsers.ISActive = 1) AND (dbo.G_COMPANY.IsActive = 1) AND (dbo.G_Role.IsAvailable = 1)
GROUP BY dbo.G_RoleUsers.IDUser, dbo.G_RoleUsers.CompCode, dbo.G_COMPANY.NameA, dbo.G_COMPANY.NameE, dbo.G_USERS.EmpID, Emp.EmpCode, dbo.G_USERS.USER_CODE, dbo.G_USERS.USER_PASSWORD, dbo.G_USERS.Email, 
                  dbo.G_USERS.USER_NAME
GO


--*******************************************************************************************************************

ALTER PROCEDURE [dbo].[G_CreateUser_Ver2]
	@comp int,
	@UserCode nvarchar(25) ,
	@NameUser nvarchar(25) , 	
	@Pass nvarchar(25) ,
	@RoleId int

AS
BEGIN


   SET NOCOUNT ON;


  
INSERT INTO [dbo].[G_USERS]
           (  [USER_CODE]
           ,[USER_PASSWORD]
           ,[USER_PASSWORD2]
           ,[USER_ACTIVE]
           ,[USER_NAME]
           ,[Status] 
           ,[Email]
           ,[DepartmentName]
           ,[JobTitle]
           ,[USER_TYPE] 
           ,[CHANGE_PASS_DATE]
           ,[LastLogin]
           ,[FirstLogin]
           ,[CreatedAt]
           ,[CreatedBy]
           ,[UpdatedAt]
           ,[UpdatedBy]
           ,[Profile_Img] 
           ,[Tokenid] 
		   )

		   select  
            @UserCode
           ,@Pass
           ,@Pass
           ,1
           ,@NameUser
           ,1 
           ,[Email]
           ,[DepartmentName]
           ,[JobTitle]
           ,@RoleId 
           ,[CHANGE_PASS_DATE]
           ,[LastLogin]
           ,[FirstLogin]
           ,[CreatedAt]
           ,[CreatedBy]
           ,[UpdatedAt]
           ,[UpdatedBy]
           ,[Profile_Img] 
           ,[Tokenid] 
           from [G_USERS] Where USER_CODE ='UserAdministrator' 
	 
		    
			
			 declare @IDUser Bigint


			select @IDUser = max(ID) from  [G_USERS]
	   
	   
			 Delete G_RoleUsers Where IDUser = @IDUser	 


	    	insert into G_RoleUsers( IDUser, RoleId, ISActive ,CompCode) 
						SELECT   @IDUser, @RoleId, 1 ,@comp



						
		exec GProc_GenerateUserPrivilage null,null,''
			
END




