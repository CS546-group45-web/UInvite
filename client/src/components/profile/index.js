import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { genderOptions } from "../../constants";
import {
  emailValidation,
  nameValidation,
  usernameValidation,
} from "../../utils/helper";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import "./styles.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import "./styles.css";
import { editUserDetails, getUserDetails } from "../../utils/apis/user";
import { useNavigate, useParams } from "react-router";
import {
  capitalizeFirstLetter,
  fullNameFormatter,
  phoneNumberFormatter,
} from "../../utils/helper";
import { PhotoCamera } from "@mui/icons-material";
import ProfileSectionMiddle from "./profileSectionMiddle";

function Profile() {
  const params = useParams();

  const navigate = useNavigate();
  const [editView, setEditView] = React.useState(false);
  const [errors, setErrors] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [updateUserData, setUpdateUserData] = React.useState({});
  const [pageLoading, setPageLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [imageObj, setImageObj] = React.useState(null);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      setPageLoading(true);
      const data = await getUserDetails();
      setUserData(data.data);
      setPageLoading(false);
    };
    fetchUserDetails().catch((err) => console.log({ err }));
    return () => {
      setUserData(null);
    };
  }, [params]);

  const validateData = async () => {
    if (Object.keys(updateUserData).length === 0) {
      return setErrors({
        firstName: true,
        lastName: true,
        phone: true,
        dob: true,
        gender: true,
        email: true,
        username: true,
      });
    }

    const errorObj = {};
    if (!updateUserData?.firstName) errorObj.firstName = true;
    if (!updateUserData?.lastName) errorObj.lastName = true;
    if (!updateUserData?.email) errorObj.email = true;
    if (!updateUserData?.phone) errorObj.phone = true;
    if (!updateUserData?.dob) errorObj.dob = true;
    if (!updateUserData?.gender) errorObj.gender = true;
    if (!updateUserData?.username) errorObj.username = true;

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    setUpdateLoading(true);
    const { firstName, lastName, email, phone, dob, gender, username, _id } =
      updateUserData;

    const today = new Date(dob);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = mm + "/" + dd + "/" + yyyy;

    // console.log(dob.$d);
    let formData = new FormData();
    formData.append("file", imageObj);
    // console.log({ formData });
    const apiBody = {
      firstName,
      lastName,
      email,
      phone,
      dob: formattedToday,
      gender,
      username,
      _id,
    };

    const editInfo = await editUserDetails(apiBody);
    const { data, status } = editInfo;
    if (status !== 200) toast.error(data?.error);
    else {
      setUserData(data.data);
      setEditView(false);
    }
    setUpdateLoading(false);
  };

  const editButton = () => {
    return (
      <div
        onClick={() => {
          setUpdateUserData(userData);
          setEditView(!editView);
        }}
        className="btn_edit_profile"
      >
        {/* <IconButton
          aria-label="edit your profile"
          disableFocusRipple={true}
          disableRipple={true}
        > */}
        {/* <EditIcon color="#1d1f23" fontSize="small" /> */}
        Edit profile
        {/* </IconButton> */}
      </div>
    );
  };

  const ViewProfile = () => {
    const {
      firstName,
      lastName,
      username,
      email,
      dob,
      phone,
      gender,
      profile_photo_url,
      followers = [1],
      following,
      rsvped_events,
      events_created,
    } = userData;
    const username1 = "tarundadlani1";
    return (
      <div>
        <div className="grid grid_spaces text-[#1d1f23]">
          <div className="user_profile_picture">
            <img
              src={
                profile_photo_url
                  ? profile_photo_url
                  : "https://avatars.githubusercontent.com/u/677777?v=4"
              }
              alt="your profile"
            />
          </div>
          <div className="py-4 px-3 text-xl">
            <div className="flex items-center text-3xl  font-bold h-[40px]">
              <span className="fullname ">
                {fullNameFormatter(firstName, lastName)}
              </span>
              {editButton()}
            </div>
            <div className="font-extralight">
              <span>@{username}</span>
            </div>
            <div className="flex">
              <div className="flex items-center">
                <div className="w-[30px] h-[30px]">
                  <CakeOutlinedIcon color="#1d1f23" />
                </div>
                <span>{dob}</span>
              </div>
              <div className="pl-4">{capitalizeFirstLetter(gender)}</div>
            </div>
            <div className="flex items-center">
              <div className="w-[30px] h-[30px]">
                <MailOutlineIcon color="#1d1f23" />
              </div>
              <span>{email}</span>
              <div className="pl-4 w-[30px] h-[30px]">
                <PhoneAndroidOutlinedIcon color="#1d1f23" />
              </div>{" "}
              <span className="pl-2">{phoneNumberFormatter(phone)}</span>
            </div>
          </div>
          <div>
            Some insights could come here like number of events, follows or
            something like that
          </div>
        </div>

        <div onClick={() => navigate("/profile/" + username1)}>{username1}</div>

        <ProfileSectionMiddle
          followers={followers}
          following={following}
          events_created={events_created}
          rsvped_events={rsvped_events}
        />
      </div>
    );
  };

  const EditProfile = () => {
    return (
      <div>
        <div className="rounded-md">
          <div className="flex justify-between">
            <div className="mr-1 w-4/12">
              <TextField
                size="small"
                id="firstName"
                label="First Name"
                variant="outlined"
                error={errors?.firstName}
                required
                fullWidth
                type="text"
                value={updateUserData?.firstName}
                name="firstName"
                margin="dense"
                placeholder="John"
                helperText={
                  errors?.firstName ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid First Name
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!nameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="ml-1 w-4/12">
              <TextField
                size="small"
                id="lastName"
                label="Last Name"
                name="lastName"
                error={errors?.lastName}
                variant="outlined"
                required
                fullWidth
                type="text"
                margin="dense"
                value={updateUserData?.lastName}
                placeholder="Doe"
                helperText={
                  errors?.lastName ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid Last Name
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!nameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="ml-1 w-4/12">
              <TextField
                size="small"
                id="Username"
                label="Username"
                variant="outlined"
                error={errors?.username}
                required
                fullWidth
                type="text"
                value={updateUserData?.username}
                name="username"
                margin="dense"
                placeholder="John"
                helperText={
                  errors?.username ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid username
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!usernameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mr-1 w-6/12">
              <TextField
                size="small"
                id="email"
                label="Email"
                variant="outlined"
                required
                type="email"
                fullWidth
                margin="dense"
                value={updateUserData?.email ?? ""}
                name="email"
                placeholder="johndoe@example.com"
                helperText={
                  errors?.email ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid email
                    </span>
                  ) : (
                    false
                  )
                }
                error={errors?.email}
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!emailValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="mr-1 w-6/12">
              <TextField
                size="small"
                id="gender"
                select
                label="Select gender"
                fullWidth
                required
                margin="dense"
                value={updateUserData?.gender ?? ""}
                name="gender"
                placeholder="select a gender"
                error={errors?.gender}
                onChange={(e) => {
                  const { name, value } = e.target;
                  if (value !== "") {
                    setValues(name, value);
                    removeError(name);
                  } else setError(name);
                }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {errors?.gender && (
                <span className="helperText__gender text-base flex items-center ">
                  <CloseIcon fontSize="small" />
                  Choose a gender
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mr-1 w-6/12">
              <TextField
                size="small"
                id="phone"
                label="Phone"
                variant="outlined"
                required
                fullWidth
                type="phone"
                margin="dense"
                name="phone"
                error={errors?.phone}
                placeholder="1234567899"
                value={updateUserData?.phone ?? ""}
                helperText={
                  errors?.phone ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid phone number
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (value.length < 10 || value.length > 10) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="ml-1 w-6/12">
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    disableFuture
                    inputFormat="MM/DD/YYYY"
                    value={updateUserData?.dob ?? null}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        required
                        onKeyDown={(e) => e.preventDefault()}
                        error={errors?.dob}
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
                      if (e === null) removeError("dob");
                      setValues("dob", e);
                    }}
                    onError={(e, f) => {
                      if (e === "invalidDate") setError("dob");
                      if (e === null) removeError("dob");
                    }}
                    maxDate={populateDate(new Date().getFullYear(), 13)}
                    minDate={populateDate(new Date().getFullYear(), 100)}
                    openTo={"day"}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div>
            <div className="user_profile_picture">
              <img
                src={imageObj ? URL.createObjectURL(imageObj) : null}
                alt="uploaded"
              />
            </div>
            Upload photo
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setImageObj(e.target.files[0]);
                }}
              />
              <PhotoCamera />
            </IconButton>
          </div>
        </div>

        <div className="flex mt-4">
          <button className="btn_default mr-2" onClick={validateData}>
            <Loading loading={updateLoading} width={18} /> Update
          </button>
          <button
            className="btn_default__cancel"
            onClick={() => setEditView(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const setValues = (name, value) => {
    setUpdateUserData({ ...updateUserData, [name]: value });
  };

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorObj = errors;
    delete errorObj[name];
    setErrors(errorObj);
  };

  const populateDate = (currentYear, diff) => {
    let validYear = currentYear - diff;
    return new Date(validYear.toString()).toISOString();
  };

  return (
    <div className="flex min-h-full justify-center">
      {pageLoading ? (
        <div className="flex m-auto">
          <Loading
            loading={pageLoading}
            width={40}
            color="#1d1f23"
            thickness={5}
          />
        </div>
      ) : (
        <div className="w-full">
          {editView && !pageLoading ? EditProfile() : ViewProfile()}
        </div>
      )}
    </div>
  );
}

export default Profile;
