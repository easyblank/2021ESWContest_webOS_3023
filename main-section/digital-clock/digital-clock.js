function updateClock() {
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        pe = "AM";

    if (hou >= 12) {
        pe = "오후";
    }
    if (hou == 0) {
        hou = 12;
    }
    if (hou > 12) {
        hou = hou - 12;
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    var week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "period"];
    var values = [week[dname], months[mo], dnum.pad(2)+'일', yr, hou.pad(2), min.pad(2), pe];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

//html에서 사용 <body onload="initClock()">
function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}