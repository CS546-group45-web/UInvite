import React from "react";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { IconButton, Modal, Paper, Slider } from "@mui/material";

import DefaultCoverImage from "../../../assets/images/default_cover_image.jpg";
import AvatarEditor from "react-avatar-editor";
import Loading from "../../common/Loading";
import { PhotoCamera } from "@mui/icons-material";

function EventPictures({
  uploadEventPictures,
  loading,
  uploadImageModal,
  setUploadImageModal,
  eventImages,
  imageObj,
  setImageObj,
}) {
  //   const [imageObj, setImageObj] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);
  const editorRef = React.useRef(null);

  return (
    <Paper className="mt-3 px-2 py-1" elevation={3}>
      <div>
        <div className="font-bold text-2xl mb-2 section_divider flex justify-between">
          <div>
            <AutoAwesomeMotionIcon /> Pictures
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setUploadImageModal(true)}
          >
            <AddPhotoAlternateOutlinedIcon /> Add pictures
          </div>
        </div>
        <div>
          <div className="imgrow">
            {eventImages?.length > 0 ? (
              eventImages.map((src, i) => (
                <img
                  className="imgcolumn"
                  src={process.env.REACT_APP_BASE_URL + "/images/" + src}
                  alt={`pic-${i}`}
                />
              ))
            ) : (
              <div className="text-lg font-semibold text-[#393e46] p-10">
                No images for this event. Be the first one to upload a few image
                taken at the event.
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={uploadImageModal}
        onClose={() => {
          setImageObj(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cover_image_upload_modal">
          <div className="event_photo">
            <AvatarEditor
              ref={editorRef}
              image={
                imageObj ? URL.createObjectURL(imageObj) : DefaultCoverImage
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
                  onClick={() => uploadEventPictures(editorRef)}
                >
                  <Loading loading={loading} width={18} /> Upload
                </button>
                <button
                  className="btn_default__cancel"
                  onClick={() => {
                    setImageObj(null);
                    setUploadImageModal(false);
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
    </Paper>
  );
}

export default EventPictures;
