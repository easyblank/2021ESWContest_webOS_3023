
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
    let name = document.createElement('h2');
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