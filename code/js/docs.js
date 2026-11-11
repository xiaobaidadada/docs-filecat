import {getCurrentHtmlFullDir, getFileNameWithoutExtension, renderMenuMdCopyButton, renderMenuMdList} from "./util.js";
import {Http_util} from "./http_util.js";
import {home_i18n, home_shot, lang_switch_label} from "./i18n.js";

export const default_langue = 'en'; // 默认语言（首页与兜底都使用）
let now_langue = '';

/**
 * 首页功能网格用到的 svg 图标，按 i18n 数据里的 icon 字段取用。
 */
const feature_icons = {
    folder: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h5l2 2.5h8A1.5 1.5 0 0 1 21 10v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/></svg>`,
    code: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>`,
    tunnel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M5 8a4 4 0 0 0 0 8"/><path d="M19 8a4 4 0 0 1 0 8"/></svg>`,
    ai: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 10h6M9 14h4"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v6c0 4.4 3.2 7.9 7.5 9 4.3-1.1 7.5-4.6 7.5-9V6z"/><path d="m9 12 2 2 4-4"/></svg>`,
};

const html_title = document.title;
async function load_md_file(hash) {
    update_page_mode(hash);
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
        // 同步到顶栏，让当前文档名始终可见
        const header_title = document.getElementById('header-title');
        if (header_title) header_title.textContent = filename;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const {pathname} = window.location;
    // 检查路径名是否带有文件后缀
    const hasExtension = pathname.lastIndexOf('.') > pathname.lastIndexOf('/');
    if (!hasExtension && !pathname.endsWith("/")) {
        window.location.pathname += "/";
    }

    // 顶栏语言切换
    const lang_switch = document.getElementById('lang-switch');
    if (lang_switch) lang_switch.addEventListener('click', switch_langue);

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

/**
 * 根据当前路由切换「官网首页」和「文档页」两种布局。
 * 无 hash（或 hash 只是 "/"）时视为首页，隐藏文档侧栏、显示首页内容。
 */
function update_page_mode(hash) {
    const is_home = !hash || hash === "/" || !hash.includes(".");
    document.body.classList.toggle("page-home", is_home);

    // 首页时顶栏不显示当前文档名
    const header_title = document.getElementById('header-title');
    if (header_title && is_home) header_title.textContent = "";
}

// 渲染home主页
async function renderHome() {
    if(window.location.hash && window.location.hash.includes(".")) {
        return;
    }

    const lang = get_home_langue();
    const text = home_i18n[lang] || home_i18n[default_lanue];

    // 按语言填充所有带 data-i18n 的普通文本节点
    document.querySelectorAll('#home [data-i18n]').forEach(el => {
        const value = text[el.dataset.i18n];
        if (value !== undefined) el.textContent = value;
    });

    // hero 主视觉截图：中英文各一张
    const shot = document.getElementById('home-shot');
    if (shot) {
        shot.src = home_shot[lang] || home_shot[default_lanue];
        shot.alt = text.shot_alt;
    }

    // 版本号从 npm registry 实时获取，失败时保留 html 中的 latest 占位
    load_npm_version();

    // 「查看文档」按钮跳到当前语言的安装文档
    const docs_btn = document.querySelector('.home-btn-primary');
    if (docs_btn) docs_btn.href = `#/${lang}/install.md`;

    // 功能网格按数据渲染
    const grid = document.getElementById('home-grid');
    if (grid) {
        grid.innerHTML = text.features.map(item => `
            <div class="home-feature">
                <div class="home-feature-icon">${feature_icons[item.icon] || ''}</div>
                <h3 class="home-feature-title">${item.title}</h3>
                <p class="home-feature-desc">${item.desc}</p>
            </div>
        `).join('');
    }

    const year_el = document.getElementById('home-year');
    if (year_el) year_el.textContent = String(new Date().getFullYear());

    update_lang_switch(lang);
}

/**
 * 从 npm registry 获取 filecat 的最新版本号并写入徽标。
 * 失败时保留 html 里的 latest 占位，不影响页面其它部分。
 */
async function load_npm_version() {
    const el = document.getElementById('badge-version');
    if (!el) return;
    try {
        const res = await fetch('https://registry.npmjs.org/filecat/latest', {cache: 'no-store'});
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.version) el.textContent = `v${data.version}`;
    } catch (e) {
        // 网络不可达时静默失败，保持默认文案
    }
}

/**
 * 首页当前应使用的语言。
 * 文档页的语言由路由决定，首页没有路由信息，因此优先取路由里已有的语言，
 * 其次看浏览器语言，都不认识时回落到默认语言。
 */
function get_home_langue() {
    const hash_lang = (window.location.hash || '').split('/')[1];
    if (hash_lang && home_i18n[hash_lang]) return hash_lang;

    const nav_lang = (navigator.language || '').toLowerCase();
    if (nav_lang.startsWith('zh')) return 'zh-CN';
    return 'en';
}

/**
 * 刷新语言切换按钮上显示的文字（显示的是切换目标语言）。
 */
function update_lang_switch(lang) {
    const text_el = document.getElementById('lang-switch-text');
    if (text_el) text_el.textContent = lang_switch_label[lang] || lang_switch_label[default_lanue];
}

/**
 * 语言切换：首页切换后重新渲染首页；
 * 文档页则跳到对应语言的同名文档，保持同一篇文章。
 */
function switch_langue(event) {
    if (event) event.preventDefault();
    const current = get_home_langue();
    const target = current === 'en' ? 'zh-CN' : 'en';

    const hash = window.location.hash || '';
    if (hash.includes('.')) {
        // 文档页：#/en/xxx.md → #/zh-CN/xxx.md
        const parts = hash.replace(/^#\//, '').split('/');
        parts[0] = target;
        window.location.hash = '/' + parts.join('/');
        return;
    }

    // 首页：写进 hash 让语言判定生效，同时保持首页形态
    window.location.replace(`#/${target}/`);
}

async function renderMenu() {
    const menu = document.getElementById('menu');
    // 首页不显示侧栏菜单，避免多余请求
    if (document.body.classList.contains('page-home')) return;
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
