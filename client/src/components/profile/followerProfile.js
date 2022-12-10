import React from "react";
import "./styles.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import "./styles.css";
import {
  capitalizeFirstLetter,
  fullNameFormatter,
  phoneNumberFormatter,
} from "../../utils/helper";
import { Divider } from "@mui/material";

function FollowerProfile(id) {
  const [userData, setUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUSerDetails = async () => {
      setPageLoading(true);
      //   const data = await getUserDetailsById(id);
      //   setUserData(data.data);
      setPageLoading(false);
    };
    fetchUSerDetails().catch((err) => console.log({ err }));
    return () => {
      setUserData(null);
    };
  }, []);

  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     dob,
  //     phone,
  //     gender,
  //     profile_photo_url,
  //     followers = [1, 2, 3],
  //     rsvped_events = [1, 2, 3],
  //     events_created = [1, 2, 3],
  //   } = userData;

  const data = {
    _id: "6370dfbb2a6185df6e1216a2",
    firstName: "Tarun",
    lastName: "Dadlani",
    email: "luffy@gmail.com",
    dob: "06/07/2000",
    phone: "551-344-5525",
    gender: "male",
    rsvped_events: [1, 2, 3],
    profile_photo_url: "",
    followers: [1, 2, 3],
    events_created: [1, 2, 3],
  };

  const {
    firstName,
    lastName,
    email,
    dob,
    phone,
    gender,
    profile_photo_url,
    followers,
    rsvped_events,
    events_created,
    // } = userData;
  } = data;

  return (
    <div>
      <div className="grid grid_spaces text-[#1d1f23]">
        <div className="user_profile_picture">
          <img
            src={
              profile_photo_url
                ? profile_photo_url
                : "https://avatars.githubusercontent.com/u/677777?v=4"
            }
            alt="your profile"
          />
        </div>
        <div className="py-4 px-3 text-xl">
          <div className="flex items-center text-3xl  font-bold h-[40px]">
            <span className="fullname ">
              {fullNameFormatter(firstName, lastName)}
            </span>
          </div>

          <div className="flex">
            <div className="flex items-center">
              <div className="w-[30px] h-[30px]">
                <CakeOutlinedIcon color="#1d1f23" />
              </div>
              <span>{dob}</span>
            </div>
            <div className="pl-4">{capitalizeFirstLetter(gender)}</div>
          </div>
          <div className="flex items-center">
            <div className="w-[30px] h-[30px]">
              <MailOutlineIcon color="#1d1f23" />
            </div>
            <span>{email}</span>
            <div className="pl-4 w-[30px] h-[30px]">
              <PhoneAndroidOutlinedIcon color="#1d1f23" />
            </div>{" "}
            <span className="pl-2">{phoneNumberFormatter(phone)}</span>
          </div>
          <div className="flex items-center pt-4">
            <button className="btn_default__follow">Follow</button>
          </div>
        </div>
        <div>
          Some insights could come here like number of events, follows or
          something like that
        </div>
      </div>
      <div className="text-2xl font-extrabold">Followers</div>
      <Divider />
      <div>
        {followers?.length > 0 ? (
          followers?.map((item, i) => {
            return <div> item {i}</div>;
          })
        ) : (
          <div className="ml-4">No followers to show!</div>
        )}
      </div>
      <div className="text-2xl font-extrabold">Events</div>
      <Divider />

      <div>
        {rsvped_events?.length > 0 ? (
          rsvped_events?.map((item, i) => {
            return (
              <div>
                {" "}
                <a href={`/profile/${i}`}>item {i}</a>
              </div>
            );
          })
        ) : (
          <div className="ml-4">No events to show!</div>
        )}
      </div>
      <div className="text-2xl font-extrabold">RSVP</div>
      <Divider />

      <div>
        {events_created?.length > 0 ? (
          events_created?.map((item, i) => {
            return <div onClick> item {i}</div>;
          })
        ) : (
          <div className="ml-4">No events to show!</div>
        )}
      </div>
    </div>
  );
}

export default FollowerProfile;
