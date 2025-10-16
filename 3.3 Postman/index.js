import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware for parsing JSON bodies
app.use(express.json());

// Helper function to check for errors and throw
const checkAndThrow = (condition, message, statusCode) => {
  if (condition) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
};

// *********************
// Let’s practice using Postman. Make sure your server is running with nodemon.
// Then test the 5 different routes below with Postman. Open a separate tab for each request.
// Check that for each route you’re getting the correct status code returned to you from your server.
// You should not get any 404s or 500 status codes.
// *********************

app.get("/", (req, res, next) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/users", (req, res, next) => {
  // Simulate fetching a list of users from a database
  const users = [
    { id: 1, name: "Angela" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
  ];
  res.json(users);
});

app.post("/users", (req, res, next) => {
  // Simulate a check for a required field
  checkAndThrow(!req.body.username, "Username is required for user creation.", 400);
  
  // A successful POST request typically returns a 201 Created status
  // You can also send a message if needed: res.send("Hello welcome");
  res.sendStatus(201);
});

app.put("/user/:username", (req, res, next) => {
  // Simulate a check that the username in the URL is 'angela'
  checkAndThrow(req.params.username !== 'angela', "User 'angela' not found.", 404);
  
  res.sendStatus(200);
});

app.patch("/user/:username", (req, res, next) => {
  // Simulate a check that the username in the URL is 'angela'
  checkAndThrow(req.params.username !== 'angela', "User 'angela' not found.", 404);

  res.sendStatus(200);
});

app.delete("/user/:username", (req, res, next) => {
  // Simulate a check that the username in the URL is 'angela'
  checkAndThrow(req.params.username !== 'angela', "User 'angela' not found.", 404);

  res.sendStatus(200);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || "Something broke!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Database URL: ${DATABASE_URL}`);
});
