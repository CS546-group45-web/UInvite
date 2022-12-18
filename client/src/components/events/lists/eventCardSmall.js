import { Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DefaultCoverImage from "../../../assets/images/default_cover_image.jpg";

function EventCardSmall({
  event,
  successBtnText,
  cancelBtnText,
  cancelAction,
  successAction,
}) {
  const navigate = useNavigate();
  const { _id, eventTitle, tags, address, startDateTime, event_photo_url } =
    event;

  return (
    <div
      className="mb-8 px-4 py-2 border-[4px] border-[#393e4657] rounded-md text-[#393e46] shadow-lg shadow-logoBlue"
      key={_id}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/event/" + _id)}
          >
            <img
              className="event_photo__smallcard"
              src={
                event_photo_url
                  ? process.env.REACT_APP_BASE_URL +
                    "/images/" +
                    event_photo_url
                  : DefaultCoverImage
              }
              alt="event-poster"
            />
          </div>
          <div className="flex flex-col justify-between py-2 pl-4">
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
                <div className="text-lg ">
                  <div className="flex items-center ml-1">
                    <DateRangeIcon />
                    &nbsp;&nbsp;{moment(startDateTime).format("ll")}
                  </div>
                  {/* <div>&nbsp;-&nbsp;{moment(endDateTime).format("llll")}</div> */}
                </div>
              </div>

              <div className="flex mt-2">
                {tags.map((tag, i) => (
                  <span className="mr-1 text-logoBlue" key={i}>
                    <Chip
                      label={tag}
                      variant="outlined"
                      className={"tags_chip"}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex mt-4">
            {successBtnText && (
              <button
                className="btn_default mr-2"
                onClick={() => successAction(_id)}
              >
                {/* <Loading loading={updateLoading} width={18} />*/}
                {successBtnText}
              </button>
            )}
            {cancelBtnText && (
              <button
                className="btn_default__cancel"
                onClick={() => cancelAction(_id)}
              >
                {cancelBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCardSmall;
