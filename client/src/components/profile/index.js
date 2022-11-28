import React from "react";
import {
  Checkbox,
 
  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";

function Profile() {
  return <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-4">
    <div className="flex items-center flex-col">
      <div className="w-40">
        
      </div>

      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Your Profile!
      </h2>
    </div>
    <div className="space-y-4 p-4">
      <div className="-space-y-px rounded-md">
        <div>
          <TextField
            className="my-2"
            id="avi"
            label="Profile Picture:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder=""
            margin="dense"
            name="avi"
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
            id="bio"
            label="Biography:"
            variant="outlined"
           
            type="text"
            fullWidth
            placeholder="Hi, I am a senior medical student from chicago attending school at Rutgers University, I live in new brunswick"
            margin="dense"
            name="bio"
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
            id="instagram"
            label="Instagram:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder="@JohnDoe48"
            margin="dense"
            name="instagram"
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
            label="Twitter:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder="@johndoe48"
            margin="dense"
            name="twitter"
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
            label="Email Adress:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder="johndoe@gmail.com"
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
        
        <div>
          <TextField
            className="my-2"
            id="email"
            label="Phone Number:"
            variant="outlined"
            required
            type="text"
            fullWidth
            placeholder="732-610-7448"
            margin="dense"
            name="phone"
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
            label="Private profile?"
          />
        </div>
        

      
        

      
      </div>

      <div>
        <button
          className="btn_default"
          // onClick={validateData}
          // disabled={errors?.password || errors?.email}
        >
          Update Profile
        </button>
      </div>
    </div>
    
  </div>
</div>

}

export default Profile;
