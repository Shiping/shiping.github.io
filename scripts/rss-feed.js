// RSS feed configuration
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const RSS_FEEDS = [
    {
        name: "Nature Latest Research", 
        url: CORS_PROXY + "https://www.nature.com/nature.rss",
        maxItems: 5
    },
    {
        name: "Science Magazine",
        url: "https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=science",
        maxItems: 5
    }
];
