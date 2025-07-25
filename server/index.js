const express = require("express");
const app = express();
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

// Create the HTTP server
const httpServer = createServer(app);

// Store players
const players = new Map();
let lastBuzzPlayer = null;
let lockedOut = false;
let buzzedPlayers = new Set();

// Attach Socket.IO to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use((socket, next) => {
  try {
    next();
  } catch (error) {
    console.error("Socket.IO error:", error);
    io.emit("error", { message: "An error occurred with the connection." });
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on("join-player", (playerName, callback) => {
    //Check if name taken
    if ([...players.values()].some((player) => player.name === playerName)) {
      callback({ success: false, message: "Name already taken." });
    } else {
      players.set(socket.id, { name: playerName });
      console.log(`${playerName} joined the game.`);
      callback({ success: true });
    }
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
  });

  socket.on("buzz", (playerName) => {
    if (!lastBuzzPlayer && !lockedOut && !buzzedPlayers.has(playerName)) {
      lastBuzzPlayer = playerName;
      buzzedPlayers.add(playerName);
      lockedOut = true;
      console.log(`${playerName} buzzed in!`);
      io.emit("buzzed", playerName);
    }
  });

  socket.on("buzz-status", (playerName, callback) => {
    console.log(`Buzz status requested by ${playerName}`);
    if (typeof callback === "function") {
      callback({
        lockedOut: lockedOut,
        buzzedPlayers: Array.from(buzzedPlayers),
      });
    } else {
      console.log(callback);
      console.log(typeof callback);
    }
  });

  socket.on("reset-buzz", () => {
    lastBuzzPlayer = null;
    lockedOut = false;
    buzzedPlayers.clear();
    console.log("Buzz reset");
    io.emit("buzz-reset");
  });

  // Handle next buzz (player got wrong answer and cant buzz again)
  socket.on("buzz-next", () => {
    lastBuzzPlayer = null;
    lockedOut = false;
    console.log("Next buzz allowed");
    io.emit("buzz-next");
  });
});

// Serve static files
const clientPath = path.resolve(__dirname, "../client");
app.use(express.static(path.join(clientPath, "dist")));

// Catch-all route for React client-side routing
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "dist", "index.html"));
});

// Start the server
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
