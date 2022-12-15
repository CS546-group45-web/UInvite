import { Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { getAddressFormatted } from "../../../utils/helper";

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
        <div className="flex flex-col justify-start py-2 pl-4">
          <div className="flex items-baseline">
            <div
              className="text-3xl font-bold cursor-pointer"
              onClick={() => navigate("/event/" + event.event_id)}
            >
              {event.Name}
            </div>

            <div className="text-lg text-[#393e46] ml-1 font-thin">
              posted on {moment(event.date_created).format("lll")}
            </div>
          </div>

          <div className="text-lg font-light mt-1">
            <p className="event_description">{event.Description}</p>
          </div>
          <div className="flex mt-1">
            {event.tags.map((tag, i) => (
              <span className="mr-1 text-logoBlue" key={i}>
                <Chip
                  label={"#" + tag}
                  variant="outlined"
                  className={"tags_chip"}
                />
              </span>
            ))}
          </div>
          <div className="mt-2 text-2xl font-semibold">
            Event details
            <div className="text-lg">{getAddressFormatted(event.address)}</div>
            <div className="text-lg">
              <span>{moment(event.start_date_time).format("lll")}</span>
              <span className="mx-1">-</span>
              <span>{moment(event.end_date_time).format("lll")}</span>
            </div>
          </div>

          <div className="mt-2">
            <div
              className="text-[#393e46] text-xl cursor-pointer"
              onClick={() => navigate("/profile/" + event?.user_id)}
            >
              Posted by organizer name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
