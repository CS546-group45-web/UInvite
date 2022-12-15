import React from "react";
import { getAllEventsForHomePage } from "../../../utils/apis/event";
import EventCard from "./eventCard";
// import SearchBar from "./searchBar";
import "./styles.css";

function EventsList() {
  const sample = {
    user_id: "manisaiprasad",
    event_id: "63997c767721a9d370c35712",
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
  const [events, setEvents] = React.useState([sample, sample, sample]);

  React.useEffect(() => {
    getAllEventsForHomePage().then((res) => {
      console.log(res);
    });
  }, []);

  const eventsList = () => {
    return (
      <div className="">
        {events?.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* <div className="fixed">
        <SearchBar />
      </div> */}
      {eventsList()}
    </div>
  );
}

export default EventsList;
