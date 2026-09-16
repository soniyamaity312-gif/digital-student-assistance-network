🎓 Digital Student Assistance Network

A full-stack web application designed to provide a centralized platform for communication and assistance between Students, Staff/Faculty, and Admin.

The system allows students to submit academic assistance requests, complaints, and queries, while staff can manage assigned requests and provide responses. Admin can manage users, requests, notices, categories, and system activities.

<h2>📌 Project Setup Guide</h2>

Follow the steps below carefully to run the Digital Student Assistance Network on your local machine.

<h2>🟢 Requirements</h2>

Before starting, make sure the following software is installed on your computer:

🟢 Node.js and npm
🍃 MongoDB or a MongoDB Atlas account
💻 Visual Studio Code or any code editor
🌐 Any modern web browser
🔧 Git
Check Node.js Installation

Open Terminal / CMD and run:

node -v

Then check npm:

npm -v

If both commands display a version number, Node.js is installed correctly.

<h2>📥 1. Clone the Repository</h2>

Open Terminal / CMD and run:

git clone https://github.com/Techrithm/digital-student-assistance-network.git

Move into the project folder:

cd digital-student-assistance-network

Your project structure should look approximately like:

digital-student-assistance-network/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── README.md
└── ...

<h2>📦 2. Install Backend Dependencies</h2>

Open Terminal inside the project folder.

First, go to the backend folder:

cd backend

Install all required Node.js packages:

npm install

Wait until the installation is completed.

<h2>🍃 3. Set Up MongoDB</h2>

The project uses MongoDB as its database.

You can use either:

Option A: MongoDB Local

Install MongoDB on your computer and make sure the MongoDB service is running.

The backend can then connect to your local MongoDB database.

Example connection:

mongodb://127.0.0.1:27017/digital_student_assistance_network
Option B: MongoDB Atlas

You can also use MongoDB Atlas instead of installing MongoDB locally.

Create a MongoDB Atlas cluster and obtain your MongoDB connection string.

It will look similar to:

mongodb+srv://<username>:<password>@cluster.mongodb.net/digital_student_assistance_network

⚠️ Do not upload your actual MongoDB username, password, or connection string to GitHub.

<h2>⚙️ 4. Configure Environment Variables</h2>

Inside the backend folder, create a file named:

.env

Add the required environment variables.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Replace:

your_mongodb_connection_string

with your actual MongoDB connection string.

Example for local MongoDB:

MONGO_URI=mongodb://127.0.0.1:27017/digital_student_assistance_network

Example for MongoDB Atlas:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/digital_student_assistance_network

🔒 Important: Never push the .env file to GitHub.

Make sure .env is included in .gitignore.

<h2>▶️ 5. Start the Backend Server</h2>

Make sure you are inside the backend folder:

cd backend

Start the backend server using:

npm start

If your project uses a development script such as nodemon, you can use:

npm run dev

When the server starts successfully, you should see a message similar to:

Server running on port 5000
MongoDB connected successfully

Keep this terminal running.

<h2>⚛️ 6. Install Frontend Dependencies</h2>

Open a new Terminal / CMD window.

Go to the project folder:

cd digital-student-assistance-network

Then enter the frontend folder:

cd frontend

Install the required React dependencies:

npm install

Wait for all packages to finish installing.

<h2>🚀 7. Start the React Frontend</h2>

Inside the frontend folder, run:

npm start

If the project uses Vite, run:

npm run dev

The terminal will display a local URL, usually something similar to:

http://localhost:5173

Open that URL in your browser.

<h2>🌐 8. Open the Application</h2>

Once both the backend and frontend servers are running:

Frontend
http://localhost:5173

or the URL shown by your terminal.

Backend

Usually:

http://localhost:5000

The exact port depends on the configuration in your project.

<h2>🔐 9. Login / User Roles</h2>

The system supports different types of users:

🎓 Student

Students can:

Submit assistance requests
Submit complaints
Raise academic queries
View request status
Receive responses
Track their requests
👨‍🏫 Staff / Faculty

Staff can:

View assigned requests
Respond to student queries
Update request status
Manage assistance requests assigned to them
👨‍💼 Admin

Admin can:

Manage users
Manage students and staff
Manage requests
Manage categories
Publish notices
Monitor system activities
Manage the overall system

<h2>🔁 10. Making Changes to the Project</h2>

After making changes to the code:

First check the changed files:

git status

Add the changes:

git add .

Create a commit:

git commit -m "your message"

Push the changes to GitHub:

git push
Example
git add .
git commit -m "Updated student dashboard"
git push

<h2>🔄 11. Pull the Latest Changes</h2>

If another developer has pushed new changes to the repository, first get the latest version:

git pull

Then install any newly added dependencies:

npm install

Run this inside the appropriate frontend or backend folder if their package.json files were changed.

<h2>🛑 12. Stopping the Servers</h2>

To stop a running server:

Press:

Ctrl + C

You need to stop both the frontend and backend terminals separately.

Humanity has not yet invented a button labeled "stop all development servers," apparently.
