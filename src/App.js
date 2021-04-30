import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "react-bootstrap/Button";

import firebaseConfig from "./Firebase.config";
import { useState } from "react";
firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });
  const googleprovider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handlersSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleprovider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handlersSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {});
  };
  const handleblar = (event) => {
    let isFildValied = true;
    if (event.target.name === "email") {
      isFildValied = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 8;
      const passwordHashNumber = /\d{1}/.test(event.target.value);
      isFildValied = isPasswordValid && passwordHashNumber;
    }
    if (isFildValied) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmitForm = (err) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // let errorMessage = error.message;
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log("Signed In userInfo", res.user);
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    err.preventDefault();
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("Name Update successfully");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  const handlerFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        console.log(result);
        // /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // The signed-in user info.
        const user = result.user;
        console.log("FaceBook User", user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;

        // ...
      });
  };

  return (
    <div className="App">
      {user.isSignedIn ? (
        <Button variant="light" onClick={handlersSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="light" onClick={handlersSignIn}>
          Sign in
        </Button>
      )}
      <br />
      <button onClick={handlerFbSignIn}>Sign In with Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome! {user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>
      <input
        type="checkbox"
        name="newUser"
        id=""
        onChange={() => {
          setNewUser(!newUser);
        }}
      />
      <label htmlFor="newUser">Registration for New user</label>

      <form onSubmit={handleSubmitForm}>
        {newUser && (
          <input
            type="text"
            onBlur={handleblar}
            name="name"
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleblar}
          name="email"
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleblar}
          name="password"
          placeholder="Your password"
          required
        />
        <br />
        <input type="submit" value={!newUser ? "Sign In" : "Sign Up"} />
      </form>
      <br />
      <h3 style={{ color: "red" }}>{user.error}</h3>
      {user.password && (
        <h3 style={{ color: "green" }}>
          User {newUser ? "Created" : "Log In "} Successfully !
        </h3>
      )}
    </div>
  );
}

export default App;
