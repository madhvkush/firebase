import "./App.css";
import React from "react";
import { PersonForm } from "./components/AddPeople";
import { UserAuthentication } from "./components/UserAuthentication";
import { PeopleList } from "./components/PeopleList";
// Make sure Firebase is initialized somewhere in your app,
import * as firebase from "./firebaseConfiguration/firebaseConfig";

function App() {
  return (
    <div className="App">
      <UserAuthentication />
      <br />
      <PersonForm />
      <br />
      <PeopleList />
    </div>
  );
}

export default App;
