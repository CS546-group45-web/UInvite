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
  "first_name": "Monkey",
  "last_name": "D Luffy",
  "email": "luffy@gmail.com",
  "password": "IamKing123",
  "phone": "551-344-5525",
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
  "first_name": "Monkey",
  "last_name": "D Luffy",
  "email": "luffy@gmail.com",
  "dob": "06/07/2000",
  "phone": "551-344-5525",
  "gender": "male",
  "rsvped_events": [],
  "profile_photo_url": "",
  "events_created": []
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

## Update API Docs when changes are made

When changes are made to the API, it is important to update the documentation to reflect those changes. Doing so will help keep team up to date on the latest features and changes, and ensure that they are using the API correctly.
