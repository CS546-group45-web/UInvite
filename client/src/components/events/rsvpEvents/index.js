import React from "react";
import Loading from "../../common/Loading";
import { getUserDetails, getUserRsvps } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import EmptyBox from "../../../assets/images/emptybox.png";
import "./styles.css";
import EventCardSmall from "../lists/eventCardSmall";
import { cancelRsvpEvent } from "../../../utils/apis/event";
function RsvpedEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loggedInUserData, setLoggedInUserData] = React.useState({});

  const fetchUserRsvps = () => {
    setLoading(true);
    getUserRsvps().then((res) => {
      const { data, status } = res;
      if (status !== 200) {
        setLoading(false);
        return toast.error("Failed to fetch rsvps");
      } else setEvents(data?.data);
      getUserDetails().then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setLoggedInUserData(data);
        setLoading(false);
      });
    });
  };

  React.useEffect(() => {
    fetchUserRsvps();
  }, []);

  const removeRsvp = async (id) => {
    const { status } = await cancelRsvpEvent(id);
    if (status !== 200) return toast.error("Failed to decline");
    await fetchUserRsvps();
    toast.success("RSVP updated");
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading loading={loading} width={40} color="#393e46" thickness={5} />
        </div>
      ) : events?.length !== 0 ? (
        events?.map((event) => (
          <EventCardSmall
            event={event}
            userId={loggedInUserData?._id}
            key={event?._id}
            cancelBtnText="Cancel RSVP"
            cancelAction={removeRsvp}
          />
        ))
      ) : (
        <div className="empty_box_text">
          <img src={EmptyBox} alt="no invites found" width={200} />
          <span className="text-4xl font-light">No RSVPs</span>
        </div>
      )}
    </div>
  );
}

export default RsvpedEvents;
