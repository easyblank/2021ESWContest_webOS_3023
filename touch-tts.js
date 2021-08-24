//tts for nfc-section--------------------//
var nfcSection = document.getElementById('list');

nfcSection.addEventListener('click', (event)=>{
    var isDiv = event.target.parentNode.nodeName === 'DIV';
    
    var targetID = event.target.parentNode.id;
    var getEle = document.getElementById(targetID);
    var content = getEle.innerText
    
    if (isDiv) {
        console.log(content);
        let utter = new SpeechSynthesisUtterance();
        // utter.lang = 'en-US';
        utter.lang = 'ko-KR';
        utter.text = content;
        utter.volume = 0.5;

        // event after text has been spoken
        // utter.onend = function() {
        //     alert('Speech has finished');
        // }

        // speak
        window.speechSynthesis.speak(utter);
    }
})

//-------------------------------------//