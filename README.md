# Dockerized Web Project

This project is a Dockerized web application that includes a login module. It is built using Node.js and Express, and it utilizes EJS for rendering views.

## Project Structure

```
dockerized-web-project
├── src
│   ├── app.js
│   ├── controllers
│   │   └── loginController.js
│   ├── routes
│   │   └── loginRoutes.js
│   ├── models
│   │   └── userModel.js
│   └── views
│       └── loginView.ejs
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd dockerized-web-project
   ```

2. Build the Docker image:
   ```
   docker-compose build
   ```

3. Start the application:
   ```
   docker-compose up
   ```

### Usage

- Access the application at `http://localhost:3000`.
- Navigate to the login page to authenticate users.

### File Descriptions

- **src/app.js**: Entry point of the application, sets up the Express server and routes.
- **src/controllers/loginController.js**: Contains the logic for user authentication and logout.
- **src/routes/loginRoutes.js**: Defines the routes for login and logout functionalities.
- **src/models/userModel.js**: Manages user data and interactions with the database.
- **src/views/loginView.ejs**: The HTML template for the login page.
- **Dockerfile**: Instructions for building the Docker image.
- **docker-compose.yml**: Configuration for running the application with Docker Compose.
- **package.json**: Lists project dependencies and scripts.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.