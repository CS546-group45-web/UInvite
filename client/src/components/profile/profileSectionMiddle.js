import { Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function ProfileSectionMiddle(
  followers,
  following,
  events_created,
  rsvped_events
) {
  const navigate = useNavigate();
  return (
    <div className="text-[#393e46]">
      <div className="text-2xl font-bold">Followers</div>
      <Divider />
      <div className="ml-2">
        {followers?.length > 0 ? (
          followers?.map((item, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => navigate("/profile/" + item.username)}
              >
                {item.username}
              </div>
            );
          })
        ) : (
          <div className="text-xl">No followers to show!</div>
        )}
      </div>
      <div className="text-2xl font-bold">Following</div>
      <Divider />
      <div className="ml-2">
        {following?.length > 0 ? (
          following?.map((item, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => navigate("/profile/" + item.username)}
              >
                {item.username}
              </div>
            );
          })
        ) : (
          <div className="text-xl">No followings to show!</div>
        )}
      </div>
      <div className="text-2xl font-bold">Events</div>
      <Divider />
      <div className="ml-2">
        {rsvped_events?.length > 0 ? (
          rsvped_events?.map((item, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => navigate("/events/" + item.id)}
              >
                {item.title}
              </div>
            );
          })
        ) : (
          <div className="text-xl">No events to show!</div>
        )}
      </div>
      <div className="text-2xl font-bold">RSVP</div>
      <Divider />
      <div className="ml-2">
        {events_created?.length > 0 ? (
          events_created?.map((item, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => navigate("/events/" + item.id)}
              >
                {item.title}
              </div>
            );
          })
        ) : (
          <div className="text-xl">No events to show!</div>
        )}
      </div>
    </div>
  );
}

export default ProfileSectionMiddle;
