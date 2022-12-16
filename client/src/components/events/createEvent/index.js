import React from "react";
import Loading from "../../common/Loading";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  eventNameValidation,
  validateDescription,
  validateTags,
  validateUrl,
  validateDateDiff,
  // dataURLtoFile,
} from "../../../utils/helper";
import { typeOptions } from "../../../constants";
import { getUserFollowers } from "../../../utils/apis/user";
import { createEvent } from "../../../utils/apis/event";
// import AvatarEditor from "react-avatar-editor";

function CreateEvent() {
  const [eventData, setEventData] = React.useState({
    arePicturedAllowed: true,
    areCommentsAllowed: true,
    ageResitricted: true,
    type: "in-person",
    startDateTime: new Date(+new Date() + 86400000),
    endDateTime: new Date(+new Date() + 87000000),
  });
  const [errors, setErrors] = React.useState({});
  const [invitees, setInvitees] = React.useState([]);
  // const [imageObj, setImageObj] = React.useState(null);
  // const editorRef = React.useRef(null);
  // const [zoom, setZoom] = React.useState(1);
  const [createLoading, setCreateLoading] = React.useState(false);

  const validateData = async (e) => {
    e.preventDefault();

    if (Object.keys(eventData).length === 0) {
      return setErrors({
        eventTitle: true,
        description: true,
        type: true,
        startDateTime: true,
        endDateTime: true,
        tags: true,
        // maxRSVPscount: true,
        address: true,
        onlineEventLink: true,
      });
    }

    let errorObj = {};
    if (!eventData?.eventTitle) errorObj.eventTitle = true;
    if (!eventData?.description) errorObj.description = true;
    if (!eventData?.type) errorObj.type = true;
    if (!eventData?.startDateTime) errorObj.startDateTime = true;
    if (!eventData?.endDateTime) errorObj.endDateTime = true;
    // if (!eventData?.maxRSVPscount) errorObj.maxRSVPscount = true;
    if (!eventData?.tags) errorObj.tags = true;
    if (eventData?.type === "in-person")
      if (!eventData?.address) errorObj.name = true;
    if (eventData?.type === "online")
      if (!eventData?.onlineEventLink) errorObj.onlineEventLink = true;

    if (
      !validateDateDiff(
        eventData?.startDateTime?.$d,
        eventData?.endDateTime?.$d
      )
    ) {
      toast.error("Duration of the event should be more than 1 hour");
    }

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    setCreateLoading(true);

    const {
      eventTitle,
      description,
      type,
      startDateTime,
      endDateTime,
      tags,
      invitees,
      arePicturedAllowed,
      areCommentsAllowed,
      ageResitricted,
    } = eventData;

    const apiBody = {
      eventTitle,
      description,
      type,
      startDateTime: new Date(startDateTime).toISOString(),
      endDateTime: new Date(endDateTime).toISOString(),
      tags: tags,
      invitees,
      arePicturedAllowed,
      areCommentsAllowed,
      ageResitricted,
    };
    if (type === "in-person") apiBody.address = eventData?.address;
    if (type === "online") apiBody.onlineEventLink = eventData?.onlineEventLink;
    console.log(apiBody);

    // const formData = new FormData();
    // const img = editorRef.current?.getImageScaledToCanvas().toDataURL();
    // formData.append("eventImage", dataURLtoFile(img, "event-image"));
    // // formData.append("eventImage");
    // for (const key in apiBody) {
    //   console.log(key, apiBody[key]);
    //   formData.append(key, apiBody[key]);
    // }

    const { data } = await createEvent(apiBody);
    console.log({ data });

    setCreateLoading(false);
  };

  const setValues = (name, value) => {
    setEventData({ ...eventData, [name]: value });
  };

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorsObj = errors;
    delete errorsObj[name];
    setErrors(errorsObj);
  };

  const populateDate = (currentYear, diff) => {
    let validYear = currentYear - diff;
    return new Date(validYear.toString()).toISOString();
  };

  React.useEffect(() => {
    getUserFollowers().then((res) => {
      const { data, status } = res;
      const list = data?.data?.map((item) => item.email);
      if (status !== 200) return toast.error(data.error);
      setInvitees(list);
    });
  }, []);

  return (
    <div>
      <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Create an Event!
      </div>
      <div className="flex ">
        <div className="space-y-4 p-4 w-full">
          <div className="rounded-md">
            <div className="flex ">
              <div className="w-8/12">
                <TextField
                  id="eventTitle"
                  label="Event Title"
                  variant="outlined"
                  required
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="eg. John Doe's Birthday Party"
                  margin="dense"
                  name="eventTitle"
                  error={errors?.eventTitle}
                  helperText={
                    errors?.eventTitle ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Please enter a Event Title
                      </span>
                    ) : (
                      <span className="text-base flex items-center">
                        <InfoOutlinedIcon fontSize="small" />
                        &nbsp;Allowed A-z,a-z,0-9,!,-,@,+,#,$,&(Minimum 4
                        characters)
                      </span>
                    )
                  }
                  value={eventData?.eventTitle}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    if (value === "") setError(name);
                    if (!eventNameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
              <div className="ml-1 mr-1 w-4/12">
                <TextField
                  size="small"
                  id="type"
                  select
                  label="Type"
                  fullWidth
                  required
                  margin="dense"
                  value={eventData?.type ?? ""}
                  name="type"
                  placeholder="In-person/Online"
                  error={errors?.type}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (value !== "") {
                      setValues(name, value);
                      removeError(name);
                    } else setError(name);
                  }}
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {errors?.type && (
                  <span className="helperText__gender text-base flex items-center ">
                    <CloseIcon fontSize="small" />
                    Choose type
                  </span>
                )}
              </div>
              {/* <div className="ml-1 w-3/12">
                <TextField
                  id="maxRSVPscount"
                  label="Max RSVP limit"
                  variant="outlined"
                  required
                  size="small"
                  type="number"
                  fullWidth
                  placeholder="1-100"
                  margin="dense"
                  name="maxRSVPscount"
                  error={errors?.maxRSVPscount}
                  helperText={
                    errors?.maxRSVPscount || !eventData?.maxRSVPscount ? (
                      <span className="text-base flex items-center">
                        {(errors?.maxRSVPscount ||
                          eventData?.maxRSVPscount < 0 ||
                          eventData?.maxRSVPscount > 100) && (
                          <CloseIcon fontSize="small" />
                        )}
                        {eventData?.maxRSVPscount < 0 ||
                        eventData?.maxRSVPscount > 100
                          ? "1-100 RSVPS allowed"
                          : eventData?.maxRSVPscount === 0
                          ? "Invalid RSVP number"
                          : null}
                      </span>
                    ) : (
                      false
                    )
                  }
                  value={eventData?.name}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    if (value === 0) setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div> */}
            </div>

            <div className="flex ">
              {(eventData?.type === "in-person" || !eventData.type) && (
                <div className="mr-1 w-6/12">
                  <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    required
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Venue of the event"
                    margin="dense"
                    name="address"
                    error={errors?.address}
                    helperText={
                      errors?.address ? (
                        <span className="text-base flex items-center">
                          <CloseIcon fontSize="small" />
                          Please enter a address
                        </span>
                      ) : (
                        false
                      )
                    }
                    value={eventData?.address}
                    onChange={(e) => {
                      let { name, value } = e.target;
                      if (value === "") setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
              )}
              {eventData?.type === "online" && (
                <div className="mr-1 w-6/12">
                  <TextField
                    id="address"
                    label="Online Event Link"
                    variant="outlined"
                    required
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Zoom, Google meet, etc"
                    margin="dense"
                    name="onlineEventLink"
                    error={errors?.onlineEventLink}
                    helperText={
                      errors?.onlineEventLink ? (
                        <span className="text-base flex items-center">
                          <CloseIcon fontSize="small" />
                          Please enter a link
                        </span>
                      ) : (
                        false
                      )
                    }
                    value={eventData?.onlineEventLink}
                    onChange={(e) => {
                      let { name, value } = e.target;
                      if (!validateUrl(value)) setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
              )}
              <div className="ml-1 mr-1 w-3/12 mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start date"
                    disablePast
                    ampm={true}
                    inputFormat="MM/DD/YYYY hh:mm"
                    value={eventData?.startDateTime ?? null}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        required
                        onKeyDown={(e) => e.preventDefault()}
                        error={errors?.startDateTime}
                        helperText={
                          errors?.startDateTime ? (
                            <span className="helperText__dob text-base flex items-center">
                              <CloseIcon fontSize="small" />
                              Enter a valid date
                            </span>
                          ) : (
                            false
                          )
                        }
                        {...params}
                      />
                    )}
                    onChange={(e) => {
                      if (e === null) removeError("startDateTime");
                      setValues("startDateTime", e);
                    }}
                    onError={(e, f) => {
                      if (e === "invalidDate") setError("startDateTime");
                      if (e === null) removeError("startDateTime");
                    }}
                    openTo={"day"}
                  />
                </LocalizationProvider>
              </div>
              <div className="ml-1 w-3/12 mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End date"
                    disablePast
                    inputFormat="MM/DD/YYYY hh:mm"
                    value={eventData?.endDateTime ?? null}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        required
                        onKeyDown={(e) => e.preventDefault()}
                        error={errors?.endDateTime}
                        helperText={
                          errors?.endDateTime ? (
                            <span className="helperText__dob text-base flex items-center">
                              <CloseIcon fontSize="small" />
                              Enter a valid date
                            </span>
                          ) : (
                            false
                          )
                        }
                        {...params}
                      />
                    )}
                    onChange={(e) => {
                      if (e === null) removeError("endDateTime");
                      setValues("endDateTime", e);
                    }}
                    onError={(e, f) => {
                      if (e === "invalidDate") setError("endDateTime");
                      if (e === null) removeError("endDateTime");
                    }}
                    minDate={populateDate(new Date().getFullYear(), 0)}
                    openTo={"day"}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="flex">
              <div className="w-6/12 mr-1">
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  required
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Tell us about your event"
                  margin="dense"
                  name="description"
                  multiline={true}
                  minRows={5}
                  error={errors?.description}
                  helperText={
                    errors?.description ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Please enter a Event Title
                      </span>
                    ) : (
                      <span className="text-base flex items-center">
                        <InfoOutlinedIcon fontSize="small" />
                        &nbsp;Minimum of 20 characters
                      </span>
                    )
                  }
                  value={eventData?.description}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    if (!validateDescription(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
              <div className="w-6/12 ml-1">
                <div>
                  <TextField
                    id="tags"
                    label="Tags"
                    variant="outlined"
                    required
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="eg. party,fun,nyc"
                    margin="dense"
                    name="tags"
                    error={errors?.tags}
                    helperText={
                      errors?.tags ? (
                        <span className="text-base flex items-center">
                          <CloseIcon fontSize="small" />
                          Enter atleast one tag
                        </span>
                      ) : (
                        <span className="text-base flex items-center">
                          <InfoOutlinedIcon fontSize="small" />
                          &nbsp;Enter tags(comma seperated)
                        </span>
                      )
                    }
                    value={eventData?.tags}
                    onChange={(e) => {
                      let { name, value } = e.target;
                      if (!validateTags(value)) setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
                <div>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="multiple-invitees">
                      Invite people
                    </InputLabel>
                    <Select
                      labelId="multiple-invitees"
                      id="multiple-invitees"
                      multiple
                      value={eventData?.invites ?? []}
                      onChange={(e) => {
                        const { value } = e.target;
                        setValues("invites", value);
                      }}
                      input={
                        <OutlinedInput
                          label="Invite people"
                          fullWidth
                          // size="small"
                        />
                      }
                    >
                      {invitees?.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            {/* <IconButton
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
              upload image
            </IconButton> */}

            {/* {imageObj && (
              <div>
                {" "}
                <AvatarEditor
                  ref={editorRef}
                  image={URL.createObjectURL(imageObj)}
                  width={500}
                  height={250}
                  border={1}
                  color={[57, 62, 70]} // RGBA
                  scale={zoom}
                  rotate={0}
                  borderRadius={1}
                />
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
              </div>
            )} */}
            <div className="flex">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventData?.arePicturedAllowed}
                    onChange={(e) =>
                      setValues("arePicturedAllowed", e.target.checked)
                    }
                  />
                }
                label="Allow to post images"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventData?.areCommentsAllowed}
                    onChange={(e) =>
                      setValues("areCommentsAllowed", e.target.checked)
                    }
                  />
                }
                label="Allow comments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventData?.ageResitricted}
                    onChange={(e) =>
                      setValues("ageResitricted", e.target.checked)
                    }
                  />
                }
                label="Age Resiticted event"
              />
            </div>
          </div>

          <div>
            <button
              className="btn_default"
              onClick={validateData}
              disabled={createLoading}
            >
              <Loading loading={createLoading} width={18} />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
