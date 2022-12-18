import React from "react";
import Loading from "../../common/Loading";
import EventCard from "../lists/eventCardHome";
import { getUserDetails, getUserRsvps } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import EmptyBox from "../../../assets/images/emptybox.png";
import "./styles.css";

function RsvpedEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loggedInUserData, setLoggedInUserData] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getUserRsvps().then((res) => {
      const { data, status } = res;
      if (status !== 200) {
        setLoading(false);
        return toast.error("Failed to fetch events");
      } else setEvents(data?.data);
      getUserDetails().then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setLoggedInUserData(data);
        setLoading(false);
      });
    });
  }, []);
  return (
    <div className="w-full">
      <div className="text-5xl font-semibold mt-4 mb-8">My RSVPed Event/s</div>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading loading={loading} width={40} color="#393e46" thickness={5} />
        </div>
      ) : events?.length !== 0 ? (
        events?.map((event) => (
          <EventCard
            event={event}
            userId={loggedInUserData?._id}
            key={event?._id}
          />
        ))
      ) : (
        <div className="empty_box_text">
          <img src={EmptyBox} alt="no invites found" width={200} />
          <span className="text-4xl font-light">No Events Found.</span>
        </div>
      )}
    </div>
  );
}

export default RsvpedEvents;
