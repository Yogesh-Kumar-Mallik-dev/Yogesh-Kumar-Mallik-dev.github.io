// ======================== Typing Effect ========================
const typingText = ["Full-Stack Developer", "Game Developer", "Founder of QiForge"];
let index = 0, charIndex = 0;
const typingEl = document.getElementById("typing");

function type() {
  if (!typingEl) return; // ✅ prevent error if #typing doesn't exist
  if (charIndex < typingText[index].length) {
    typingEl.textContent += typingText[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (!typingEl) return;
  if (charIndex > 0) {
    typingEl.textContent = typingText[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % typingText.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingEl) type(); // ✅ run typing only if element exists
});

// ======================== Scroll Animation ========================
const faders = document.querySelectorAll(".fade-in, .fade-up");
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ======================== Mobile Menu Toggle ========================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) { // ✅ prevent addEventListener error
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ======================== Background Canvas Animation ========================
const canvas = document.getElementById("bgCanvas");

if (canvas) { // ✅ ensures animation runs only when canvas exists
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00f6ff";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
}

// ======================== Project Card Tilt Effect ========================
const cards = document.querySelectorAll(".project-card");

if (cards.length) { // ✅ only run if project cards exist
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (x - centerX) / -20;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}
