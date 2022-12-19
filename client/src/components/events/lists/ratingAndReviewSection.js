import React from "react";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { Paper, Rating } from "@mui/material";

function RatingsAndReviews({ eventRating, updateRating }) {
  console.log(eventRating);
  return (
    <Paper className="mt-3 px-2 py-1" elevation={3}>
      <div>
        <div className="font-bold text-2xl mb-2 section_divider">
          <ThumbsUpDownIcon /> Ratings
        </div>
        <div>
          <div className="w-full">
            <div className="px-10 py-5 m-auto text-center">
              <div>Event Rating</div>
              <div className="flex flex-col items-center">
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={eventRating}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    updateRating(newValue);
                  }}
                />
                <div className="font-semibold text-2xl text-[#393e46] w-fit event_rating_number">
                  {eventRating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default RatingsAndReviews;
