// Mock RSS feed data
const MOCK_FEEDS = {
    "Nature": [
        {
            title: "A reversibly switchable deep-blue luminescent supramolecular gel",
            link: "https://www.nature.com/articles/s41467-024-44747-9",
            description: "Functional supramolecular gels hold promise in materials science, but achieving reversible switching of their optical properties remains challenging...",
            date: "2024-01-24T08:00:00Z"
        },
        {
            title: "Non-genetic inheritance of acquired fear responses",
            link: "https://www.nature.com/articles/s41586-023-06981-x",
            description: "This study demonstrates that learned fear responses in mice can be transmitted to offspring via non-genetic inheritance mechanisms...",
            date: "2024-01-23T09:30:00Z"
        }
    ],
    "Science": [
        {
            title: "Metagenome-assembled genomes reveal hidden diversity of soil viruses",
            link: "https://www.science.org/doi/10.1126/science.adf7667",
            description: "Comprehensive analysis of soil viral genomes reveals unprecedented microbial diversity and ecological interactions...",
            date: "2024-01-24T10:15:00Z"
        },
        {
            title: "Structural basis of CRISPR RNA-guided DNA targeting",
            link: "https://www.science.org/doi/10.1126/science.adg9425",
            description: "High-resolution structures reveal molecular mechanisms of CRISPR-based DNA targeting...",
            date: "2024-01-23T14:20:00Z"
        }
    ],
    "Cell": [
        {
            title: "Single-cell multimodal analysis reveals mechanisms of tissue regeneration",
            link: "https://www.cell.com/cell/fulltext/S0092-8674(24)00031-5",
            description: "Integration of multiple single-cell technologies uncovers cellular mechanisms driving tissue repair...",
            date: "2024-01-24T09:45:00Z"
        },
        {
            title: "Spatial transcriptomics maps the human developmental brain",
            link: "https://www.cell.com/cell/fulltext/S0092-8674(24)00030-3",
            description: "Comprehensive spatial gene expression atlas of human brain development reveals new insights...",
            date: "2024-01-23T11:20:00Z"
        }
    ],
    "Neuron": [
        {
            title: "Neural signatures of consciousness in human temporal cortex",
            link: "https://www.cell.com/neuron/fulltext/S0896-6273(24)00007-5",
            description: "Study identifies specific patterns of neural activity associated with conscious perception...",
            date: "2024-01-24T07:30:00Z"
        },
        {
            title: "Circuit mechanisms of memory consolidation during sleep",
            link: "https://www.cell.com/neuron/fulltext/S0896-6273(24)00006-3",
            description: "Research reveals how neural circuits coordinate during sleep to strengthen memories...",
            date: "2024-01-23T15:45:00Z"
        }
    ],
    "PNAS": [
        {
            title: "Artificial intelligence predicts protein-ligand binding",
            link: "https://www.pnas.org/doi/full/10.1073/pnas.2317895121",
            description: "Novel deep learning approach improves prediction of drug-protein interactions...",
            date: "2024-01-24T11:00:00Z"
        },
        {
            title: "Climate change impacts on marine ecosystem resilience",
            link: "https://www.pnas.org/doi/full/10.1073/pnas.2316018121",
            description: "Long-term study reveals how marine ecosystems respond to climate stressors...",
            date: "2024-01-23T13:15:00Z"
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
