import { Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { getAddressFormatted, getFormattedDate } from "../../../utils/helper";

function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <div className="mb-4 px-4 py-2 border-[1px] border-[#393e4657] rounded-md text-[#393e46]">
      <div>
        <div>
          <img
            className="event_banner"
            // src={event.event_banner_url}
            src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F336872189%2F412671342061%2F1%2Foriginal.20220817-060523?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=47201003009aab40a827c78813e5f381"
            alt="event-poster"
          />
        </div>
        <div className="flex items-end">
          <div
            className="text-3xl font-bolder cursor-pointer"
            onClick={() => navigate("/event/" + event.event_id)}
          >
            {event.Name}
          </div>
          <div className="mx-2 font-3xl font-light">.</div>
          <div className="font-3xl text-[#393e46] ml-1">
            {moment(event.date_created).format("lll")}
          </div>
        </div>

        <div className="flex text-xl font-light">
          <div>{getAddressFormatted(event.address)}</div>
          <div className="mx-2 font-3xl font-light">|</div>
          <div className="">{moment(event.start_date_time).format("lll")}</div>
          <div className="mx-2">-</div>
          <div className="">{moment(event.end_date_time).format("lll")}</div>
        </div>
      </div>

      <div className="mt-2">
        <div
          className="my-2 text-[#393e46] text-xl cursor-pointer"
          onClick={() => navigate("/profile/" + event.user_id)}
        >
          organizer name
        </div>

        {event.tags.map((tag, i) => (
          <span className="mr-1 text-logoBlue" key={i}>
            <Chip label={tag} variant="outlined" className={"tags_chip"} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default EventCard;
