import { Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { fullNameFormatter } from "../../../utils/helper";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DefaultCoverImage from "../../../assets/images/default_cover_image.jpg";

function EventCard({ event, userId }) {
  const navigate = useNavigate();
  const {
    _id,
    eventTitle,
    tags,
    address,
    startDateTime,
    endDateTime,
    dateCreated,
    user_id,
    username,
    firstName,
    lastName,
    event_photo_url,
  } = event;
  return (
    <div
      className="mb-8 px-4 py-2 border-[1px] border-[#393e4657] rounded-md text-[#393e46] shadow-sm shadow-logoBlue"
      key={event?._id}
    >
      <div className="flex">
        <div
          className="w-5/12 cursor-pointer"
          onClick={() => navigate("/event/" + _id)}
        >
          <img
            className="event_photo"
            src={
              event_photo_url
                ? process.env.REACT_APP_BASE_URL + "/images/" + event_photo_url
                : DefaultCoverImage
            }
            alt="event-poster"
          />
        </div>
        <div className="flex flex-col justify-between py-2 pl-4 w-7/12">
          <div>
            <div className="flex">
              <div
                className="text-2xl font-bold cursor-pointer text_ellipsis"
                onClick={() => navigate("/event/" + _id)}
              >
                {eventTitle}
              </div>
            </div>
            <div className="mt-1 font-semibold">
              {/* <div className="text-lg"><LocationOnIcon /> {getAddressFormatted(address)}</div> */}
              <div className="text-lg flex items-center">
                <LocationOnIcon /> <span className="ml-1">{address}</span>
              </div>
              <div className="text-lg flex items-center">
                <DateRangeIcon />
                <span className="ml-1">
                  {moment(startDateTime).format("llll")}
                </span>
                <span className="mx-1">-</span>
                <span>{moment(endDateTime).format("llll")}</span>
              </div>
            </div>

            <div className="block ">
              {tags.map((tag, i) => (
                <span className="text-logoBlue" key={i}>
                  <Chip
                    // label={"#" + tag}
                    label={tag}
                    variant="outlined"
                    className={"tags_chip"}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="usercard_eventcard">
            <div
              className="cursor-pointer flex items-center"
              onClick={() =>
                navigate(
                  userId === user_id ? "/profile" : "/profile/" + username
                )
              }
            >
              <span className="text-lg font-bold">{username}&nbsp;</span>
              <span className="text-lg font-light">
                {fullNameFormatter(firstName, lastName)}
              </span>
            </div>
            <div>on {moment(dateCreated).format("ll")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
