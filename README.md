==============CURRENT FOCUS==============
1. Setup basic Express.js backend
2. Create a basic skeleton/foundation for the website.
3. Style website.
4. Create json object array of food items. (Possibly with MongoDB);


==============STEP BY STEP PROCESS==============


+=+=+=+=+= Express js +=+=+=+=+=
1. Create the main Express entry point. (app.js)
2. Create API routes and data structure
3. Set up basic data (JSON files or database)
4. Test API endpoints
5. Build frontend to consume the API




==============INFORMATION==============


This project is formatted in this way because:

Modularity:
    Break down the application into smaller, manageable modules (e.g., by feature or route).

Separation of Concerns:
    Keep different aspects of the application (presentation, logic, data) in a separate directories.

Consistency:
    Maintain a consistent folder structure throughout the project.

Scalability:
    The structure should be able to accommodate future growth and changes.

Testing:
    Consider adding a tests/ directory to house test for different parts of the application.



What each folder represents:

Root Directory:
    backend/ (or server/): Contains all Node.js and Express.js files.
    frontend/ (or client/): Contains all React.js files.
    shared/ (optional): For shared code between the backend and frontend (e.g., types. utility functions, constants).

Backend/ (or server/):
    config/ : Configuration files for different environments (development, production).
    controllers/ : Modules handling business logic for API endpoints.
    middlewares/ : Express middleware functions for tasks like authentication, validation, and logging.
    models/ : Database models, schemas (e.g., Mongoose schemas for MongoDB).
    routes/ : Defines API routes and connects them to controllers.
    services/ : Business logic not directly tied to specific API endpoints.
    utils/ : Helper functions and modules for common tasks (e.g., database connection, validation).
    app.js (or index.js) : Main entry point for the Express application.
    server.js : If using a separate file for server startup logic.

Frontend/ (or client/):
    components/ : For reusable UI components.
    pages/ : For page-level components.
    assets/ : For static files.
    utils/ : for utility functions.
    constants/ : For global constants.
    hooks/ : for custom hooks.
    services/ : for API calls.
    context/ : State management.
    index.js/App.js : main entry point.