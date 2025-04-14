
export const markdownItCopyButton = (md) => {
    const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const code = token.content.trim();

        // 添加复制按钮到代码块
        return `
      <div class="code-block-with-copy">
        <button class="copy-btn" data-code="${md.utils.escapeHtml(code)}" >复制</button>
        <pre><code>${md.utils.escapeHtml(code)}</code></pre>
      </div>`;
    };


};

export function linkClickPlugin(md) {
    // 用于拦截 `<a>` 标签的渲染
    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        // 获取链接地址
        const href = token.attrGet('href');
        if(!href.startsWith('http') && !href.startsWith('https')) {
            // 为每个链接添加点击事件，阻止默认跳转行为
            token.attrSet('onclick', `handleLinkClick(event)`);
        }
        // 使用默认渲染
        return defaultRender(tokens, idx, options, env, self);
    };
}


//
// const md2 = window.markdownit({
//     html: true,         // 允许 HTML 标签
//     // breaks: true,       // 自动换行
//     // linkify: true,      // 自动转换链接
//     // highlight: function (str, lang) {
//     //     // 代码块高亮（需额外引入 highlight.js）
//     //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
//     // }
// });
// md2.use(markdownItCopyButton) // 复制插件
// md2.use(linkClickPlugin);
