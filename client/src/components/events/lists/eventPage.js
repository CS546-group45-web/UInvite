import moment from "moment";
import React from "react";
import { useParams } from "react-router";
// import { getAddressFormatted } from "../../../utils/helper";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import Comments from "./comments";
import { getUserDetails } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import { getEventsDetailsById, postComment } from "../../../utils/apis/event";
import CreateEvent from "../createEvent";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Loading from "../../common/Loading";
import { Chip } from "@mui/material";

function EventPage() {
  const params = useParams();
  const [eventData, setEventData] = React.useState({});
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const [commentLoading, setCommentLoading] = React.useState(false);

  const getEventsDetails = React.useCallback(
    (showLoader = false) => {
      showLoader && setPageLoading(true);
      getEventsDetailsById(params?.id).then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setEventData(data?.data);
        getUserDetails().then((res) => {
          const { data, status } = res;
          if (status !== 200) return toast.error(data.error);
          setLoggedInUserData(data);
          setPageLoading(false);
        });
      });
    },
    [params?.id]
  );

  const saveData = async () => {
    await getEventsDetails();
    setMode(false);
  };

  const postCommentByUser = async (comment) => {
    setCommentLoading(true);
    const { data, status } = await postComment(comment, eventData?._id);
    console.log({ data, status });
    if (status !== 200) return;
    setEventData(data?.data);
    setCommentLoading(false);
  };

  React.useEffect(() => {
    getEventsDetails(true);
  }, [getEventsDetails]);

  const viewMode = () => {
    // const {
    //   event_banner_url,
    //   eventTitle,
    //   dateCreated,
    //   description,
    //   address,
    //   startDateTime,
    //   endDateTime,
    //   comments,
    //   ageRestricted,
    //   areCommentsAllowed,
    //   userId,
    //   tags,
    // } = eventData?.;

    return (
      <div>
        <div className="event_page_top flex items-baseline justify-between mt-5">
          <div className="text-4xl font-bold cursor-pointer flex">
            {eventData?.eventTitle}
          </div>

          <div className="text-2xl text-[#393e46]">
            posted on {moment(eventData?.dateCreated).format("ll")}
          </div>
        </div>
        <div className="flex mt-[36px]">
          <div className="w-8/12 pr-1">
            <img
              src={
                eventData?.event_banner_url ??
                "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F336872189%2F412671342061%2F1%2Foriginal.20220817-060523?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=47201003009aab40a827c78813e5f381"
              }
              alt="event-poster"
              className="object-contain rounded-md mb-2 w-full aspect-video"
            />
          </div>
          <div className="mt-6 text-xl w-4/12 pl-1">
            {loggedInUserData?._id === eventData?.userId && (
              <div
                onClick={() => {
                  setMode(true);
                }}
                className="btn_edit_profile"
              >
                Edit event
              </div>
            )}
            <div className="font-bold text-xl section_divider">
              {" "}
              <NotesOutlinedIcon /> Location & Time
            </div>

            <div className="pl-2 ">
              <div className="text-lg font-semibold">
                {/* {getAddressFormatted(address)} */}
                <LocationOnIcon /> {eventData?.address}
              </div>
              <div className="text-lg font-semibold mb-2">
                <div>
                  <DateRangeIcon />
                  &nbsp;{moment(eventData?.startDateTime).format("lll")}&nbsp;-
                </div>
                <div className="ml-8">
                  {moment(eventData?.endDateTime).format("lll")}
                </div>
              </div>

              {eventData?.ageRestricted && (
                <div>
                  <div className="warning_note">
                    {" "}
                    <ErrorOutlineOutlinedIcon sx={{ color: "#f1c40f" }} />
                    <span className="ml-2">
                      Warning: This event is{" "}
                      <span className="font-semibold">age restricted</span>. You
                      may need to provide{" "}
                      <span className="underline">Government ID proof</span> to
                      attend this event.
                    </span>
                  </div>
                </div>
              )}

              <div>
                {loggedInUserData?._id === eventData?.userId ? (
                  <button className="btn_default__cancel">
                    <PeopleOutlineIcon /> Guest list
                  </button>
                ) : (
                  <div>
                    <button className="btn_default">
                      <BookmarkBorderOutlinedIcon /> Bookmark
                    </button>

                    <button className="btn_default__cancel">RVSP</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl -mt-4">
          <p className="event_desc">{eventData?.description}</p>
        </div>

        <div className="flex mt-2">
          {eventData?.tags?.map((tag, i) => (
            <span className="mr-1 text-logoBlue" key={i}>
              <Chip label={tag} variant="outlined" className={"tags_chip"} />
            </span>
          ))}
        </div>

        <Comments
          areCommentsAllowed={eventData?.areCommentsAllowed}
          comments={eventData?.comments}
          loggedInUserId={loggedInUserData?._id}
          postCommentByUser={postCommentByUser}
          commentLoading={commentLoading}
        />
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      {pageLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading
            loading={pageLoading}
            width={40}
            color="#393e46"
            thickness={5}
          />
        </div>
      ) : mode ? (
        <CreateEvent
          event={eventData}
          editMode={mode}
          saveData={saveData}
          setMode={setMode}
        />
      ) : (
        viewMode()
      )}
    </div>
  );
}

export default EventPage;
