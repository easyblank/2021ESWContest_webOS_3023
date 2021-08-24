let clicked = document.getElementById("listen");

//log div에 등록 완료 추가하기
function updateLog(message){
  var log = document.getElementById("log");

  var _log = document.createElement('p');

  _log.innerHTML = message;

  log.appendChild(_log);
}

if ("NDEFReader" in window) { //모바일 크롬에서만 작동한다
  
  var content;
  window.addEventListener("load", async () =>{ //await를 쓰기위한 async. 페이지가 로드 되었을 때 실행

    const ndef = new NDEFReader();
    await ndef.scan();
    ndef.onreading = async ({ message }) => {
      for (const record of message.records) {
        switch (record.recordType) { //데이터 타입이 text일때 message 읽기를 실행한다.
          case "text":
            const textDecoder = new TextDecoder(record.encoding);
            updateLog(`${textDecoder.decode(record.data)}`);

            content = textDecoder.decode(record.data);
            break;
          default:
            log(`Record not handled`);
        }
      }
    };
    
    
    clicked.addEventListener("click",function(){
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
    });
  });
  
}