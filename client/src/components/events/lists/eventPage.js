import moment from "moment";
import React from "react";
import { useParams } from "react-router";
import { getAddressFormatted } from "../../../utils/helper";

function EventPage() {
  const params = useParams();
  const sample = {
    user_id: "manisaiprasad",
    event_id: "78323302ecff990845f53729e24b43ab",
    Name: "DancePeChance",
    Description:
      "We are so excited to be hosting our very first dance competition! This competition is open to all pupils in our school and will be taking place during the month of October. The competition will consist of a variety of dances including modern, salsa, ballroom, and country dances. There will be a total of 4 competitions which will be held on different days. The first competition will be held on the 8th of October and the last competition will be held on the 22nd of October.",
    start_date_time: "2022-12-08T19:58:23.464Z",
    end_date_time: "2022-12-12T19:58:23.464Z",
    address: {
      City: "Jersey City",
      State: "New Jersey",
      Country: "United States",
      Zipcode: "07306",
    },
    date_created: "2022-11-06T19:58:23.464Z",
    Max_rsvps_count: 100,
    event_type: "in-person",
    rsvps: [
      "1d1f7b081e422efe1422b17bf7aeb766",
      "2d1f7b081e422efe1422b17bf7aeb766",
    ],
    waitlist: [
      "1d1f7b081e422efe1422b17bf7aeb766",
      "2d1f7b081e422e fe1422b17bf7aeb766",
    ],
    tags: ["Free Food", "18+", "Alcohol", "DJ", "Free Entry"],
    event_banner_url: "https://localhost:4000/dance.jpg",
    like_count: 100,
    Comments: [
      {
        user_id: "1d1f7b081e422efe1422b17bf7aeb766",
        Name: "Suam",
        Comment: "It was a great Event",
        Date: "2022-11-06T19:58:23.464Z",
      },
    ],
    reviews: [
      {
        user_id: "1d1f7b081e422efe1422b17bf7aeb766",
        Name: "Suam",
        Review: "It was a great Event",
        Date: "2022-11-06T19:58:23.464Z",
        Rating: 4,
      },
    ],
    overall_rating: 3.5,
  };
  const [eventData, setEventData] = React.useState(sample);
  React.useEffect(() => {
    console.log({ params });
    // get event details by id
  });

  const {
    event_banner_url,
    Name,
    event_id,
    date_created,
    Description,
    address,
    start_date_time,
    end_date_time,
  } = eventData;
  return (
    <div>
      <div>
        <div className="event_page_top flex items-baseline justify-between mt-5">
          <div className="text-5xl font-bold cursor-pointer">{Name}</div>

          <div className="text-lg text-[#393e46] ml-1 font-thin">
            posted on {moment(date_created).format("lll")}
          </div>
        </div>
      </div>
      <div>
        <img
          // src={event_banner_url}
          src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F336872189%2F412671342061%2F1%2Foriginal.20220817-060523?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=47201003009aab40a827c78813e5f381"
          alt="event-poster"
          className="w-full object-contain rounded-md mb-2 mt-[64px]"
        />
      </div>
      <div>
        <div className="text-lg font-light mt-1">
          <p className="event_desc">{Description}</p>
        </div>

        <div className="mt-5 text-2xl font-semibold">
          Event details
          <div className="text-lg">{getAddressFormatted(address)}</div>
          <div className="text-lg">
            <span>{moment(start_date_time).format("lll")}</span>
            <span className="mx-1">-</span>
            <span>{moment(end_date_time).format("lll")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
