// Collection of scientist quotes
const quotes = [
    {
        text: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
        translation: "重要的不是停止提问,好奇心自有其存在的理由。",
        author: "Albert Einstein"
    },
    {
        text: "知之为知之,不知为不知,是知也。",
        translation: "To know what you know and know what you don't know - that is true knowledge.",
        author: "孔子 (Confucius)"
    },
    {
        text: "天下大事,必作于细。",
        translation: "Great undertakings must start with small details.",
        author: "老子 (Lao Tzu)"
    },
    {
        text: "科学没有国界,但科学家有祖国。",
        translation: "Science has no homeland, but scientists have their motherland.",
        author: "钱学森 (Qian Xuesen)"
    },
    {
        text: "研究科学就像攀登高峰,只有坚持才能到达顶峰。",
        translation: "Scientific research is like climbing a peak - only persistence leads to the summit.",
        author: "屠呦呦 (Tu Youyou)"
    },
    {
        text: "吾生也有涯,而知也无涯。",
        translation: "Life is finite while knowledge is infinite.",
        author: "庄子 (Zhuangzi)"
    },
    {
        text: "尽信书,则不如无书。",
        translation: "It's better to have no books than to believe all books blindly.",
        author: "孟子 (Mencius)"
    },
    {
        text: "知行合一",
        translation: "Unity of knowledge and action",
        author: "王阳明 (Wang Yangming)"
    },
    {
        text: "为天地立心,为生民立命,为往圣继绝学,为万世开太平。",
        translation: "Establish moral standards for heaven and earth, secure life and fortune for the people, continue lost teachings of past sages, and open eternal peace for all generations.",
        author: "张载 (Zhang Zai)"
    },
    {
        text: "发明千千万,起点是一问。",
        translation: "Thousands of inventions all begin with a single question.",
        author: "陶行知 (Tao Xingzhi)"
    },
    {
        text: "科学技术是第一生产力。",
        translation: "Science and technology constitute the primary productive force.",
        author: "邓小平 (Deng Xiaoping)"
    },
    {
        text: "路漫漫其修远兮,吾将上下而求索。",
        translation: "The road ahead is long and arduous - I will search high and low.",
        author: "屈原 (Qu Yuan)"
    },
    {
        text: "治学如积薪,后来者居上。",
        translation: "Scholarship is like stacking firewood - later comers rise above.",
        author: "司马迁 (Sima Qian)"
    },
    {
        text: "博学之,审问之,慎思之,明辨之,笃行之。",
        translation: "Extensive study, detailed inquiry, careful thinking, clear discrimination, and earnest practice.",
        author: "朱熹 (Zhu Xi)"
    },
    {
        text: "天地四方曰宇,往古来今曰宙。",
        translation: "Space encompasses all directions, time spans past and present.",
        author: "张衡 (Zhang Heng)"
    },
    {
        text: "世界潮流,浩浩荡荡,顺之则昌,逆之则亡。",
        translation: "The world trend is mighty and unstoppable - those who follow prosper, those who resist perish.",
        author: "孙中山 (Sun Yat-sen)"
    },
    {
        text: "科学和艺术是一枚硬币的两面。",
        translation: "Science and art are two sides of the same coin.",
        author: "李政道 (Tsung-Dao Lee)"
    },
    {
        text: "科学研究的最大特点在于探索未知。",
        translation: "The essence of scientific research lies in exploring the unknown.",
        author: "华罗庚 (Hua Luogeng)"
    },
    {
        text: "Innovation is the soul of a nation's progress.",
        translation: "创新是一个民族进步的灵魂",
        author: "江泽民 (Jiang Zemin)"
    },
    {
        text: "科学尊重事实,不能胡乱编造理由来附会一部学说。",
        translation: "Science respects facts - we shouldn't fabricate reasons to force-fit theories.",
        author: "李四光 (Li Siguang)"
    },
    {
        text: "真理的大海,让未发现的一切事物躺卧在我的眼前,任我去探寻。",
        translation: "The ocean of truth lay all undiscovered before me.",
        author: "艾萨克·牛顿 (Isaac Newton)"
    },
    {
        text: "不登高山,不知天之高也;不临深溪,不知地之厚也。",
        translation: "Without climbing mountains, one cannot know the height of heaven; without approaching deep streams, one cannot know the thickness of earth.",
        author: "荀子 (Xunzi)"
    },
    {
        text: "操千曲而后晓声,观千剑而后识器。",
        translation: "Practice a thousand melodies to understand music, examine a thousand swords to recognize weapons.",
        author: "刘勰 (Liu Xie)"
    },
    {
        text: "业精于勤,荒于嬉;行成于思,毁于随。",
        translation: "Excellence comes from diligence, decline from playfulness; success comes from contemplation, failure from carelessness.",
        author: "韩愈 (Han Yu)"
    },
    {
        text: "纸上得来终觉浅,绝知此事要躬行。",
        translation: "Knowledge from books remains superficial; true understanding requires personal practice.",
        author: "陆游 (Lu You)"
    },
    {
        text: "海纳百川,有容乃大;壁立千仞,无欲则刚。",
        translation: "The sea's greatness lies in embracing all rivers; the cliff's strength comes from desireless firmness.",
        author: "林则徐 (Lin Zexu)"
    },
    {
        text: "人生在勤,不索何获。",
        translation: "Life's value lies in diligence - without seeking, nothing is gained.",
        author: "张衡 (Zhang Heng)"
    },
    {
        text: "非淡泊无以明志,非宁静无以致远。",
        translation: "Without simplicity, no clarity of purpose; without tranquility, no far-reaching achievement.",
        author: "诸葛亮 (Zhuge Liang)"
    },
    {
        text: "天行健,君子以自强不息。",
        translation: "As heaven maintains vigor through movement, a gentleman should constantly strive for self-improvement.",
        author: "周易 (Book of Changes)"
    },
    {
        text: "科学的根本精神,全在养成观察力。",
        translation: "The fundamental spirit of science lies in cultivating observation.",
        author: "梁启超 (Liang Qichao)"
    },
    {
        text: "科学需要幻想,发明贵在创新。",
        translation: "Science requires imagination, invention values innovation.",
        author: "托马斯·爱迪生 (Thomas Edison)"
    },
    {
        text: "宇宙中最不可理解的事,是宇宙是可以理解的。",
        translation: "The most incomprehensible thing about the universe is that it is comprehensible.",
        author: "阿尔伯特·爱因斯坦 (Albert Einstein)"
    },
    {
        text: "惊奇就是科学的种子。",
        translation: "Wonder is the seed of science.",
        author: "托马斯·爱迪生 (Thomas Edison)"
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
            ${quote.translation ? `<p class="quote-translation">${quote.translation}</p>` : ''}
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
