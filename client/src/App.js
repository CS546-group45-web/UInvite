import "./App.css";
import React from "react";
import Login from "./components/login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/signup";
import CreateEvent from "./components/events/createEvent";
import EventsList from "./components/events/lists";
import Nav from "./components/navbar";
import ForgotPassword from "./components/forgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("auth") === "true" ? true : false;
  };

  const styles = () =>
    isAuthenticated() ? "col-span-10 px-5 py-5" : "col-span-12 px-5 py-5";

  return (
    <div className="App bg-gray-50 h-screen">
      <BrowserRouter>
        <div className="grid grid-cols-12 h-full">
          {isAuthenticated() && <Nav />}
          <div className={styles()}>
            <Routes>
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
              <Route
                path="/forgot-password"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/" replace />
                  ) : (
                    <ForgotPassword />
                  )
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

        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
