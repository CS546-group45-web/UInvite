import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import RsvpIcon from "@mui/icons-material/Rsvp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";

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
];

function Nav() {
  const signOutUser = () => {
    localStorage.setItem("auth", false);
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col justify-between h-screen pl-4 pr-2 py-8 border-r-gray-200 border-r-2 col-span-2 bg-white">
      <div>
        <div className="h-20 flex justify-center items-center">
          <span className="text-3xl">UInvite</span>
        </div>

        <div>
          {navOptions.map((item, key) => (
            <Link to={item.path} key={key}>
              <div className="w-full px-2 py-4 my-3 text-ellipsis overflow-hidden whitespace-nowrap rounded-full hover:bg-zinc-200">
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
