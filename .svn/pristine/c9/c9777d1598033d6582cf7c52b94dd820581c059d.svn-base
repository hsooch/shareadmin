var contextPath = '/';

/**
 * JQuery Date Picker 설정 파일을 생성
 *
 * @param elementById Element Id Value
 * @returns JQuery Date Picker Config
 */
var getDatePickerConfig = function(elementById) {
    return {
        dateFormat: "yy.mm.dd",    /* 날짜 포맷 */
        prevText: 'PREV',
        nextText: 'NEXT',
        showButtonPanel: true,    /* 버튼 패널 사용 */
        changeMonth: true,        /* 월 선택박스 사용 */
        changeYear: true,        /* 년 선택박스 사용 */
        showOtherMonths: true,    /* 이전/다음 달 일수 보이기 */
        selectOtherMonths: true,    /* 이전/다음 달 일 선택하기 */
        //showOn: "button",
        //buttonImage: "",
        //buttonImageOnly: true,
        minDate: '-30y',
        closeText: 'X',
        currentText: 'TODAY',
        showMonthAfterYear: true,        /* 년과 달의 위치 바꾸기 */
        monthNames : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        //dayNames : ['일', '월', '화', '수', '목', '금', '토'],
        //dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
        //dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
        showAnim: 'slideDown',
        onClose: function( selectedDate ) {
            $( "#" + elementById ).datepicker( "option", "minDate", selectedDate );
        }
    };
};