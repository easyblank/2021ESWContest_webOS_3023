//------conriguration-------//
const firebaseConfig = {
    apiKey: "AIzaSyAx0EqLdT49lj4fET4emeFrrD2ILJuxRcE",
    authDomain: "fir-javascript-afa80.firebaseapp.com",
    databaseURL: "https://fir-javascript-afa80-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-javascript-afa80",
    storageBucket: "fir-javascript-afa80.appspot.com",
    messagingSenderId: "123396908723",
    appId: "1:123396908723:web:61818b7725c15886bdf2c6"
  };
  
  firebase.initializeApp(firebaseConfig);
  let cloudDB = firebase.firestore();


//-----------------------//


//변수를 선언해 준다
// 버튼 클릭을 인식하기 위한 변수
let submit = document.getElementById("submit");

//input에 적혀있는 내용들을 받아오기 위한 변수
let p = document.getElementById("productName");
let d = document.getElementById("dDay");
let m = document.getElementById("memo");

//받아온 input의 내용을 담기 위한 변수
let productName = p.value;
let dDay = d.value;
let memo = m.value;

//firebase document에서 id값을 저장해두기 위한 변수
let id;


//-----------------------//


//write.html 참고 : input의 value를 업데이트 해준다. onInput에서 사용
function Update(val, type) {
    if (type == '제품명') productName = val;
    else if (type == '유통기한') dDay = val;
    else if (type == '메모') memo = val;
}

//log div에 등록 완료 추가하기
function updateLog(message){
    var log = document.getElementById("log");

    var _log = document.createElement('p');

    _log.innerHTML = message;

    log.appendChild(_log);
}

//등록완료되면 input을 비워주는 함수를 만들어보자


//-----------------------//


//처음 등록할 때 사용하는 함수
//nfc 태그의 시리얼 넘버를 받아와 id로 설정 한 뒤 firestore에 등록한다.
function New_submit() {
    cloudDB.collection("nfcTag").doc(id).set(
        {
            Product: productName,
            ID: id,
            Dday: dDay,
            Memo: memo
        }
    )
    .then(function () {
        console.log("Document written with ID", id);
        updateLog("등록 완료");

    })
    .catch(function (error) {
        console.error("Error adding document", error);
        updateLog(error);
    });
}

//원래 등록되어있는 테그의 데이터를 수정해주는 함수
//Updating function
function Modify_inDocument(){
    cloudDB.collection("nfcTag").doc(id).update(
        {
            Product: productName,
            ID: dDay,
            Memo: memo
        }
    )
    .then(function () {
        console.log("Document updated with ID", id);
        updateLog("등록완료");
    })
    .catch(function (error) {
        console.error("Error updating document", error);
        updateLog(error);
    });
}

//등록하려는 nfc tag가 firestore에 존재하는 태그인지 체크하고 새롭게 등록하거나 수정해주는 함수
function Check_and_do_inDocument() {
    cloudDB.collection("Submit").doc(id).get()
    .then(function (doc) {
        if (doc.exists) {
            Modify_inDocument();
        } else {
            New_submit();
        }
    })
}


//-----------------------//


//nfc tagging에 관한 함수
if ("NDEFReader" in window) { //크롬 모바일에서만 작동한다.

    submit.addEventListener("click", async () => { //등록 버튼 클릭시
        //nfc write function
        try {
            const ndef = new NDEFReader();
            await ndef.write(
`제품명: ${productName}
유통기한: ${dDay}
메모: ${memo}`
            );
            console.log("> Message written");
        } catch (error) {
            console.log("Argh! " + error);
            updateLog(error);
        }

        //스캔을 해서 시리얼 넘버를 받아와 id로 설정해준다.
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            console.log("> Scan started");
            updateLog("> Scan started");

            ndef.addEventListener("reading", ({ serialNumber }) => {
                id = serialNumber;
            });

        } catch (error) {
            console.log("Argh! " + error);
            updateLog(error);
        }

        Check_and_do_inDocument();

    });
}

