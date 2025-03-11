# Authentication App

## Overview
This is a secure authentication system built using **Node.js, Express, MySQL, and JWT authentication**. It includes user registration, login, logout, password reset, and protected routes.

## Features
- **User Registration** with email & password validation
- **User Login** with JWT-based authentication
- **Logout** by clearing authentication cookies
- **Password Reset** functionality via email
- **Protected Routes** with JWT verification
- **MySQL Database Integration**
- **Secure Middleware**: Helmet, CORS, cookie-parser

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Security:** JWT, bcrypt, helmet, cors, cookie-parser
- **Validation:** express-validator

---

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
$ git clone https://github.com/yourusername/auth-app.git
$ cd auth-app
```

### 2️⃣ Install Dependencies
```sh
$ npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
DATABASE_URL=mysql://auth_user:your_password@localhost/auth_db
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### 4️⃣ Run the Server
```sh
$ npm start
```
Server runs on **http://localhost:5000**

---

## API Endpoints

### 📝 Authentication Routes (`/auth`)
| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| POST   | `/auth/register`      | Register a new user |
| POST   | `/auth/login`         | User login |
| POST   | `/auth/logout`        | User logout |
| POST   | `/auth/forgot-password` | Request password reset |
| POST   | `/auth/reset-password/:token` | Reset password with token |

### 🔒 Protected Routes (`/protected`)
| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| GET    | `/protected/dashboard` | Access protected content |

---

## Deployment Guide

### Deploy on VPS (Ubuntu 20.04/22.04)
1. **Set up a VPS (AWS, DigitalOcean, Linode, Vultr)**
2. **Install Node.js & MySQL:**
    ```sh
    sudo apt update && sudo apt install -y nodejs npm mysql-server
    ```
3. **Clone and Setup:**
    ```sh
    git clone https://github.com/yourusername/auth-app.git
    cd auth-app
    npm install
    ```
4. **Run with PM2:**
    ```sh
    npm install -g pm2
    pm2 start app.js --name auth-app
    pm2 save
    pm2 startup
    ```
5. **Setup Reverse Proxy (Nginx):**
    ```sh
    sudo apt install nginx
    ```
6. **Enable HTTPS with Let's Encrypt:**
    ```sh
    sudo certbot --nginx -d yourdomain.com
    ```

---

## Contributing
Feel free to fork this repository and contribute by submitting a pull request!

---

## License
This project is **MIT Licensed**.
