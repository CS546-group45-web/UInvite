import React from "react";
import Loading from "../../common/Loading";
import { getUserDetails, getUserInvites } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import EmptyBox from "../../../assets/images/emptybox.png";
import "./styles.css";
import EventCardSmall from "../lists/eventCardSmall";
import {
  acceptEventInvite,
  cancelEventInvite,
} from "../../../utils/apis/event";

function InvitedEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loggedInUserData, setLoggedInUserData] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getUserInvites().then((res) => {
      const { data, status } = res;
      if (status !== 200) {
        setLoading(false);
        return toast.error("Failed to fetch invites");
      } else setEvents(data?.data);
      getUserDetails().then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setLoggedInUserData(data);
        setLoading(false);
      });
    });
  }, []);

  const acceptInvite = async (id) => {
    const { status } = await acceptEventInvite(id);
    if (status !== 200) return toast.error("Failed to accept");
    toast.success("Invite accepted");
  };
  const cancelInvite = async (id) => {
    const { status } = await cancelEventInvite(id);
    if (status !== 200) return toast.error("Failed to decline");
    toast.success("Invite declined");
  };

  return (
    <div className="w-full">
      <div className="text-5xl font-semibold mt-4 mb-8">Invitation/s</div>
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
            successBtnText="Accept"
            cancelBtnText="Decline"
            successAction={acceptInvite}
            cancelAction={cancelInvite}
          />
        ))
      ) : (
        <div className="empty_box_text">
          <img src={EmptyBox} alt="no invites found" width={200} />
          <span className="text-4xl font-light">No Invites</span>
        </div>
      )}
    </div>
  );
}

export default InvitedEvents;
