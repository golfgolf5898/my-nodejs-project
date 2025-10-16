import express from "express";

const app = express();
const port = 3000;

app.use(logger);

function logger(req , res ,next){
  console.log("Reqeust Method :",req.method);
  console.log("Reqeust URL : ",req.url);
  next(); 
}
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
