import React from "react";
import Loading from "../../common/Loading";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MenuItem, TextField } from "@mui/material";
import { nameValidation } from "../../../utils/helper";
import { typeOptions } from "../../../constants";

function CreateEvent() {
  const [eventData, setEventData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [createLoading, setCreateLoading] = React.useState(false);

  const validateData = async (e) => {
    e.preventDefault();

    setCreateLoading(true);
    let errorObj = {};
    if (!eventData?.eventTitle) errorObj.eventTitle = true;
    if (!eventData?.description) errorObj.description = true;
    if (!eventData?.type) errorObj.type = true;
    if (!eventData?.startDateTime) errorObj.startDateTime = true;
    if (!eventData?.endDateTime) errorObj.endDateTime = true;
    if (!eventData?.tags) errorObj.tags = true;
    if (eventData?.type === "in-person")
      if (!eventData?.address) errorObj.name = true;
      else if (eventData?.type === "online")
        if (!eventData?.onlineEventLink) errorObj.onlineEventLink = true;

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    const { eventTitle, description, type, startDateTime, endDateTime, tags } =
      eventData;

    const apiBody = {
      eventTitle,
      description,
      type,
      startDateTime,
      endDateTime,
      tags,
    };
    if (type === "in-person") apiBody.address = eventData?.address;
    if (type === "online") apiBody.onlineEventLink = eventData?.onlineEventLink;
    // const createInfo = await CreateEvent(apiBody);

    // const { data, status } = createInfo;
    // if (status !== 201) toast.error(data?.error);
    // else {
    // console.log(data, status);
    // window.location.href = "/home";
    // }
    console.log(apiBody);

    setCreateLoading(false);
  };

  // React.useEffect(() => {
  //   console.log(eventData);
  // }, [eventData]);

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

  return (
    <div>
      <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Create an Event!
      </div>
      <div className="flex ">
        <div className="space-y-4 p-4 w-full">
          <div className="rounded-md">
            <div className="flex ">
              <div className="w-7/12">
                <TextField
                  id="eventTitle"
                  label="Event Title"
                  variant="outlined"
                  required
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="John Doe's Birthday Party"
                  margin="dense"
                  name="eventTitle"
                  error={errors?.eventTitle}
                  helperText={
                    errors?.name ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Please enter a Event Title
                      </span>
                    ) : (
                      false
                    )
                  }
                  value={eventData?.eventTitle}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
              <div className="ml-1 mr-1 w-2/12">
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
                    console.log(name, value);
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
                    Choose a type
                  </span>
                )}
              </div>
              <div className="ml-1 w-3/12">
                <TextField
                  id="maxRSVPscount"
                  label="Max RSVP limit"
                  variant="outlined"
                  required
                  size="small"
                  type="number"
                  fullWidth
                  placeholder="Max #RSVPs"
                  margin="dense"
                  name="maxRSVPscount"
                  error={errors?.maxRSVPscount}
                  helperText={
                    errors?.maxRSVPscount ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Max limit is 100
                      </span>
                    ) : (
                      false
                    )
                  }
                  value={eventData?.name}
                  onChange={(e) => {
                    // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
            </div>

            <div className="flex ">
              {eventData?.type === "in-person" ? (
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
                    error={errors?.Address}
                    helperText={
                      errors?.name ? (
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
                      // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                      let { name, value } = e.target;
                      value = value.trim();
                      if (value === "") setError(name);
                      if (!nameValidation(value)) setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
              ) : (
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
                      errors?.name ? (
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
                      value = value.trim();
                      if (value === "") setError(name);
                      if (!nameValidation(value)) setError(name);
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
                          errors?.dob ? (
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
              <div className="mr-1 w-6/12">
                <TextField
                  id="tags"
                  label="Tags"
                  variant="outlined"
                  required
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter tags(comma seperated)"
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
                      false
                    )
                  }
                  value={eventData?.tags}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
              <div className="mr-1 w-6/12">
                <TextField
                  id="invites"
                  label="Invites"
                  variant="outlined"
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter email ids(comma seperated)"
                  margin="dense"
                  name="invites"
                  error={errors?.invites}
                  helperText={
                    // NOTE: add helper text for examples
                    errors?.invites ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Enter atleast one tag
                      </span>
                    ) : (
                      false
                    )
                  }
                  value={eventData?.invites}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
            </div>

            <div className="w-7/12">
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
                minRows={4}
                error={errors?.description}
                helperText={
                  errors?.description ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Please enter a Event Title
                    </span>
                  ) : (
                    false
                  )
                }
                value={eventData?.description}
                onChange={(e) => {
                  let { name, value } = e.target;
                  value = value.trim();
                  if (value === "") setError(name);
                  if (!nameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
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
