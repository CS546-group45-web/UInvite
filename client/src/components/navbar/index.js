import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import RsvpIcon from "@mui/icons-material/Rsvp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
// import HomepageLogo from "../../assets/images/logos/Homepage_logo.png";

const navOptions = [
  {
    name: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    name: "Invites",
    icon: InsertInvitationIcon,
    path: "/invites",
  },
  {
    name: "My Events",
    icon: RsvpIcon,
    path: "/my-events",
  },
  {
    name: "Create event",
    icon: AddAlertIcon,
    path: "/create-event",
  },
  {
    name: "Profile",
    icon: AccountCircleIcon,
    path: "/profile",
  },
  {
    name: "Calendar",
    icon: InsertInvitationIcon,
    path: "/profile",
  },
];

function Nav() {
  const signOutUser = () => {
    localStorage.setItem("auth", false);
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col justify-between h-screen pl-4 pr-2 py-8 border-r-logoBlue border-r-2 col-span-2 bg-logoBlueLight">
      <div>
        <div className="h-20 flex justify-center items-center">
          <span className="text-3xl flex items-center">
            {/* <img src={HomepageLogo} alt="HomepageLogo" /> */}
            <svg
              style={{ margin: "0px -25px -15px" }}
              viewBox="0 0 500 500"
              version="1.1"
              id="svg_null"
              width={100}
              height={100}
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="25.963%"
                  x2="50%"
                  y2="100%"
                  id="linearGradient-1"
                >
                  <stop stop-color="#FEFEFE" offset="0%" />
                  <stop stop-color="#D2D4D5" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="linearGradient-2"
                >
                  <stop stop-color="#D4D5D6" offset="0%" />
                  <stop stop-color="#FAFBFB" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="71.7%"
                  y1="37.738%"
                  x2="0%"
                  y2="100%"
                  id="linearGradient-3"
                >
                  <stop stop-color="#FEFEFE" offset="0%" />
                  <stop stop-color="#D2D4D5" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="112.505%"
                  y1="100%"
                  x2="25.798%"
                  y2="100%"
                  id="linearGradient-4"
                >
                  <stop stop-color="#FDFDFD" offset="0%" />
                  <stop stop-color="#D5D7D8" offset="100%" />
                </linearGradient>
              </defs>
              <g
                id="root"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <rect
                  id="background.accent"
                  fill=""
                  x="0"
                  y="0"
                  width="500"
                  height="500"
                />
                <g id="shape" transform="translate(150.000000, 99.000000)">
                  <polygon
                    fill="url(#linearGradient-1)"
                    points="158.821 19.769 40.206 19.769 40.206 39.538 178.59 39.538 178.59 197.692 198.359 177.923 198.359 19.769"
                  />
                  <polygon
                    fill="url(#linearGradient-2)"
                    points="158.821 39.538 158.821 177.923 .667 177.923 20.436 197.692 139.052 197.692 178.59 197.692 178.59 158.154 178.59 39.538"
                  />
                  <polygon
                    fill="url(#linearGradient-3)"
                    points="20.436 0 .667 19.769 .667 138.384 .667 177.923 40.206 177.923 158.821 177.923 158.821 158.154 20.436 158.154"
                  />
                  <polygon
                    fill="url(#linearGradient-4)"
                    points="20.436 0 20.436 39.538 20.436 158.154 40.206 158.154 40.206 19.769 198.359 19.769 178.59 0"
                  />
                  <polygon
                    fill="#C8C8C8"
                    points="158.821 47.226 178.59 47.226 178.59 39.538 158.821 39.538"
                  />
                </g>
              </g>
            </svg>
            UInvite
          </span>
        </div>

        <div>
          {navOptions.map((item, key) => (
            <Link to={item.path} key={key}>
              <div className="w-full px-2 py-4 my-3 text-ellipsis overflow-hidden whitespace-nowrap rounded-full hover:border-1">
                <item.icon />
                <span className="ml-2">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div
          className="w-full px-2 py-4 my-3 text-ellipsis overflow-hidden whitespace-nowrap rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={signOutUser}
        >
          <LogoutIcon />
          <span className="ml-2 sm:invisible md:visible">Sign out</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
