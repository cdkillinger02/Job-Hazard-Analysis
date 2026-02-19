## Cloning Repository
Install Git 
- Verify with 'git --version'
Clone the Repository
- git clone https://github.com/cdkillinger02/Job-Hazard-Analysis
Navigate into the Project Directory
- cd Job-Hazard-Analysis

## Prerequisites for SPA
Make sure you have installed:
- Node.js (v18+ recommended)
- npm (comes with Node.js)
To verify, open terminal and run following commands:
node -v
npm -v

## Prerequisites for Backend API
Make sure you have installed:
- Python 3.9+
- pip (comes with Python)
To verify, open terminal and run the following command:
python --version

## To Run SPA on Local Environment
Open Terminal
Navigate to the frontend directory:
- Run command 'cd jha-frontend'
Install dependencies:
- Run command 'npm install'
Start the development server:
- Run command 'npm run dev'
Open your browser and visit:
- SPA will be accessible at http://localhost:5173/

## To Run Backend API on Local Environment
Open Second Terminal
Navigate to the frontend directory:
- Run command 'cd jha-backend'
Install dependencies:
- Run command 'pip install -r requirements.txt'
Start the development server using Uvicorn:
- Run command 'uvicorn main:app --reload'
Open your browser and visit:
- API will be accessible at http://localhost:8000

## Available Backend Endpoints
| Method | Endpoint                               | Description       |
| ------ | -------------------------------------- | ----------------- |
| POST   | `/api/createNewAnalysis`               | Create new JHA    |
| GET    | `/api/getAllAnalysis`                  | Retrieve all JHAs |
| GET    | `/api/jhas/{jha_id}`                   | Get JHA by ID     |
| PUT    | `/api/updateExistingAnalysis/{jha_id}` | Update JHA        |
| POST   | `/api/deleteAnalysis/{jha_id}`         | Delete JHA        |

## CORS Configuration
CORS is enabled for all origins:
- allow_origins=["*"]