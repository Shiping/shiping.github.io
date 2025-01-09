// 日历时钟组件
class CalendarClock {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.render();
        this.update();
        setInterval(() => this.update(), 1000);
    }

    render() {
        this.container.innerHTML = `
            <div class="calendar-clock">
                <div class="clock">
                    <span class="time"></span>
                    <span class="date"></span>
                </div>
                <div class="calendar">
                    <div class="solar">
                        <span class="year"></span>
                        <span class="month-day"></span>
                    </div>
                    <div class="lunar">
                        <span class="lunar-date"></span>
                    </div>
                </div>
            </div>
        `;
    }

    update() {
        const now = new Date();
        const solarDate = this.getSolarDate(now);
        const lunarDate = this.getLunarDate(now);
        
        // 更新时间
        this.container.querySelector('.time').textContent = 
            this.formatTime(now);
            
        // 更新公历
        this.container.querySelector('.year').textContent = 
            `${solarDate.year}年`;
        this.container.querySelector('.month-day').textContent = 
            `${solarDate.month}月${solarDate.day}日`;
            
        // 更新农历
        this.container.querySelector('.lunar-date').textContent = 
            `${lunarDate.year}年 ${lunarDate.month}${lunarDate.day}`;
    }

    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    getSolarDate(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    getLunarDate(date) {
        // 使用第三方库计算农历日期
        const lunar = solarlunar.solar2lunar(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
        
        return {
            year: lunar.gzYear,
            month: lunar.IMonthCn,
            day: lunar.IDayCn
        };
    }
}

// 初始化所有页面的日历时钟
function initCalendarClock() {
    const containers = document.querySelectorAll('.calendar-clock-container');
    containers.forEach(container => {
        new CalendarClock(container);
    });
}

// 确保DOM加载完成
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCalendarClock();
} else {
    document.addEventListener('DOMContentLoaded', initCalendarClock);
}
