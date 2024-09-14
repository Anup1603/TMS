# Tenant Management System (Backend)

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Property Routes](#property-routes)
  - [Tenant Routes](#tenant-routes)
- [User Registration and Login](#user-registration-and-login)
- [Authentication and Authorization](#authentication-and-authorization)
- [How to Use Postman](#how-to-use-postman)
- [Conclusion](#conclusion)

## Project Overview

The Tenant Management System is a backend application designed to manage properties and tenants. Each user has their own data for properties and tenants, ensuring that no other user can access their information. The system supports full CRUD (Create, Read, Update, Delete) operations for managing properties and tenants.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)
- nodemon (for autostart server no need to start over and over again)
- cors (enables safe cross-origin requests, while ensuring security through server-defined permissions)

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Anup1603/TMS_Backend-API
   ```
2. Navigate to the project directory:
   ```bash
   cd Backend
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Set up your MongoDB connection string in a `.env` file:
   ```plaintext
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:

   ```bash
   npm start

   or

   npm run dev
   ```

## API Routes

### User Routes

- **POST /api/users/register**

  - Register a new user.
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "yourpassword"
    }
    ```

- **POST /api/users/login**
  - Login an existing user.
  - Request body:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "yourpassword"
    }
    ```

### Property Routes

- **POST /api/property**

  - Create a new property.
  - Requires authentication (JWT token).

- **GET /api/property**

  - Retrieve all properties for the authenticated user.
  - Requires authentication (JWT token).

- **PUT /api/property/:id**

  - Update an existing property.
  - Requires authentication (JWT token).

- **DELETE /api/property/:id**
  - Delete a property.
  - Requires authentication (JWT token).

### Tenant Routes

- **POST /api/tenant/:propertyid/create**

  - Create a new tenant.
  - Requires authentication (JWT token).

- **GET /api/tenant/:propertyid/**

  - Retrieve all tenants for the authenticated user.
  - Requires authentication (JWT token).

- **PUT /api/tenant/:propertyid/:id**

  - Update an existing tenant.
  - Requires authentication (JWT token).

- **DELETE /api/tenant/:propertyid/:id**
  - Delete a tenant.
  - Requires authentication (JWT token).

## User Registration and Login

Users can register and log in to the system using the provided API routes. Passwords are hashed using `bcryptjs` for security.

### Password Hashing

When a user registers, their password is hashed before being stored in the database to protect sensitive information.

## Authentication and Authorization

After a successful login, the server generates a unique JWT token that is used to authenticate subsequent requests. This token must be included in the headers of protected routes.

## How to Use Postman

1. **Register a User**:

   - Send a POST request to `http://localhost:YOUR_PORT/api/users/register` with the necessary user details.

2. **Login a User**:

   - Send a POST request to `http://localhost:YOUR_PORT/api/users/login` with the user's email and password.
   - Save the returned JWT token.

3. **Access Protected Routes**:

   - Include the JWT token in the Authorization header as follows:
     ```
     Authorization: Bearer YOUR_JWT_TOKEN
     ```

4. **Perform CRUD Operations**:
   - Use the property and tenant routes with the JWT token included to create, read, update, or delete properties and tenants.

## Conclusion

The Tenant Management System (Backend) provides a secure and efficient way to manage properties and tenants, ensuring that each user has access only to their own data. This README provides a comprehensive overview of the project's structure, routes, and usage instructions.
