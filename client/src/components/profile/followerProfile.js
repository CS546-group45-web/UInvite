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
import { getUserDetailsByUsername } from "../../utils/apis/user";
import Loading from "../common/Loading";
import { useParams } from "react-router";
import ProfileSectionMiddle from "./profileSectionMiddle";

function FollowerProfile() {
  const params = useParams();
  const [userData, setUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUSerDetails = async () => {
      setPageLoading(true);
      const data = await getUserDetailsByUsername(params?.username);
      setUserData(data.data);
      setPageLoading(false);
    };
    fetchUSerDetails().catch((err) => console.log({ err }));
    return () => {
      setUserData(null);
    };
  }, [params]);

  return (
    <div className="flex min-h-full justify-center">
      {pageLoading ? (
        <div className="flex m-auto">
          <Loading
            loading={pageLoading}
            width={40}
            color="#1d1f23"
            thickness={5}
          />
        </div>
      ) : (
        <div className="w-full">
          <div>
            <div className="grid grid_spaces text-[#1d1f23]">
              <div className="user_profile_picture">
                <img
                  src={
                    userData?.profile_photo_url
                      ? userData?.profile_photo_url
                      : "https://avatars.githubusercontent.com/u/677777?v=4"
                  }
                  alt="your profile"
                />
              </div>
              <div className="py-4 px-3 text-xl">
                <div className="flex items-center text-3xl  font-bold h-[40px]">
                  <span className="fullname ">
                    {fullNameFormatter(userData?.firstName, userData?.lastName)}
                  </span>
                </div>
                <div className="font-extralight">
                  <span>@{userData?.username}</span>
                </div>
                <div className="flex">
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px]">
                      <CakeOutlinedIcon color="#1d1f23" />
                    </div>
                    <span>{userData?.dob}</span>
                  </div>
                  <div className="pl-4">
                    {capitalizeFirstLetter(userData?.gender)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[30px] h-[30px]">
                    <MailOutlineIcon color="#1d1f23" />
                  </div>
                  <span>{userData?.email}</span>
                  <div className="pl-4 w-[30px] h-[30px]">
                    <PhoneAndroidOutlinedIcon color="#1d1f23" />
                  </div>{" "}
                  <span className="pl-2">
                    {phoneNumberFormatter(userData?.phone)}
                  </span>
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
            <ProfileSectionMiddle
              followers={userData?.followers}
              following={userData?.following}
              events_created={userData?.events_created}
              rsvped_events={userData?.rsvped_events}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowerProfile;
