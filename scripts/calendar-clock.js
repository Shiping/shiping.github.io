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
                    <div class="holiday-info"></div>
                    <div class="historical-events">
                        <h4>On This Day in History</h4>
                        <ul></ul>
                    </div>
                </div>
            </div>
        `;
    }

    async update() {
        const now = new Date();
        const solarDate = this.getSolarDate(now);
        const lunarDate = this.getLunarDate(now);
        
        // 更新时间
        this.container.querySelector('.time').textContent = 
            this.formatTime(now);
            
        // 更新公历
        this.container.querySelector('.year').textContent = 
            `${solarDate.year}`;
        this.container.querySelector('.month-day').textContent = 
            `${solarDate.month}/${solarDate.day}`;
            
        // Update lunar calendar
        this.container.querySelector('.lunar-date').textContent = 
            `${lunarDate.year} ${lunarDate.month} ${lunarDate.day}`;

        // 更新节假日信息
        await this.updateHolidayInfo(solarDate);
        
        // 更新历史事件
        await this.updateHistoricalEvents(solarDate);
    }

    async updateHolidayInfo(date) {
        try {
            const holiday = await this.fetchHolidayInfo(date);
            const holidayElement = this.container.querySelector('.holiday-info');
            if (holiday) {
                holidayElement.textContent = holiday;
                holidayElement.style.display = 'block';
            } else {
                holidayElement.style.display = 'none';
            }
        } catch (error) {
            console.error('Failed to fetch holiday info:', error);
        }
    }

    async updateHistoricalEvents(date) {
        try {
            const events = await this.fetchHistoricalEvents(date);
            const eventsList = this.container.querySelector('.historical-events ul');
            eventsList.innerHTML = events
                .map((event, i) => `<li style="--i: ${i}">${event.year}: ${event.description}</li>`)
                .join('');
        } catch (error) {
            console.error('Failed to fetch historical events:', error);
        }
    }

    async fetchHolidayInfo(date) {
        const month = date.month.toString().padStart(2, '0');
        const day = date.day.toString().padStart(2, '0');
        const url = `https://timor.tech/api/holiday/info/${date.year}-${month}-${day}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.type && data.type.type === 1) {
            return data.type.name;
        }
        return null;
    }

    async fetchHistoricalEvents(date) {
        const month = date.month.toString().padStart(2, '0');
        const day = date.day.toString().padStart(2, '0');
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Combine events from different categories
        const events = [
            ...(data.selected || []),
            ...(data.births || []),
            ...(data.deaths || []),
            ...(data.events || [])
        ].map(event => ({
            year: event.year,
            description: event.text
        }));
        
        // Return only the first 5 events to avoid overwhelming the UI
        return events.slice(0, 5);
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
