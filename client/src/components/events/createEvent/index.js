import React from "react";
import Loading from "../../common/Loading"
import CloseIcon from "@mui/icons-material/Close";
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
  const [event, setEvent] = React.useState({ name: "", type: true, description:"", location: "" , start_date_time:'' ,end_date_time: '', tags: "",  picturesAllowed: true, commentsAllowed: true, publicEvent: true, dateCreated:""});
  const [errors, setErrors] = React.useState({ email: false, password: false });
  const [loading, setLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorsObj = errors;
    delete errorsObj[name];
    setErrors(errorsObj);
  };

  const setValues = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const validateData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name,type,description,location,start_date_time,end_date_time,
      tags,
      picturesAllowed,
      commentsAllowed,
      publicEvent,
      dateCreated} = event;

    let errorObj = {};
    if (!nameValidation(name)) errorObj.name = true;
    if (!nameValidation(description)) errorObj.description = true;
    if (!nameValidation(tags)) errorObj.tags = true;

    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      console.log('creating event', event)
      setIsSubmitted(true)
    }
    setLoading(false); 
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
            size="small"
            className="my-2"
            id="name"
            label="Event Name:"
            variant="outlined"
            required
            type="text"
            
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
            label="Event Description:"
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
            size="small"
            label="Event Location:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder="31 Hartwell Road"
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
         label="Start time & date"
         size="small"
         required
           value={event?.start_date_time}
           onChange={(e) => {
            let { name, value } = e.target;
            value = value.trim();
            if (value === "") setError(name);
      
            else removeError(name);
            setValues(name, value);
          }}
           />
          </LocalizationProvider>
        </div>
        
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
         renderInput={(props) => <TextField {...props} />}
         label="End time & date"
         size="small"
         required
           value={event?.end_date_time}
           onChange={(e) => {
            let { name, value } = e.target;
            value = value.trim();
            if (value === "") setError(name);
            
            else removeError(name);
            setValues(name, value);
          }}
           />
          </LocalizationProvider>
        </div>
       
       
        <div>
          <TextField
            className="my-2"
            id="tags"
            size="small"
            label="Hashtags:"
            variant="outlined"
            required
            type="text"
            
            placeholder="#18+, #public, #nyc"
            margin="dense"
            name="tags"
            error={errors?.name}
            helperText={
              errors?.name ? (
                <span className="text-base flex items-center">
                  <CloseIcon fontSize="small" />
                  Please enter valid tags
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
            control={<Checkbox defaultChecked />}
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
            control={<Checkbox defaultChecked />}
            label="Comments Allowed?"
            value={event?.commentsAllowed}
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
            control={<Checkbox defaultChecked />}
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
            control={<Checkbox defaultChecked />}
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
          disabled={loading || errors?.name||errors?.type||errors?.description||errors?.location||errors?.start_date_time||errors?.end_date_time||errors?.tags||errors?.picturesAllowed|| errors?.commentsAllowed||errors?.publicEvent||errors?.dateCreated}
        >
          Create Event
        </button>
      </div>
      
    </div>
    
  </div>
</div>

}

export default CreateEvent;
