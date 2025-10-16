// server.mjs (หรือ index.mjs)
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import bcrypt from "bcrypt";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// --- PostgreSQL pool ---
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- Session Store (เก็บ session ลง Postgres) ---
const PgSession = connectPgSimple(session);
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "session", // ชื่อตาราง session (ปล่อยให้ lib สร้างให้โดยอัตโนมัติ)
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 วัน
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // ให้เสิร์ฟไฟล์ index.html/secret.html ได้

// --- Helper: แนบ user เข้ากับ req จาก session ---
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
});


// --- Middleware: ต้องล็อกอินก่อน ---
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).sendFile(__dirname + "/public/index.html");
  }
  next();
}

app.use((req, res, next) => {
  const openPaths = ["/", "/login", "/logout"];
  if (openPaths.includes(req.path)) {
    return next(); 
  }
  return requireAuth(req, res, next); 
});


function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    if (!roles.includes(req.user.role)) return res.status(403).send("บทบาทของคุณไม่ได้รับอนุญาตให้เข้าหน้านี้");
    next();
  };
}


app.get("/", (req, res) => {
  
  if (req.user) return res.redirect("/secret");
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const q = `
      SELECT user_id, fullname, username, role, status
      FROM "users"
      WHERE username = $1
        AND status = true
        AND password = crypt($2, password)
      LIMIT 1
    `;

    const { rows } = await pool.query(q, [username, password]);

    if (rows.length === 0) {
      return res.status(401).send("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง หรือบัญชีถูกระงับ");
    }

    const u = rows[0];
    req.session.user = {
      user_id: u.user_id,
      fullname: u.fullname,
      username: u.username,
      role: u.role,
      status: u.status,
    };

    res.redirect("/secret");
  } catch (e) {
    console.error(e);
    res.status(500).send("เกิดข้อผิดพลาดภายในระบบ");
  }
});

app.get("/logout", (req, res) => {
  req.session?.destroy(() => {
    res.redirect("/");
  });
});
// --- ออกจากระบบ ---
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


app.get("/secret", (req, res) => {
  res.send(`
    <a href="/student">Student</a><br>
    <a href="/logout">Logout</a>
    `);
  
});

app.get("/admin", requireRole("admin"), (req, res) => {
  res.send(`สวัสดีแอดมิน ${req.user.fullname}`);
});


app.get("/student", requireRole("student"),(req, res)=>{
  res.send(`<h1> คุณคือ นักเรียน </h1>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
