import React from "react";
import { toast } from "react-toastify";
import { getAllEventsForHomePage } from "../../../utils/apis/event";
import Loading from "../../common/Loading";
import EventCard from "./eventCard";
// import SearchBar from "./searchBar";
import "./styles.css";

function EventsList() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getAllEventsForHomePage().then((res) => {
      const { data, status } = res;
      if (status !== 200) toast.error("Failed to fetch events");
      else setEvents(data?.data);
      setLoading(false);
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
    <div className="min-h-full w-full">
      {/* Search bar */}
      {loading ? (
        <div className="flex justify-center">
          <Loading loading={loading} width={40} color="#393e46" thickness={5} />
        </div>
      ) : (
        eventsList()
      )}
    </div>
  );
}

export default EventsList;
