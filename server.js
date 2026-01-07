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
const PORT = 3000;

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Live Server support
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json({ limit: "10mb" })); // besar biar bisa upload foto base64
app.use(express.static(path.join(__dirname, "code"))); // serve folder "code"

// ============================
// 🔐 OTP SYSTEM
// ============================
let otpStore = {};

app.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.json({ success: false, message: "Nomor kosong" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[phone] = otp;

  console.log(`📲 OTP untuk ${phone}: ${otp}`);
  res.json({ success: true, otp }); // untuk testing
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ success: true });
  }
  res.json({ success: false, message: "OTP salah atau kadaluarsa" });
});

// ============================
// 💬 KOMUNITAS POSTS
// ============================
const POSTS_FILE = path.join(__dirname, "posts.json");

function readPostsFromFile() {
  try {
    if (!fs.existsSync(POSTS_FILE)) return [];
    const raw = fs.readFileSync(POSTS_FILE, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("❌ Gagal baca posts.json:", err);
    return [];
  }
}

function writePostsToFile(posts) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("❌ Gagal tulis posts.json:", err);
    return false;
  }
}

app.get("/api/posts", (req, res) => {
  const posts = readPostsFromFile();
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const { author, text, image } = req.body;

  if ((!text || text.trim() === "") && !image) {
    return res.status(400).json({ error: "Tulis teks atau lampirkan gambar minimal satu." });
  }

  const posts = readPostsFromFile();
  const newPost = {
    id: "p_" + Math.random().toString(36).slice(2, 9),
    author: (author && String(author).trim()) || "Anon",
    text: (text && String(text).trim()) || "",
    image: image || null,
    likes: 0,
    likedByMe: false,
    comments: [],
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  if (!writePostsToFile(posts)) {
    return res.status(500).json({ error: "Gagal menyimpan post" });
  }

  return res.status(201).json(newPost);
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
    console.error("❌ Gagal baca ds.json:", err);
    return [];
  }
}

function writeDS(data) {
  try {
    fs.writeFileSync(DS_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("❌ Gagal tulis ds.json:", err);
    return false;
  }
}

// Simpan hasil simulasi
app.post("/api/simulasi", (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ success: false, message: "Data simulasi kosong" });
  }

  const ds = readDS();
  newData.id = "sim_" + Math.random().toString(36).slice(2, 9);
  newData.createdAt = new Date().toISOString();

  ds.push(newData);

  if (!writeDS(ds)) {
    return res.status(500).json({ success: false, message: "Gagal menyimpan data simulasi" });
  }

  res.json({ success: true, message: "✅ Data simulasi disimpan", data: newData });
});

// Ambil semua data simulasi
app.get("/api/simulasi", (req, res) => {
  const data = readDS();
  res.json(data);
});

// ============================
// 🚀 START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
