import moment from "moment";
import React from "react";
import { Navigate } from "react-router";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { validateComment } from "../../../utils/helper";
import Loading from "../../common/Loading";

function Comments({ comments, loggedInUserId, postCommentByUser, loading }) {
  const [error, setError] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const postComment = async () => {
    if (!validateComment(comment)) return setError(true);
    else setError(false);
    await postCommentByUser(comment);
  };

  return (
    <div className="mt-3">
      <div className="font-bold text-2xl">
        <CommentOutlinedIcon fontSize="large" /> Comments
      </div>
      <div>
        <div className="w-7/12">
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
            helperText={
              error && (
                <span className="text-base flex items-center">
                  <CloseIcon fontSize="small" />
                  comment cannot be empty
                </span>
              )
            }
            value={comment}
            onChange={(e) => {
              let { name, value } = e.target;

              if (!validateComment(value)) setError(true);
              else setError(false);
              setComment(value);
            }}
          />
        </div>

        <button
          onClick={() => postComment()}
          className="btn_default flex items-center"
          disabled={loading}
        >
          <Loading loading={loading} width={18} />
          Post
        </button>
      </div>
      <div className="comment_section scroller">
        {comments.map((item) => {
          const { username, comment, dateCreated, user_id } = item;
          return (
            <div className="comment">
              <span className=" text-xl">
                <span>{comment}</span>
                <span
                  className="commented_user_tag"
                  onClick={() =>
                    Navigate(
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
  );
}

export default Comments;
