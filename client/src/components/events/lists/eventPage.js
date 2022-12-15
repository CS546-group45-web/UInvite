import moment from "moment";
import React from "react";
import { useParams } from "react-router";
import { getAddressFormatted } from "../../../utils/helper";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import Comments from "./comments";
import { getUserDetails } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import { getEventsDetailsById, postComment } from "../../../utils/apis/event";

function EventPage() {
  const params = useParams();
  const sample = {
    user_id: "manisaiprasad",
    _id: "78323302ecff990845f53729e24b43ab",
    eventTitle: "DancePeChance",
    description:
      "We are so excited to be hosting our very first dance competition! This competition is open to all pupils in our school and will be taking place during the month of October. The competition will consist of a variety of dances including modern, salsa, ballroom, and country dances. There will be a total of 4 competitions which will be held on different days. The first competition will be held on the 8th of October and the last competition will be held on the 22nd of October.",
    startDateTime: "2022-12-08T19:58:23.464Z",
    endDateTime: "2022-12-12T19:58:23.464Z",
    address: {
      City: "Jersey City",
      State: "New Jersey",
      Country: "United States",
      Zipcode: "07306",
    },
    dateCreated: "2022-11-06T19:58:23.464Z",
    Max_rsvps_count: 100,
    event_type: "in-person",
    rsvps: [
      "1d1f7b081e422efe1422b17bf7aeb766",
      "2d1f7b081e422efe1422b17bf7aeb766",
    ],
    waitlist: [
      "1d1f7b081e422efe1422b17bf7aeb766",
      "2d1f7b081e422efe1422b17bf7aeb766",
    ],
    tags: ["Free Food", "18+", "Alcohol", "DJ", "Free Entry"],
    event_banner_url: "https://localhost:4000/dance.jpg",
    like_count: 100,
    comments: [
      {
        name: "Suman M",
        username: "SumanM",
        comment:
          "We are so excited to be hosting our very first dance competition! This competition is open to all pupils in our school and will be taking place during the month of October. The competition will consist of a variety of dances including modern, salsa, ballroom, and country dances. There will be a total of 4 competitions which will be held on different days. The first competition will be held on the 8th of October and the last competition will be held on the 22nd of October.",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
      },
      {
        name: "Suman M",
        username: "SumanM",
        comment: "It was a great Event",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
      },
      {
        name: "Suman M",
        username: "SumanM",
        comment:
          "We are so excited to be hosting our very first dance competition! This competition is open to all pupils in our school and will be taking place during the month of October. The competition will consist of a variety of dances including modern, salsa, ballroom, and country dances. There will be a total of 4 competitions which will be held on different days. The first competition will be held on the 8th of October and the last competition will be held on the 22nd of October.",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
      },
      {
        name: "Suman M",
        username: "SumanM",
        comment: "It was a great Event",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
      },
      {
        name: "Suman M",
        username: "SumanM",
        comment:
          "We are so excited to be hosting our very first dance competition! This competition is open to all pupils in our school and will be taking place during the month of October. The competition will consist of a variety of dances including modern, salsa, ballroom, and country dances. There will be a total of 4 competitions which will be held on different days. The first competition will be held on the 8th of October and the last competition will be held on the 22nd of October.",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
      },
      {
        name: "Suman M",
        username: "SumanM",
        comment: "It was a great Event",
        dateCreated: "2022-11-06T19:58:23.464Z",
        user_id: "2d1f7b081e422efe1422b17bf7aeb766",
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
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);
  const [commentLoading, setCommentLoading] = React.useState(false);

  const getEventsDetails = React.useCallback(
    (showLoader = false) => {
      getEventsDetailsById(params?.id).then((res) => {
        showLoader && setPageLoading(true);
        if (res.status !== 200) return toast.error(res.data.error);
        setEventData(res?.data);
        getUserDetails().then((res) => {
          const { data, status } = res;
          if (status !== 200) return toast.error(data.error);
          setLoggedInUserData(data);
        });
      });
    },
    [params?.id]
  );

  const postCommentByUser = async (comment) => {
    setCommentLoading(true);
    const { data, status } = await postComment(comment, eventData?._id);
    console.log({ data, status });
    setCommentLoading(false);
  };

  React.useEffect(() => {
    getEventsDetails(true);
  }, [getEventsDetails]);

  const {
    event_banner_url,
    eventTitle,
    _id,
    dateCreated,
    description,
    address,
    startDateTime,
    endDateTime,
    comments,
  } = eventData;
  return (
    <div>
      <div>
        <div className="event_page_top flex items-baseline justify-between mt-5">
          <div className="text-4xl font-bold cursor-pointer flex">
            {eventTitle}
            <div>
              <BookmarkBorderOutlinedIcon fontSize="large" />
            </div>
          </div>

          <div className="text-lg text-[#393e46] ml-1 font-thin">
            posted on {moment(dateCreated).format("lll")}
          </div>
        </div>
      </div>
      <div>
        <img
          // src={event_banner_url}
          src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F336872189%2F412671342061%2F1%2Foriginal.20220817-060523?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=47201003009aab40a827c78813e5f381"
          alt="event-poster"
          className="object-contain rounded-md mb-2 mt-[64px]"
        />
      </div>
      <div>
        <div className="text-lg font-light mt-1">
          <p className="event_desc">{description}</p>
        </div>

        <div className="mt-3 text-xl">
          <div className="font-bold text-2xl">
            {" "}
            <NotesOutlinedIcon fontSize="large" /> Event Details
          </div>
          <div className="text-lg">{getAddressFormatted(address)}</div>
          <div className="text-lg">
            <span>{moment(startDateTime).format("lll")}</span>
            <span className="mx-1">-</span>
            <span>{moment(endDateTime).format("lll")}</span>
          </div>
        </div>
      </div>

      <Comments
        comments={comments}
        loggedInUserId={loggedInUserData?._id}
        postCommentByUser={postCommentByUser}
        commentLoading={commentLoading}
      />
    </div>
  );
}

export default EventPage;
