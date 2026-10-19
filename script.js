const form = document.getElementById('guestbookForm');
const list = document.getElementById('guestbookList');

// URL GOOGLE APPS SCRIPT
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkXBHp-5weZ5_BiUWGsddGO1n9rF-P9bZiHuGmxxToy7GxOqf_3e82R0FIX8jPwk8E/exec';

// BUKU TAMU DIGITAL TERHUBUNG KE GOOGLE SHEETS
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const pesan = document.getElementById('pesan').value.trim();
  const tombol = form.querySelector('button[type="submit"]');

  if (!nama || !pesan) {
    alert('Isi nama dan pesan terlebih dahulu ya.');
    return;
  }

  tombol.disabled = true;
  tombol.textContent = 'Mengirim...';

  try {
    const data = new URLSearchParams();
    data.append('nama', nama);
    data.append('pesan', pesan);

    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data
    });

    // Tampilkan pesan di halaman
    const item = document.createElement('div');
    item.className = 'guestbook-item';

    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = nama;

    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = pesan;

    item.appendChild(nameElement);
    item.appendChild(messageElement);
    list.prepend(item);

    form.reset();

    alert(
      'Permintaan pengiriman telah dilakukan. ' +
      'Periksa Google Sheets untuk memastikan data tersimpan.'
    );

  } catch (error) {
    console.error('Gagal mengirim buku tamu:', error);
    alert('Pengiriman gagal. Periksa koneksi internet dan coba lagi.');
  } finally {
    tombol.disabled = false;
    tombol.textContent = 'Kirim Pesan ↗';
  }
});


// ANIMASI KEMBANG API
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;

    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };

    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.015;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.y += 0.05;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
  }
}

function createFirework(x, y) {
  const colors = [
    '#ec4899',
    '#a855f7',
    '#f472b6',
    '#c084fc',
    '#ffffff',
    '#fbbf24'
  ];

  for (let i = 0; i < 60; i++) {
    const color = colors[
      Math.floor(Math.random() * colors.length)
    ];

    particles.push(new Particle(x, y, color));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.alpha > 0);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();


// KEMBANG API SAAT PENUTUP DIKLIK
const footerCard = document.getElementById('penutup');

footerCard.addEventListener('click', function () {
  const rect = footerCard.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  createFirework(centerX, centerY);
  createFirework(centerX - 100, centerY - 30);
  createFirework(centerX + 100, centerY - 30);
});
