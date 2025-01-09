// Simple clock component
function initClock() {
    const container = document.querySelector('.clock-container');
    if (!container) return;

    // Create clock elements
    container.innerHTML = `
        <div class="clock">
            <span class="time"></span>
            <span class="date"></span>
        </div>
    `;

    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const timeElement = document.querySelector('.clock .time');
    const dateElement = document.querySelector('.clock .date');
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString();
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initClock();
} else {
    document.addEventListener('DOMContentLoaded', initClock);
}
