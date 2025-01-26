// Collection of scientist quotes
const quotes = [
    {
        text: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
        author: "Albert Einstein"
    },
    {
        text: "In science, the credit goes to the man who convinces the world, not to whom the idea first occurs.",
        author: "Francis Darwin"
    },
    {
        text: "Science is not only compatible with spirituality; it is a profound source of spirituality.",
        author: "Carl Sagan"
    },
    {
        text: "The beauty of a living thing is not the atoms that go into it, but the way those atoms are put together.",
        author: "Richard Feynman"
    },
    {
        text: "The good thing about science is that it's true whether or not you believe in it.",
        author: "Neil deGrasse Tyson"
    },
    {
        text: "Science and everyday life cannot and should not be separated.",
        author: "Rosalind Franklin"
    },
    {
        text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
        author: "Albert Einstein"
    },
    {
        text: "I have not failed. I've just found 10,000 ways that won't work.",
        author: "Thomas A. Edison"
    },
    {
        text: "In nature, nothing is perfect and everything is perfect.",
        author: "Alice Walker"
    },
    {
        text: "Life is not a problem to be solved, but a reality to be experienced.",
        author: "Marie Curie"
    },
    {
        text: "数学是科学的皇后，而数论是数学的皇后。",
        author: "高斯"
    },
    {
        text: "研究需要智力，洞察力和想象力，但最重要的是热情。",
        author: "朱光亚"
    }
];

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update quote on the page
function updateQuote() {
    const quoteElement = document.querySelector('.quote-section');
    if (!quoteElement) return;

    const quote = getRandomQuote();
    quoteElement.innerHTML = `
        <blockquote class="modern-quote scale-hover">
            <p>${quote.text}</p>
            <footer>— ${quote.author}</footer>
        </blockquote>
    `;
}

// Update quote periodically
document.addEventListener('DOMContentLoaded', () => {
    updateQuote();
    // Change quote every 30 seconds
    setInterval(updateQuote, 30000);
});
