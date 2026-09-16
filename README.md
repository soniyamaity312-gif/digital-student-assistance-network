🎓 Digital Student Assistance Network

A full-stack web application designed to provide a centralized platform for communication and assistance between Students, Staff/Faculty, and Admin.

The system allows students to submit academic assistance requests, complaints, and queries, while staff can manage assigned requests and provide responses. Admin can manage users, requests, notices, categories, and system activities.

📌 Project Setup Guide

Follow the steps below to run the Digital Student Assistance Network on your local machine.

🛠️ Technologies Used
Frontend: React.js
Backend: Node.js + Express.js
Database: MongoDB
API: REST API
Authentication: JWT
Package Manager: npm
Code Editor: VS Code
Version Control: Git + GitHub
✅ Requirements

Before running the project, make sure the following software is installed on your system:

1. Node.js

Download and install Node.js from:

https://nodejs.org/

After installation, verify it:

node -v
npm -v

You should see the installed Node.js and npm versions.

2. MongoDB

You need MongoDB to store the application's data.

You can use either:

MongoDB Community Server installed locally
MongoDB Atlas cloud database

For local MongoDB, make sure the MongoDB service is running before starting the backend.

Verify MongoDB installation if applicable:

mongosh

If you are using MongoDB Atlas, make sure you have:

A MongoDB Atlas account
A database cluster
A database user
The MongoDB connection string
3. Git

Install Git if it is not already installed.

Verify:

git --version
4. Code Editor

You can use Visual Studio Code or any other code editor.

5. Web Browser

Use a modern browser such as:

Google Chrome
Microsoft Edge
Mozilla Firefox
📥 1. Clone the Repository

Open Terminal / CMD / Git Bash and run:

git clone https://github.com/Techrithm/smart-student-helpdesk.git

Move into the project directory:

cd smart-student-helpdesk

The project folder should contain the frontend and backend files.

📂 2. Check the Project Structure

The project should have a structure similar to:

smart-student-helpdesk/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── README.md
└── ...

The exact folder structure may vary depending on the current version of the project.

📦 3. Install Backend Dependencies

Open a terminal inside the project folder.

Go to the backend directory:

cd backend

Install all required Node.js packages:

npm install

This will install the dependencies listed in the backend package.json.

🗄️ 4. Set Up MongoDB

The application uses MongoDB instead of MySQL.

You can use either a local MongoDB database or MongoDB Atlas.

Option A: Use Local MongoDB

Make sure MongoDB is installed and running.

Start MongoDB if required by your installation.

Then the backend can connect to your local MongoDB instance.

A typical MongoDB connection string is:

mongodb://127.0.0.1:27017/smart_student_helpdesk
Option B: Use MongoDB Atlas

If you are using MongoDB Atlas:

Create a MongoDB Atlas account.
Create a cluster.
Create a database user.
Allow your IP address in Network Access.
Click Connect.
Select Drivers.
Copy the MongoDB connection string.

It will look similar to:

mongodb+srv://<username>:<password>@cluster.mongodb.net/smart_student_helpdesk

Replace:

<username>

and

<password>

with your MongoDB credentials.

⚙️ 5. Configure Environment Variables

The backend requires environment variables such as the MongoDB connection string and JWT secret.

Inside the backend folder, create a file named:

.env

Add the required configuration.

Example:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/smart_student_helpdesk

JWT_SECRET=your_secret_key

If you are using MongoDB Atlas, replace MONGO_URI with your Atlas connection string:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart_student_helpdesk
⚠️ Important

Do NOT upload your .env file to GitHub if it contains:

Database passwords
JWT secrets
API keys
Private credentials

Make sure .env is included in .gitignore.

Example:

.env
node_modules/
▶️ 6. Start the Backend Server

Make sure you are inside the backend folder:

cd backend

Start the backend using:

npm start

If the project uses a development script, you can use:

npm run dev

The backend will normally run on:

http://localhost:5000

You should see a message similar to:

Server running on port 5000
MongoDB connected successfully

Keep this terminal running. Do not close it while using the application.

💻 7. Install Frontend Dependencies

Open a new terminal.

Go to the project directory:

cd smart-student-helpdesk

Then enter the frontend folder:

cd frontend

Install the React dependencies:

npm install

This will install all packages required by the React application.

🚀 8. Start the React Frontend

Inside the frontend folder, run:

npm start

If the project uses Vite, run:

npm run dev

The React application will normally open at:

http://localhost:3000

or, for Vite:

http://localhost:5173

Open the URL shown in your terminal.

🔗 9. Frontend + Backend Connection

The React frontend communicates with the Node.js/Express backend through REST APIs.

The general architecture is:

React Frontend
      │
      │ HTTP Requests
      ▼
Node.js + Express Backend
      │
      │ MongoDB Driver / Mongoose
      ▼
MongoDB Database

For example:

Student
   ↓
React UI
   ↓
REST API
   ↓
Express.js
   ↓
MongoDB

Make sure the backend server is running before using features that require database access.

👤 10. User Roles

The system supports different types of users.

🎓 Student

Students can:

Register/Login
Submit complaints
Submit assistance requests
Submit queries
View request status
View responses
Receive notices
👨‍🏫 Staff / Faculty

Staff can:

Login
View assigned requests
Manage requests
Respond to students
Update request status
👨‍💼 Admin

Admin can:

Manage users
Manage students and staff
Manage requests
Manage categories
Manage notices
Monitor system activities
🧪 11. Test the Application

After starting both servers:

Backend
http://localhost:5000
Frontend
http://localhost:3000

or:

http://localhost:5173

Open the frontend URL in your browser.

Then test:

Registration/Login
Student dashboard
Creating a complaint/request
Viewing request status
Staff dashboard
Responding to requests
Admin dashboard
User management
Notice management
🗃️ 12. MongoDB Database

Unlike the previous MySQL version, this project does not require XAMPP or phpMyAdmin.

MongoDB automatically creates the required database and collections when the application inserts data.

The database may contain collections such as:

users
complaints
complaintreplies
notices
categories
statushistory

The exact collection names depend on the Mongoose models used in the project.

You can view your database using:

MongoDB Compass
MongoDB Atlas
mongosh
🧹 13. Install Dependencies Again

If you download or clone the project on another computer, node_modules may not be included.

Run:

Backend
cd backend
npm install
Frontend

Open another terminal:

cd frontend
npm install

Then start both applications again.

🛑 14. Stop the Servers

To stop the backend or frontend server:

Ctrl + C

Press Ctrl + C in the terminal where the server is running.

🔁 15. Making Changes to the Project

After modifying the code, check the changed files:

git status

Add the changes:

git add .

Commit the changes:

git commit -m "your commit message"

Push the changes:

git push

For example:

git add .
git commit -m "Updated student dashboard"
git push
🔄 16. Get the Latest Changes

Before working on an existing clone, get the latest changes from GitHub:

git pull

Then reinstall dependencies if package.json was changed:

npm install

Run this separately inside the backend and frontend folders if both have their own package.json.
