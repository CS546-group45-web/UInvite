import React from "react";
import EventCardBookmark from "../events/lists/eventCardBookmark";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { useNavigate } from "react-router";

function UserEvents({ events }) {
  const navigate = useNavigate();
  return (
    <div className="m-4">
      <div className="text-2xl font-bold border-b-2 text-[#393e46]">
        <EventOutlinedIcon /> Events owned by you
      </div>
      <div className="events_grid_profile">
        {events?.length !== 0 ? (
          events?.map((event) => (
            <EventCardBookmark event={event} key={event?._id} />
          ))
        ) : (
          <div className="text-lg font-semibold text-[#393e46]">
            No events created by you. I think you should try
            <span
              className="underline"
              onClick={() => navigate("/create-event")}
            >
              &nbsp;this
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserEvents;
