import React from "react";
import { toast } from "react-toastify";
import {
  getAllEventsForHomePage,
  getSearchedResults,
} from "../../../utils/apis/event";
import Loading from "../../common/Loading";
import EventCard from "./eventCardHome";
import "./styles.css";
import { getUserDetails } from "../../../utils/apis/user";
import SearchBar from "./searchBarComponent";
// import { Chip } from "@mui/material";

function EventsList() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  // const [queryData, setQueryData] = React.useState({});

  const getAllData = () => {
    setLoading(true);
    getAllEventsForHomePage().then((res) => {
      const { data, status } = res;
      if (status !== 200) toast.error("Failed to fetch events");
      else setEvents(data?.data);
      getUserDetails().then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setLoggedInUserData(data);
        setLoading(false);
      });
    });
  }

  React.useEffect(() => {
    getAllData()
  }, []);

  const searchEvents = async (query, queryParams) => {
    setLoading(true);
    getSearchedResults(query).then((res) => {
      const { data } = res;
      setEvents(data?.data);
      setLoading(false);
    });
  };

  const eventsList = () => {
    return (
      <div className="">
        {events?.length !== 0 ? (
          events?.map((event) => (
            <EventCard
              event={event}
              userId={loggedInUserData?._id}
              key={event?._id}
            />
          ))
        ) : (
          <div className="font-bold text-2xl mb-2 ">No Events Found.</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-full w-full">
      <SearchBar searchEvents={searchEvents} getAllData={getAllData} />

      {/* {queryData?.searchInputTitle?.trim() !== "" && (
        <Chip>Title: {queryData?.searchInputTitle}</Chip>
      )}
      {queryData?.searchInputCity?.trim() !== "" && (
        <Chip>City: {queryData?.searchInputCity}</Chip>
      )}
      {queryData?.searchTags?.length > 0 && (
        <Chip>
          Tags:
          {queryData?.searchTags?.map((tag) => (
            <span>{tag}, </span>
          ))}
        </Chip>
      )} */}

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
