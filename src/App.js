import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "react-bootstrap/Button";

import firebaseConfig from "./Firebase.config";
import { useState } from "react";
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const provider = new firebase.auth.GoogleAuthProvider();

  const handlersSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
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
      {user.isSignedIn && (
        <div>
          <p>Welcome! {user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
