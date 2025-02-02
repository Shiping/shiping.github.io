// Simple clock component with smooth animation
function initClock() {
    console.log('Initializing clock...');
    const container = document.querySelector('.clock-container');
    if (!container) return;

    // Create clock elements
    container.innerHTML = `
        <div class="clock">
            <span class="time"></span>
            <span class="date"></span>
            <span class="lunar-date"></span>
        </div>
    `;

    // Wait for solarlunar.js to load
    if (typeof window.solarlunar === 'undefined') {
        console.log('Waiting for solarlunar.js to load...');
        setTimeout(initClock, 100);
        return;
    }

    console.log('SolarLunar loaded:', typeof window.solarlunar);

    // Initialize clock with smooth animation
    function animate() {
        updateClock();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function updateClock() {
    const now = new Date();
    const timeElement = document.querySelector('.clock .time');
    const dateElement = document.querySelector('.clock .date');
    const lunarElement = document.querySelector('.clock .lunar-date');
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString();
    }

    if (lunarElement && typeof window.solarlunar !== 'undefined') {
        try {
            console.log('Calculating lunar date...');
            const lunar = window.solarlunar.solar2lunar(now.getFullYear(), now.getMonth() + 1, now.getDate());
            if (lunar) {
                lunarElement.textContent = `农历 ${lunar.monthCn}${lunar.dayCn}`;
                console.log('Lunar date:', lunarElement.textContent);
            }
        } catch (error) {
            console.error('Error calculating lunar date:', error);
        }
    }
}

// Initialize clock
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initClock();
} else {
    document.addEventListener('DOMContentLoaded', initClock);
}
