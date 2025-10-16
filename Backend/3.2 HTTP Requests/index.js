import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send( "<h1>Hi Everybody</h1>" );
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>I am Kritsana</p>" );
});

app.get("/contact", (req, res) => {
  res.send(`
    <h1>Contact Me</h1>
    <p>Phone : 🙊0947164416🙊</p>
    <img src="https://media1.tenor.com/m/nJ3UcYTaI-sAAAAC/knights-of-guinevere-glitch-productions.gif" alt="Funny GIF">
  `);
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}.`);
});
