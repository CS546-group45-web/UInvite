import React from "react";
import { useNavigate } from "react-router";
import DefaultProfile from "../../assets/images/default_profile_pic.png";
import { fullNameFormatter } from "../../utils/helper";

function ProfileSectionMiddle({
  userId,
  followers,
  following,
  sendUnfollowRequest,
  sendfollowRequest,
}) {
  const navigate = useNavigate();
  // console.log({
  //   userId,
  //   followers,
  //   following,
  //   sendUnfollowRequest,
  //   sendfollowRequest,
  // });
  return (
    <div className="text-[#393e46] flex mx-4">
      <div className="w-6/12 mr-2">
        <div className="text-2xl font-bold border-b-2">Followers</div>
        <div className="ml-2 mt-2">
          {followers?.length > 0 ? (
            followers?.map((item, i) => {
              const {
                _id,
                username,
                firstName,
                lastName,
                profile_photo_url,
                followers,
              } = item;
              return (
                <div className="flex justify-between text-xl items-center mx-1">
                  <div
                    key={_id}
                    className="cursor-pointer flex items-center"
                    onClick={() => navigate("/profile/" + username)}
                  >
                    <img
                      className="followers_list__image"
                      src={
                        profile_photo_url !== ""
                          ? process.env.REACT_APP_BASE_URL +
                            "/images/" +
                            profile_photo_url
                          : DefaultProfile
                      }
                      onError={(e) => {
                        e.target.src = DefaultProfile;
                      }}
                      alt="your profile"
                    />
                    <div>
                      <div className="text-lg font-bold">{username}</div>
                      <div className="text-lg font-light">
                        {fullNameFormatter(firstName, lastName)}
                      </div>
                    </div>
                  </div>
                  {followers?.includes((user) => user._id === userId) ? (
                    <div
                      onClick={() => {
                        sendUnfollowRequest(_id);
                      }}
                      className="cursor-pointer btn_default_following"
                    >
                      Unfollow
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        sendfollowRequest(_id);
                      }}
                      className="cursor-pointer btn_default__follow"
                    >
                      Follow
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-xl">No followers to show!</div>
          )}
        </div>
      </div>
      <div className="w-6/12 ml-2">
        <div className="text-2xl font-bold border-b-2">Following</div>
        <div className="ml-2 mt-2">
          {following?.length > 0 ? (
            following?.map((item, i) => {
              const {
                _id,
                username,
                firstName,
                lastName,
                profile_photo_url,
                following,
              } = item;
              return (
                <div className="flex justify-between text-xl items-center mx-1">
                  <div
                    key={_id}
                    className="cursor-pointer flex items-center"
                    onClick={() => navigate("/profile/" + username)}
                  >
                    <img
                      className="followers_list__image"
                      src={
                        profile_photo_url !== ""
                          ? process.env.REACT_APP_BASE_URL +
                            "/images/" +
                            profile_photo_url
                          : DefaultProfile
                      }
                      onError={(e) => {
                        e.target.src = DefaultProfile;
                      }}
                      alt="your profile"
                    />
                    <div>
                      <div className="text-lg font-bold">{username}</div>
                      <div className="text-lg font-light">
                        {fullNameFormatter(firstName, lastName)}
                      </div>
                    </div>
                  </div>
                  {following?.includes((user) => user?._id === userId) ? (
                    <div
                      onClick={() => {
                        sendfollowRequest(item?._id);
                      }}
                      className="cursor-pointer btn_default__follow"
                    >
                      Follow
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer btn_default_following"
                      onClick={() => {
                        sendUnfollowRequest(item?._id);
                      }}
                    >
                      Unfollow
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-xl">No followings to show!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSectionMiddle;
