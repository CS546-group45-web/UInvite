import React from "react";
import "./styles.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import "./styles.css";
import { capitalizeFirstLetter, fullNameFormatter } from "../../utils/helper";
import {
  followUser,
  getOtherUserFollowersById,
  getOtherUserFollowing,
  getUserDetails,
  getUserDetailsByUsername,
  unfollowUser,
} from "../../utils/apis/user";
import Loading from "../common/Loading";
import { useParams } from "react-router";
import ProfileSectionMiddle from "./profileSectionMiddle";
import { toast } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DefaultProfile from "../../assets/images/default_profile_pic.png";

function FollowerProfile() {
  const params = useParams();
  const [userData, setUserData] = React.useState({});
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [userFollower, setUserFollowers] = React.useState(null);
  const [userFollowing, setUserFollowing] = React.useState(null);
  const [pageLoading, setPageLoading] = React.useState(false);

  const getUserAllDetails = React.useCallback(
    (showLoader = false) => {
      showLoader && setPageLoading(true);
      getUserDetailsByUsername(params?.username).then((res) => {
        if (res.status !== 200) return toast.error(res.data.error);
        setUserData(res?.data);
        getUserDetails().then((res) => {
          const { data, status } = res;
          if (status !== 200) return toast.error(data.error);
          setLoggedInUserData(data);
        });

        getOtherUserFollowersById(res?.data?._id).then((res) => {
          const { data, status } = res;
          if (status !== 200) return toast.error(data.error);
          setUserFollowers(data?.data);
        });
        getOtherUserFollowing(res?.data?._id).then((res) => {
          const { data, status } = res;
          if (status !== 200) return toast.error(data.error);
          setUserFollowing(data?.data);
          setPageLoading(false);
        });
      });
    },
    [params.username]
  );

  React.useEffect(() => {
    getUserAllDetails(true);
    return () => {
      setUserData(null);
      setLoggedInUserData(null);
      setUserFollowing(null);
      setUserFollowers(null);
    };
  }, [getUserAllDetails]);

  const sendUnFollowRequest = async (id) => {
    const unfollowUserData = await unfollowUser(id);
    const { status } = unfollowUserData;

    if (status === 200) getUserAllDetails();
    else toast.error("Unfollow request failed!");
  };

  const sendFollowRequest = async (id) => {
    const followUserData = await followUser(id);
    const { status } = followUserData;

    if (status === 200) getUserAllDetails();
    else toast.error("Follow request failed!");
  };

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
          <div className="grid grid_spaces text-[#1d1f23]">
            <div className="user_profile_picture">
              <img
                src={
                  userData?.profile_photo_url
                    ? process.env.REACT_APP_BASE_URL +
                      "/images/" +
                      userData?.profile_photo_url
                    : DefaultProfile
                }
                onError={(e) => {
                  e.target.src = DefaultProfile;
                }}
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
                {/* <div className="pl-4 w-[30px] h-[30px]">
                    <PhoneAndroidOutlinedIcon color="#1d1f23" />
                  </div>{" "}
                  <span className="pl-2">
                    {phoneNumberFormatter(userData?.phone)}
                  </span> */}
              </div>
              <div className="flex items-center pt-4">
                {userData?.followers?.includes(loggedInUserData?._id) && (
                  <span className="btn_default_following btn_default_following__extra">
                    <CheckCircleOutlineIcon /> Following
                  </span>
                )}
                <button
                  className="btn_default__follow"
                  onClick={() =>
                    userData?.followers?.includes(loggedInUserData?._id)
                      ? sendUnFollowRequest(userData?._id)
                      : sendFollowRequest(userData?._id)
                  }
                >
                  {userData?.followers?.includes(loggedInUserData?._id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>
            </div>
            <div>Some insights like #events, #follows, #followers</div>
          </div>
          <ProfileSectionMiddle
            userId={userData?._id}
            loggedInUserId={loggedInUserData?._id}
            followers={userFollower}
            following={userFollowing}
            sendUnfollowRequest={sendUnFollowRequest}
            sendfollowRequest={sendFollowRequest}
          />
        </div>
      )}
    </div>
  );
}

export default FollowerProfile;
