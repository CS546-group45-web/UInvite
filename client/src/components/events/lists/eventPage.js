import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router";
// import { getAddressFormatted } from "../../../utils/helper";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import Comments from "./comments";
import { getUserDetails } from "../../../utils/apis/user";
import { toast } from "react-toastify";
import {
  bookmarkEvent,
  deleteEventsDetailsById,
  eventPhotoUpload,
  getEventsDetailsById,
  postComment,
  removeBookmarkedEvent,
  rsvpEvent,
} from "../../../utils/apis/event";
import CreateEvent from "../createEvent";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { PhotoCamera } from "@mui/icons-material";
import Loading from "../../common/Loading";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Slider,
} from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import {
  dataURLtoFile,
  isEventFinished,
  validateDateDiff,
} from "../../../utils/helper";

import DefaultCoverImage from "../../../assets/images/default_cover_image.jpg";
import RatingsAndReviews from "./ratingsAndReviews";

function EventPage() {
  const params = useParams();
  const navigate = useNavigate();
  const editorRef = React.useRef(null);
  const [eventData, setEventData] = React.useState({});
  const [loggedInUserData, setLoggedInUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);
  const [modalView, setModalView] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [imageObj, setImageObj] = React.useState(null);
  const [eventIsDone, setEventIsDone] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);

  const getEventsDetails = React.useCallback(
    (showLoader = false) => {
      showLoader && setPageLoading(true);
      getEventsDetailsById(params?.id).then((res) => {
        const { data, status } = res;
        if (status !== 200) return toast.error(data.error);
        setEventData(data?.data);
        setEventIsDone(isEventFinished(data?.data?.endDateTime));
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
    if (status !== 200) return;
    setEventData(data?.data);
    setCommentLoading(false);
  };

  React.useEffect(() => {
    setPageLoading(true);
    getEventsDetails(true);
  }, [getEventsDetails]);

  const handlemodalView = () => setModalView(true);
  const handleClose = () => setModalView(false);

  const handleDeleteDialogClickOpen = () => setShowDeleteDialog(true);

  const handleDeleteDialogClickClose = () => setShowDeleteDialog(false);

  const deleteEvent = async () => {
    const { data } = await deleteEventsDetailsById(eventData?._id);
    if (data?.status !== 200) return toast.error("Failed to delete event");
    navigate("/");
  };

  const uploadImage = async () => {
    setUpdateLoading(true);
    const img = editorRef.current?.getImageScaledToCanvas().toDataURL();
    let formData = new FormData();
    formData.append("eventImage", dataURLtoFile(img, eventData?.eventTitle));
    const { data } = await eventPhotoUpload(eventData?._id, formData);
    setEventData(data?.data);
    setImageObj(null);
    setZoom(1);
    setUpdateLoading(false);
    handleClose();
  };

  const checkIfBookmarked = () => {
    const { bookmarks } = loggedInUserData;

    const checkBookmarks = bookmarks?.filter(
      (eventId) => eventId === eventData?._id
    );
    return checkBookmarks?.length > 0;
  };

  const checkIfRsvped = () => {
    const { rsvp } = loggedInUserData;
    const checkRsvp = rsvp?.filter((eventId) => eventId === eventData?._id);
    return checkRsvp?.length > 0;
  };

  const addBookmark = async () => {
    const { status } = await bookmarkEvent(eventData?._id);
    if (status !== 200) return toast.error("Failed to bookmark this event");
    toast.success("Event added to Bookmarks");
  };

  const removeBookmark = async () => {
    const { status } = await removeBookmarkedEvent(eventData?._id);
    if (status !== 200)
      return toast.error("Failed to remove this event from bookmarks");
    toast.success("Event added to Bookmarks");
  };

  const sendRVSPEvent = async () => {
    const { status, data } = await rsvpEvent(eventData?._id);
    if (status !== 200) return toast.error("Failed to RSVP this event");
    setEventData(data?.data);
    toast.success("Event RSVPed");
  };

  const viewMode = () => {
    return (
      <div>
        <div className="w-[100%] flex items-baseline justify-between mt-5">
          <div className="text-6xl font-bold flex event_title max-w-[70rem] text-logoBlue underline">
            {eventData?.eventTitle}
          </div>

          <div className="text-2xl text-[#393e46]">
            posted on {moment(eventData?.dateCreated).format("ll")}
          </div>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-8/12 pr-1 relative">
            <img
              src={
                eventData?.event_photo_url
                  ? process.env.REACT_APP_BASE_URL +
                    "/images/" +
                    eventData?.event_photo_url
                  : DefaultCoverImage
              }
              alt="event-poster"
              className="rounded-md mb-2 cover_image"
            />
            {loggedInUserData?._id === eventData?.userId && !eventIsDone && (
              <div
                className="w-fit uplaod_image_btn scale-90"
                onClick={handlemodalView}
              >
                <IconButton aria-label="upload picture" component="label">
                  <PhotoCamera color="#393e46" /> Upload/Edit photo
                </IconButton>
              </div>
            )}
            <Modal
              open={modalView}
              onClose={() => {
                setImageObj(null);
                handleClose();
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="cover_image_upload_modal">
                <div className="event_banner">
                  <AvatarEditor
                    ref={editorRef}
                    image={
                      imageObj
                        ? URL.createObjectURL(imageObj)
                        : DefaultCoverImage
                    }
                    width={500}
                    height={350}
                    border={10}
                    color={[57, 62, 70]} // RGBA
                    scale={zoom}
                    rotate={0}
                    borderRadius={6}
                  />
                  {imageObj && (
                    <div className="flex align-middle mt-2">
                      <span className="text-xl mr-2">Zoom</span>
                      <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        size="small"
                        defaultValue={1}
                        onChange={(e) => setZoom(e.target.value)}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        track={false}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {imageObj ? (
                    <div className="flex mt-4">
                      <button
                        className="btn_default mr-2"
                        onClick={uploadImage}
                      >
                        <Loading loading={updateLoading} width={18} /> Upload
                      </button>
                      <button
                        className="btn_default__cancel"
                        onClick={() => {
                          setImageObj(null);
                          handleClose();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      disableRipple={true}
                    >
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        onChange={(e) => {
                          e.preventDefault();
                          setImageObj(e.target.files[0]);
                        }}
                      />
                      <PhotoCamera />
                      upload
                    </IconButton>
                  )}
                </div>
              </div>
            </Modal>
          </div>
          <div className="text-xl w-4/12 pl-1">
            {loggedInUserData?._id === eventData?.userId && !eventIsDone && (
              <button
                onClick={() => {
                  setMode(true);
                }}
                className="btn_default_modify_event mt-2 mb-4"
              >
                Modify Event
              </button>
            )}
            <div className="font-bold text-3xl section_divider">
              {" "}
              <NotesOutlinedIcon /> Location & Time
            </div>

            <div className="pl-2 ">
              <div className="text-xl font-semibold mt-2">
                {/* {getAddressFormatted(address)} */}
                <LocationOnIcon /> {eventData?.address}
              </div>
              <div className="text-xl font-semibold mb-2">
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

              {eventIsDone && (
                <div>
                  <div className="info_note">
                    <ErrorOutlineOutlinedIcon sx={{ color: "#1caeec" }} />
                    <span className="ml-2 underline">
                      NOTE: This event has already passed.
                    </span>
                  </div>
                </div>
              )}
              {loggedInUserData?._id === eventData?.userId ? (
                <div className="flex items-center">
                  <button className="btn_default_guest_list mr-2">
                    <PeopleOutlineIcon /> Guest list
                  </button>

                  <button
                    className="btn_default__delete"
                    onClick={handleDeleteDialogClickOpen}
                  >
                    <DeleteOutlineIcon /> Delete event
                  </button>
                </div>
              ) : !eventIsDone ? (
                <div className="flex items-center">
                  <button
                    className="btn_default"
                    onClick={() =>
                      checkIfBookmarked() ? removeBookmark() : addBookmark()
                    }
                  >
                    {checkIfBookmarked() ? (
                      <span>
                        <BookmarkAddedOutlinedIcon /> Bookmarked
                      </span>
                    ) : (
                      <span>
                        <BookmarkAddOutlinedIcon /> Bookmark
                      </span>
                    )}
                  </button>

                  <button
                    className="btn_default__cancel"
                    // onClick={() =>checkIfRsvped() ? removeRSVPEvent() : sendRVSPEvent()}>
                    onClick={sendRVSPEvent}
                  >
                    {checkIfRsvped() ? "RSVPed" : "RSVP"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-xl">
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

        {/* alert dialog to delete event */}
        <Dialog
          open={showDeleteDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this event?
          </DialogTitle>
          <DialogActions>
            <button
              className="btn_default__cancel"
              onClick={handleDeleteDialogClickClose}
            >
              No
            </button>
            <button className="btn_default" onClick={deleteEvent} autoFocus>
              Yes
            </button>
          </DialogActions>
        </Dialog>

        {eventIsDone && <RatingsAndReviews />}
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
