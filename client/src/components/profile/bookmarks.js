import React from "react";
import EventCardBookmark from "../events/lists/eventCardBookmark";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

function Bookmarks({ events }) {
  return (
    <div className="m-4">
      <div className="text-2xl font-bold border-b-2 text-[#393e46]">
        <BookmarkAddedOutlinedIcon /> Your Bookmarks
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

export default Bookmarks;
