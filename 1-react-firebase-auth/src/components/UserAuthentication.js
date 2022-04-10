import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export function UserAuthentication() {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const [loginData, setLoginData] = useState({});

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setLoginData({ ...loginData, ...newInput });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => console.log(response))
      .catch((err) => alert(err.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        console.log(response);
        console.log(
          "name: ",
          response.user.name,
          "Token: ",
          response.user.accessToken
        );
      })
      .catch((err) => alert(err.message));
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((response) => console.log(response))
      .catch((err) => alert(err.message));
  };

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <h2>SingUp</h2>
      <input name="email" placeholder="Email" onChange={handleInput} />
      <input name="password" placeholder="Password" onChange={handleInput} />
      <button onClick={handleSignUp}>Create User</button>
      <br />
      <br />
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleInput} />
      <input name="password" placeholder="Password" onChange={handleInput} />
      <button onClick={handleLogin}>Login</button>

      <br />
      <br />
      <h2>Google Auth Provider</h2>

      <button onClick={handleLoginWithGoogle}>Login with Google</button>
      <br />
      <br />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
