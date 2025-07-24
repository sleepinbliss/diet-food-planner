const express = require('express');
// Imports the Express.js framework for building web servers and APIs.
const cors = require('cors');
// Imports Cross-Origin Resource Sharing middleware to handle requests from different domains (like the React frontend)
const path = require('path');
// Imports the path module to handle and transform file paths

const foodRoutes = require('./routes/foodRoutes');
// Import foodRoutes file from the /routes/ directory.

const app = express();
// Creates an Express application instance that i'll use to define routes and middleware.
const PORT = process.env.PORT || 5000;
// Sets the server port to either: process.env.PORT (environment variable, used in production/hosting)/ or 5000 (fallback for local development).

// Middleware
app.use(cors({
    origin: true, // Allow all origins during development
    credentials: true
}));
// CORS: Allows my React frontend (running on different port) to make requests to this API
// - Without this, browsers block cross-origin requests for security.
app.use(express.json());
// JSON Parser: Automatically parses incoming JSON data in request bodies.
// Makes req.body available as a JavaScript object.
app.use(express.urlencoded({ extended: true }));
// URL encoded Parser: Handles form data submissions.
// extended: true allows parsing of nested objects in form data.

app.use('/api', foodRoutes);
// This means all routes in foodRoutes will be prefixed with /api

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../../frontend/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
// });

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Diet Food Planner API is running!' });
});
// Route: Responds to GET requests at the root path (/).
// Parameters:
// req: Request object (contains information about the HTTP request).
// res: Response object (used to send data back to client).
// Response: Sends JSON message confirming the API is working.

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`On Your Network: http://[YOUR_IP]:${PORT}`);
});
// Starts the server on the specified port.
// Callback functions: Runs when server successfully starts.
//  Console message: Confirms the server is running and shows which port.


// What this creates:
/* 
- A basic REST API server
- Ready to handle requests from the React frontend.
- Foundation for adding more routes (like /api/foods, /api/meals, etc...)
*/