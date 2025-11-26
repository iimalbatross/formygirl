let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Initialize slideshow
function initSlideshow() {
    showSlide(currentSlideIndex);
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Show specific slide
function showSlide(index) {
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }

    // Add active class to current dot
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Next slide
function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// Change slide with arrow buttons
function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1);
}

// Create floating hearts animation
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💋'];
    const heartRain = document.querySelector('.heart-rain');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = '20px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = `fall ${15 + Math.random() * 10}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartRain.appendChild(heart);
    }
}

// Add scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.message-container, .proposal-card, .slideshow-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add click effects
function addClickEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot') || 
            e.target.classList.contains('nav-arrow') ||
            e.target.classList.contains('slide-image')) {
            // Create a burst of hearts on click
            createHeartBurst(e.clientX, e.clientY);
        }
    });
}

// Create heart burst effect
function createHeartBurst(x, y) {
    const hearts = ['💕', '💖', '💗', '💝', '❤️'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = `burst 1s ease-out forwards`;
        heart.style.animationDelay = i * 0.1 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Add burst animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes burst {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    createFloatingHearts();
    handleScrollAnimations();
    addClickEffects();
    
    // Add smooth entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add romantic background music trigger (optional - user can add audio file)
function playRomanticMusic() {
    // Uncomment and add your music file if you want
    // const audio = new Audio('romantic-music.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play();
}
