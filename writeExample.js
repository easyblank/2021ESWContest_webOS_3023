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

//변수
let submit = document.getElementById("submit");
  
let p = document.getElementById("productName");
let d = document.getElementById("dDay");
let m = document.getElementById("memo");

let productName = p.value;
let dDay = d.value;
let memo = m.value;
let id;


//업데이트 함수
function Update(val,type){
  if(type=='제품명') productName = val;
  else if (type == '유통기한') dDay = val;
  else if (type == '메모') memo = val;
}

//Add Document with Custom ID
function Add_Doc_WithID(){
  cloudDB.collection("Submit").doc(id).set(
      {
          NameOfStd: productName,
          Section: dDay,
          ID: id,
          Gender: memo
      }
  )
  .then(function(){
      console.log("Document written with ID", id);
      var log = document.getElementById("log");

      var _submit = document.createElement('p');
      
      _submit.innerHTML = "등록 완료"
    
      log.appendChild(_submit);
  })
  .catch(function(error){
      console.error("Error adding document", error);
  });
}

if ("NDEFReader" in window){
  var flag;
  console.log(flag);

    submit.addEventListener("click", async()=>{
      flag=1;
      console.log(flag);

      if(flag==1){
        try{
          const ndef = new NDEFReader();
          await ndef.write(
            `제품명: ${productName}
유통기한: ${dDay}
메모: ${memo}`
          );
          console.log("> Message written");
      } catch(error){
          console.log("Argh! " + error);
          flag=0;
          console.log(flag);
      }

      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("> Scan started");
    
        ndef.addEventListener("reading", ({ serialNumber }) => {
           id = serialNumber;
        });
  
        } catch (error) {
        console.log("Argh! " + error);
        flag=2;
        console.log(flag);
        }
        
        console.log("submit clicked for scan")
        Add_Doc_WithID();

        

      }

      
    });

    
}

