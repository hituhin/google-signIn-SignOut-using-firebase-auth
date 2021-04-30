# What is this?

This is the symple firebase-auth system. 

## Basic Installation

# For Firebase Setup
  npm install --save firebase
# For Firebase Configaration in your project
  firebase.initializeApp(firebaseConfig); // initialize in your working page
  Export from Firebase.config.js made by you in your src folder
  the confic method is:
  
  const firebaseConfig = {
  apiKey: "AIzaSyBqAHrYAa4MG9UYiMYgAdJfyX1G-D3y2kk",
  authDomain: "ema-john-09.firebaseapp.com",
  projectId: "ema-john-09",
  storageBucket: "ema-john-09.appspot.com",
  messagingSenderId: "683764940571",
  appId: "1:683764940571:web:c10ecea7fbdeea008cddbe",
};

export default firebaseConfig;
 
All this info you got when you create a new project in firebase.

# Auth with google Account
  const googleprovider = new firebase.auth.GoogleAuthProvider();
# Auth with Facebook Account
  var provider = new firebase.auth.FacebookAuthProvider();
  you need to create facebook project from
  https://developers.facebook.com/apps/?show_reminder=true

### `google Sign In Method

firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

### `Facebook Sign in Method
firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });`


### `More detail about Firebase Auth
  https://firebase.google.com/docs/auth/web/start?authuser=0
  



