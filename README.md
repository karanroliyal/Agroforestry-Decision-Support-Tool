# Agroforestry Decision Support Tool

A modern web application built with React, Vite, and Express that helps farmers decide which agroforestry tree species are best suited for their land conditions. It uses the Groq API (llama3-70b-8192 model) to dynamically recommend tree species based on user input regarding region, soil, rainfall, and purpose.

## Features
- **Dynamic AI Recommendations**: Powered by the Groq API.
- **Modern UI**: Built with React, featuring a sleek, responsive, glassmorphism design.
- **Data Visualization**: Includes match percentage charts using Recharts.
- **Robust Architecture**: Separation of concerns with a Node/Express backend and Vite/React frontend.

## Project Structure
- `src/`: Frontend React application.
- `server/`: Backend Node.js/Express application.

## Setup Instructions

### 1. Clone the repository
Ensure you are in the project root directory.

### 2. Environment Variables
Create a `.env` file in the root directory (where `package.json` for frontend is located).
Add the following variables:
```
VITE_API_URL=http://localhost:5000
GROQ_API_KEY=your_actual_groq_api_key_here
PORT=5000
```
Note: Do not commit your actual `.env` file to version control. The backend reads `../.env` because it runs from the `server/` directory.

### 3. Install Dependencies
Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### 4. Running the Application locally

**Start the Backend Server:**
Open a terminal and run:
```bash
cd server
node index.js
```
The server will run on `http://localhost:5000`.

**Start the Frontend:**
Open another terminal and run:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Deployment Instructions

### Frontend (Vercel / Netlify)
1. Push the repository to GitHub.
2. Go to Vercel/Netlify and import the project.
3. Set the build command to `npm run build` and output directory to `dist`.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.
5. Deploy.

### Backend (Render / Railway)
1. In the platform, select the `server/` folder or configure the root directory to run the server.
2. Build command: `npm install` (in server directory).
3. Start command: `node index.js`.
4. Add the `GROQ_API_KEY` and `PORT` environment variables in the platform dashboard.
5. Add CORS rules in `index.js` to allow your frontend URL to access the backend.

## AI Recommendation Logic Integration
The app sends user input (Region, Soil, Rainfall, Purpose) to the Express backend. The backend constructs a highly specific prompt instructing the Groq LLM to act as an Indian agroforestry expert and return exactly 3 top tree species as a JSON object with tree names, explanation, reasoning, and match percentage. The backend then parses this JSON and returns it to the frontend for display in custom cards and a bar chart.
