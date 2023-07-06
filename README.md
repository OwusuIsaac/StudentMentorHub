## Introduction

The StudentSuccessNetwork API is a backend service for managing communication between Freshmen and seniors in college. It provides functionalities for user registration, login, appointment creation, appointment retrieval, and appointment cancellation.

## Getting Started

To get started with the StudentSuccessNetwork API, follow the installation instructions provided in the [Installation](#installation) section. Make sure to set up the required environment variables as mentioned in the [Environment Variables](#environment-variables) section.
ired). 

## Installation

To install and run the StudentSuccessNetwork API locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/OwusuIsaac/senior_Freshmen_appointment_booking_system_pococare.git



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

