// Set target date (July 27, 2025)
const targetDate = new Date('2025-07-27T00:00:00').getTime();

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Birthday has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        document.getElementById('waitingMessage').innerHTML = 
            '🎉 <strong>HAPPY BIRTHDAY SAYANG!</strong> 🎉<br>Waktunya membuka kejutanmu! ✨';
        document.getElementById('unlockBtn').classList.add('show');
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();

// Unlock website function
function unlockWebsite() {
    document.getElementById('coverPage').style.display = 'none';
    document.getElementById('mainWebsite').style.display = 'block';
    
    // Auto-scroll to top
    window.scrollTo(0, 0);
    
    // Initialize main website
    initMainWebsite();
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '🌹', '✨'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 800);
}

// Background Music
let isPlaying = false;
const music = document.getElementById('background-music');
const musicIcon = document.getElementById('music-icon');

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.textContent = '🎵';
        isPlaying = false;
    } else {
        music.play().catch(e => console.log('Audio play failed:', e));
        musicIcon.textContent = '🔇';
        isPlaying = true;
    }
}

// Generate stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 4 + 2 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Gallery function
function openGallery(index) {
  const imagePaths = [
    'img/love.jpeg',
    'img/myGF.jpeg',
    'img/myGirl.jpeg',
    'img/myLove.jpeg',
    'img/loveAll.png',
    'img/manis.jpeg',
  ];

  const imgUrl = imagePaths[index - 1];
  const popup = window.open('', '_blank');
  popup.document.write(`<img src="${imgUrl}" style="width:100%">`);
}

// Surprise function
function showSurprise() {
    document.getElementById('surpriseModal').style.display = 'block';
    createConfetti();
}

function closeSurprise() {
    document.getElementById('surpriseModal').style.display = 'none';
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }
}

// Scroll animations
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.timeline-item, .gallery-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize main website
function initMainWebsite() {
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Auto play music (with user interaction)
    document.addEventListener('click', function() {
        if (!isPlaying) {
            music.play().catch(e => console.log('Audio play failed:', e));
            musicIcon.textContent = '🎵';
            isPlaying = true;
        }
    }, { once: true });
}

// Initialize cover page
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createFloatingHearts();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('surpriseModal');
        if (e.target === modal) {
            closeSurprise();
        }
    });

    // For testing purposes - uncomment next line to skip countdown
    // unlockWebsite();
});

// Smooth scrolling for anchor links (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});