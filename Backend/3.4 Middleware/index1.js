import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit",(req,res)=>
  {//console.log(req.body.h);
//res.send("found the \t"+req.body.pet+"\tin the road name by\t"+ req.body.street);
    res.send(
      `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Band Name Generator</title>
</head>

<body>
  <h1>Band Name Generator</h1>
  <form action="/submit" method="POST">
    <label for="street">Street Name:</label>
    <input type="text" name="street" value="${req.body.street}"required>
    <label for="pet">Pet Name:</label>
    <input type="text" name="pet"  value="${req.body.pet}" required>
    <input type="submit" value="Submit">
  </form>
</body>

</html>
      <h1>Message</h1>
      found ${req.body.pet}
      in the road name ${req.body.street}`
    )
  }
)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
