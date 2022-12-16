import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

function CreateEvent() {
  return (
    <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40"></div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an Event!
          </h2>
        </div>
        <div className="space-y-4 p-4">
          <div className="-space-y-px rounded-md">
            <div>
              <TextField
                className="my-2"
                id="Event Name"
                label="Event Name:"
                variant="outlined"
                required
                type="text"
                fullWidth
                placeholder="John Doe's Birthday Party"
                margin="dense"
                name="Event Name"
                // error={errors?.email}
                // helperText={
                //   errors?.email ? (
                //     <span className="text-base flex items-center">
                //       <CloseIcon fontSize="small" />
                //       Please enter a valid email
                //     </span>
                //   ) : (
                //     false
                //   )
                // }
                // value={userData?.email}
                // onChange={(e) => {
                //   // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                //   let { name, value } = e.target;
                //   value = value.trim();
                //   if (value === "") setError(name);
                //   if (!emailValidation(value)) setError(name);
                //   else removeError(name);
                //   setValues(name, value);
                // }}
              />
            </div>
            <div>
              <TextField
                className="my-2"
                id="location"
                label="Event Location (Optional):"
                variant="outlined"
                type="text"
                fullWidth
                placeholder="31 Hartwell Road"
                margin="dense"
                name="location"
                // error={errors?.email}
                // helperText={
                //   errors?.email ? (
                //     <span className="text-base flex items-center">
                //       <CloseIcon fontSize="small" />
                //       Please enter a valid email
                //     </span>
                //   ) : (
                //     false
                //   )
                // }
                // value={userData?.email}
                // onChange={(e) => {
                //   // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                //   let { name, value } = e.target;
                //   value = value.trim();
                //   if (value === "") setError(name);
                //   if (!emailValidation(value)) setError(name);
                //   else removeError(name);
                //   setValues(name, value);
                // }}
              />
            </div>
            <div>
              <TextField
                className="my-2"
                id="date"
                label="Event Date:"
                variant="outlined"
                required
                type="text"
                fullWidth
                placeholder="06/19/2022"
                margin="dense"
                name="date"
                // error={errors?.email}
                // helperText={
                //   errors?.email ? (
                //     <span className="text-base flex items-center">
                //       <CloseIcon fontSize="small" />
                //       Please enter a valid email
                //     </span>
                //   ) : (
                //     false
                //   )
                // }
                // value={userData?.email}
                // onChange={(e) => {
                //   // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                //   let { name, value } = e.target;
                //   value = value.trim();
                //   if (value === "") setError(name);
                //   if (!emailValidation(value)) setError(name);
                //   else removeError(name);
                //   setValues(name, value);
                // }}
              />
            </div>
            <div>
              <TextField
                className="my-2"
                id="time"
                label="Event Time:"
                variant="outlined"
                required
                type="text"
                fullWidth
                placeholder="7:00 pm - 11:00 pm"
                margin="dense"
                name="time"
                // error={errors?.email}
                // helperText={
                //   errors?.email ? (
                //     <span className="text-base flex items-center">
                //       <CloseIcon fontSize="small" />
                //       Please enter a valid email
                //     </span>
                //   ) : (
                //     false
                //   )
                // }
                // value={userData?.email}
                // onChange={(e) => {
                //   // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                //   let { name, value } = e.target;
                //   value = value.trim();
                //   if (value === "") setError(name);
                //   if (!emailValidation(value)) setError(name);
                //   else removeError(name);
                //   setValues(name, value);
                // }}
              />
            </div>

            <div>
              <TextField
                className="my-2"
                id="email"
                label="Age Restrictions:"
                variant="outlined"
                required
                type="text"
                fullWidth
                placeholder="15+"
                margin="dense"
                name="email"
                // error={errors?.email}
                // helperText={
                //   errors?.email ? (
                //     <span className="text-base flex items-center">
                //       <CloseIcon fontSize="small" />
                //       Please enter a valid email
                //     </span>
                //   ) : (
                //     false
                //   )
                // }
                // value={userData?.email}
                // onChange={(e) => {
                //   // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                //   let { name, value } = e.target;
                //   value = value.trim();
                //   if (value === "") setError(name);
                //   if (!emailValidation(value)) setError(name);
                //   else removeError(name);
                //   setValues(name, value);
                // }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-logoBlue">
            <div className="flex items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Pictures allowed?"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-logoBlue">
            <div className="flex items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Comments Allowed?"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-logoBlue">
            <div className="flex items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Public Event?"
              />
            </div>
          </div>

          <div>
            <button
              className="btn_default"
              // onClick={validateData}
              // disabled={errors?.password || errors?.email}
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
