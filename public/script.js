// Particle animation
function createParticles() {
    const container = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 3 + 2}px;
            height: ${Math.random() * 3 + 2}px;
            animation-duration: ${Math.random() * 10 + 5}s;
        `;
        container.appendChild(particle);
    }
}

// Card hover effects
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 10}deg)
            rotateY(${-(x - rect.width/2) / 10}deg)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .game-card').forEach(el => observer.observe(el));

    // Sparkle effect
    document.querySelector('.hero-title').addEventListener('mousemove', (e) => {
        const sparkle = document.querySelector('.sparkle');
        const rect = e.target.getBoundingClientRect();
        sparkle.style.left = `${e.clientX - rect.left}px`;
        sparkle.style.top = `${e.clientY - rect.top}px`;
    });
});

// Show Importance Pop-up
function showImportance() {
    const popup = document.getElementById('importancePopup');
    popup.style.display = 'block';
}

// Close Importance Pop-up
function closeImportance() {
    const popup = document.getElementById('importancePopup');
    popup.style.display = 'none';
}

// Close Pop-up on Outside Click
window.addEventListener('click', (e) => {
    const popup = document.getElementById('importancePopup');
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// Game navigation
function loadGame(gameNumber) {
    window.location.href = `game${gameNumber}.html`;
}

// Auth functions
function toggleAuth() {
    const token = localStorage.getItem('cyberToken');
    if (token) {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('cyberToken');
            window.location.reload();
        }
    } else {
        window.location.href = 'auth/login.html';
    }
}

// Check auth status on page load
function checkAuth() {
    const token = localStorage.getItem('cyberToken');
    const authBtn = document.getElementById('authBtn');
    
    if (token) {
        authBtn.textContent = '🚪 Logout';
        // You can also fetch user data here if needed
    } else {
        authBtn.textContent = '🔑 Login';
    }
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    checkAuth(); // Add this line
    
    // Rest of your existing code...
});