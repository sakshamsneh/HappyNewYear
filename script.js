// Function to calculate time until 12 AM IST
function calculateTimeLeft() {
    const now = new Date();
    const currentTime = now.getTime();

    // Convert to IST (UTC +5:30)
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(currentTime + IST_OFFSET);
    
    // Set the target date for 12 AM on January 1, 2025 IST
    const targetDate = new Date('2025-01-01T00:00:00+05:30').getTime();
    
    const timeLeft = targetDate - new Date();
    
    return timeLeft;
}

// Function to display countdown timer
function updateCountdown() {
    const timeLeft = calculateTimeLeft();
console.log(timeLeft);
    if (timeLeft <= 0) {
        // If the countdown reaches 0, show the New Year message and confetti
        showConfetti();
        clearInterval(countdownInterval);  // Stop the countdown
        return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = `${hours}h ${minutes}m ${seconds}s`;
}

// Function to show confetti and New Year message
function showConfetti() {
    document.getElementById('countdown-timer').style.display = 'none';
    const confetti = document.getElementById('confetti');
    confetti.style.display = 'block';
    confetti.classList.remove('hidden');
    
    // Call the confetti animation
    startConfetti();
}

// Function to create confetti effect
function startConfetti() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffcc00', '#ff69b4'];
    const confettiCount = 150;

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function createConfettiPiece() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            size: randomIntFromRange(5, 15),
            speedX: randomIntFromRange(-3, 3),
            speedY: randomIntFromRange(2, 6),
            color: colors[randomIntFromRange(0, colors.length - 1)],
            rotation: randomIntFromRange(0, 360),
            rotationSpeed: randomIntFromRange(-1, 1)
        };
    }

    let confettiPieces = [];
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(createConfettiPiece());
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(piece => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();

            piece.x += piece.speedX;
            piece.y += piece.speedY;
            piece.rotation += piece.rotationSpeed;

            if (piece.y > canvas.height) {
                piece.y = -10;
                piece.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

// Set an interval to update the timer every second
const countdownInterval = setInterval(updateCountdown, 1000);
