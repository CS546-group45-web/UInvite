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

#### User

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

<!-- user follow -->

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

#### Follow User

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

#### Followers Details

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

#### Create Event

`POST /api/events/create`

#### Request Body

```json
{
  "userId": "63785b6cfd19003dcdf3c6ee",
  "eventTitle": "Dance",
  "organizerName": "User Name",
  "description": "description",
  "startDateTime": "2022-11-06T19:58:23.464Z",
  "endDateTime": "2022-11-06T19:58:23.464Z",
  "address": {
    "City": "Jersey City",
    "State": "New Jersey",
    "Country": "United States",
    "Zipcode": "07306"
  },
  "maxRsvpscount": "100",
  "type": "in-person",
  "tags": ["party"]
}
```

#### Response

```json
{
  "message": "Event added successfully"
}
```

## Update API Docs when changes are made

When changes are made to the API, it is important to update the documentation to reflect those changes. Doing so will help keep team up to date on the latest features and changes, and ensure that they are using the API correctly.
