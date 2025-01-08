// 获取导航栏元素
const nav = document.querySelector('nav');
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '&#9776;';
nav.prepend(menuToggle);

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// 监听滚动事件
window.addEventListener('scroll', () => {
    // 当页面滚动超过50px时添加悬浮样式
    if (window.scrollY > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// 点击菜单项时关闭移动菜单
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
    });
});
