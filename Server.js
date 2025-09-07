const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_FILE = path.join(__dirname, "db.json");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ items: [] }));

app.use(helmet());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if ([".jar", ".zip"].includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error("Only .jar and .zip allowed"));
  }
});

// Upload page
app.get("/", (_, res) => {
  res.send(`
    <h2>Private Mod Host</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="password" name="key" placeholder="Admin Key" required/><br/><br/>
      <input type="file" name="mod" accept=".jar,.zip" required/><br/><br/>
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload API
app.post("/upload", upload.single("mod"), (req, res) => {
  if (req.body.key !== ADMIN_KEY) return res.status(403).send("Invalid admin key");

  const id = uuidv4();
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  db.items.push({ id, filename: req.file.filename, original: req.file.originalname });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.send(`✅ Uploaded! Download link: <a href="/download/${id}">/download/${id}</a>`);
});

// Download API
app.get("/download/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const item = db.items.find(x => x.id === req.params.id);
  if (!item) return res.status(404).send("File not found");

  res.download(path.join(UPLOAD_DIR, item.filename), item.original);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_FILE = path.join(__dirname, "db.json");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ items: [] }));

app.use(helmet());
app.use(express.json());

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_FILE = path.join(__dirname, "db.json");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ items: [] }));

app.use(helmet());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if ([".jar", ".zip"].includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error("Only .jar and .zip allowed"));
  }
});

// Upload page
app.get("/", (_, res) => {
  res.send(`
    <h2>Private Mod Host</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="password" name="key" placeholder="Admin Key" required/><br/><br/>
      <input type="file" name="mod" accept=".jar,.zip" required/><br/><br/>
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload API
app.post("/upload", upload.single("mod"), (req, res) => {
  if (req.body.key !== ADMIN_KEY) return res.status(403).send("Invalid admin key");

  const id = uuidv4();
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  db.items.push({ id, filename: req.file.filename, original: req.file.originalname });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.send(`✅ Uploaded! Download link: <a href="/download/${id}">/download/${id}</a>`);
});

// Download API
app.get("/download/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const item = db.items.find(x => x.id === req.params.id);
  if (!item) return res.status(404).send("File not found");

  res.download(path.join(UPLOAD_DIR, item.filename), item.original);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DB_FILE = path.join(__dirname, "db.json");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ items: [] }));

app.use(helmet());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if ([".jar", ".zip"].includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error("Only .jar and .zip allowed"));
  }
});

// Upload page
app.get("/", (_, res) => {
  res.send(`
    <h2>Private Mod Host</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="password" name="key" placeholder="Admin Key" required/><br/><br/>
      <input type="file" name="mod" accept=".jar,.zip" required/><br/><br/>
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload API
app.post("/upload", upload.single("mod"), (req, res) => {
  if (req.body.key !== ADMIN_KEY) return res.status(403).send("Invalid admin key");

  const id = uuidv4();
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  db.items.push({ id, filename: req.file.filename, original: req.file.originalname });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.send(`✅ Uploaded! Download link: <a href="/download/${id}">/download/${id}</a>`);
});

// Download API
app.get("/download/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const item = db.items.find(x => x.id === req.params.id);
  if (!item) return res.status(404).send("File not found");

  res.download(path.join(UPLOAD_DIR, item.filename), item.original);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));￼Enter
