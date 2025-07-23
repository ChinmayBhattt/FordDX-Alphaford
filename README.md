# FoldDx - Protein Structure Prediction Platform

FoldDx is a full-stack web application that predicts protein structures from UniProt IDs, analyzes mutation severity, and logs results on the Internet Computer Protocol (ICP) blockchain.

## Features

- **Protein Structure Prediction**: Input a UniProt ID to predict its 3D structure
- **Mutation Analysis**: Identify potential mutations and their severity
- **Blockchain Verification**: Secure logging of prediction results on the ICP blockchain
- **3D Visualization**: Interactive 3D viewer for protein structures

## Tech Stack

- **Frontend**: React, Tailwind CSS, NGL Viewer for 3D visualization
- **Backend**: Python FastAPI
- **Blockchain**: Internet Computer Protocol (ICP) with Motoko

## Project Structure

```
FoldDx/
├── frontend/           # React frontend application
│   ├── src/            # Source code
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Application pages
│   │   └── assets/     # Static assets
│   ├── Dockerfile      # Docker configuration for frontend
│   └── nginx.conf      # Nginx configuration for production
├── backend/            # FastAPI backend
│   ├── app/            # Application code
│   │   └── main.py     # Main API endpoints
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile      # Docker configuration for backend
├── blockchain/         # ICP blockchain code
│   ├── motoko/         # Motoko canister code
│   └── dfx.json        # ICP configuration
├── docker-compose.yml  # Docker Compose configuration
└── docker-build.sh     # Script to build and run Docker containers
```

## Getting Started

### Prerequisites

#### For Docker Deployment (Recommended)
- Docker
- Docker Compose

#### For Manual Setup
- Node.js (v16+)
- Python (v3.9+)
- Internet Computer SDK (DFX) - for blockchain deployment

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/folddx.git
cd folddx
```

#### Option 1: Using Docker (Recommended)

If you have Docker and Docker Compose installed, you can set up the entire application with a single command:

```bash
# Make the build script executable
chmod +x docker-build.sh

# Build and start all services
./docker-build.sh
```

This will start both the frontend and backend services. Access the application at:
- Frontend: http://localhost:80
- Backend API: http://localhost:8000

#### Option 2: Manual Setup

1. **Set up the frontend**

```bash
cd frontend
npm install
```

2. **Set up the backend**

```bash
cd ../backend
pip install -r requirements.txt
```

3. **Set up the blockchain (optional)**

```bash
cd ../blockchain
dfx start --background
dfx deploy
```

### Running the Application

#### Option 1: Using Docker

If you've set up the application using Docker, it should already be running. Access the application at:

- Frontend: http://localhost:80
- Backend API: http://localhost:8000

To stop the containers:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f
```

#### Option 2: Manual Setup

1. **Start the backend server**

```bash
cd backend
python run.py
```

2. **Start the frontend development server**

```bash
cd frontend
npm run dev
```

3. **Access the application**

Open your browser and navigate to `http://localhost:5173`

#### Option 3: Using the run_app.sh Script

Alternatively, you can use the provided script to start both servers:

```bash
chmod +x run_app.sh
./run_app.sh
```

## Usage

1. On the home page, click "Get Started"
2. Enter a UniProt ID (e.g., P04637 for p53)
3. Wait for the prediction to complete
4. View the 3D structure and mutation analysis
5. Click "Verify on ICP" to see the blockchain record

## Development

### Frontend Development

```bash
cd frontend
npm run dev
```

### Backend Development

```bash
cd backend
python run.py
```

### Blockchain Development

```bash
cd blockchain
dfx start --clean
dfx deploy
```

## Deployment

### Using Docker (Recommended)

The easiest way to deploy FoldDx is using Docker Compose:

```bash
# Build and start all services
./docker-build.sh

# Or manually with Docker Compose
docker-compose up --build -d
```

This will start both the frontend and backend services. Access the application at:
- Frontend: http://localhost:80
- Backend API: http://localhost:8000

To stop the containers:
```bash
docker-compose down
```

### Manual Deployment

#### Frontend

```bash
cd frontend
npm run build
# Deploy the dist folder to your web server
```

#### Backend

The backend can be deployed using Docker or any Python hosting service:

```bash
cd backend
docker build -t folddx-api .
docker run -p 8000:8000 folddx-api
```

### Blockchain

Deploy to the Internet Computer mainnet:

```bash
cd blockchain
dfx deploy --network ic
```

## License

MIT

## Acknowledgements

- [AlphaFold](https://alphafold.ebi.ac.uk/) for protein structure prediction
- [UniProt](https://www.uniprot.org/) for protein sequence data
- [Internet Computer](https://internetcomputer.org/) for blockchain infrastructure
- [NGL Viewer](https://nglviewer.org/) for 3D molecular visualization
