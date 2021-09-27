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
let popup = document.getElementById('popup');
let inner = document.getElementById('inner');
let pexit = document.getElementById('pexit');

function popUp() {
    defaultPage.setAttribute('style', 'display:none');
    popup.setAttribute('style', ' ');
    inner.innerText = content ;
}

// pexit.addEventListener('click', () => {
//     console.log("clicked")
//     popup.setAttribute('style', 'display:none');
//     defaultPage.setAttribute('style', ' ');
// });

// nfcSection.addEventListener('click', (event)=>{
//     console.log("clicked");
//     //클릭한 요소의 부모 요소의 아이디를 변수에 담는다
//     let targetID = event.target.parentNode.id;

//     let nfcDiv = document.getElementById(targetID);
//     content = nfcDiv.innerText

//     speak(content);
//     console.log("tts started");

//     popUp();

// })

//-------------------------------------//


//tts for digital clock----------------//
// let clockSection = document.getElementById('datetime')

// clockSection.addEventListener("click",()=>{
//     let _date = document.getElementById('date');
//     let _period = document.getElementById('period');
//     let _hour = document.getElementById('hour');
//     let _minutes = document.getElementById('minutes');

//     let date = _date.innerText;
//     let period = _period.innerText;
//     let hour = _hour.innerText;
//     let minutes = _minutes.innerText;

//     content = `${date} ${period} ${hour}시 ${minutes}분`;

//     speak(content);

//     popUp();
// });
//-------------------------------------//


//tts for weather----------------------//
// let weatherSection = document.getElementById('weather');

// weatherSection.addEventListener("click",()=>{
//     let _temp = document.getElementById('temp');
//     let _weath = document.getElementById('weath');

//     let temp = _temp.innerText;
//     let weath = _weath.innerText;

//     content = `현재 기온은 ${temp}이고, 날씨는 ${weath} 상태입니다.`;

//     speak(content);

//     popUp();
// })
//-------------------------------------//
