import {getCurrentHtmlFullDir, getFileNameWithoutExtension, renderMenuMdCopyButton, renderMenuMdList} from "./util.js";
import {Http_util} from "./http_util.js";



const html_title = document.title;
async function load_md_file(hash) {
    if (!hash || hash === "/") return;
    const path = getCurrentHtmlFullDir();
    if (!hash.startsWith("/")) {
        hash = "/" + hash;
    }
    preview.innerHTML = await Http_util.get(`${path}docs${hash}`);
    renderMenuMdCopyButton();
    const filename = getFileNameWithoutExtension(decodeURIComponent(hash));
    if(filename) {
        document.title = `${html_title}-${filename}`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const {pathname} = window.location;
    // 检查路径名是否带有文件后缀
    const hasExtension = pathname.lastIndexOf('.') > pathname.lastIndexOf('/');
    if (!hasExtension && !pathname.endsWith("/")) {
        window.location.pathname += "/";
    }
    const hash = location.hash.replace("#", "");
    // console.log(decodeURIComponent(hash));
    load_md_file(hash);
});

window.addEventListener('hashchange', () => {
    const hash = location.hash.replace("#", "");
    load_md_file(hash);
});


async function handleLinkClick(event) {
    event.preventDefault();  // 阻止默认的跳转行为
    // 设置 hash，不会刷新页面
    location.hash = event.target.getAttribute('href');
}

window.handleLinkClick = handleLinkClick; // 手动挂载到全局中 由于使用了 type="module" 功能


// 获取 DOM 元素
const preview = document.getElementById('preview');

// 实时渲染函数
async function renderMarkdown() {
    if(window.location.hash && window.location.hash!=='#') {
        return;
    }
    preview.innerHTML = await Http_util.get("docs/home.md");
}

// 在页面加载时绑定事件监听器
document.addEventListener('DOMContentLoaded', async () => {
    // 初始渲染
    await renderMarkdown();
    const menu = document.getElementById('menu');
    menu.innerHTML = await Http_util.get("docs/menu.md");
    // console.log(text)
    renderMenuMdCopyButton();
    renderMenuMdList();
});
