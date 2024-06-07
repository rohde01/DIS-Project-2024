# DIS-Project 2024 
This is Linus, Emil and Carl-Emil's DIS-Project.

## Customer Management Dashboard for Pingo Documents

This project consists of a frontend and a backend. The backend is written in Node.js and the frontend is built with Vite + Svelte. The web app is a customer management dahsboard for the legal tech platform Pingo Documents. The dashboard allows for easy onboaring of new customers (INSERT new users into database), update of multiple users for a specific team simuntaniusly (UPDATE current users in databse), deletion of multiple teams at once (DELETE teams from database) and finally dynamic charting of user statistics with different filters (Fetching userdata using SELECT statements). 

## Prerequisites

- Node.js

  If you don't have Node.js installed, you can download it from (https://nodejs.org/). Follow the instructions on the website to install it.

- npm (Node package manager, comes with Node.js)

## Getting started

### Step 1: Clone the repository 

First, clone the repository to your local machine using git. Open your terminal and run:

```bash
git clone git@github.com:rohde01/DIS-Project-2024.git
```

### Step 2: Navigate to the project directory

Change into the project directory:

```bash
cd DIS-Project-2024
```

### Step 3: Install dependencies 

Install all the necessary dependencies by running:

```bash
npm install
```

### Step 4: Start the project 

To start both the backend and the frontend, simply run:

```bash
npm start
```

This command will start the backend server and the frontend development server concurrently.

PLEASE NOTE: The database for the project is a copy of Pingo Documents original database hosted on Simply.com. Unecesssary data for this project is deleted and personal information from teams and customers are censored. When the project is started, connection to simply.com will happen automatically  

### Step 5: Open the application

The backend server is now running on http://localhost:3001 and the application is accesible on http://localhost:5173 (please doublecheck terminal output as address may vary)

### Step 6: Navigate the dashboard

Use the sidebar to explore the different features. Should be self-explanatory. 
