# Task Management App

## 1. Introduction

The Task Management App is a web application built using React.js for the frontend and Express.js with MongoDB for the backend. It allows users to manage their tasks efficiently, offering features such as user authentication, task creation, updating, and deletion, as well as search, sorting, and pagination.

## 2. Features

### Frontend:

- Built with React.js.
- User authentication using JWT.
- Form validation using React Hook Form.
- User-friendly toasts using React Hot Toast.
- Stylish UI using Tailwind CSS.

### Backend:

- Express.js server.
- MongoDB database with Mongoose for task storage.
- Secure user authentication with bcryptjs and JWT.
- Cookie parser for session management.

### Core Functionality:

- User Signup: Create a new user account.
- User Login: Authenticate with your credentials.
- Task Management:
  - Create tasks.
  - Update tasks.
  - Delete tasks.
  - Sort tasks by status.
  - Sort tasks by created time.
  - Search tasks by keyword.
  - Implement pagination for better task organization.

## 3. Endpoints

### Backend API Endpoints:

- `POST /api/v1/signup`: Create a new user account.
- `POST /api/v1/login`: Authenticate a user and return a JWT.
- `GET /api/v1/tasks`: Retrieve a list of tasks.
- `POST /ap/v1i/tasks`: Create a new task.
- `GET /api/v1/tasks/:id`: Retrieve a specific task.
- `PUT /api/v1/tasks/:id`: Update a specific task.
- `DELETE /api/v1/tasks/:id`: Delete a specific task.

### Authentication:

- The API uses JWT for user authentication. To access protected endpoints, you must include the JWT token in the request headers.

## 4. Install

-Clone the repository: `git clone https://github.com/Jobayer98/task-management.git`

### Prerequisites:

- Node.js and npm installed.
- MongoDB database.

### Backend Setup:

1. Navigate to the backend directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory with the following configuration:
4. Start the server: 1.Prod server `npm start` 2.Dev server `npm run dev`

### Frontend Setup:

1. Navigate to the frontend directory: `cd client`
2. Install dependencies: `npm install`
3. Start the React development server: `npm run dev`

Access the application at `http://localhost:3000` and begin using the Task Management App.
