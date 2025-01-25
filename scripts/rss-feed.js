// Mock RSS feed data
const MOCK_FEEDS = {
    "Nature": [
        {
            title: "Novel quantum material shows promise for quantum computing",
            link: "https://www.nature.com/articles/sample1",
            description: "Researchers have discovered a new quantum material that could help make quantum computers more stable and efficient...",
            date: "2025-01-24T08:00:00Z"
        },
        {
            title: "Climate change impacts marine ecosystems faster than predicted",
            link: "https://www.nature.com/articles/sample2",
            description: "New study reveals oceanic changes are occurring at unprecedented rates...",
            date: "2025-01-23T09:30:00Z"
        }
    ],
    "Science": [
        {
            title: "Breakthrough in CRISPR gene editing technology",
            link: "https://www.science.org/news/sample1",
            description: "Scientists develop more precise gene editing tool with fewer off-target effects...",
            date: "2025-01-24T10:15:00Z"
        },
        {
            title: "New findings in brain plasticity research",
            link: "https://www.science.org/news/sample2",
            description: "Study reveals novel mechanisms behind neural adaptation...",
            date: "2025-01-23T14:20:00Z"
        }
    ],
    "Cell": [
        {
            title: "Revolutionary method for single-cell analysis",
            link: "https://www.cell.com/news/sample1",
            description: "New technique enables unprecedented resolution in single-cell studies, revealing cellular heterogeneity...",
            date: "2025-01-24T09:45:00Z"
        },
        {
            title: "Understanding cellular aging mechanisms",
            link: "https://www.cell.com/news/sample2",
            description: "Research uncovers key pathways involved in cellular senescence and rejuvenation...",
            date: "2025-01-23T11:20:00Z"
        }
    ],
    "Neuron": [
        {
            title: "Novel circuit discovered in memory formation",
            link: "https://www.cell.com/neuron/sample1",
            description: "Scientists map previously unknown neural pathway crucial for memory consolidation...",
            date: "2025-01-24T07:30:00Z"
        },
        {
            title: "Brain-machine interface breakthrough",
            link: "https://www.cell.com/neuron/sample2",
            description: "New interface design allows for more precise control and feedback in neural prosthetics...",
            date: "2025-01-23T15:45:00Z"
        }
    ],
    "PNAS": [
        {
            title: "Evolution of social behavior in mammals",
            link: "https://www.pnas.org/content/sample1",
            description: "Study reveals genetic basis for complex social behaviors across mammalian species...",
            date: "2025-01-24T11:00:00Z"
        },
        {
            title: "Climate adaptation in plant species",
            link: "https://www.pnas.org/content/sample2",
            description: "Research identifies key genetic factors enabling rapid plant adaptation to climate change...",
            date: "2025-01-23T13:15:00Z"
        }
    ]
};

// Function to fetch RSS feed (using mock data)
async function fetchRSSFeed(feed) {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockItems = MOCK_FEEDS[feed.name] || [];
        if (!mockItems.length) {
            throw new Error('No items found in feed');
        }
        
        return mockItems.map(item => ({
            title: item.title,
            link: item.link,
            description: item.description,
            date: item.date,
            feedName: feed.name
        }));
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

// Function to load all feeds
async function loadAllFeeds() {
    const rssContent = document.getElementById("rss-content");
    if (!rssContent) return;

    // Show loading state
    rssContent.innerHTML = '<div class="rss-loading">Loading news...</div>';

    try {
        const allItems = [];
        const feedNames = Object.keys(MOCK_FEEDS);
        
        for (const feedName of feedNames) {
            const items = await fetchRSSFeed({ name: feedName });
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
