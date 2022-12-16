# Server Docs

## Installation and Running the server

`npm i`

create a `.env` file in the root directory which is similer to `.env.example`

### To start the server in development mode(server restarts for every change)

`npm run dev`

### Running the server in production mode

`npm start`

## API Documentation

### Authentication

#### Sign Up

`POST /api/auth/signup`

##### Request Body

```json
{
  "firstName": "Monkey",
  "lastName": "D Luffy",
  "email": "luffy@gmail.com",
  "username":"luffy"
  "password": "IamKing123",
  "phone": "5513445525",
  "dob": "06/07/2000",
  "gender": "male"
}
```

##### Response

```json
{
  "message": "User Monkey D Luffy created successfully"
}
```

#### Sign In

`POST /api/auth/`

##### Request Body

```json
{
  "email": "monkeydluffy@gmail.com",
  "password": "IamKing123"
}
```

##### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U"
}
```

#### Get User by token

`GET /api/auth/`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "_id": "6370dfbb2a6185df6e1216a2",
  "firstName": "Monkey",
  "lastName": "D Luffy",
  "email": "luffy@gmail.com",
  "username": "luffy",
  "dob": "06/07/2000",
  "phone": "5513445525",
  "gender": "male",
  "rsvped_events": [],
  "profile_photo_url": "",
  "events_created": [],
  "followers": [],
  "following": []
}
```

#### Verify user email token

`GET /api/auth/verify/:token`

##### Response

```json
{
  "message": "User verified successfully"
}
```

#### Forgot Password

`POST /api/auth/forgot`

##### Request Body

```json
{
  "email": "luffy@gmail.com"
}
```

##### Response

```json
{
  "message": "Email sent successfully"
}
```

#### Reset Password

`POST /api/auth/reset/:token`

##### Request Body

```json
{
  "password": "IamKing@123"
}
```

##### Response

```json
{
  "message": "Password reset successfully"
}
```

### User

#### Get User by id

`GET /api/users/luffy`

##### Response

```json
{
  "_id": "6370dfbb2a6185df6e1216a2",
  "firstName": "Monkey",
  "lastName": "D Luffy",
  "email": "luffy@gmail.com",
  "username": "luffy",
  "dob": "06/07/2000",
  "phone": "5513445525",
  "gender": "male",
  "rsvped_events": [],
  "profile_photo_url": "",
  "events_created": [],
  "followers": [],
  "following": []
}
```

<!-- edit user -->

#### Edit User

`POST /api/users/edit`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Request Body

```json
{
  "firstName": "Money",
  "lastName": "D Luffy",
  "email": "luffy@gmail.com",
  "username": "luffy",
  "dob": "06/07/2000",
  "phone": "5513445525",
  "gender": "male"
}
```

##### Response

```json
{
  "message": "User updated successfully"
  "data": {
    "_id": "6370dfbb2a6185df6e1216a2",
    "firstName": "Money",
    "lastName": "D Luffy",
    "email": "luffy@gmail.com",
    "username": "luffy",
    "dob": "06/07/2000",
    "phone": "5513445525",
    "gender": "male",
    "rsvped_events": [],
    "profile_photo_url": "",
    "events_created": [],
    "followers": [],
    "following": []
}
```

#### Update Profile Image

`POST http://localhost:4000/api/user/profileImage`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Request Body

```json
{
  "profileImage": "image.jpg" // file format
}
```

##### Response

```json
{
  "message": "Profile image updated successfully",
  "data": {
    "_id": "6399516a58fe5981b404afce",
    "firstName": "Monkey",
    "lastName": "D Luffy",
    "email": "manisaiprasadam@gmail.com",
    "username": "manisaiprasad",
    "dob": "06/07/2000",
    "phone": "5513445525",
    "gender": "male",
    "is_verified": true,
    "rsvped_events": [],
    "profile_photo_url": "1670996736832_manisaiprasad.jpeg",
    "events_created": [],
    "followers": ["6397c1f87bfb3f5473fbca60"],
    "following": ["6397c1f87bfb3f5473fbca60"]
  }
}
```

#### Follow User

`GET /api/users/follow/:user_id`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "User followed successfully",
  "data": {
    "_id": "6399516a58fe5981b404afce",
    "firstName": "Monkey",
    "lastName": "D Luffy",
    "email": "manisaiprasadam@gmail.com",
    "username": "manisaiprasad",
    "dob": "06/07/2000",
    "phone": "5513445525",
    "gender": "male",
    "is_verified": true,
    "rsvped_events": [],
    "profile_photo_url": "",
    "events_created": [],
    "followers": [],
    "following": ["6397c1f87bfb3f5473fbca60"]
  }
}
```

#### Unfollow User

`GET /api/users/unfollow/:user_id`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "User followed successfully",
  "data": {
    "_id": "6399516a58fe5981b404afce",
    "firstName": "Monkey",
    "lastName": "D Luffy",
    "email": "manisaiprasadam@gmail.com",
    "username": "manisaiprasad",
    "dob": "06/07/2000",
    "phone": "5513445525",
    "gender": "male",
    "is_verified": true,
    "rsvped_events": [],
    "profile_photo_url": "",
    "events_created": [],
    "followers": [],
    "following": ["6397c1f87bfb3f5473fbca60"]
  }
}
```

#### Get Followers Details

`GET /api/users/followers`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "Followers fetched successfully",
  "data": [
    {
      "_id": "6397c1f87bfb3f5473fbca60",
      "firstName": "Tarun",
      "lastName": "Dadlani",
      "email": "tdadlani@stevens.edu",
      "username": "tdadlani",
      "dob": "12/03/2003",
      "phone": "3322602829",
      "gender": "male",
      "is_verified": true,
      "rsvped_events": [],
      "profile_photo_url": "tdadlani.png",
      "events_created": [],
      "followers": ["6399516a58fe5981b404afce"],
      "following": ["6399516a58fe5981b404afce"]
    }
  ]
}
```

#### Get Following Details

`GET /api/users/followers`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "Followers fetched successfully",
  "data": [
    {
      "_id": "6397c1f87bfb3f5473fbca60",
      "firstName": "Tarun",
      "lastName": "Dadlani",
      "email": "tdadlani@stevens.edu",
      "username": "tdadlani",
      "dob": "12/03/2003",
      "phone": "3322602829",
      "gender": "male",
      "is_verified": true,
      "rsvped_events": [],
      "profile_photo_url": "tdadlani.png",
      "events_created": [],
      "followers": ["6399516a58fe5981b404afce"],
      "following": ["6399516a58fe5981b404afce"]
    }
  ]
}
```

#### Followers Details by user id

`GET /api/users/followers/639972ffb5f8386c8be79553`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "Followers fetched successfully",
  "data": [
    {
      "_id": "63997c767721a9d370c35712",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "email": "manisaiprasadam@gmail.com",
      "username": "manisai",
      "dob": "06/07/2000",
      "phone": "5513445525",
      "gender": "female",
      "is_verified": true,
      "rsvped_events": [],
      "profile_photo_url": "1671004157669_manisai.jpg",
      "events_created": [],
      "followers": [],
      "following": ["639972ffb5f8386c8be79553", "63997d7bb5f8386c8be79555"]
    }
  ]
}
```

#### Following Details by userid

`GET /api/users/following/639972ffb5f8386c8be79553`

##### Response

```json
{
  "message": "Following fetched successfully",
  "data": [
    {
      "_id": "63997c767721a9d370c35712",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "email": "manisaiprasadam@gmail.com",
      "username": "manisai",
      "dob": "06/07/2000",
      "phone": "5513445525",
      "gender": "female",
      "is_verified": true,
      "rsvped_events": [],
      "profile_photo_url": "1671004157669_manisai.jpg",
      "events_created": [],
      "followers": [],
      "following": ["639972ffb5f8386c8be79553", "63997d7bb5f8386c8be79555"]
    }
  ]
}
```

<!--
Get User created events
 -->

#### Get User created events

`GET /api/user/createdEvents`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Created events fetched",
  "data": [
    {
      "_id": "639aed8983d3e120e7494c19",
      "eventTitle": "Danceee",
      "dateCreated": "2022-12-15T09:48:57.931Z",
      "rsvps": [],
      "tags": ["party", "18+"]
    },
    {
      "_id": "639aee5874e2a3341b949a64",
      "eventTitle": "Danceee",
      "dateCreated": "2022-12-15T09:52:24.532Z",
      "rsvps": [],
      "tags": ["party", "18+"]
    }
  ]
}
```

#### Get User rsvped events

`GET /api/user/rsvpEvents`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Rsvp events fetched",
  "data": [
    {
      "_id": "639c2ebdb8806952c83c8ad9",
      "eventTitle": "DanceMani2",
      "dateCreated": "2022-12-16T08:52:17.994Z",
      "rsvps": ["63997c767721a9d370c35712"],
      "tags": ["party", "helloo"]
    }
  ]
}
```

### Events

#### Create Event

`POST /api/events/`

#### Request Body

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

```json
{
  "eventTitle": "DanceMani1",
  "description": "description",
  "startDateTime": "2022-11-06T19:58:23.464Z",
  "endDateTime": "2022-11-06T19:58:23.464Z",
  "address": "69 Hutton ST",
  "type": "in-person",
  "tags": "party,helloo",
  "arePicturesAllowed": "true",
  "areCommentsAllowed": "true",
  "ageRestricted": "true"
}
```

#### Response

```json
{
  "message": "Event added successfully",
  "data": {
    "eventId": "639aea871717b53eb381b5a2"
  }
}
```

#### Upload event image

`POST /api/events/image/639aea871717b53eb381b5a2`

#### Request Body

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

```json
{
  "eventImage": "banner.jpg" // type file
}
```

#### Response

```json
{
  "message": "Event photo updated successfully",
  "data": {
    "_id": "639c2ebdb8806952c83c8ad9",
    "userId": "63997c767721a9d370c35712",
    "eventTitle": "DanceMani2",
    "description": "Hellooooooooo",
    "startDateTime": "2022-11-06T19:58:23.464Z",
    "endDateTime": "2022-11-06T19:58:23.464Z",
    "address": "69 Hutton ST",
    "dateCreated": "2022-12-16T08:52:17.994Z",
    "arePicturesAllowed": true,
    "areCommentsAllowed": true,
    "ageRestricted": true,
    "type": "in-person",
    "rsvps": [],
    "waitlist": [],
    "tags": ["party", "helloo"],
    "like_count": 0,
    "comments": [],
    "reviews": [],
    "overallRating": 0,
    "event_photo_url": "1671181757648_manisai.jpg",
    "username": "manisai",
    "firstName": "Mani Sai Prasad",
    "lastName": "Masupalli",
    "profile_photo_url": "1671106259009_manisai.png"
  }
}
```

#### Update event

`POST /api/events/update/639aea871717b53eb381b5a2`

#### Request Body

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

```json
{
  "eventTitle": "DanceMani2",
  "description": "Hellooooooooo",
  "startDateTime": "2022-11-06T19:58:23.464Z",
  "endDateTime": "2022-11-06T19:58:23.464Z",
  "address": "69 Hutton ST",
  "type": "in-person",
  "tags": "party,helloo",
  "arePicturesAllowed": "true",
  "areCommentsAllowed": "true",
  "ageRestricted": "true"
}
```

#### Response

```json
{
  "message": "Event updated successfully",
  "data": {
    "_id": "639c2ebdb8806952c83c8ad9",
    "userId": "63997c767721a9d370c35712",
    "eventTitle": "DanceMani2",
    "description": "Hellooooooooo",
    "startDateTime": "2022-11-06T19:58:23.464Z",
    "endDateTime": "2022-11-06T19:58:23.464Z",
    "address": "69 Hutton ST",
    "dateCreated": "2022-12-16T08:48:14.287Z",
    "arePicturesAllowed": true,
    "areCommentsAllowed": true,
    "ageRestricted": true,
    "type": "in-person",
    "rsvps": [],
    "waitlist": [],
    "tags": ["party", "helloo"],
    "like_count": 0,
    "comments": [],
    "reviews": [],
    "overallRating": 0,
    "username": "manisai",
    "firstName": "Mani Sai Prasad",
    "lastName": "Masupalli",
    "profile_photo_url": "1671106259009_manisai.png"
  }
}
```

#### Get Event Details by Id

`GET /api/events/id/639ae3121e10cf0b97a0f7ad`

##### Response

```json
{
  "message": "event fetched",
  "data": {
    "_id": "639aee5874e2a3341b949a64",
    "userId": "63997c767721a9d370c35712",
    "eventTitle": "Danceee",
    "description": "description",
    "startDateTime": "2022-11-06T19:58:23.464Z",
    "endDateTime": "2022-11-06T19:58:23.464Z",
    "address": "69 Hutton ST",
    "dateCreated": "2022-12-15T09:52:24.532Z",
    "type": "in-person",
    "rsvps": [],
    "waitlist": [],
    "tags": ["party", "18+"],
    "like_count": 0,
    "comments": [],
    "reviews": [],
    "overallRating": 0,
    "event_photo_url": "1671097942156_manisai.JPG",
    "username": "manisai",
    "firstName": "Mani Sai Prasad",
    "lastName": "Masupalli",
    "profile_photo_url": "1671076586663_manisai.png"
  }
}
```

<!-- rsvp event -->

#### RSVP Event

`POST /api/events/rsvp/639c2ebdb8806952c83c8ad9`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Request Body

```json
{
  "message": "RSVP added successfully",
  "data": {
    "_id": "639c2ebdb8806952c83c8ad9",
    "userId": "63997c767721a9d370c35712",
    "eventTitle": "DanceMani2",
    "description": "Hellooooooooo",
    "startDateTime": "2022-11-06T19:58:23.464Z",
    "endDateTime": "2022-11-06T19:58:23.464Z",
    "address": "69 Hutton ST",
    "dateCreated": "2022-12-16T08:52:17.994Z",
    "arePicturesAllowed": true,
    "areCommentsAllowed": true,
    "ageRestricted": true,
    "type": "in-person",
    "rsvps": ["63997c767721a9d370c35712"],
    "waitlist": [],
    "tags": ["party", "helloo"],
    "like_count": 0,
    "comments": [],
    "reviews": [],
    "overallRating": 0,
    "event_photo_url": "1671181757648_manisai.jpg",
    "username": "manisai",
    "firstName": "Mani Sai Prasad",
    "lastName": "Masupalli",
    "profile_photo_url": "1671106259009_manisai.png"
  }
}
```

#### Get All Events

`GET /api/events/`

##### Response

```json
{
  "message": "events fetched",
  "data": [
    {
      "_id": "639ae3121e10cf0b97a0f7ad",
      "userId": "63997c767721a9d370c35712",
      "eventTitle": "DanceMani1",
      "description": "description",
      "startDateTime": "2022-11-06T19:58:23.464Z",
      "endDateTime": "2022-11-06T19:58:23.464Z",
      "address": "69 Hutton ST",
      "date_created": "2022-12-15T09:04:18.337Z",
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["party"],
      "like_count": 0,
      "Comments": [],
      "reviews": [],
      "overallRating": 0,
      "ratings": [],
      "username": "manisai",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "profile_photo_url": "1671076586663_manisai.png"
    },
    {
      "_id": "639aed8983d3e120e7494c19",
      "eventTitle": "Danceee",
      "description": "description",
      "startDateTime": "2022-11-06T19:58:23.464Z",
      "endDateTime": "2022-11-06T19:58:23.464Z",
      "address": "69 Hutton ST",
      "dateCreated": "2022-12-15T09:48:57.931Z",
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["party", "18+"],
      "like_count": 0,
      "comments": [],
      "reviews": [],
      "overallRating": 0,
      "event_photo_url": "1671097734360_manisai.JPG",
      "userId": "63997c767721a9d370c35712",
      "username": "manisai",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "profile_photo_url": "1671076586663_manisai.png"
    },
    {
      "_id": "639aee5874e2a3341b949a64",
      "userId": "63997c767721a9d370c35712",
      "eventTitle": "Danceee",
      "description": "description",
      "startDateTime": "2022-11-06T19:58:23.464Z",
      "endDateTime": "2022-11-06T19:58:23.464Z",
      "address": "69 Hutton ST",
      "dateCreated": "2022-12-15T09:52:24.532Z",
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["party", "18+"],
      "like_count": 0,
      "comments": [],
      "reviews": [],
      "overallRating": 0,
      "event_photo_url": "1671097942156_manisai.JPG",
      "username": "manisai",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "profile_photo_url": "1671076586663_manisai.png"
    }
  ]
}
```

## Update API Docs when changes are made

When changes are made to the API, it is important to update the documentation to reflect those changes. Doing so will help keep team up to date on the latest features and changes, and ensure that they are using the API correctly.
