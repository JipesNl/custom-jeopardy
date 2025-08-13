const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");
const fs = require("fs");

// Create the HTTP server
const httpServer = createServer(app);
app.use(cors());
app.use(json());

// TODO: FIX THIS PASSWORD SHIT
const SECRET = "abcdefg12321";
const PASSWORD = "password"; // add env variable later

// Store players
const players = new Map();
let lastBuzzPlayer = null;
let lockedOut = true;
let buzzedPlayers = new Set();

const filePath = path.join(__dirname, "..", "example.json");

let gameState = getInitialState();

function getInitialState() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return null;
    }
  } catch (readError) {
    console.error("Error reading file:", readError);
    return null;
  }
}

// Attach Socket.IO to the HTTP server
const io = new Server(httpServer, {
  // cors: {
  //   origin: "http://localhost:5173",
  // },
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
      return;
    }
    if (!gameState.players.some((player) => player.name === playerName)) {
      gameState.players.push({ name: playerName, bank: 0 });
    }
    players.set(socket.id, { name: playerName });
    console.log(`${playerName} joined the game.`);
    callback({ success: true });
    io.emit("player-changed");
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    io.emit("player-changed");
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
app.use(cors());

app.use((req, res, next) => {
  if (req.path.startsWith("/api/host")) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, SECRET);
      next();
      return;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
});

// Catch-all route for React client-side routing
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "dist", "index.html"));
});

app.post("/api/login", (req, res) => {
  console.log("HERE");
  console.log(req.body);
  const { password } = req.body;
  if (password === PASSWORD) {
    const token = jwt.sign({ user: "host" }, SECRET, { expiresIn: "10h" });
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: "Invalid password" });
});

app.get("/api/host/game-state", (req, res) => {
  if (!gameState) {
    console.error("Game state not initialized.");
    return res.status(500).json({ message: "Game state not initialized." });
  }
  res.json({ gameState: gameState });
});

app.post("/api/host/game-state", (req, res) => {
  console.log("Updating game state");
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid game state data." });
  }
  if (req.body.currentQuestion !== gameState.currentQuestion) {
    if (req.body.currentQuestion === null) {
      console.log("Current question reset");
      lockedOut = true;
      io.emit("lock");
    } else {
      console.log("Current question set to:", req.body.currentQuestion);
      lockedOut = false;
      io.emit("buzz-reset");
    }
  }
  gameState = req.body;
  res.status(200).send();
});

app.post("/api/host/current-question", (req, res) => {
  // Handle setting the current question
  const { question } = req.body;
  currentQuestion = question;
  res.status(200).send();
});

app.get("/api/host/current-question", (req, res) => {
  // Handle getting the current question
  res.json({ question: currentQuestion });
});

app.get("/api/host/players", (req, res) => {
  // Handle getting the list of players
  const playerList = Array.from(players.values()).map((player) => player.name);
  res.json({ players: playerList });
});

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "dist", "index.html"));
});

// Start the server
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
