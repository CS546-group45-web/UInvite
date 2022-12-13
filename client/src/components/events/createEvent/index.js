import React from "react";
import Loading from "../../common/Loading"
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
//import { DesktopDateTimePicker } from '@mui/x-date-pickers-pro/DesktopDateTimePicker';
// or
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// or
//import { DesktopDateTimePicker } from '@mui/x-date-pickers-pro';
// or
//import { DesktopDateTimePicker } from '@mui/x-date-pickers';

import dayjs, { Dayjs } from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Checkbox,


  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";
import { nameValidation, validateDate } from "../../../utils/helper";

function CreateEvent() {
  const [event, setEvent] = React.useState({ name: "", type: true, description: "", location: "", start_date_time: '', end_date_time: '', tags: "", picturesAllowed: true, commentsAllowed: true, publicEvent: true, dateCreated: "" });
  const [errors, setErrors] = React.useState({ email: false, password: false });
  const [loading, setLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

 
  

  const validateData = async (e) => {
    e.preventDefault();
    let errorObj = {};
    if (!event?.name) errorObj.name = true;

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});
    setLoading(true);
    const { name, type, description, location, start_date_time, end_date_time,
      tags,
      picturesAllowed,
      commentsAllowed,
      publicEvent,
      dateCreated } = event;
    
      const apiBody = {
        name, type, description, location, start_date_time, end_date_time,
      tags,
      picturesAllowed,
      commentsAllowed,
      publicEvent,
      dateCreated
      };
      const createInfo = await CreateEvent(apiBody);

      const { data, status } = createInfo;
      if (status !== 201) toast.error(data?.error);
      else {
        // console.log(data, status);
        window.location.href = "/home";
      }
    
    setLoading(false);
  };
  const setValues = (name, value) => {
    setEvent({ ...event, [name]: value });
  };
  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorsObj = errors;
    delete errorsObj[name];
    setErrors(errorsObj);
  };

  return <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center flex-col">
        <div className="w-40">

        </div>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create an Event!
        </h2>
      </div>
      <div className="space-y-4 p-4">
        <div className="-space-y-px rounded-md">
          <div>
            <TextField

              className="my-2"
              id="name"
              label="Event Name"
              variant="outlined"
              required
              type="text"
              fullWidth

              placeholder="John Doe's Birthday Party"
              margin="dense"
              name="name"
              error={errors?.name}
              helperText={
                errors?.name ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Please enter a valid name
                  </span>
                ) : (
                  false
                )
              }
              value={event?.name}
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
          <div>
            <TextField
              className="my-2"

              id="description"
              label="Event Description"
              variant="outlined"
              required
              type="text"
              fullWidth
              placeholder="Birthday party at my house please bring a swimsuit if you wish to use the hottub "
              margin="dense"
              name="description"
              error={errors?.name}
              helperText={
                errors?.name ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Please enter a valid input
                  </span>
                ) : (
                  false
                )
              }
              value={event?.description}
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
          <div>
            <TextField
              className="my-2"
              id="location"

              label="Event Location"
              variant="outlined"
              required
              type="text"
              fullWidth
              placeholder="31 Hartwell Road or zoom link"
              margin="dense"
              name="location"
              error={errors?.name}
              helperText={
                errors?.name ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Please enter a valid location
                  </span>
                ) : (
                  false
                )
              }
              value={event?.location}
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





          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start Date & Time of the Event"
                disablePast

                required
                value={event?.start_date_time?? null}
                onChange={(e) => {
                  
                  setValues("start_date_time", e);
                }}
              />
            </LocalizationProvider>
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End Date & Time of the event"
                disablePast

                required
                value={event?.end_date_time?? null}
                onChange={(e) => {
                  
                  setValues("end_date_time", e);
                }}
              />
            </LocalizationProvider>
          </div>


          <div>
            <TextField
              className="my-2"
              id="tags"

              label="Hashtags"
              variant="outlined"
              required
              type="text"
              fullWidth

              placeholder="#18+, #public, #nyc"
              margin="dense"
              name="tags"
              error={errors?.name}
              helperText={
                errors?.name ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Atleast one tag is required
                  </span>
                ) : (
                  false
                )
              }
              value={event?.tags}
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

        <div className="flex items-center justify-between text-logoBlue">
          <div className="flex items-center">
            <FormControlLabel
              control={<Checkbox />}
              label="Pictures allowed?"
              value={event?.picturesAllowed}
              onChange={(e) => {
                // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                let { name, value } = e.target;
                value = value.trim();

                setValues(name, value);
              }}
            />
          </div>



        </div>
        <div className="flex items-center justify-between text-logoBlue">
          <div className="flex items-center">
            <FormControlLabel
              control={<Checkbox />}
              label="Comments Allowed?"
              value={event?.commentsAllowed}
              onChange={(e) => {
                console.log(e);
                // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                let { name, value } = e.target;
                value = value.trim();

                setValues(name, value);
              }}
            />
          </div>



        </div>
        <div className="flex items-center justify-between text-logoBlue">
          <div className="flex items-center">
            <FormControlLabel
              control={<Checkbox />}
              label="Public Event?"
              value={event?.publicEvent}
              onChange={(e) => {
                // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                let { name, value } = e.target;
                value = value.trim();

                setValues(name, value);
              }}
            />
          </div>



        </div>
        <div className="flex items-center justify-between text-logoBlue">
          <div className="flex items-center">
            <FormControlLabel
              control={<Checkbox />}
              label="Online/Virtual Event?"
              value={event?.type}
              onChange={(e) => {
                // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                let { name, value } = e.target;
                value = value.trim();

                setValues(name, value);
              }}
            />
          </div>



        </div>

        <div>
          <button
            className="btn_default"
            onClick={validateData}
            disabled={loading || errors?.name || errors?.type || errors?.description || errors?.location || errors?.start_date_time || errors?.end_date_time || errors?.tags || errors?.picturesAllowed || errors?.commentsAllowed || errors?.publicEvent || errors?.dateCreated}
          >
            Create
          </button>
        </div>

      </div>

    </div>
  </div>

}

export default CreateEvent;
