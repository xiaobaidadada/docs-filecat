

export function getCurrentHtmlFullDir() {
    const { origin, pathname } = window.location;
    const dir = pathname.endsWith('/')
        ? pathname
        : pathname.substring(0, pathname.lastIndexOf('/') + 1);
    return origin + dir;
}

// 重新渲染折叠
export function renderMenuMdList() {

    const menu = document.getElementById('menu');

    // 添加折叠功能
    const lis = menu.querySelectorAll('li');

    lis.forEach(li => {
        const subList = li.querySelector('ul, ol');
        const firstP = li.querySelector('p'); // 获取第一个 p 标签
        const textNode = li.firstChild; // 获取第一个子节点（文本节点 "11"）
        // console.log(firstP?.textContent);
        // console.log(textNode.nodeType,textNode.textContent);
        // if(textNode.textContent.includes("11"))debugger
        if (subList && (firstP || (textNode && textNode.nodeType === Node.TEXT_NODE))) {
            li.classList.add('collapsible');
            subList.style.display = 'none'; // 初始隐藏

            // 只在点击第一个 p 标签时触发折叠
            if(firstP) {
                firstP.addEventListener('click', (e) => {
                    // 防止点击事件冒泡到父级 li，导致子列表展开
                    e.stopPropagation();

                    // 切换折叠状态
                    const expanded = li.classList.toggle('expanded');
                    subList.style.display = expanded ? 'block' : 'none';
                });
            } else if(textNode) {
                const p = document.createElement("p");
                p.appendChild(textNode);
                li.insertBefore(p, li.firstChild);
                // li.appendChild(p);
                p.addEventListener('click', (e) => {
                    // 防止点击事件冒泡到父级 li，导致子列表展开
                    e.stopPropagation();

                    // 切换折叠状态
                    const expanded = li.classList.toggle('expanded');
                    subList.style.display = expanded ? 'block' : 'none';
                });
            }

        }
    });
}


function copyToClipboard(text) {
    // 创建一个不可见的textarea元素
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // 让textarea不可见
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    // 把textarea添加到DOM中
    document.body.appendChild(textArea);
    // 选中textarea中的文本
    textArea.select();
    textArea.setSelectionRange(0, 99999); // 对移动设备的支持
    document.execCommand('copy');
    // 移除textarea元素
    document.body.removeChild(textArea);
}

// 给所有代码添加复制按钮
export function renderMenuMdCopyButton() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const code = this.getAttribute('data-code');
            this.style.backgroundColor = "rgb(230, 230, 230)";
            var style = this.style;
            setTimeout(function() {
                style.backgroundColor = "#2196f3";
            }, 200);
            copyToClipboard(code);
        });
    });
}

// 获取url 资源后缀
export function getFileNameWithoutExtension(url) {
    try {
        const parts = url.split('/');
        if(!parts.length)return '';
        const end = parts[parts.length - 1];
        if(end.includes('.')) {
            return end.split('.')[0];
        } else {
            return ''
        }
    } catch (e) {
        return ''; // 非法 URL 情况
    }
}
