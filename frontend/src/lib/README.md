# MERN Noteboard

A simple and clean note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a full-stack application with a RESTful API on the backend and a dynamic, responsive user interface on the frontend.

## Features

- **CRUD Operations:** Create, Read, Update, and Delete notes.
- **RESTful API:** A well-structured backend API for managing notes.
- **Responsive Design:** A user-friendly interface that works on various screen sizes.
- **Rate Limiting:** The API includes rate-limiting to prevent abuse.
- **Production Ready:** The server is configured to serve the frontend build files in a production environment, creating a single, cohesive application.

## Tech Stack

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing notes.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **`dotenv`:** For managing environment variables.
- **`cors`:** For enabling Cross-Origin Resource Sharing in development.

### Frontend

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tooling for a fast development experience.
- **Axios:** Promise-based HTTP client for making API requests.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm** (or yarn)
- **MongoDB:** Make sure you have a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <https://github.com/Patrick-Lirio/MERN-NOTEBOARD.git>
    cd MERN-NOTEBOARD
    ```

2.  **Setup the Backend:**

    ```sh
    cd backend
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following environment variables. Replace the placeholder with your MongoDB connection string.

    ```env
    # Port for the server to run on
    PORT=5001

    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/noteboard?retryWrites=true&w=majority

    # Set the environment to development
    NODE_ENV=development
    ```

4.  **Setup the Frontend:**
    ```sh
    # Navigate back to the root and then to the frontend directory
    cd ../frontend
    npm install
    ```

### Running the Application

You will need to run the frontend and backend servers concurrently in separate terminals for development.

1.  **Start the Backend Server:**

    - Navigate to the `backend` directory.
    - This will start the Node.js/Express server, which will typically run on `http://localhost:5001`.

    ```sh
    # In the /backend directory
    npm run dev
    ```

2.  **Start the Frontend Development Server:**
    - Navigate to the `frontend` directory.
    - This will start the Vite development server, which will be accessible at `http://localhost:5174`.
    ```sh
    # In the /frontend directory
    npm run dev
    ```

Now, you can open your browser and navigate to `http://localhost:5174` to use the application.

### Building for Production

To create a production build where the backend serves the frontend files from a single domain:

1.  **Build the Frontend:**

    - In the `frontend` directory, run the build command. This will create an optimized `dist` folder.

    ```sh
    # In the /frontend directory
    npm run build
    ```

2.  **Run the Backend in Production Mode:**
    - In the `backend` directory, first change `NODE_ENV` in your `.env` file to `production`.
    - Then, start the server using the production start script.
    ```sh
    # In the /backend directory
    npm start
    ```
    The application will now be served from the backend's port (e.g., `http://localhost:5001`).
