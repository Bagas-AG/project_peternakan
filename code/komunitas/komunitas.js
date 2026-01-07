// Base URL server Node.js
const API_BASE = "http://localhost:3000";
const useServer = true;

// simpan cache lokal jika tidak pakai server
let posts = [];

// DOM element
const postsContainer = document.getElementById("posts");
const postForm = document.getElementById("postForm");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");

// render semua post
function renderPosts(list) {
  postsContainer.innerHTML = "";
  if (!list.length) {
    postsContainer.innerHTML = "<p class='text-gray-500'>Belum ada postingan.</p>";
    return;
  }
  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "p-3 border-b";
    div.innerHTML = `
      <p class="font-bold">${p.author}</p>
      <p>${p.text}</p>
      ${
        p.image
          ? `<img src="${p.image}" class="w-full max-h-60 object-cover mt-2 rounded">`
          : ""
      }
      <p class="text-xs text-gray-500 mt-1">${new Date(
        p.createdAt
      ).toLocaleString()}</p>
    `;
    postsContainer.appendChild(div);
  });
}

// ambil post dari server
async function loadPosts() {
  if (useServer) {
    const res = await fetch(API_BASE + "/api/posts");
    const data = await res.json();
    renderPosts(data);
  } else {
    renderPosts(posts);
  }
}

// publish post baru
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = postText.value.trim();
  let image = null;

  if (postImage.files.length > 0) {
    const file = postImage.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      image = reader.result;
      await savePost(text, image);
    };
    reader.readAsDataURL(file);
  } else {
    await savePost(text, null);
  }
});

// simpan post (ke server / lokal)
async function savePost(text, image) {
  if (useServer) {
    const res = await fetch(API_BASE + "/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "User", text, image }),
    });
    const data = await res.json();
    if (res.ok) {
      postText.value = "";
      postImage.value = "";
      loadPosts();
    } else {
      alert(data.error || "Gagal upload post.");
    }
  } else {
    posts.unshift({
      id: Date.now(),
      author: "User",
      text,
      image,
      createdAt: new Date().toISOString(),
    });
    postText.value = "";
    postImage.value = "";
    renderPosts(posts);
  }
}

// load pertama kali
loadPosts();
