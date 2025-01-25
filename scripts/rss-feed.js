// RSS feed configuration
const CORS_PROXIES = [
    "https://cors-anywhere.herokuapp.com/",
    "https://api.allorigins.win/raw?url="
];

const RSS_FEEDS = [
    {
        name: "Nature Latest Research", 
        url: "https://www.nature.com/nature.rss",
        maxItems: 5
    },
    {
        name: "Science Magazine",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
        maxItems: 5
    }
];

// Function to try different CORS proxies
async function tryFetchWithProxies(url) {
    for (const proxy of CORS_PROXIES) {
        try {
            const response = await fetch(proxy + encodeURIComponent(url));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            return text;
        } catch (error) {
            console.warn(`Failed to fetch with proxy ${proxy}:`, error);
            continue;
        }
    }
    throw new Error('All CORS proxies failed');
}

// Function to parse RSS feed
async function fetchRSSFeed(feed) {
    try {
        const text = await tryFetchWithProxies(feed.url);
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        
        if (xml.querySelector("parsererror")) {
            throw new Error("Invalid RSS feed format");
        }
        
        const items = xml.querySelectorAll("item");
        if (!items.length) {
            throw new Error("No items found in feed");
        }
        
        const feedItems = [];
        for (let i = 0; i < Math.min(items.length, feed.maxItems); i++) {
            const item = items[i];
            const description = item.querySelector("description")?.textContent || "";
            
            feedItems.push({
                title: item.querySelector("title")?.textContent?.trim() || "No title",
                link: item.querySelector("link")?.textContent?.trim() || "#",
                description: description.length > 200 ? description.substring(0, 200) + "..." : description,
                date: item.querySelector("pubDate")?.textContent || new Date().toISOString()
            });
        }
        return feedItems;
    } catch (error) {
        console.error(`Error fetching RSS feed ${feed.name}:`, error);
        throw new Error(`Failed to fetch ${feed.name}: ${error.message}`);
    }
}

// Function to display RSS feed items
function displayRSSItems(items, error = null) {
    const rssContent = document.getElementById("rss-content");
    if (!rssContent) return;

    if (error) {
        rssContent.innerHTML = `<div class="rss-error">
            <p>Failed to load news: ${error}</p>
            <button onclick="loadAllFeeds()">Try Again</button>
        </div>`;
        return;
    }

    if (!items.length) {
        rssContent.innerHTML = `<div class="rss-item">
            <p>No news items available.</p>
            <button onclick="loadAllFeeds()">Refresh</button>
        </div>`;
        return;
    }

    const itemsHtml = items.map(item => `
        <div class="rss-item">
            <p class="rss-journal">${item.feedName}</p>
            <h3 class="rss-title"><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p class="rss-date">${new Date(item.date).toLocaleDateString()}</p>
            <p class="rss-summary">${item.description}</p>
            <a href="${item.link}" class="rss-link" target="_blank">Read more →</a>
        </div>
    `).join("");

    rssContent.innerHTML = itemsHtml;
}

// Function to load all RSS feeds
async function loadAllFeeds() {
    const rssContent = document.getElementById("rss-content");
    if (!rssContent) return;

    // Show loading state
    rssContent.innerHTML = '<div class="rss-loading">Loading news...</div>';

    try {
        const allItems = [];
        for (const feed of RSS_FEEDS) {
            const items = await fetchRSSFeed(feed);
            // Add feed name to each item
            items.forEach(item => item.feedName = feed.name);
            allItems.push(...items);
        }
        
        if (allItems.length === 0) {
            displayRSSItems([], "No news items found");
            return;
        }

        // Sort by date, most recent first
        allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayRSSItems(allItems);
    } catch (error) {
        console.error("Error loading feeds:", error);
        displayRSSItems([], "Failed to load news feeds. Please try again later.");
    }
}

// Load feeds when the document is ready
document.addEventListener("DOMContentLoaded", loadAllFeeds);
