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

#### Get User rsvped events

`GET /api/user/invites`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Invites fetched",
  "data": [
    {
      "_id": "639d42beb57f2bf6ca535ce5",
      "eventTitle": "Hellll",
      "dateCreated": "2022-12-17T04:17:02.841Z",
      "rsvps": [],
      "tags": ["party", "helloo"],
      "address": "69 Hutton ST",
      "startDateTime": "2022-11-06T19:58:23.464Z",
      "endDateTime": "2022-11-06T19:58:23.464Z"
    }
  ]
}
```

#### Get User bookmarked events

`GET /api/user/bookmarks`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Bookmarks fetched",
  "data": [
    {
      "_id": "639d6792aa2ae7661cd90695",
      "eventTitle": "HOLIDAY HANGOVER",
      "dateCreated": "2022-12-17T06:54:10.652Z",
      "rsvps": [],
      "tags": ["fun"],
      "address": "Jersey City",
      "startDateTime": "2022-12-18T07:03:47.946Z",
      "endDateTime": "2022-12-18T08:04:47.946Z"
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
  "ageRestricted": "true",
  "invites": "manisaiprasadam@gmail.com"
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

#### Response

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

#### Remove RSVP Event

`POST /api/events/removeRsvp/639c2ebdb8806952c83c8ad9`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "RSVP removed successfully",
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

#### Accept Invite

`GET /api/events/accept/639c2ebdb8806952c83c8ad9`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Invite accepted"
}
```

#### Decline Invite

`GET /api/events/decline/639c2ebdb8806952c83c8ad9`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Invite declined"
}
```

#### Bookmark Event

`GET /api/events/bookmark/639d686ca8b7d67d29cb921d`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

#### Response

```json
{
  "message": "Bookmark added successfully"
}
```

#### Search Events

`GET /api/events/search?eventTitle=Dance&eventLocation=Hutton`

Filters:

`eventTitle ` - Title of the event

`eventLocation` - Location of the event

`eventTags` - Tags of the event

`eventRating` - Rating of the event

`eventStartDateTime` - Start date and time of the event

`eventEndDateTime` - End date and time of the event

#### Response

```json
{
  "message": "events fetched",
  "data": [
    {
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
      "overallRating": 5,
      "event_photo_url": "1671181757648_manisai.jpg",
      "ratings": [
        {
          "_id": "639d0daf5b35a27a078331b5",
          "user_id": "63997c767721a9d370c35712",
          "rating": "5"
        }
      ],
      "username": "manisai",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "profile_photo_url": "1671106259009_manisai.png"
    }
  ]
}
```

 <!--http://localhost:4000/api/events/rsvpList/639d3d46ce166a2ef6543cd4 -->

#### RSVP List

`GET /api/events/rsvpList/639d3d46ce166a2ef6543cd4`

authorization-header: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzBkZmJiMmE2MTg1ZGY2ZTEyMTZhMiIsImlhdCI6MTY2ODM0MTc4Nn0.kD-ehG5mXRMoZwXCRku781COn62SRB9te0BpkFzAV4U`

##### Response

```json
{
  "message": "RSVP list fetched",
  "data": [
    {
      "userId": "63997c767721a9d370c35712",
      "username": "manisai",
      "firstName": "Mani Sai Prasad",
      "lastName": "Masupalli",
      "profile_photo_url": "1671106259009_manisai.png"
    }
  ]
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

#### Get All upcoming events

`GET /api/events/`

##### Response

```json
{
  "message": "events fetched",
  "data": [
    {
      "_id": "639c3e679bca6345b7ea47ea",
      "userId": "63997d7bb5f8386c8be79555",
      "eventTitle": "WINTER WONDERLAND",
      "description": "BEAT OF HOBOKEN! LIVE PERCUSSIONIST & ENTERTAINMENT ALL NIGHT\nPOWER HOUR 10-11PM: $3 Green Tea, $4 Bud Lights, $5 House Mixed Drinks!\nMusic by LORENZO AND DJ U-F-OSO!\nTo book your bottle service call/text 201.744.5117 or email VIP@birchhoboken.com !",
      "startDateTime": "2022-12-24T02:30:15.000Z",
      "endDateTime": "2022-12-24T09:00:15.000Z",
      "address": "93 River St, JC 03703",
      "dateCreated": "2022-12-16T09:46:15.135Z",
      "arePicturesAllowed": false,
      "areCommentsAllowed": true,
      "ageRestricted": true,
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["NJ", "party", "boys", "girls", "fun", "food", "drinks"],
      "like_count": 0,
      "comments": [],
      "reviews": [],
      "overallRating": 0,
      "username": "tarundadlani",
      "firstName": "Tarun",
      "lastName": "Dadlani",
      "profile_photo_url": "1671075660532_tarundadlani.png"
    },
    {
      "_id": "639c3f779bca6345b7ea47eb",
      "userId": "63997d7bb5f8386c8be79555",
      "eventTitle": "DRAG ME TO BRUNCH",
      "description": "DRAG ME TO BIRCH BRUNCH IS BACK AGAIN!!!\n\nWelcome to one of a kind experience at BIRCH featuring: KIMMY SUMONY, LUXX NOIR LONDON & from RuPauls Drag Race MILK!\n\nUnlimited Brunch Buffet & Drink Specials!\n\nDADDY YANKEE TICKET GIVEAWAY!\n\nCOSTUME CONTEST!\n\nTicket valid for entry, show & unlimited brunch buffet!\n\nLive Entertainment!\n\nMust reserve a table with a minimum spend if you would like to secure seating - contact 201.581.7776 for VIP reservations",
      "startDateTime": "2022-12-24T02:45:07.000Z",
      "endDateTime": "2022-12-24T09:00:07.000Z",
      "address": "93 River street, JC 07307",
      "dateCreated": "2022-12-16T09:50:47.528Z",
      "arePicturesAllowed": false,
      "areCommentsAllowed": true,
      "ageRestricted": true,
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["NJ", "party", "breakfast", "brunch", "lunch", "family"],
      "like_count": 0,
      "comments": [],
      "reviews": [],
      "overallRating": 0,
      "username": "tarundadlani",
      "firstName": "Tarun",
      "lastName": "Dadlani",
      "profile_photo_url": "1671075660532_tarundadlani.png"
    },
    {
      "_id": "639c40e59bca6345b7ea47ec",
      "userId": "63997d7bb5f8386c8be79555",
      "eventTitle": "DRAG ME TO BRUNCH",
      "description": "DRAG ME TO BIRCH BRUNCH IS BACK AGAIN!!!\nWelcome to one of a kind experience at BIRCH featuring: KIMMY SUMONY, LUXX NOIR LONDON & from RuPauls Drag Race MILK!\nUnlimited Brunch Buffet & Drink Specials!\nDADDY YANKEE TICKET GIVEAWAY!\nCOSTUME CONTEST!\nTicket valid for entry, show & unlimited brunch buffet!\nLive Entertainment!\nMust reserve a table with a minimum spend if you would like to secure seating - contact 201.581.7776 for VIP reservations",
      "startDateTime": "2022-12-25T17:15:26.000Z",
      "endDateTime": "2022-12-25T19:30:26.000Z",
      "address": "94 River St, Jc, 07307",
      "dateCreated": "2022-12-17T01:24:57.187Z",
      "arePicturesAllowed": false,
      "areCommentsAllowed": true,
      "ageRestricted": true,
      "type": "in-person",
      "rsvps": [],
      "waitlist": [],
      "tags": ["NJ", "birch", "breakfast", "brunch", "lunch"],
      "like_count": 0,
      "comments": [
        {
          "_id": "639d1a7b60b7498df0e11662",
          "user_id": "63997d7bb5f8386c8be79555",
          "dateCreated": "2022-12-17T01:25:15.678Z",
          "name": "Tarun Dadlani",
          "username": "tarundadlani",
          "profile_photo_url": "1671075660532_tarundadlani.png",
          "comment": "This is my first comment"
        },
        {
          "_id": "639d1ad860b7498df0e11663",
          "user_id": "63997d7bb5f8386c8be79555",
          "dateCreated": "2022-12-17T01:26:48.158Z",
          "name": "Tarun Dadlani",
          "username": "tarundadlani",
          "profile_photo_url": "1671075660532_tarundadlani.png",
          "comment": "This is my 2nd comment"
        },
        {
          "_id": "639d1bfa60b7498df0e11664",
          "user_id": "63997d7bb5f8386c8be79555",
          "dateCreated": "2022-12-17T01:31:37.972Z",
          "name": "Tarun Dadlani",
          "username": "tarundadlani",
          "profile_photo_url": "1671075660532_tarundadlani.png",
          "comment": "hello"
        },
        {
          "_id": "639d1c1e60b7498df0e11665",
          "user_id": "63997d7bb5f8386c8be79555",
          "dateCreated": "2022-12-17T01:32:14.233Z",
          "name": "Tarun Dadlani",
          "username": "tarundadlani",
          "profile_photo_url": "1671075660532_tarundadlani.png",
          "comment": "Hello 2"
        }
      ],
      "reviews": [],
      "overallRating": 0,
      "username": "tarundadlani",
      "firstName": "Tarun",
      "lastName": "Dadlani",
      "profile_photo_url": "1671075660532_tarundadlani.png"
    }
  ]
}
```

#### Add Rating or update rating if exists

`POST api/events/comment/:eventId`

#### Response

```json
{
  "message": "Comment added successfully",
  "data": {
    "_id": "639d7b8ddfe8e7e96610c5ec",
    "userId": "639d7a82dfe8e7e96610c5e8",
    "eventTitle": "One AfroCarib Friday Afrobeats Dancehall Reggae More",
    "description": "Lituation Friday ( #1 Afro-Caribean Friday in NYC )\nFriday, December 16\n10PM - 4AM\nGYPSY ROSE\n125 West 26th Street Between 6th & 7th Ave, 125 W 26th St, New York, NY 10001\n\nDOOR TICKETS : DOOR PAYMENT WILL BE AVAILABLE STARTING $20\n( EARLY ARRIVAL SUGGESTED )\n\nOne of a kind AfroCaribbean New Year's Eve party : Deuces\n\n#Afrobeat - #Dancehall, #Reggae & SOCA, HIPHOP, R&B & MORE\n\nBottle Service , contact us on @Blacc_Fire Via Instagram or Info@blaccfire.com to RSVP\n\nFAQ\nAGE REQUIREMENT FOR THIS EVENT----- ( 21+ W/VALID STATE ID )\nBottle package available ? ( Yes, Text \"NYE\" to (646) 776-3094 )\nCan I Pay at the door ? ( Yes, you can pay at the door )\nDoes This Club have Hookah ? ( YES, All Flavor )\nFOLLOW @BLACC_FIRE FOR MORE UPCOMING EVENTS\n\nFor More info contact us via Instagram @Blacc_Fire or Text (646) 776-3094 )",
    "startDateTime": "2022-12-23T08:29:40.000Z",
    "endDateTime": "2022-12-24T23:30:40.000Z",
    "address": "GYPSY ROSE 125 W 26TH STREET New York, NY 10001",
    "dateCreated": "2022-12-17T08:19:25.368Z",
    "arePicturesAllowed": true,
    "areCommentsAllowed": true,
    "ageRestricted": true,
    "type": "in-person",
    "rsvps": ["639d7af6dfe8e7e96610c5ea", "639d7cc6aa38de685163cd5e"],
    "waitlist": [],
    "tags": ["NJ", "birch", "breakfast", "brunch", "lunch"],
    "like_count": 0,
    "comments": [
      {
        "_id": "639e6c4a1e9eae73e5ca427c",
        "user_id": "639d7af6dfe8e7e96610c5ea",
        "dateCreated": "2022-12-18T01:26:34.364Z",
        "name": "Suman Mohanty",
        "username": "summsum",
        "profile_photo_url": "1671267137542_sumsum.png",
        "comment": "Great!"
      },
      {
        "_id": "639e6c441e9eae73e5ca427b",
        "user_id": "639d7af6dfe8e7e96610c5ea",
        "dateCreated": "2022-12-18T01:26:28.185Z",
        "name": "Suman Mohanty",
        "username": "summsum",
        "profile_photo_url": "1671267137542_sumsum.png",
        "comment": "Great!"
      },
      {
        "_id": "639d7d12aa38de685163cd60",
        "user_id": "639d7cc6aa38de685163cd5e",
        "dateCreated": "2022-12-17T08:25:54.027Z",
        "name": "Mani Sai Prasad Masupalli",
        "username": "manisaiprasad",
        "profile_photo_url": "",
        "comment": "Hello I will theree.   👀"
      }
    ],
    "ratings": [],
    "overallRating": 0,
    "event_photo_url": "1671267238466_tdadlani.png",
    "username": "tdadlani",
    "firstName": "Tarun",
    "lastName": "Dadlani",
    "profile_photo_url": ""
  }
}
```

#### Add or Update Rating

`POST api/events/rating/:eventId`

#### Response

```json
{
  "message": "Rating added successfully",
  "data": {
    "data": {
      "_id": "639d7b8ddfe8e7e96610c5ec",
      "userId": "639d7a82dfe8e7e96610c5e8",
      "eventTitle": "One AfroCarib Friday Afrobeats Dancehall Reggae More",
      "description": "Lituation Friday ( #1 Afro-Caribean Friday in NYC )\nFriday, December 16\n10PM - 4AM\nGYPSY ROSE\n125 West 26th Street Between 6th & 7th Ave, 125 W 26th St, New York, NY 10001\n\nDOOR TICKETS : DOOR PAYMENT WILL BE AVAILABLE STARTING $20\n( EARLY ARRIVAL SUGGESTED )\n\nOne of a kind AfroCaribbean New Year's Eve party : Deuces\n\n#Afrobeat - #Dancehall, #Reggae & SOCA, HIPHOP, R&B & MORE\n\nBottle Service , contact us on @Blacc_Fire Via Instagram or Info@blaccfire.com to RSVP\n\nFAQ\nAGE REQUIREMENT FOR THIS EVENT----- ( 21+ W/VALID STATE ID )\nBottle package available ? ( Yes, Text \"NYE\" to (646) 776-3094 )\nCan I Pay at the door ? ( Yes, you can pay at the door )\nDoes This Club have Hookah ? ( YES, All Flavor )\nFOLLOW @BLACC_FIRE FOR MORE UPCOMING EVENTS\n\nFor More info contact us via Instagram @Blacc_Fire or Text (646) 776-3094 )",
      "startDateTime": "2022-12-23T08:29:40.000Z",
      "endDateTime": "2022-12-24T23:30:40.000Z",
      "address": "GYPSY ROSE 125 W 26TH STREET New York, NY 10001",
      "dateCreated": "2022-12-17T08:19:25.368Z",
      "arePicturesAllowed": true,
      "areCommentsAllowed": true,
      "ageRestricted": true,
      "type": "in-person",
      "rsvps": ["639d7af6dfe8e7e96610c5ea", "639d7cc6aa38de685163cd5e"],
      "waitlist": [],
      "tags": ["NJ", "birch", "breakfast", "brunch", "lunch"],
      "like_count": 0,
      "comments": [
        {
          "_id": "639e6c4a1e9eae73e5ca427c",
          "user_id": "639d7af6dfe8e7e96610c5ea",
          "dateCreated": "2022-12-18T01:26:34.364Z",
          "name": "Suman Mohanty",
          "username": "summsum",
          "profile_photo_url": "1671267137542_sumsum.png",
          "comment": "Great!"
        },
        {
          "_id": "639e6c441e9eae73e5ca427b",
          "user_id": "639d7af6dfe8e7e96610c5ea",
          "dateCreated": "2022-12-18T01:26:28.185Z",
          "name": "Suman Mohanty",
          "username": "summsum",
          "profile_photo_url": "1671267137542_sumsum.png",
          "comment": "Great!"
        },
        {
          "_id": "639d7d12aa38de685163cd60",
          "user_id": "639d7cc6aa38de685163cd5e",
          "dateCreated": "2022-12-17T08:25:54.027Z",
          "name": "Mani Sai Prasad Masupalli",
          "username": "manisaiprasad",
          "profile_photo_url": "",
          "comment": "Hello I will theree.   👀"
        }
      ],
      "ratings": [
        {
          "_id": "639e6e0b1e9eae73e5ca427d",
          "user_id": "639d7af6dfe8e7e96610c5ea",
          "rating": "4"
        }
      ],
      "overallRating": 4,
      "event_photo_url": "1671267238466_tdadlani.png"
    }
  }
}
```

## Update API Docs when changes are made

When changes are made to the API, it is important to update the documentation to reflect those changes. Doing so will help keep team up to date on the latest features and changes, and ensure that they are using the API correctly.
