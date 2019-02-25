/**********************/
/*** TBL_CODE START ***/
/**********************/
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE dbo.TBL_CODE (
	GCODE varchar(8) NOT NULL,
	CODE varchar(8) NOT NULL,
	CODE_NAME varchar(255) NULL,
	CODE_DESC varchar(500) NULL,
	CODE_ALIAS varchar(255) NULL,
	CODE_SEQ numeric(11) NULL,
	USE_YN char(1) NULL,
	DEL_YN char(1) NULL,
	REG_DT datetime NULL,
	REG_ID varchar(255) NULL,
	MOD_DT datetime NULL,
	MOD_ID varchar(255) NULL
	CONSTRAINT [PK_TBL_CODE] PRIMARY KEY CLUSTERED 
(
	[CODE] ASC,
	[GCODE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
);
/**********************/
/*** TBL_CODE END ***/
/**********************/

/**********************/
/*** TBL_TERMS START ***/
/**********************/
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE dbo.TBL_TERMS (
	TERMS_SEQ bigint identity(1,1) NOT NULL,
	TERMS_TYPE varchar(255) NULL,
	TERMS_TITLE varchar(255) NULL,
	TERMS_CONTENT varchar(255) NULL,
	REQUIRED_YN varchar(255) NULL,
	USE_YN char(1) NULL,
	DEL_YN char(1) NULL,
	REG_DT datetime NULL,
	REG_ID varchar(255) NULL,
	MOD_DT datetime NULL,
	MOD_ID varchar(255) NULL
	CONSTRAINT [PK_TBL_TERMS] PRIMARY KEY CLUSTERED 
(
	TERMS_SEQ ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
);
/**********************/
/*** TBL_TERMS END ***/
/**********************/

/**********************/
/*** TBL_USER START ***/
/**********************/
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE dbo.WZD_USER_INFO(
	USER_ID nvarchar(100) NULL,
	SERVICE_GROUP_SEQ int NOT NULL,
	USER_PWD nvarchar(200) NULL,
	USER_PWD_TMPR nvarchar(200) NULL,
	USER_NM nvarchar(100) NULL,
	USER_EMAIL nvarchar(100) NULL,
	USER_PIN nvarchar(200) NULL,
	RGSDE datetime NULL,
	UPDDE datetime NULL,
	INDVDLINFO_AGREDE datetime NULL,
	USER_TYPE nvarchar(20) NULL,
	CONFM_YN nvarchar(10) NULL,
	CONFMDE datetime NULL,
	LAST_LOGINDE datetime NULL,
	DRMNCYDE datetime NULL,
	INDVDLINFO_MAILDE datetime NULL,
	PWD_ERROR_CO int NULL,
	SITE_ID nvarchar(50) NULL
	CONSTRAINT PK_TBL_TERMS PRIMARY KEY CLUSTERED 
(
	USER_ID ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
);
/**********************/
/*** TBL_USER END ***/
/**********************/