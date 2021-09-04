//---------------노티 js-------------------//
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

    if (current1=='0'){//실제로는 0000 이런식이 될듯? 세븐세그먼트 보고 결정해야될듯
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

    if (current2=='0'){//실제로는 0000 이런식이 될듯? 세븐세그먼트 보고 결정해야될듯
        createToast();
    }
})