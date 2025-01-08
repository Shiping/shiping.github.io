// 获取导航栏元素
const nav = document.querySelector('nav');

// 监听滚动事件
window.addEventListener('scroll', () => {
    // 当页面滚动超过50px时添加悬浮样式
    if (window.scrollY > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});
