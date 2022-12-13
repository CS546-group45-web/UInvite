import React from "react";
import { useNavigate } from "react-router";

function ProfileSectionMiddle(
  followers,
  following,
  sendUnfollowRequest,sendfollowRequest
) {
  const navigate = useNavigate();

  return (
    <div className="text-[#393e46] flex mx-4">
      <div className="w-6/12 mr-2">
        <div className="text-2xl font-bold border-b-2">Followers</div>
        <div className="ml-2">
          {followers?.length > 0 ? (
            followers?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer"
                  onClick={() => navigate("/profile/" + item.username)}
                >
                  {item.username}
                  <div onClick={() => sendUnfollowRequest()}>Unfollow</div>
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
        <div className="ml-2">
          {following?.length > 0 ? (
            following?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer"
                  onClick={() => navigate("/profile/" + item.username)}
                >
                  {item.username}

                  <div onClick={() => sendUnfollowRequest()}>unfollow</div>
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
