# CODLET - Collaborative Code Editor

## Introduction
CODE LET is a real-time collaborative code editor designed to facilitate seamless teamwork among developers. It allows multiple users to write and execute code together, communicate via chat and voice, and use a whiteboard for brainstorming and explanations. This tool is ideal for remote coding interviews, pair programming, and team-based development.

## Features
- **Real-Time Code Collaboration**: Multiple users can write and edit code simultaneously.
- **Live Chat & Voice Chat**: Communicate effectively with team members in real time.
- **Whiteboard Integration**: Use a whiteboard for writing and explaining concepts with the `tldraw` package.
- **Multi-Language Code Execution**: Compile and run code in various programming languages.
- **User-Friendly Interface**: Clean and intuitive UI for seamless coding.
- **Dockerized Deployment**: Fully containerized using Docker for easy deployment.

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS

### Backend:
- Express.js
- WebSockets for real-time communication
- MySQL for database management
- Docker for containerized deployment

### Deployment:
- Contabo VPS
- GitHub Actions for CI/CD
- Docker for running backend, frontend, and database inside containers

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Docker & Docker Compose
- MySQL Server

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/karthi9772/CodLet-Client.git
   cd CODE-LET
   ```
2. **Start Backend**
   ```sh
   cd backend
   npm install
   npm start
   ```
3. **Start Frontend**
   ```sh
   cd frontend
   npm install
   npm start
   ```
4. **Run Using Docker** (Optional)
   ```sh
   docker-compose up --build
   ```

## Usage
1. Open the application in your browser.
2. Share the collaboration link with teammates.
3. Start coding, chatting, and collaborating in real time!

## Contributing
We welcome contributions! Feel free to open issues or submit pull requests to improve the project.

## License
This project is licensed under the MIT License.


