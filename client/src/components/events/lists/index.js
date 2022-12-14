import React from "react";
import EventCard from "./eventCard";
import SearchBar from "./searchBar";
import "./styles.css";

function EventsList() {
  const sample = {
    user_id: "manisaiprasad",
    event_id: "78323302ecff990845f53729e24b43ab",
    Name: "DancePeChance",
    Description: "Dance competition",
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

  const eventsList = () => {
    return (
      <div>
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="fixed ">
        <SearchBar />
      </div>
      <div className="pt-12 max-h-screen">{eventsList()}</div>
    </div>
  );
}

export default EventsList;
