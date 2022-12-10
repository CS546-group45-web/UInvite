import "./App.css";
import React from "react";
import Login from "./components/login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/signup";
import CreateEvent from "./components/events/createEvent";
import EventsList from "./components/events/lists";
import EventsListInvited from "./components/events/invitedEvents";
import EventsListRSVP from "./components/events/rsvpEvents";
import Profile from "./components/profile";
import Calendar from "./components/Calendar";
import Nav from "./components/navbar";
import ForgotPassword from "./components/forgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyUser from "./components/verifyUser";
import ResetPassword from "./components/resetPassword";
import FollowerProfile from "./components/profile/followerProfile";

function App() {
  const styles = () =>
    isAuthenticated()
      ? "col-span-10 px-5 py-5 overflow-auto scroller"
      : "col-span-12 px-5 py-5";

  const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem("auth") === "true");
  };

  return (
    <div className="App bg-gray-50 h-screen">
      <BrowserRouter>
        <div className="grid grid-cols-12 h-[101%]">
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
              <Route path="/verify/:token" exact element={<VerifyUser />} />

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
                path="/profile"
                exact
                element={
                  isAuthenticated() ? (
                    <Profile />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/profile/:id"
                exact
                element={
                  isAuthenticated() ? (
                    <FollowerProfile />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/reset/:token"
                exact
                element={
                  isAuthenticated() ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route
                path="/my-events"
                exact
                element={
                  isAuthenticated() ? (
                    <EventsListRSVP />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/calendar"
                exact
                element={
                  isAuthenticated() ? (
                    <Calendar />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/invites"
                exact
                element={
                  isAuthenticated() ? (
                    <EventsListInvited />
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
