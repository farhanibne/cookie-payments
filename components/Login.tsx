import React, { ReactElement } from "react";
import firebase from "../firebase/firebaseClint"

interface Props {}

export default function Login({}: Props): ReactElement {
  async function signInwithGoogle() {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    console.log({ ...userCredentials.user });

    firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });
  }

  return (
    <div>
      <button onClick={() => signInwithGoogle()}>Sign in with Google</button>
    </div>
  );
}