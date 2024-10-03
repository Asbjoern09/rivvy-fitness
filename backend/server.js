// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
