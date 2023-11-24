# Shopping List Client (React.js)

This project is the frontend client for a shopping list application built with React.js.

Before running the application, ensure you have the following:

- Node.js and npm installed

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/leonbojic/shopping-list-client.git
cd shopping-list-client
```
### 3. Install Dependecies
```bash
npm install
```
### 2. Build the Application
```bash
npm run build
```
### 4. Serve the Build Application
```bash
npm install -g serve
serve -s build
```
You can access the app by navigating to http://localhost:3000 in your web browser.

## Additional Notes
This is meant to be used with shopping-list-server at: https://github.com/leonbojic/shopping-list-server
Before building the app, the server URL can be configured in the .env.local file
```local
REACT_APP_SERVER_URL=http://localhost:8080
```
