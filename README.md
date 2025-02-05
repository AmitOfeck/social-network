# social-network

## Overview

- Social Network is a full-stack social media application built with React, Node.js, and Express. Users can create accounts, share posts, comment, and like content.
- Authentication is implemented with JWT, and users can log in using Google.

## Project Structure

- Client: Built with React for a dynamic and interactive UI.

- Server: Developed using Node.js and Express, handling API requests and authentication.

- Database: MongoDB for storing user data, posts, and comments.

### Setup Instructions

1. **Clone the Repository**:

- `git clone <repository-url>`
- `cd social-network`

2. **Install dependencies**

- `npm install`

3. **Configuration**

- Create a config directory and add a .env.local file inside it with the following variables:

- PORT=4000
- MONGODB_URI=<your_mongodb_connection_string>
- JWT_SECRET_KEY=<your_jwt_secret_key>
- JWT_REFRESH_SECRET_KEY=<your_jwt_refresh_secret_key>
- GOOGLE_CLIENT_ID=<your_google_client_id>
- OPENAI_API_KEY=<your_openai_api_key>

4. **Running the Server**

- `cd server`
- `npm start`

This will start the server locally on port 4000.

5. **Running the Client**

- `cd client`
- `npm start`

This will start the frontend locally at http://localhost:3000/login.

**API Documentation**

You can access the API documentation via Swagger at: http://localhost:4000/api-docs/#/Posts/put_posts__id_ 