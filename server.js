// ============================
// 📦 IMPORT MODULE
// ============================
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ============================
// ⚙️ KONFIGURASI SERVER
// ============================
const app = express();
const PORT = process.env.PORT || 8080;

// ============================
// 🌐 MIDDLEWARE
// ============================
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Serve folder "code" sebagai static
app.use(express.static(path.join(__dirname, "code")));

// ============================
// 🏠 ROOT → awal.html
// ============================
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "code", "awal", "awal.html")
  );
});

// ============================
// 🔐 OTP SYSTEM
// ============================
let otpStore = {};

app.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.json({ success: false, message: "Nomor kosong" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phone] = otp;

  console.log(`📲 OTP ${phone}: ${otp}`);
  res.json({ success: true, otp }); // testing only
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ success: true });
  }

  res.json({ success: false, message: "OTP salah / kadaluarsa" });
});

// ============================
// 💬 KOMUNITAS POSTS
// ============================
const POSTS_FILE = path.join(__dirname, "posts.json");

function readPosts() {
  try {
    if (!fs.existsSync(POSTS_FILE)) return [];
    const raw = fs.readFileSync(POSTS_FILE, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("❌ posts.json error:", err);
    return [];
  }
}

function writePosts(posts) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (err) {
    console.error("❌ write posts.json error:", err);
    return false;
  }
}

app.get("/api/posts", (req, res) => {
  const posts = readPosts();
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const { author, text, image } = req.body;

  if ((!text || text.trim() === "") && !image) {
    return res.status(400).json({ error: "Teks atau gambar wajib diisi" });
  }

  const posts = readPosts();

  const newPost = {
    id: "p_" + Math.random().toString(36).slice(2, 9),
    author: author?.trim() || "Anon",
    text: text?.trim() || "",
    image: image || null,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  if (!writePosts(posts)) {
    return res.status(500).json({ error: "Gagal simpan post" });
  }

  res.status(201).json(newPost);
});

// ============================
// 🐔 SIMULASI PRODUKSI
// ============================
const DS_FILE = path.join(__dirname, "ds.json");

function readDS() {
  try {
    if (!fs.existsSync(DS_FILE)) return [];
    const raw = fs.readFileSync(DS_FILE, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("❌ ds.json error:", err);
    return [];
  }
}

function writeDS(data) {
  try {
    fs.writeFileSync(DS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error("❌ write ds.json error:", err);
    return false;
  }
}

app.post("/api/simulasi", (req, res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ success: false, message: "Data kosong" });
  }

  const ds = readDS();
  data.id = "sim_" + Math.random().toString(36).slice(2, 9);
  data.createdAt = new Date().toISOString();

  ds.push(data);

  if (!writeDS(ds)) {
    return res.status(500).json({ success: false, message: "Gagal simpan data" });
  }

  res.json({ success: true, data });
});

app.get("/api/simulasi", (req, res) => {
  res.json(readDS());
});

// ============================
// 🚀 START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`🚜 Server Project Peternakan running on port ${PORT}`);
});
