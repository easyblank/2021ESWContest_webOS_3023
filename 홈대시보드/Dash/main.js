//시계 js
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
//----------- 시계 끝 ------------//



//------------ 날씨 js 시작 ------------//
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
    iconElement.innerHTML = `<img src="../icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; //그냥 한글로 수정하든가
}

//10분마다 새로고침
setInterval('setPosition()',10000*60);

//----------- 날씨 js 끝 -------------//



//----------- NFC tag js 시작 ------------//

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
//--------------------------//

//<ul>에 요소들을 추가할 준비를 한다
const list = document.getElementById('list');
// const list_2 = document.getElementById('list_2');

//firestore에서 값을 받아 온 뒤 변수에 저장하고 append하는 함수
function renderList(doc) {
    let idForDiv = document.createElement('div');
    let name = document.createElement('p');
    let sec = document.createElement('li');
    let gen = document.createElement('li');

    idForDiv.setAttribute('id',doc.data().ID)
    name.innerHTML = doc.data().Product;
    sec.innerHTML = '유통기한: '+ doc.data().Dday;
    gen.innerHTML = '메모: '+ doc.data().Memo;


    idForDiv.appendChild(name);
    idForDiv.appendChild(sec);
    idForDiv.appendChild(gen);


    list.appendChild(idForDiv);
    // list_2.appendChild(idForDiv);

}

//nfcTag collention의 snapshot을 지켜보는 함수
cloudDB.collection('nfcTag').onSnapshot((snapshot) => {
    //원래있던 내용 다 지워버리고
    while ( list.hasChildNodes() ) {
        list.removeChild( list.firstChild );
    }
    // while ( list_2.hasChildNodes() ) {
        // list_2.removeChild( list.firstChild );
    // }
    //새로 쓰기
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })
})

//------- NFC js 끝 ---------//





//------- 라벨 시작 --------//
let safetyCam = document.getElementById("safetyCam");

function iframeOpenClose(){
    if($('.camera-box').hasClass('active')){
        safetyCam.setAttribute('src','http://172.20.10.7/stream');//스트리밍 주소
    } else {
        safetyCam.setAttribute('src',' ');
    }
}

$(document).ready(function(){
    $('#rectangle_2').click(function() {
        console.log("클릭")
        $("#datetime").toggleClass("active");
        $(".camera-box").toggleClass("active");
    }, function(){
        $("#datetime").toggleClass("active");
        $(".camera-box").toggleClass("active");
        iframeOpenClose();
    });    
});    

$(document).ready(function(){
    $('#rectangle_3').click(function() {
        $("#datetime").toggleClass("active");
        $("#safety-cam").toggleClass("active");
        $(".nfc-app ul").toggleClass("active");
    }, function(){
        $("#datetime").toggleClass("active");
        $("#safety-cam").toggleClass("active");
        $(".nfc-app ul").toggleClass("active");
        iframeOpenClose();
    });    
});    

$(document).ready(function(){
    $('.machine').click(function() {
        $("#datetime").toggleClass("active");
        $("#safety-cam").toggleClass("active");
        $(".nfc-app").toggleClass("active");
        $(".noti ul").toggleClass("active");
    }, function(){
        $("#datetime").toggleClass("active");
        $("#safety-cam").toggleClass("active");
        $(".nfc-app").toggleClass("active");
        $(".noti ul").toggleClass("active");
        iframeOpenClose();
    });    
});



//--------- 라벨 끝 -----------//


//---------------노티 js-------------------//
//티스토리에서 긁어온 토스트 예제
var bridge = new WebOSServiceBridge();
function toastCallback(msg) {
    var response = JSON.parse(msg);
    console.log(response);
}
function createToast() {
    var url = 'luna://com.webos.notification/createToast';
    
    bridge.onservicecallback = toastCallback;

    var params = {
        "message":"오븐이 완료되었습니다!"
    };
    console.log("before-bridge.call");
    bridge.call(url, JSON.stringify(params));
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

function addCam1List(machine1,current1){
    
    let notiContainer1 = document.createElement('div');
    let _machine1 = document.createElement('p');
    let _current1 = document.createElement('li');
    
    _machine1.innerHTML = machine1;
    _current1.innerHTML = '남은시간: '+current1;
    
    notiContainer1.appendChild(_machine1);
    notiContainer1.append(_current1);
    
    cam1List.appendChild(notiContainer1);
}

function addCam2List(machine2,current2){
    
    let notiContainer2 = document.createElement('div');
    let _machine2 = document.createElement('p');
    let _current2 = document.createElement('li');
    
    _machine2.innerHTML = machine2;
    _current2.innerHTML = '남은시간: '+current2;
    
    notiContainer2.appendChild(_machine2);
    notiContainer2.append(_current2);
    
    cam2List.appendChild(notiContainer2);
}

firebase.database().ref('cam1').on('value',(snapshot)=>{
    //원래있던 내용 지워버리고
    while ( cam1List.hasChildNodes() ) {
        cam1List.removeChild(cam1List.firstChild);
    }
    
    //새로쓰기
    let machine1 = snapshot.val().machine;
    let current1 = snapshot.val().current;
    addCam1List(machine1,current1);
    
    if (current1=='0'){
        createToast();
    }
})

firebase.database().ref('cam2').on('value',(snapshot)=>{
    //원래있던 내용 지워버리고
    while ( cam2List.hasChildNodes() ) {
        cam2List.removeChild(cam2List.firstChild);
    }
    
    //새로쓰기
    var machine2 = snapshot.val().machine;
    var current2 = snapshot.val().current;
    addCam2List(machine2,current2);
    
    if (current2=='0'){
        createToast();
    }
})