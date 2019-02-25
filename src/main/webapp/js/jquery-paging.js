var pagingGlobalVar = [];

$.fn.createPaging = function(pagingOptions) {
	var pageTrgtId = $(this).attr("id")?$(this).attr("id"):$(this).attr("name");
	if(pageTrgtId == null || pageTrgtId == undefined) return;
    var innerDiv = document.createElement('div');
    innerDiv.className = '_inner';
    this.append(innerDiv);
    
    pagingGlobalVar[pageTrgtId] = {};
    pagingGlobalVar[pageTrgtId].firstEl = document.createElement("a");
    pagingGlobalVar[pageTrgtId].firstEl.className = '_first';
    pagingGlobalVar[pageTrgtId].firstEl.title = '처음 목록으로 이동';
    pagingGlobalVar[pageTrgtId].firstEl.innerText = '처음';
    pagingGlobalVar[pageTrgtId].firstEl.href = 'javascript:pagingUtils.clickPage(\'' + pageTrgtId + '\', 1);';
    innerDiv.appendChild(pagingGlobalVar[pageTrgtId].firstEl);

    pagingGlobalVar[pageTrgtId].prevEl = document.createElement("a");
    pagingGlobalVar[pageTrgtId].prevEl.className = (pagingOptions.isHome ? '_listPrev' : '_prev');
    pagingGlobalVar[pageTrgtId].prevEl.title = '이전페이지';
    pagingGlobalVar[pageTrgtId].prevEl.innerText = '이전페이지';
    innerDiv.appendChild(pagingGlobalVar[pageTrgtId].prevEl);

    pagingGlobalVar[pageTrgtId].pageListEl = document.createElement("ul");
    innerDiv.appendChild(pagingGlobalVar[pageTrgtId].pageListEl);

    pagingGlobalVar[pageTrgtId].nextEl = document.createElement("a");
    pagingGlobalVar[pageTrgtId].nextEl.className = (pagingOptions.isHome ? '_listNext' : '_next');
    pagingGlobalVar[pageTrgtId].nextEl.title = '다음 페이지';
    pagingGlobalVar[pageTrgtId].nextEl.innerText = '다음 페이지';
    innerDiv.appendChild(pagingGlobalVar[pageTrgtId].nextEl);

    pagingGlobalVar[pageTrgtId].lastEl = document.createElement("a");
    pagingGlobalVar[pageTrgtId].lastEl.className = '_last';
    pagingGlobalVar[pageTrgtId].lastEl.title = '마지막 목록으로 이동';
    pagingGlobalVar[pageTrgtId].lastEl.innerText = '끝';
    innerDiv.appendChild(pagingGlobalVar[pageTrgtId].lastEl);

    pagingGlobalVar[pageTrgtId].clickEvent = pagingOptions.clickEvent;
    pagingGlobalVar[pageTrgtId].nowPage = Number(pagingOptions.nowPage);
    pagingGlobalVar[pageTrgtId].rowCnt = Number(pagingOptions.maxRowCnt);
    pagingGlobalVar[pageTrgtId].totalCnt = Number(pagingOptions.totalCnt);
    pagingGlobalVar[pageTrgtId].isHome = pagingOptions.isHome;
    pagingGlobalVar[pageTrgtId].showPageCnt = pagingOptions.showPageCnt ? Number(pagingOptions.showPageCnt) : 10;

    if (!pagingOptions || !pagingOptions.totalCnt || !pagingOptions.nowPage || !pagingOptions.maxRowCnt) {
        return;
    }

    pagingUtils.changePaging(pageTrgtId, pagingGlobalVar[pageTrgtId].nowPage, pagingGlobalVar[pageTrgtId].totalCnt);
};

var pagingUtils = {
    getStartPageNumber: function(pageTarget) {
        var residuumVal = pagingGlobalVar[pageTarget].nowPage % pagingGlobalVar[pageTarget].showPageCnt;
        var divisionVal = parseInt(pagingGlobalVar[pageTarget].nowPage / pagingGlobalVar[pageTarget].showPageCnt);

        if (residuumVal === 0) {
            return (divisionVal - 1) * pagingGlobalVar[pageTarget].showPageCnt + 1
        } else {
            return divisionVal * pagingGlobalVar[pageTarget].showPageCnt + 1;
        }
    },
    getMaxPageNum: function(pageTrgtId) {
        return ((pagingGlobalVar[pageTrgtId].totalCnt % pagingGlobalVar[pageTrgtId].rowCnt) === 0) ?
            (pagingGlobalVar[pageTrgtId].totalCnt / pagingGlobalVar[pageTrgtId].rowCnt) :
            parseInt((pagingGlobalVar[pageTrgtId].totalCnt / pagingGlobalVar[pageTrgtId].rowCnt + 1));
    },
    printPaging: function(pageTarget) {
        if (pagingGlobalVar[pageTarget].totalCnt === 0) {
            $("#"+pageTarget).hide();
        } else {
            $("#"+pageTarget).show();
        }


        if (pagingGlobalVar[pageTarget].startPageNum > pagingGlobalVar[pageTarget].showPageCnt) {
            pagingGlobalVar[pageTarget].prevEl.href = 'javascript:pagingUtils.clickPage(\'' + pageTarget + '\',' + (pagingGlobalVar[pageTarget].startPageNum-1) + ');';
            $(pagingGlobalVar[pageTarget].prevEl).show();
        } else {
            $(pagingGlobalVar[pageTarget].prevEl).hide();
        }

        if ((pagingGlobalVar[pageTarget].startPageNum + pagingGlobalVar[pageTarget].showPageCnt - 1) < pagingGlobalVar[pageTarget].maxPageNum) {
            pagingGlobalVar[pageTarget].nextEl.href = 'javascript:pagingUtils.clickPage(\'' + pageTarget + '\','
                + (pagingGlobalVar[pageTarget].startPageNum+pagingGlobalVar[pageTarget].showPageCnt) + ');';
            $(pagingGlobalVar[pageTarget].nextEl).show();
        } else {
            $(pagingGlobalVar[pageTarget].nextEl).hide();
        }

        pagingGlobalVar[pageTarget].lastEl.href = 'javascript:pagingUtils.clickPage(\'' + pageTarget + '\',' + pagingGlobalVar[pageTarget].maxPageNum + ');';

        for (var i = 0; i < pagingGlobalVar[pageTarget].showPageCnt && pagingGlobalVar[pageTarget].startPageNum <= pagingGlobalVar[pageTarget].maxPageNum; i++, pagingGlobalVar[pageTarget].startPageNum++) {
            var liEl = document.createElement("li");
            if (pagingGlobalVar[pageTarget].startPageNum === pagingGlobalVar[pageTarget].nowPage) {
                var strongEl = document.createElement("strong");
                strongEl.title = '현재 페이지';
                strongEl.innerText = pagingGlobalVar[pageTarget].nowPage.toString();

                if (pagingGlobalVar[pageTarget].isHome) {
                    var aEl = document.createElement("a");
                    aEl.appendChild(strongEl);
                    liEl.appendChild(aEl);
                } else {
                    liEl.appendChild(strongEl);
                }

            } else {
                var aEl = document.createElement("a");
                aEl.title = pagingGlobalVar[pageTarget].startPageNum + '페이지';
                aEl.innerText = pagingGlobalVar[pageTarget].startPageNum.toString();
                aEl.href = 'javascript:pagingUtils.clickPage(\''+pageTarget+'\',' + pagingGlobalVar[pageTarget].startPageNum + ');';
                liEl.appendChild(aEl);
            }
            pagingGlobalVar[pageTarget].pageListEl.appendChild(liEl);
        }
    },
    clickPage: function(pageTarget, pageNum) {
        if (pagingGlobalVar[pageTarget].clickEvent && pagingGlobalVar[pageTarget].clickEvent instanceof Function) {
            pagingGlobalVar[pageTarget].clickEvent(pageTarget, pageNum);
        }
    },
    changePaging: function(pageTarget, pageNum, totalCnt, maxRowCnt) {
        if (maxRowCnt) {
            pagingGlobalVar[pageTarget].rowCnt = maxRowCnt;
        }
        pagingGlobalVar[pageTarget].nowPage = pageNum;
        pagingGlobalVar[pageTarget].totalCnt = totalCnt;
        pagingGlobalVar[pageTarget].startPageNum = this.getStartPageNumber(pageTarget);
        pagingGlobalVar[pageTarget].maxPageNum = pagingUtils.getMaxPageNum(pageTarget);
        pagingGlobalVar[pageTarget].pageListEl.innerHTML = '';

        this.printPaging(pageTarget);
    }
};