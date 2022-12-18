import React from "react";
import EventCard from "../events/lists/eventCard";

function Bookmarks({ events }) {
  return (
    <div>
      <div>Bookmarks</div>
      {events?.length !== 0
        ? events?.map((event) => (
            <EventCard event={event} userId={null} key={event?._id} />
          ))
        : null}
    </div>
  );
}

export default Bookmarks;
