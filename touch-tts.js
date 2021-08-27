//tts function----------------------------//
function speak(content) {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'ko-KR';
    utter.text = content;
    utter.volume = 0.5;
    
    // speak 여기앞에 있던 window.을 뺐음!! 라즈베리파이에서 작동하는지 확인!
    speechSynthesis.speak(utter);
}
//tts할 텍스트는 무조건 content 변수에 담기!!
let content;
//---------------------------------------//


//tts for nfc-section--------------------//
let nfcSection = document.getElementById('list');

nfcSection.addEventListener('click', (event)=>{
    console.log("clicked");
    //클릭한 요소의 부모 요소의 아이디를 변수에 담는다
    let targetID = event.target.parentNode.id;

    let nfcDiv = document.getElementById(targetID);
    content = nfcDiv.innerText
    
    speak(content);
    console.log("tts started");
})
//-------------------------------------//


//tts for digital clock----------------//
let clockSection = document.getElementById('datetime')

clockSection.addEventListener("click",()=>{
    let _date = document.getElementById('date');
    let _period = document.getElementById('period');
    let _hour = document.getElementById('hour');
    let _minutes = document.getElementById('minutes');
    
    let date = _date.innerText;
    let period = _period.innerText;
    let hour = _hour.innerText;
    let minutes = _minutes.innerText;

    content = `${date} ${period} ${hour}시 ${minutes}분`;

    speak(content);
});
//-------------------------------------//


//tts for weather----------------------//
let weatherSection = document.getElementById('weather');

weatherSection.addEventListener("click",()=>{
    let _temp = document.getElementById('temp');
    let _weath = document.getElementById('weath');

    let temp = _temp.innerText;
    let weath = _weath.innerText;

    content = `현재 기온은 ${temp}이고, 날씨는 ${weath} 상태입니다.`;

    speak(content);
})
//-------------------------------------//


//safety cam

let clickCam = document.getElementById('safety-cam');
let exit = document.getElementById('exit');
let camOn = document.getElementById('cam-on');
let showCam = document.getElementById('show-cam');
let defaultPage = document.getElementById('default');


clickCam.addEventListener('click', () => {

    console.log("default")
    defaultPage.setAttribute('style', 'display:none');
    showCam.setAttribute('style', ' ');
    camOn.setAttribute('src','http://192.168.0.105:81/stream');

});

exit.addEventListener('click', () => {
    console.log("clicked")
    showCam.setAttribute('style', 'display:none');
    defaultPage.setAttribute('style', ' ');
    camOn.setAttribute('src',' ')
});



//날씨 js
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
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; //그냥 한글로 수정하든가
}

//10분마다 새로고침
setInterval('setPosition()',10000*60);




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

}

//nfcTag collention의 snapshot을 지켜보는 함수
cloudDB.collection('nfcTag').onSnapshot((snapshot) => {
    //원래있던 내용 다 지워버리고
    while ( list.hasChildNodes() ) { 
        list.removeChild( list.firstChild );
    }
    //새로 쓰기
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })
})
