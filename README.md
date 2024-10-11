## API Endpoints

### User Management

#### Admin Credentials

- **Email**: workwithsadik@gmail.com
- **Password**: AdminStrongPass123

#### Create User (Admin Only)

- **Endpoint**: `POST /api/v1/user/create`
- **Description**: Create a new user (Admin, Trainer, Trainee).
- **Body**:

  ```json
  {
    "name": {
      "firstName": "trainee 2",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "StrongPass123",
    "role": "trainer"
  }
  ```

#### Create Trainee (Admin Only)

- **Endpoint**: `POST /api/v1/user/create-trainee`
- **Description**: Create a new Trainee.
- **Body**:

  ```json
  {
    "name": {
      "firstName": "Johontu",
      "lastName": "Doe"
    },
    "email": "john5asdasdh5g4@example.com",
    "phone": "+1234555",
    "password": "StrongPass123",
    "needChangePassword": true,
    "avatar": "https://example.com/avatar.jpg",
    "status": "in-progress"
  }
  ```

#### Change User Status

- **Endpoint**: `POST /api/v1/user/change-status/:id`
- **Description**: Change the status of a user (e.g., Active, Inactive).
- **Params**:

  - `id`: The ID of the user whose status you want to change.

- **Body**:

  ```json
  {
    "status": "in-progress"
  }
  ```

#### Update User (Admin Only)

- **Endpoint**: `PATCH /api/v1/user/:id`
- **Description**: Update user details.
- **Params**:

  - `id`: The ID of the user to update.

- **Body** (Example):

  ```json
  {
    "name": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "John123@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "role": "trainer"
  }
  ```

#### Update My Profile (Authenticated User)

- **Endpoint**: `PATCH /api/v1/user/update-me`
- **Description**: Update the profile of the currently logged-in user.

- **Body** (Example):

  ```json
  {
    "name": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "12345678910@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
  ```

#### Get Current User Profile

- **Endpoint**: `GET /api/v1/user/me`
- **Description**: Fetch the profile of the currently logged-in user.

#### Get Single User

- **Endpoint**: `GET /api/v1/user/:id`
- **Description**: Fetch a single user by their ID.
- **Params**:
  - `id`: The ID of the user to retrieve.

#### Get All Trainers

- **Endpoint**: `GET /api/v1/user/trainer`
- **Description**: Fetch all users with the role of `Trainer`.

#### Get All Users (Admin Only)

- **Endpoint**: `GET /api/v1/user`
- **Description**: Fetch all users in the system (Admin Only).

#### Delete User (Admin Only)

- **Endpoint**: `DELETE /api/v1/user/:id`
- **Description**: Delete a user by their ID.
- **Params**:
  - `id`: The ID of the user to delete.

### Authentication

#### Login

- **Endpoint**: `POST /api/v1/auth/login`
- **Description**: Log in to the system and receive a JWT token.
- **Body**:

      ```json
      {
      "email" : "workwithsadik@gmail.com",
      "password" : "AdminStrongPass123"

  }

  ```

  ```

#### Change Password (Authenticated)

- **Endpoint**: `POST /api/v1/auth/change-password`
- **Description**: Change the password of the currently logged-in user.
- **Body**:

  ```json
  {
    "oldPassword": "StrongPass123",
    "newPassword": "StrongPass12345"
  }
  ```

#### Refresh Token

- **Endpoint**: `POST /api/v1/auth/refresh-token`
- **Description**: Refresh the JWT token.

#### Forgot Password

- **Endpoint**: `POST /api/v1/auth/forget-password`
- **Description**: Send an email to reset the user's password.
- **Body**:

  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Reset Password

- **Endpoint**: `POST /api/v1/auth/reset-password`
- **Description**: Reset the password using a token received via email.
- **Body**:

  ```json
  {
    "email": "1234@example.com",
    "newPassword": "StrongPass234"
  }
  ```

### Class Management

#### Create Class

- **Endpoint**: `POST /api/v1/class`
- **Description**: Create a new class.
- **Body**:

      ```json
      {

  "className": "Morning Session 2",
  "trainer": "670654fceaf149e7784b13cb",
  "date": "2024-10-18",
  "startTime": "07:29",
  "description": "A relaxing morning yoga class."
  }

      ```

#### Enroll Trainee

- **Endpoint**: `POST /api/v1/class/:classId/enroll`
- **Description**: Enroll a trainee into a class.
- **Params**:

  - `classId`: The ID of the class to enroll the trainee in.

- **Body**:

  ```json
  {
    "traineeId": "67067740c77c25bebe48ffbf"
  }
  ```

#### Remove Trainee

- **Endpoint**: `POST /api/v1/class/:classId/remove`
- **Description**: Remove a trainee from a class.
- **Params**:

  - `classId`: The ID of the class.

- **Body**:

  ```json
  {
    "traineeId": "67064e1e3a87787383be3e36"
  }
  ```

#### Update Class

- **Endpoint**: `PATCH /api/v1/class/:classId`
- **Description**: Update a class.
- **Params**:

  - `classId`: The ID of the class to update.

- **Body** (Example):

  ```json
  {
    "className": "Yoga Morning Session555",
    "trainer": "670654fceaf149e7784b13cb",
    "date": "2024-10-10",
    "time": "09:00",
    "maxTrainees": 10,
    "description": "A relaxing morning yoga class."
  }
  ```

#### Delete Class

- **Endpoint**: `DELETE /api/v1/class/:classId`
- **Description**: Delete a class by its ID.
- **Params**:
  - `classId`: The ID of the class to delete.

#### Get All Classes

- **Endpoint**: `GET /api/v1/class`
- **Description**: Fetch all available classes.

#### Get Single Class

- **Endpoint**: `GET /api/v1/class/:classId`
- **Description**: Fetch details of a specific class.
- **Params**:
  - `classId`: The ID of the class to retrieve.

---
