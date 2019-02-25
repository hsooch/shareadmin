/**********************/
/*** TBL_CODE START ***/
/**********************/
CREATE TABLE `TBL_CODE` (
  `CODE` varchar(255) NOT NULL,
  `CODE_ALIAS` varchar(255) DEFAULT NULL,
  `CODE_DESC` varchar(255) DEFAULT NULL,
  `CODE_NAME` varchar(255) DEFAULT NULL,
  `CODE_SEQ` int(11) DEFAULT NULL,
  `DEL_YN` varchar(255) DEFAULT NULL,
  `GCODE` varchar(255) DEFAULT NULL,
  `MOD_DT` varchar(255) DEFAULT NULL,
  `MOD_ID` varchar(255) DEFAULT NULL,
  `REG_DT` varchar(255) DEFAULT NULL,
  `REG_ID` varchar(255) DEFAULT NULL,
  `USE_YN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/**********************/
/*** TBL_CODE END ***/
/**********************/

/**********************/
/*** TBL_TERMS START ***/
/**********************/
CREATE TABLE `TBL_TERMS` (
  `TERMS_SEQ` bigint(20) NOT NULL AUTO_INCREMENT,
  `DEL_YN` varchar(255) DEFAULT NULL,
  `MOD_DT` varchar(255) DEFAULT NULL,
  `MOD_ID` varchar(255) DEFAULT NULL,
  `REG_DT` varchar(255) DEFAULT NULL,
  `REG_ID` varchar(255) DEFAULT NULL,
  `REQUIRED_YN` varchar(255) DEFAULT NULL,
  `TERMS_CONTENT` varchar(255) DEFAULT NULL,
  `TERMS_TITLE` varchar(255) DEFAULT NULL,
  `USE_YN` varchar(255) DEFAULT NULL,
  `TERMS_TYPE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TERMS_SEQ`),
  KEY `FKs151icaepkt4uvo3hxuyslsut` (`TERMS_TYPE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/**********************/
/*** TBL_TERMS END ***/
/**********************/

/**********************/
/*** TBL_USER START ***/
/**********************/
CREATE TABLE `TBL_USER` (
  `USER_SEQ` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_PASSWORD` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `USER_ID` varchar(255) CHARACTER SET latin1 NOT NULL,
  `USER_NAME` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `REG_ID` varchar(20) NOT NULL,
  `REG_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `MOD_ID` varchar(20) DEFAULT NULL,
  `MOD_DT` timestamp NULL DEFAULT NULL,
  `USE_YN` char(1) NOT NULL DEFAULT 'Y',
  `DEL_YN` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`USER_SEQ`),
  UNIQUE KEY `UK_8h1i9f8309u2wgodu6utsbs0j` (`USER_ID`),
  KEY `INDEX_USER_ID` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/**********************/
/*** TBL_USER END ***/
/**********************/