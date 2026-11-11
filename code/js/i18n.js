/**
 * 首页文案的国际化字符串表。
 * 结构：{ 语言代码: { key: 文案 } }
 * 语言代码与 docs 目录名保持一致（en / zh-CN），方便和文档页共用同一套语言判定逻辑。
 */

export const home_i18n = {
    // 英文（默认）
    en: {
        badge_label: 'release',

        // hero 主标题的品牌名固定，不翻译
        desc: 'A self-hosted file server you can set up in minutes. Manage files, edit code, talk to an AI assistant, and open a remote terminal — all from one place.',

        btn_docs: 'View Docs',
        btn_github: 'GitHub',


        shot_alt: 'FileCat file manager interface',

        section_title: 'Why choose FileCat?',
        section_desc:
            'File management, terminal, tunneling and an AI assistant live in a single interface, so you never have to jump between tools.',

        features: [
            {
                icon: 'folder',
                title: 'File Management',
                desc: 'Browse, upload, download, unzip and edit files, with real-time viewing for very large log files.',
            },
            {
                icon: 'cloud',
                title: 'Mounts',
                desc: 'Mount WebDAV, SFTP, SMB, S3 and Baidu Netdisk, then browse remote storage like a local folder.',
            },
            {
                icon: 'terminal',
                title: 'Remote Terminal',
                desc: 'A permission-controlled remote terminal, supporting RDP desktops and command interception.',
            },
            {
                icon: 'tunnel',
                title: 'Tunneling',
                desc: 'Expose a local service to the public internet quickly, without configuring a reverse proxy.',
            },
            {
                icon: 'ai',
                title: 'AI Assistant',
                desc: 'Connect an LLM and get everyday operations and code changes done in natural language.',
            },
            {
                icon: 'shield',
                title: 'Access Control',
                desc: 'Fine-grained path and operation permissions, so each user only reaches their own directories.',
            },
            {
                icon: 'editor',
                title: 'Multi-format Editor',
                desc: 'Write code and sketch mind maps in the browser, with a Typora-style what-you-see-is-what-you-get Markdown editor.',
            },
            {
                icon: 'monitor',
                title: 'System Insights',
                desc: 'Visualise CPU, memory, Docker,Process,Systemd',
            },
            {
                icon: 'tools',
                title: 'Plenty More Built In',
                desc: 'Tail huge logs instantly, run CI/CD pipelines from .act workflow files, sketch on an Excalidraw whiteboard, and more.',
            },
        ],

        footer_built_by: 'Built by',
    },

    // 简体中文
    'zh-CN': {
        badge_label: 'release',

        desc: '一个帮助你快速搭建文件服务器的开源工具，内置文件管理、在线编辑、AI 助手、远程终端与内网穿透，让服务器操作像本地一样顺手。',

        btn_docs: '查看文档',
        btn_github: 'GitHub',


        shot_alt: 'FileCat 文件管理界面',

        section_title: '为什么选择 FileCat？',
        section_desc:
            '把文件管理、终端、内网穿透和 AI 助手放进同一个界面，不需要在一堆工具之间来回切换，开箱即用。',

        features: [
            {
                icon: 'folder',
                title: '在线文件管理',
                desc: '浏览、上传、下载、解压缩、在线编辑，支持超大日志文件实时查看。',
            },
            {
                icon: 'cloud',
                title: '网盘挂载',
                desc: '挂载 WebDAV、SFTP、SMB、S3 与百度网盘，像本地目录一样访问远端存储。',
            },
            {
                icon: 'terminal',
                title: '远程终端',
                desc: '带权限控制的远程终端，支持 RDP 桌面和终端命令拦截。',
            },
            {
                icon: 'tunnel',
                title: '内网穿透',
                desc: '把本地服务快速暴露到公网，无需额外配置反向代理。',
            },
            {
                icon: 'ai',
                title: 'AI 助手',
                desc: '接入大模型，用自然语言完成运维操作与代码修改。',
            },
            {
                icon: 'shield',
                title: '权限管理',
                desc: '细粒度的路径与操作权限，不同用户可以访问不同的目录。',
            },

            {
                icon: 'editor',
                title: '多格式编辑器',
                desc: '在浏览器里写代码、做思维导图，还有类 Typora 的 Markdown 所见即所得编辑体验。',
            },
            {
                icon: 'monitor',
                title: '系统信息可视化',
                desc: '用图表查看 CPU、内存、Docker、进程、Systemd。',
            },
            {
                icon: 'tools',
                title: '超多实用工具',
                desc: '超大日志秒开查看、用 .act 工作流跑 CI/CD 自动化、Excalidraw 白板绘图，还有更多。',
            },
        ],

        footer_built_by: '作者',
    },
};

/**
 * 每种语言对应的 hero 主视觉截图，两张图分别是各自语言的真实界面。
 */
export const home_shot = {
    en: 'code/resource/en-home.png',
    'zh-CN': 'code/resource/zh-home.png',
};

/**
 * 语言切换按钮上显示的文字（显示的是「切换目标」语言）。
 */
export const lang_switch_label = {
    en: '中文',
    'zh-CN': 'EN',
};
