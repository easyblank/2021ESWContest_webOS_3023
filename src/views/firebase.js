// // import * as firebase from "/Users/admin/Desktop/embeddedSW/0729/node_modules/firebase"
// // import * as firebase from "firebase/app"
// import firebase from "firebase"
// // import "firebase/auth"
// import "firebase/firestore"
// import "firebase/database"
// import "firebase/firestore"
// import "firebase/storage"
// import "firebase/auth"

// const firebaseConfig = {
//     apiKey: "AIzaSyD6wtIO0IpeqD9WFG97h9uBPALhHJyYB7s",
//     authDomain: "embeddedsw-815bb.firebaseapp.com",
//     projectId: "embeddedsw-815bb",
//     storageBucket: "embeddedsw-815bb.appspot.com",
//     messagingSenderId: "311792283076",
//     appId: "1:311792283076:web:3d10570bd706c252ac8891"
//   };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// //   firebase.initializeApp(firebaseConfig);
// const dbService = firebaseApp.firestore();
// export default dbService;


//   export const firebaseInstance = firebase;

//   import * as firebase from "firebase/app";
  import firebase from "firebase/app"
  import "firebase/auth";
  import "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyCNbT5y9eVPsZ-8f1lJXkdU2PZWOT8hNcM",
    authDomain: "embedded-b2eaa.firebaseapp.com",
    projectId: "embedded-b2eaa",
    storageBucket: "embedded-b2eaa.appspot.com",
    messagingSenderId: "919508690950",
    appId: "1:919508690950:web:01bb4d918866aff31a7b87"
  };
  firebase.initializeApp(firebaseConfig);
  export const firebaseInstance = firebase;
  export const authService = firebase.auth();
export const dbService = firebase.firestore();