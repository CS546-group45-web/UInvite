import "./App.css";
import React from "react";
import Login from "./components/login";
import Feeds from "./components/home/feeds";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      <Routes>
        {isLoggedIn && <Route exact path="/feeds" element={<Feeds />} />}

        <Route exact path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
