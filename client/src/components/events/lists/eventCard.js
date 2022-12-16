import { Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { fullNameFormatter } from "../../../utils/helper";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <div className="mb-4 px-4 py-2 border-[1px] border-[#393e4657] rounded-md text-[#393e46]">
      <div className="flex">
        <div>
          <img
            className="event_banner"
            // src={event.event_banner_url}
            src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F336872189%2F412671342061%2F1%2Foriginal.20220817-060523?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=47201003009aab40a827c78813e5f381"
            alt="event-poster"
          />
        </div>
        <div className="flex flex-col justify-between py-2 pl-4">
          <div>
            <div className="flex">
              <div
                className="text-2xl font-bold cursor-pointer"
                onClick={() => navigate("/event/" + event._id)}
              >
                {event.eventTitle}
              </div>
            </div>

            {/* <div className="text-lg font-light mt-1">
            <p className="event_description">{event.description}</p>
          </div> */}
            <div className="mt-1 font-semibold">
              {/* <div className="text-lg"><LocationOnIcon /> {getAddressFormatted(event.address)}</div> */}
              <div className="text-lg flex items-center">
                <LocationOnIcon /> <span className="ml-1">{event.address}</span>
              </div>
              <div className="text-lg flex items-center">
                <DateRangeIcon />
                <span className="ml-1">
                  {moment(event.startDateTime).format("llll")}
                </span>
                <span className="mx-1">-</span>
                <span>{moment(event.endDateTime).format("llll")}</span>
              </div>
            </div>

            <div className="flex mt-2">
              {event.tags.map((tag, i) => (
                <span className="mr-1 text-logoBlue" key={i}>
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
              onClick={
                () => {}
                // navigate(
                //   loggedInUserId === event?.user_id
                //     ? "/profile"
                //     : "/profile/" + event?.username
                // )
              }
            >
              <span className="text-lg font-bold">{event?.username}&nbsp;</span>
              <span className="text-lg font-light">
                {fullNameFormatter(event?.firstName, event?.lastName)}
              </span>
            </div>
            <div>on {moment(event.dateCreated).format("ll")}</div>
          </div>

          {/* <div className="mt-2 flex items-center font-light text-[#5f636a] text-xl">
            By&nbsp;
            <div
              className="text-[#393e46] font-normal cursor-pointer"
              onClick={() => navigate("/profile/" + event?.user_id)}
            >
              {fullNameFormatter(event?.firstName, event?.lastName)}
            </div>
            <div>&nbsp;{moment(event.dateCreated).format("ll")}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
