import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DefaultCoverImage from "../../../assets/images/default_cover_image.jpg";

function EventCardBookmark({ event }) {
  const navigate = useNavigate();
  const { _id, eventTitle, address, startDateTime, event_photo_url } = event;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            event_photo_url
              ? process.env.REACT_APP_BASE_URL + "/images/" + event_photo_url
              : DefaultCoverImage
          }
          alt={eventTitle}
        />
        <CardContent>
          <div
            className="text-xl font-bold cursor-pointer text_ellipsis__bookmark_card"
            onClick={() => navigate("/event/" + _id)}
          >
            {eventTitle}
          </div>
          <div className="mt-1 font-semibold">
            {/* <div className="text-lg"><LocationOnIcon /> {getAddressFormatted(address)}</div> */}
            <div className="text-lg flex items-center text_ellipsis__bookmark_card">
              <LocationOnIcon />
              &nbsp;{address}
            </div>
            <div className="text-lg">
              <div className="flex items-center">
                <DateRangeIcon />
                &nbsp;{moment(startDateTime).format("ll")}
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventCardBookmark;
