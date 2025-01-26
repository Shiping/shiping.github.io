// Enhanced cursor trail with subtle randomization
function createCursorTrail() {
    const baseColors = ['#64B5F6', '#90CAF9', '#BBDEFB'];
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.5) { // Random chance to create trail
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            
            // Randomly vary the color slightly
            const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
            const variation = Math.floor(Math.random() * 20) - 10; // -10 to +10
            const color = modifyColor(baseColor, variation);
            trail.style.backgroundColor = color;
            
            // Random size variation
            const size = 6 + Math.random() * 2; // 6-8px
            trail.style.width = size + 'px';
            trail.style.height = size + 'px';

            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 400 + Math.random() * 200);
        }
    });
}

// Utility function to modify color brightness slightly
function modifyColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Enhanced click effect with varied particles
function createClickEffect(e) {
    const colors = ['#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD'];
    const particleCount = 6 + Math.floor(Math.random() * 4); // 6-9 particles

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        
        // Random size for each particle
        const size = 3 + Math.random() * 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);

        const angle = (i * (360 / particleCount) + Math.random() * 20) * Math.PI / 180;
        const velocity = 7 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = e.pageX;
        let posY = e.pageY;

        const animate = () => {
            posX += vx;
            posY += vy;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
        };

        const animation = setInterval(animate, 16);
        
        setTimeout(() => {
            clearInterval(animation);
            particle.remove();
        }, 400 + Math.random() * 200);
    }
}

// Add subtle background variation
function addBackgroundVariation() {
    setInterval(() => {
        const cards = document.querySelectorAll('.modern-card');
        cards.forEach(card => {
            if (Math.random() > 0.8) { // 20% chance to update each interval
                const currentOpacity = parseFloat(getComputedStyle(card).backgroundColor.split(',')[3]) || 0.03;
                const newOpacity = Math.max(0.01, Math.min(0.05, currentOpacity + (Math.random() * 0.02 - 0.01)));
                card.style.backgroundColor = `rgba(255, 255, 255, ${newOpacity})`;
            }
        });
    }, 3000);
}

// Random hover effect variations
function addRandomHoverEffects() {
    const cards = document.querySelectorAll('.modern-card');
    cards.forEach(card => {
        const randomRotate = (Math.random() - 0.5) * 2;
        const randomScale = 1.01 + Math.random() * 0.02;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize effects
document.addEventListener('DOMContentLoaded', function() {
    createCursorTrail();
    addBackgroundVariation();
    addRandomHoverEffects();
    document.addEventListener('click', createClickEffect);
});
