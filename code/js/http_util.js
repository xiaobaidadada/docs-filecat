import {linkClickPlugin, markdownItCopyButton} from "./md_util.mjs";

let md_render;

export class Http_util {


    static async load_md() {
        const response = await fetch('code/js/markdown-it.min.js');
        const scriptContent = await response.text();
        // 在 jsdom 环境中创建一个 script 标签并执行脚本
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);

        // 初始化 markdown-it
        md_render = window.markdownit({
            html: true,         // 允许 HTML 标签
            // breaks: true,       // 自动换行
            // linkify: true,      // 自动转换链接
            // highlight: function (str, lang) {
            //     // 代码块高亮（需额外引入 highlight.js）
            //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
            // }
        });
        md_render.use(markdownItCopyButton) // 复制插件
        md_render.use(linkClickPlugin);
    }

    /* 直接请求 md 文件并渲染，不再预构建 html 缓存 */
    static async get(url) {
        const res = await fetch(url);
        const data = await res.text();
        if (!res.ok) {
            return data;
        }
        if (!md_render) {
            await this.load_md();
        }
        return md_render.render(data);
    }
}
