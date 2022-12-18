import moment from "moment";
import React from "react";
import {  useNavigate } from "react-router";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { TextField } from "@mui/material";
import { validateComment } from "../../../utils/helper";
import Loading from "../../common/Loading";

function Comments({
  comments,
  loggedInUserId,
  postCommentByUser,
  loading,
  areCommentsAllowed,
}) {
  const [error, setError] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const navigate = useNavigate();
  const postComment = async () => {
    if (!validateComment(comment)) return setError(true);
    else setError(false);
    await postCommentByUser(comment);
    setComment("");
  };

  return (
    <div className="mt-3">
      <div className="font-bold text-3xl mb-2 section_divider">
        <CommentOutlinedIcon fontSize="large" /> Comments
      </div>
      {areCommentsAllowed ? (
        <div>
          <div className="mb-4 flex items-start">
            <div className="w-11/12">
              <TextField
                id="comment"
                label="Comment"
                variant="outlined"
                required
                size="small"
                type="text"
                fullWidth
                placeholder="Tell us about your event"
                margin="dense"
                name="comment"
                multiline={true}
                minRows={4}
                error={error}
                value={comment}
                onChange={(e) => {
                  let { value } = e.target;
                  setComment(value);
                }}
              />
            </div>

            <button
              onClick={() => postComment()}
              className="btn_default flex items-center mx-4 mt-4"
              disabled={loading || comment.trim() === ""}
            >
              <Loading loading={loading} width={18} />
              Post
            </button>
          </div>
          <div className="comment_section scroller">
            {comments?.map((item, i) => {
              const { username, comment, dateCreated, user_id } = item;
              return (
                <div className="comment" key={i}>
                  <span className=" text-xl">
                    <span>{comment}</span>
                    <span
                      className="commented_user_tag"
                      onClick={() =>
                        navigate(
                          loggedInUserId === user_id
                            ? "/profile"
                            : "/profile/" + username
                        )
                      }
                    >
                      {username}
                    </span>

                    <span className="font-light">
                      {moment(dateCreated).format("lll")}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Comments are turned off for this post.</div>
      )}
    </div>
  );
}

export default Comments;
