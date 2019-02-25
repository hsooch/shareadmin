var globalLayerPopupVal = {
    maskDivId: 'layerPopupMaskingDiv',
    contentsDivId: 'layerPopupContentsDiv'
};
var createLayerPopup = function(uri, width, data) {
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    var maskDiv = document.createElement("div");
    maskDiv.id = globalLayerPopupVal.maskDivId;
    $(maskDiv).css({
        'position' : 'fixed',
        'left' : '0',
        'top' : '0',
        'z-index' : '9999',
        'opacity' : '0.5',
        'background-color' : '#000',
        'width' : maskWidth + 'px',
        'height' : maskHeight + 'px'
    });

    var popupContentsDiv = document.createElement("div");
    popupContentsDiv.id = globalLayerPopupVal.contentsDivId;
    $(popupContentsDiv).load(uri, data);
    $(popupContentsDiv).css({
        'position' : 'absolute',
        'z-index' : '10000',
        'background-color' : '#ffffff',
        'width' : width + 'px'
    });

    var left = ( $(window).scrollLeft() + ( $(window).width() - $(popupContentsDiv).width()) / 2 );
    var top = ( $(window).scrollTop() + ( $(window).height() - $(popupContentsDiv).height()) / 5 );
 
    $(popupContentsDiv).css({
        'left' : left + 'px',
        'top' : top + 'px'
    });

    document.body.appendChild(maskDiv);
    document.body.appendChild(popupContentsDiv);
};

function closeLayerPopup() {
    $("#" + globalLayerPopupVal.contentsDivId).remove();
    $("#" + globalLayerPopupVal.maskDivId).remove();
}

/**
 * 문자열 양쪽 공백 제거. jquery의 $.trim(str)와 동일
 * @param str      원본 문자열
 */
function trim(str){
    if( str === undefined || str == null) { 
        return "";
    }
    str += '';
    return str.replace(/(^ +| +$)/g,'');
}

/**
 * null 검사
 * @praram value
 */
function isNull(value){
    if( value === undefined || value == null || trim(value) == '' ) { 
        return true;
    }
    return false;
}

/**
 * Default IF Empty
 * @param value Check Target Value
 * @param defaultValue Default Value
 * @returns value
 */
function defaultIfEmpty(value, defaultValue) {
	defaultValue = defaultValue ? defaultValue : '';
	return value ? value : defaultValue;
}

/**
 * null 문자열을 공백으로 리턴
 * @param str      원본 문자열
 */
function nvltoStr(str){
    if( str === undefined || str == null ) {
        return "";
    }
    str += '';
    return str;
}

/**
 * 문자열 교체
 *
 * @param str 현재값
 * @param orgStr 조건값
 * @param repStr 변경할값
 */
function replaceAll(str,orgStr,repStr) {
	return str.split(orgStr).join(repStr);
}

/**
 * 숫자 문자열 자릿수 채우기
 * * ex1) leadingZeros(2, 4) => 0002
 * * ex2) leadingZeros(12, 4) => 0012
 *
 * @param n 값
 * @param digits 자릿수
 * @return : 숫자 문자열
 */
function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	
	if(n.length < digits) {
		for(var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

/**
 * 년도와 월에 따른 월 마지막 일 구하기
 *
 * @param year 년도
 * @param month 월
 * @return 월별 마지막 일
 */
function lastDay(year, month) {
	return new Date(year, month, 0).getDate();
}

/**
 * 숫자만 입력하는 이벤트
 * @param  : event
 * @example  : $("#a").bind("keydown", numberOnly); 
 * 수정이력 : 190(.) 코드 입력 방지 추가
 */
function numberOnly(e){
	// backspace, delete, tab, escape, enter, '.'
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
	     // Ctrl+A
	    (e.keyCode == 65 && e.ctrlKey === true) || 
	     // home, end, left, right, down, up
	    (e.keyCode >= 35 && e.keyCode <= 40)) {
	         // let it happen, don't do anything
	         return;
	}
	// 숫자가 아닐경우 이벤트를 중단함.
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		console.log(e.keyCode);
	    e.preventDefault();
	}
}

/**
 * 날자를 년월일(포멧팅) 형식으로 가져온다.
 * @param  : addDays : 더하거나 뺄 날자
 * @param  : delimeter : 날자 구분자
 * etc : getYearMonthDay() 호출시 현재 년월일 을 "/"(기본구분자) 로 감싸서 리턴함 => 2018/04/12
 * getYearMonthDay(-30) => 현재에서 30일 전의 날자 리턴(기본구분자 "/")
 * getYearMonthDay(30, ':') => 현재에서 30일 후의 날자 리턴(구분자 ":" 로 감싸짐)
 */
function getYearMonthDay(addDays, delimeter) {
	delimeter 	= delimeter == undefined ? "/" : delimeter;
	
	var myDay = new Date();
	
	if(addDays != undefined && !isNaN(addDays)) myDay.setDate(myDay.getDate() + Number(addDays));
	
	var year 	= myDay.getFullYear().toString();
	var month 	= ("0"+(myDay.getMonth()+1)).match(/[0-9]{2}$/)[0];
	var date 	= ("0"+myDay.getDate()).match(/[0-9]{2}$/)[0];
	
	return year + delimeter + month + delimeter + date;
}


/**
 * 현재시를 가져온다.
 */
function curHour() {
	
	var myDay = new Date();
	
	return lpad(myDay.getHours()+"",2,'0');
}

/**
 * 현재분을 가져온다.
 */
function curMinute() {
	
	var myDay = new Date();
	
	return lpad(myDay.getMinutes()+"",2,'0');
}

/**
 * LPAD - 문자열 왼쪽에 length만큼 strToPad를 채워넣는다.
 * originalstr: 원문
 * length: 변경할 문자열길이, strToPad: 채워넣을 문자( defautl: '0' )
 */
function lpad(originalstr, length, strToPad) {
	if( isNull(originalstr) || isNull(length) ) {
		return originalstr;
	}
	
	if( isNull(strToPad) ) {
		strToPad = "0";
	}
	
	var orgStr = new String(originalstr);
	var len = parseInt(length);
	
    while (orgStr.length < len) {
    	orgStr = strToPad + orgStr;
    }
    
    return orgStr;
}


/**
 * RPAD - 문자열 오른쪽에 length만큼 strToPad를 채워넣는다.
 * originalstr: 원문
 * length: 변경할 문자열길이, strToPad: 채워넣을 문자
 */
function rpad(originalstr, length, strToPad) {
	if( isNull(originalstr) || isNull(length) ) {
		return originalstr;
	}
	
	if( isNull(strToPad) ) {
		strToPad = "0";
	}
	
	var orgStr = new String(originalstr);
	var len = parseInt(length);
	
    while (orgStr.length < len) {
    	orgStr = orgStr + strToPad;
    }
    
    return originalstr;
}

/**
 * 브라우저 종류 확인
 * @return String 브라우저 이름
 */
function checkBrowserType(){
	var ieBool = true;
	var iePre = "";
	var bAgent = navigator.userAgent.toLowerCase();
	var bName = navigator.appName.toLowerCase();
	
	var rsltNm = "";
	
	/** IE version check **/
	if(bName === "microsoft internet explorer"){ // IE 10 이하
		iePre = "msie ";
	}else{
		if(bAgent.indexOf("trident") > -1){
			iePre = "trident/.*rv:";
		}else if(bAgent.indexOf("edge") > -1){
			iePre = "edge/";
		}
	}
	
	var reg = new RegExp(iePre + "([0-9]{1,})(\\.{0,}[0-9]{0,1})")
	if(reg.exec(bAgent) != null){
		rsltNm = "msie" + RegExp.$1 + RegExp.$2;
	}
	
	if(rsltNm === ""){
		if(bAgent.indexOf("chrome") > -1) rsltNm = "chrome";
		else if(bAgent.indexOf("opera") > -1) rsltNm = "opera";
		else if(bAgent.indexOf("firefox") > -1) rsltNm = "firefox";
		else if(bAgent.indexOf("safari") > -1) rsltNm = "safari";
	}
	
	return rsltNm;
}

/**
 * 이메일주소 형식에 맞는지 검사
 * @param  : email(test@test.com) <= '@가 들어간 전체 메일주소'
 */
function isEmailAddr(email) {
	return /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/.test(email);
}

/**
 * 날짜문자열을 지정한 날짜포맷으로 변환함.
 * @param orgDate 변환전 날짜문자열
 * @param dateFormat 날짜포맷
 * @return rsltDate 변환후 날짜문자열
 */
function getDateString(orgDate, dateFormat){
	var rsltDate = "";
	if(isNull(orgDate)) return rsltDate;
	dateFormat = isNull(dateFormat) ? "yyyy-MM-dd hh:mm:ss" : dateFormat;
	var date = new Date(orgDate.replace(/[.]/gi, '-'));

	rsltDate = dateFormat.replace(/(YYYY|yyyy|YY|yy|MM|DD|dd|HH24|hh24|HH|hh|MI|mi|mm|SS|ss)/gi, function($obj){
		switch($obj){
			case "YYYY" : return date.getFullYear();	//년도 4자리
			case "yyyy" : return date.getFullYear();	//년도 4자리
			case "YY" :	return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
			case "yy" : return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
			case "MM" : return lpad(date.getMonth()+1, 2);	//월 2자리
			case "DD" : return lpad(date.getDate(), 2);	//일 2자리
			case "dd" : return lpad(date.getDate(), 2);	//일 2자리
			case "HH24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
			case "hh24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
			case "HH" : return lpad(date.getHours(), 2);	// 시간 2자리 (0~24)
			case "hh" : return lpad(date.getHours() % 12, 2); // 시간 2자리 (0~12)
			case "MI" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "mi" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "mm" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "SS" : return lpad(date.getSeconds(), 2); // 초 2자리
			case "ss" : return lpad(date.getSeconds(), 2); // 초 2자리
		}
	});

	return rsltDate;
}

/**
 * 날짜문자열을 지정한 날짜포맷으로 변환함.(yyyyMMddHH24MISS)
 * @param orgDate 변환전 날짜문자열
 * @param dateFormat 날짜포맷
 * @return rsltDate 변환후 날짜문자열
 */
function stringToDate(orgDate, dateFormat){
	var rsltDate = "";
	if(isNull(orgDate) || orgDate.length < 14) return rsltDate;
	dateFormat = isNull(dateFormat) ? "yyyy-MM-dd hh:mm:ss" : dateFormat;
	var date = new Date(orgDate.substr(0, 4), orgDate.substr(4, 2) - 1, orgDate.substr(6, 2), orgDate.substr(8, 2), orgDate.substr(10, 2), orgDate.substr(10, 2));

	rsltDate = dateFormat.replace(/(YYYY|yyyy|YY|yy|MM|DD|dd|HH24|hh24|HH|hh|MI|mi|mm|SS|ss)/gi, function($obj){
		switch($obj){
			case "YYYY" : return date.getFullYear();	//년도 4자리
			case "yyyy" : return date.getFullYear();	//년도 4자리
			case "YY" :	return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
			case "yy" : return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
			case "MM" : return lpad(date.getMonth()+1, 2);	//월 2자리
			case "DD" : return lpad(date.getDate(), 2);	//일 2자리
			case "dd" : return lpad(date.getDate(), 2);	//일 2자리
			case "HH24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
			case "hh24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
			case "HH" : return lpad(date.getHours(), 2);	// 시간 2자리 (0~24)
			case "hh" : return lpad(date.getHours() % 12, 2); // 시간 2자리 (0~12)
			case "MI" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "mi" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "mm" : return lpad(date.getMinutes(), 2); // 분 2자리
			case "SS" : return lpad(date.getSeconds(), 2); // 초 2자리
			case "ss" : return lpad(date.getSeconds(), 2); // 초 2자리
		}
	});

	return rsltDate;
}
