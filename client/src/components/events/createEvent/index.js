import React from "react";
import Loading from "../../common/Loading";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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
} from "../../../utils/helper";
import { typeOptions } from "../../../constants";
import { getUserFollowers } from "../../../utils/apis/user";
import { createEvent, editEvent } from "../../../utils/apis/event";
import { useNavigate } from "react-router";
import GoogleAutoCompleteAddress from "../../common/googleAddressComponent";
// import GoogleMaps from "../../common/googleComponentAddressMUI";

function CreateEvent({ editMode = false, event = null, setMode, saveData }) {
  const navigate = useNavigate();
  const [eventData, setEventData] = React.useState(
    editMode
      ? event
      : {
          arePicturesAllowed: true,
          areCommentsAllowed: true,
          ageRestricted: true,
          type: "in-person",
          startDateTime: dayjs(new Date(+new Date() + 87000000)), //setting start date to be same time as of now + 1 day
          endDateTime: dayjs(new Date(+new Date() + 3660000 + 87000000)), //setting end date to be same time as of now + 1 day + 1 hour
        }
  );
  const [errors, setErrors] = React.useState({});
  const [invitees, setInvitees] = React.useState([]);
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
    if (!eventData?.tags) errorObj.tags = true;
    if (!eventData?.address) errorObj.address = true;

    const { startDateTime, endDateTime } = eventData;

    if (!editMode) {
      if (!validateDateDiff(startDateTime?.$d, endDateTime?.$d)) {
        return toast.error("Duration of the event should be more than 1 hour");
      }
    } else {
      if (!validateDateDiff(startDateTime, endDateTime)) {
        return toast.error("Duration of the event should be more than 1 hour");
      }
    }

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    setCreateLoading(true);

    const {
      eventTitle,
      description,
      type,
      tags,
      invites,
      arePicturesAllowed,
      areCommentsAllowed,
      ageRestricted,
      address,
      city,
    } = eventData;

    const apiBody = {
      eventTitle,
      description,
      type,
      city,
      startDateTime: new Date(startDateTime).toISOString(),
      endDateTime: new Date(endDateTime).toISOString(),
      tags: editMode ? tags?.join(",") : tags,
      invites: editMode ? "" : invites?.join(","),
      arePicturesAllowed,
      areCommentsAllowed,
      ageRestricted,
      address,
    };
    // if (type === "in-person") apiBody.address = eventData?.address;
    // if (type === "online") apiBody.onlineEventLink = eventData?.onlineEventLink;
    console.log({ apiBody });

    if (editMode) {
      const { data, status } = await editEvent(eventData?._id, apiBody);
      if (status !== 200) toast.error(data.error);
      else {
        toast.success("Event updated!");
        saveData();
        setTimeout(() => navigate("/event/" + data?.data?._id), 2000);
      }
    } else {
      const data = await createEvent(apiBody);
      if (data.status !== 200) return setCreateLoading(false);
      else {
        toast.success("Event created. Redirecting to event page...");
        setTimeout(() => {
          navigate("/event/" + data?.data?.data?.eventId);
        }, 4000);
      }
    }
    setCreateLoading(false);
  };

  const setValues = (name, value) =>
    setEventData({ ...eventData, [name]: value });

  const setError = (name) => setErrors({ ...errors, [name]: true });

  const removeError = (name) => {
    const errorsObj = errors;
    delete errorsObj[name];
    setErrors(errorsObj);
  };

  const setAddress = (place) => {
    const { formatted_address, address_components } = place;
    removeError("address");
    setValues("address", formatted_address);
    setValues("city", address_components[3]?.long_name);
    // console.log({ eventData, errors });
  };

  React.useEffect(() => {
    !editMode &&
      getUserFollowers().then((res) => {
        const { data, status } = res;
        const list = data?.data?.map((item) => item.username);
        if (status !== 200) return toast.error(data.error);
        setInvitees(list);
      });
  }, [editMode]);

  return (
    <div>
      <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {editMode ? "Edit Event" : "Create Event"}
      </div>
      <div className="flex ">
        <div className="w-full">
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
                        Please enter a title
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
              {(eventData?.type === "in-person" || !eventData?.type) && (
                <div className="mr-1 w-6/12">
                  {/* <GoogleAutoCompleteAddress
                    sendAddress={setAddress}
                    error={errors?.address}
                  /> */}
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
                  {/* <GoogleMaps /> */}
                </div>
              )}
              {eventData?.type === "online" && (
                <div className="w-6/12">
                  <TextField
                    id="address"
                    label="Online Event Link"
                    variant="outlined"
                    required
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Zoom link, Google meet link, etc"
                    margin="dense"
                    name="address"
                    error={errors?.onlineEventLink}
                    helperText={
                      errors?.onlineEventLink ? (
                        <span className="text-base flex items-center">
                          <CloseIcon fontSize="small" />
                          Please enter a valid link
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
              <div className="w-3/12 mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start date"
                    disablePast
                    ampm={true}
                    // value={dayjs(eventData?.startDateTime) ?? null}

                    value={new Date(eventData?.startDateTime)}
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
                    minDateTime={dayjs(
                      new Date(+new Date() + 3600000).toISOString()
                    )}
                    openTo={"day"}
                  />
                </LocalizationProvider>
              </div>
              <div className="w-3/12 ml-1 mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End date"
                    disablePast
                    // value={dayjs(eventData?.endDateTime) ?? null}
                    value={new Date(eventData?.endDateTime)}
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
                    // minDateTime={dayjs(
                    //   new Date(+new Date() + 86400000 + 3600000).toISOString()
                    // )}
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
                  maxRows={12}
                  error={errors?.description}
                  helperText={
                    errors?.description ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Please enter a description
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
                {!editMode && (
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
                )}
              </div>
            </div>
            <div className="flex">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventData?.arePicturesAllowed}
                    onChange={(e) =>
                      setValues("arePicturesAllowed", e.target.checked)
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
                    checked={eventData?.ageRestricted}
                    onChange={(e) =>
                      setValues("ageRestricted", e.target.checked)
                    }
                  />
                }
                label="Age Resiticted event"
              />
            </div>
          </div>

          <div>
            <button
              className="btn_default mr-2"
              onClick={validateData}
              disabled={createLoading}
              type="submit"
            >
              <Loading loading={createLoading} width={18} />
              {editMode ? "Update" : "Create"}
            </button>

            {editMode && (
              <button
                className="btn_default__cancel"
                onClick={() => setMode(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
