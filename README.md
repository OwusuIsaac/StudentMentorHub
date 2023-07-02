## Introduction

The StudentSuccessNetwork API is a backend service for managing communication between Freshmen and seniors in college. It provides functionalities for user registration, login, appointment creation, appointment retrieval, and appointment cancellation.

## Getting Started

To get started with the StudentSuccessNetwork API, follow the installation instructions provided in the [Installation](#installation) section. Make sure to set up the required environment variables as mentioned in the [Environment Variables](#environment-variables) section.

## API Endpoints

### 1. User Endpoints

#### `/register` (POST)

Register a new user with the specified information.

- Request body:
  - `name`: Name of the user (string, required).
  - `email`: Email address of the user (string, required).
  - `password`: Password for the user (string, required).
  - `role`: Role of the user (string, required). Possible values: "Freshmen", "senior", "admin".
  - `specialization`: Specialization of the user (string, required for seniors).
  - `gender`: Gender of the user.

- Authentication: Not required.

- Authorization: Not required.

- Response:
  - Status: 201 
  - Body: None

#### `/login` (POST)

Authenticate user credentials and generate a JSON Web Token (JWT) for authorization.

- Request body:
  - `email`: Email address of the user (string, required).
  - `password`: Password for the user (string, required).

- Authentication: Not required.

- Authorization: Not required.

- Response:
  - Status: 201 
  - Body:
    - `token`: JWT token for authorization (string).

#### `/alluser` (GET)

Fetch all users from the database.

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Required (role: admin).

- Response:
  - Status: 200
  - Body:
    - Array of user objects:
      - `name`: Name of the user (string).
      - `email`: Email address of the user (string).
      - `role`: Role of the user (string).
      - `specialization`: Specialization of the user (string, only for seniors).
      - `gender`: Gender of user.

#### `/seniors` (GET)

Fetch all seniors from the database.

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Not required.

- Response:
  - Status: 200 
  - Body:
    - Array of senior objects:
      - `name`: Name of the senior (string).
      - `email`: Email address of the senior (string).
      - `specialization`: Specialization of the senior (string).
      - `role`: Role of the user (string).
      - `specialization`: Specialization of the user (string, only for seniors).
      - `gender`: Gender of senior.

### 2. Appointment Endpoints

#### `/appointment` (POST)

Create a new appointment with the specified details.

- Request body:
  - `FreshmenId`: ID of the Freshmen (string, required).
  - `seniorId`: ID of the senior (string, required).
  - `date`: Date of the appointment (string, required). Format: "YYYY-MM-DD".
  - `time`: Time of the appointment (string, required). Format: "HH:MM AM/PM".

- Authentication: Required (JWT token).

- Authorization: Required (role: Freshmen).

- Response:
  - Status: 201 
  - Body: None

#### `/appointments` (GET)

Fetch appointments based on the user role (Freshmen or senior).

- Request body: None

- Authentication: Required (JWT token).

- Authorization: Required (role: Freshmen or senior).

- Response:
  - Status: 200
  - Body:
    - Array of appointment objects:
      - `FreshmenId`: ID of the Freshmen (string).
      - `seniorId`: ID of the senior (string).
      - `date`: Date of the appointment (string).
      - `time`: Time of the appointment (string).

#### `/appointment/:id` (DELETE)

Cancel an appointment with the specified ID.

- Request parameters:
  - `id`: ID of the appointment (string, required).

- Authentication: Required (JWT token).

- Authorization: Required (role: Freshmen).

- Response:
  - Status: 200
  - Body: None

## Middleware Functions

### 1. Authenticator Middleware

The `authenticator` middleware function is used to authenticate requests using JWT. It verifies the presence and validity of the JWT token in the request headers.

### 2. Authorizer Middleware

The `authorizer` middleware function is used to authorize requests based on user roles. It checks if the user's role is included in the specified role array.

## Installation

To install and run the StudentSuccessNetwork API locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/Jishnuraj2001/senior_Freshmen_appointment_booking_system_pococare.git



2. Navigate to the project directory:

   ```shell
   cd backend
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the required environment variables as mentioned in the [Environment Variables](#environment-variables) section.

5. Start the server:

   ```shell
   npm run server
   ```

6. The server will start running at `http://localhost:<port>`, where `<port>` is the value of the `process.env.port` environment variable.

## Environment Variables

The StudentSuccessNetwork API requires the following environment variables to be set:

- `port`: The port number on which the server should run.
- `key`: Secret key used for JWT signing.
- `email_password`: The Secret key used to send mail to the user when an appointment is booked or cancelled.
- `db_url`: MongoDB Atlas cluster URL where you are storing the data.

You can set these variables in a `.env` file in the root directory of the project.

Example `.env` file:

```plaintext
port=3000
key=your-secret-key
email_password=your-email-password
db_url=your-mongodb-url
```

## Dependencies

The StudentSuccessNetwork API relies on the following dependencies:

- express: Fast, unopinionated, minimalist

 web framework for Node.js.
- dotenv: Loads environment variables from a `.env` file into `process.env`.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- bcrypt: Library for hashing passwords.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
- mongoose: MongoDB object modeling tool.
- nodemailer: Library for sending emails.
- nodemon: For running the server.
- socket.io: for real-time communication and event handling.
- peerjs: for establishing peer-to-peer connections between the senior and Freshmen.
- ejs: A simple and flexible templating engine that enables generating HTML markup with embedded JavaScript code.

For a complete list of dependencies, refer to the `package.json` file.

