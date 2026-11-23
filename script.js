// --- PENGATURAN PESAN ---
// Kamu bisa mengubah nama dan isi pesan di bagian ini
const namaPenerima = "Alya Putri"; 
const pesanUcapan = "Selamat bertambah usia! Semoga di tahun ini semua hal baik selalu menyertaimu, langkahmu dimudahkan, dan kebahagiaan selalu hadir di setiap harimu. Tetaplah menjadi pribadi yang hangat dan menginspirasi. ✨";

// Mengambil elemen dari HTML
const introCard = document.getElementById("intro-card");
const mainCard = document.getElementById("main-card");
const openBtn = document.getElementById("open-btn");
const wishBtn = document.getElementById("wish-btn");
const confettiBtn = document.getElementById("confetti-btn");
const recipientNameEl = document.getElementById("recipient-name");
const typedMessageEl = document.getElementById("typed-message");

// Set nama penerima
recipientNameEl.textContent = namaPenerima;

// Fungsi Efek Mengetik (Typewriter)
let charIndex = 0;
function typeWriter() {
    if (charIndex < pesanUcapan.length) {
        typedMessageEl.textContent += pesanUcapan.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40); // Kecepatan ketik (ms)
    }
}

// Event saat tombol "Buka Ucapan" diklik
openBtn.addEventListener("click", () => {
    introCard.style.opacity = "0";
    introCard.style.transform = "scale(0.9)";
    
    setTimeout(() => {
        introCard.classList.add("hidden");
        mainCard.classList.remove("hidden");
        
        // Trigger animasi muncul kartu utama
        setTimeout(() => {
            mainCard.style.opacity = "1";
            mainCard.style.transform = "translateY(0)";
            typeWriter();
            launchConfetti();
        }, 50);
    }, 400);
});

// Event saat tombol "Tiup Lilin" diklik
wishBtn.addEventListener("click", () => {
    wishBtn.textContent = "Permintaan Terkabul ✨";
    wishBtn.style.background = "linear-gradient(135deg, #66bb6a, #43a047)";
    launchConfetti();
});

// Event saat tombol "Rayakan Lagi" diklik
confettiBtn.addEventListener("click", launchConfetti);

// --- LOGIKA ANIMASI KONFETI (HTML5 CANVAS) ---
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ["#ff9a9e", "#fecfef", "#d81b60", "#ffd54f", "#81c784", "#64b5f6"];

function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360
        });
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += 3;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        // Hapus partikel jika sudah melewati layar bawah
        if (p.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateConfetti);
}

// Menyesuaikan ukuran canvas jika layar diubah ukurannya
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Jalankan loop animasi
animateConfetti();
