// map js
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.08194084374082, 37.24006710606444,]),
        zoom: 15
    })
});

//하단바 메뉴 모달 js
(function ($) {
    "use strict";
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });

    $("#nfc-tag").click(function (e) {
        e.preventDefault();
        $("#show-nfc").toggleClass("active");
        $(this).toggleClass("active");
    });


    $("#noti-bar").click(function (e) {
        e.preventDefault();
        $("#noti-machine").toggleClass("active");
        $(this).toggleClass("active");
    });

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    $(".close").click(function (e) {
        e.preventDefault();
    })

    $('#sidebar-wrapper .js-scroll-trigger').click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });

    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

})(jQuery);

//nfc 태그 리스트 livefetch js
//------conriguration-------//
const firebaseConfig = {
    apiKey: "AIzaSyAx0EqLdT49lj4fET4emeFrrD2ILJuxRcE",
    authDomain: "fir-javascript-afa80.firebaseapp.com",
    databaseURL: "https://fir-javascript-afa80-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-javascript-afa80",
    storageBucket: "fir-javascript-afa80.appspot.com",
    messagingSenderId: "123396908723",
    appId: "1:123396908723:web:2c79a366ec77319ebdf2c6"
};

firebase.initializeApp(firebaseConfig);
let cloudDB = firebase.firestore();
cloudDB.settings({ timestampsInSnapshots: true });

const list = document.getElementById('list');

function renderList(doc) {
    let idForDiv = document.createElement('div');
    let name = document.createElement('h2');
    let sec = document.createElement('li');
    let gen = document.createElement('li');

    idForDiv.setAttribute('id', doc.data().ID)
    name.innerHTML = doc.data().Product;
    sec.innerHTML = '유통기한: ' + doc.data().Dday;
    gen.innerHTML = '메모: ' + doc.data().Memo;


    idForDiv.appendChild(name);
    idForDiv.appendChild(sec);
    idForDiv.appendChild(gen);


    list.appendChild(idForDiv);

}

cloudDB.collection('nfcTag').onSnapshot((snapshot) => {
    //원래있던 내용 다 지워버리고
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    //새로 쓰기
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })
})


//digital clock js
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
    var values = [week[dname], months[mo], dnum.pad(2) + '일', yr, hou.pad(2), min.pad(2), pe];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

//html에서 사용 <body onload="initClock()">
function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}



//weather js

// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// 여기서 위치 정하기! 현재 위치로 하고싶다면 위에 주석처리한 함수 참고
function setPosition(){
    let latitude = 37.5642135;
    let longitude = 127.0016985;

    getWeather(latitude, longitude);
    console.log("reload");
}

setPosition();


// GET WEATHER FROM API PROVIDER
//나라, 도시 설정은 여기서!
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=kr`; //language korean에 관한 내용은 api 참고

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name; //동이름
            weather.country = data.sys.country; //나라이름
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
//나라, 도시 설정은 여기서!
function displayWeather(){
    iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//10분마다 새로고침
setInterval('setPosition()',10000*60);

//noti live list js
//---------------노티 js-------------------//
const firebaseConfig_2 = {
    apiKey: "AIzaSyAYUWPPJ55ryQJIdfNqAXanveRWLCxC5Zs",
    authDomain: "suyongss-project.firebaseapp.com",
    databaseURL: "https://suyongss-project-default-rtdb.firebaseio.com",
    projectId: "suyongss-project",
    storageBucket: "suyongss-project.appspot.com",
    messagingSenderId: "985738360100",
    appId: "1:985738360100:web:9764e525346807c907efb1",
    measurementId: "G-W29YF65ZER"
};
firebase.initializeApp(firebaseConfig_2);

//노티 리스트 노드에 현재 시간 추가하기
let cam1List = document.getElementById('cam1-list');
let cam2List = document.getElementById('cam2-list');

function addCam1List(machine1, current1) {

    let notiContainer1 = document.createElement('div');
    let _machine1 = document.createElement('p');
    let _current1 = document.createElement('li');

    _machine1.innerHTML = machine1;
    _current1.innerHTML = '남은시간: ' + current1;

    notiContainer1.appendChild(_machine1);
    notiContainer1.append(_current1);

    cam1List.appendChild(notiContainer1);
}

function addCam2List(machine2, current2) {

    let notiContainer2 = document.createElement('div');
    let _machine2 = document.createElement('p');
    let _current2 = document.createElement('li');

    _machine2.innerHTML = machine2;
    _current2.innerHTML = '남은시간: ' + current2;

    notiContainer2.appendChild(_machine2);
    notiContainer2.append(_current2);

    cam2List.appendChild(notiContainer2);
}

firebase.database().ref('cam1').on('value', (snapshot) => {
    //원래있던 내용 지워버리고
    while (cam1List.hasChildNodes()) {
        cam1List.removeChild(cam1List.firstChild);
    }

    //새로쓰기
    let machine1 = snapshot.val().machine;
    let current1 = snapshot.val().current;
    addCam1List(machine1, current1);

    if (current1 == '0') {//실제로는 0000 이런식이 될듯? 세븐세그먼트 보고 결정해야될듯
        createToast();
    }
})

firebase.database().ref('cam2').on('value', (snapshot) => {
    //원래있던 내용 지워버리고
    while (cam2List.hasChildNodes()) {
        cam2List.removeChild(cam2List.firstChild);
    }

    //새로쓰기
    var machine2 = snapshot.val().machine;
    var current2 = snapshot.val().current;
    addCam2List(machine2, current2);

    if (current2 == '0') {//실제로는 0000 이런식이 될듯? 세븐세그먼트 보고 결정해야될듯
        createToast();
    }
})
