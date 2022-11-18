import "./App.css";
import React from "react";
import Login from "./components/login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/signup";
import CreateEvent from "./components/events/createEvent";
import EventsList from "./components/events/lists";
import Nav from "./components/navbar";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("auth");
  };

  return (
    <div className="App bg-gray-50">
      <BrowserRouter>
        <div className="grid grid-cols-12">
          <Nav auth={isAuthenticated()} />
          <div className="col-span-10 px-5 py-5 bg-gray-50">
            <Routes>
              <Route
                path="/create-event"
                exact
                element={
                  isAuthenticated() ? (
                    <CreateEvent />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/"
                exact
                element={
                  isAuthenticated() ? (
                    <EventsList />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  isAuthenticated() ? <Navigate to="/" replace /> : <SignUp />
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated() ? <Navigate to="/" replace /> : <Login />
                }
              />
              {/* NOTE: do we need a 404 Not Found page or redirect to login if not logged-in */}
              <Route
                path="*"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
