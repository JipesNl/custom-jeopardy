const express = require('express');
const app = express();
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Create the HTTP server
const httpServer = createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {

  socket.on('join', (role, playerName) => {
    socket.role = role;
    console.log(`${socket.role} ${playerName} joined with ID: ${socket.id}`);
  });

  socket.on('buzz', (playerName) => {
    console.log(`${playerName} buzzed!`);
  });
});

// Serve static files
const clientPath = path.resolve(__dirname, '../client');
app.use(express.static(path.join(clientPath, 'dist')));

// Catch-all route for React client-side routing
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'dist', 'index.html'));
});

// Start the server
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});