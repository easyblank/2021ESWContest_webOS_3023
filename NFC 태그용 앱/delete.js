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

let message = document.getElementById('message');
console.log(message.innerText)

let id=false;

function DeleteDocument(){
    cloudDB.collection("nfcTag").doc(id).delete()
    .then(function(){
        message.innerText = "삭제 완료!"
    })
}


//nfc tagging에 관한 함수
if ("NDEFReader" in window) { //크롬 모바일에서만 작동한다.

    window.addEventListener("load", async () => {

        //스캔을 해서 시리얼 넘버를 받아와 id로 설정해준다.
        while(id==false){
            try {
                const ndef = new NDEFReader();
                await ndef.scan();
    
                ndef.addEventListener("reading", ({ serialNumber }) => {
                    id = serialNumber;
                });
    
            } catch (error) {
                console.log("Argh! " + error);
            }
            console.log(id);
    
        }
        let n = null;
        try {
            const ndef = new NDEFReader();
            await ndef.write(``);
            console.log("> Message deleted");
        } catch (error) {
            console.log("Argh! " + error);
        }


        DeleteDocument();
        console.log("here")
        
    });
}