// Get current date and target New Year's Eve date in IST (Indian Standard Time)
const targetDate = new Date('2025-01-01T00:00:00+05:30'); // 12:00 AM on Jan 1, 2025 IST

// Elements
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const confettiCanvas = document.getElementById('confettiCanvas');
const repeatButton = document.getElementById('repeat-btn');

// Function to update the countdown timer
function updateCountdown() {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    showNewYearCelebration();
  } else {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;
    countdownElement.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;
  }
}

// Show the "Happy New Year 2025" message and trigger confetti
function showNewYearCelebration() {
  countdownElement.classList.add('hidden');
  messageElement.classList.remove('hidden');
  confettiCanvas.classList.remove('hidden');
  startConfetti();
}

// Start confetti animation
function startConfetti() {
  const confetti = [];
  const colors = ['#ff0', '#ff2d2d', '#a4c2fc', '#28a745', '#f39c12'];

  // Create confetti pieces
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      radius: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360
    });
  }

  // Canvas setup
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const ctx = confettiCanvas.getContext('2d');

  // Animation loop
  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (const piece of confetti) {
      ctx.beginPath();
      ctx.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
      ctx.fillStyle = piece.color;
      ctx.fill();

      // Update positions
      piece.y += piece.speed;
      piece.x += Math.sin(piece.direction) * 2;
      piece.direction += Math.random() * 0.1;

      // Reset confetti if it falls out of screen
      if (piece.y > confettiCanvas.height) {
        piece.y = -10;
        piece.x = Math.random() * confettiCanvas.width;
      }
    }

    requestAnimationFrame(animateConfetti);
  }

  animateConfetti();
}

// Repeat the confetti and message when the button is clicked
repeatButton.addEventListener('click', function() {
  confettiCanvas.classList.add('hidden');
  messageElement.classList.add('hidden');
  countdownElement.classList.remove('hidden');
  updateCountdown();  // Restart the countdown timer
  setTimeout(showNewYearCelebration, targetDate - new Date());
});

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();
