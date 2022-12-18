import React from "react";
import EventCardBookmark from "../events/lists/eventCardBookmark";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

function UserEvents({ events }) {
  return (
    <div className="m-4">
      <div className="text-2xl font-bold border-b-2 text-[#393e46]">
        <EventOutlinedIcon /> Events owned by you
      </div>
      <div className="events_grid_profile">
        {events?.length !== 0
          ? events?.map((event) => (
              <EventCardBookmark event={event} key={event?._id} />
            ))
          : null}
      </div>
    </div>
  );
}

export default UserEvents;
