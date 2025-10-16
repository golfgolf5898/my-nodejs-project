import express from "express";
const app = express();
const post = 3000;
// กำหนดพอร์ต
const port = 3000;

// Routes
app.get("/", (req, res) => {
  res.send(req);
});

app.get("/about", (req, res) => {
  res.send("This is the About page.");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}.`);
});
