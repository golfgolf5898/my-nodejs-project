import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "secretKey123",  // ควรเปลี่ยนเป็นค่าแบบสุ่มในโปรดักชัน
  resave: false,
  saveUninitialized: true
}));

// Middleware เช็ค password
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    req.session.userIsAuthorised = true;
  }
  next();
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", passwordCheck, (req, res) => {
  if (req.session.userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
