import {getCurrentHtmlFullDir, getFileNameWithoutExtension, renderMenuMdCopyButton, renderMenuMdList} from "./util.js";
import {Http_util} from "./http_util.js";

export const default_langue = 'zh-CN'; // 默认语言
let now_langue = '';

const html_title = document.title;
async function load_md_file(hash) {
    renderMenu();
    if (!hash || hash === "/" || !hash.includes('.')) {
        renderHome(); // 渲染主页
        return;
    }
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

function get_lanuge() {
    const hash = location.hash.replace("#", "");
    if(!hash || hash === "/" || hash[0] !=='/') return default_langue;
    let lan = '';
    let have_do = false;
    for (let i = 1; i < hash.length; i++) {
        if(hash[i] === '/')return lan;
        lan += hash[i];
        if(hash[i] === '.') have_do = true;
    }
    if(!have_do) {
        return lan;
    }
    return default_langue;
}

async function handleLinkClick(event) {
    event.preventDefault();  // 阻止默认的跳转行为
    // 设置 hash，不会刷新页面
    location.hash = event.target.getAttribute('href');
}

window.handleLinkClick = handleLinkClick; // 手动挂载到全局中 由于使用了 type="module" 功能


// 获取 DOM 元素
const preview = document.getElementById('preview');

// 渲染home主页
async function renderHome() {
    if(window.location.hash && window.location.hash.includes(".")) {
        return;
    }
    const lan = get_lanuge();
    let home_md = `docs/${lan}/home.md`;
    preview.innerHTML = await Http_util.get(home_md);
}

async function renderMenu() {
    const menu = document.getElementById('menu');
    const lan = get_lanuge();
    if(now_langue === lan) return;
    now_langue = lan;
    let menu_md = `docs/${lan}/menu.md`;
    menu.innerHTML = await Http_util.get(menu_md);
    renderMenuMdList();
}

// 在页面加载时绑定事件监听器
// document.addEventListener('DOMContentLoaded', async () => {
//     // 初始渲染
//     await renderHome();
//     await renderMenu();
//     renderMenuMdCopyButton();
//     renderMenuMdList();
// });
