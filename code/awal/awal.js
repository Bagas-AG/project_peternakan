const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });

  // tombol prev hidden di slide pertama
  prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

  // tombol next berubah jadi "Mulai" di slide terakhir
  if (index === slides.length - 1) {
    nextBtn.textContent = 'Mulai';
  } else {
    nextBtn.textContent = 'Selanjutnya ➜';
  }
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    showSlide(currentIndex);
  } else {
    // pindah ke halaman login
    window.location.href = "/login/login.html";
  }
});

// tampilkan slide pertama
showSlide(currentIndex);
