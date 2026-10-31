// DOM Elements
const counterDisplay = document.getElementById('counter');
const clickBtn = document.getElementById('click-btn');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let count = 0;

/* -------------------- THEME MANAGEMENT -------------------- */
// Detect system/OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 1. Initial theme setup (Saved in LocalStorage > System Preference)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}

// 2. Listen to system preference changes if user didn't set a preference
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// 3. Manual toggle
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

/* -------------------- COUNTER LOGIC & EFFECTS -------------------- */

// Increment Counter & Trigger Visuals
clickBtn.addEventListener('click', (e) => {
  count++;
  counterDisplay.textContent = count;

  // Pop animation on number
  counterDisplay.classList.remove('pop');
  void counterDisplay.offsetWidth; // Force CSS reflow
  counterDisplay.classList.add('pop');

  // Spawn floating "+1"
  createFloatingText(e.clientX, e.clientY);
});

// Reset Counter
resetBtn.addEventListener('click', () => {
  if (count === 0) return;
  count = 0;
  counterDisplay.textContent = count;

  // Shake animation
  counterDisplay.classList.remove('shake');
  void counterDisplay.offsetWidth; // Force CSS reflow
  counterDisplay.classList.add('shake');
});

// Floating Particle Function
function createFloatingText(x, y) {
  const particle = document.createElement('span');
  particle.classList.add('floating-particle');
  particle.textContent = '+1';

  // Randomize horizontal offset slightly
  const randomX = (Math.random() - 0.5) * 30;
  particle.style.left = `${x + randomX - 10}px`;
  particle.style.top = `${y - 20}px`;

  document.body.appendChild(particle);

  // Remove element after animation finishes
  particle.addEventListener('animationend', () => {
    particle.remove();
  });
}