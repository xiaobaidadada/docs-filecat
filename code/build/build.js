const fs = require("fs");
const path = require("path");
// const {rimraf} = require("rimraf");
const markdownit = require('markdown-it');

let md_render;
async function loadModule() {
    if(md_render) {
        return;
    }
    const u = await import('../js/md_util.mjs');
    md_render = markdownit({
        html: true,         // 允许 HTML 标签
        // breaks: true,       // 自动换行
        // linkify: true,      // 自动转换链接
        // highlight: function (str, lang) {
        //     // 代码块高亮（需额外引入 highlight.js）
        //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
        // }
    });
    md_render.use(u.markdownItCopyButton) // 复制插件
    md_render.use(u.linkClickPlugin);
}

async function fileExists(filePath) {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

const root = path.join(__dirname,"..","..","docs");

const filePath = path.join(__dirname, 'build.json');

let file_data_json = {
    files:[]
};
const files_Map = new Map();
let m_file_count = 0;
let del_file_count = 0;

async function handle(target_path) {
    let stats = await fs.promises.stat(target_path);
    const html_path = path.join(path.dirname(target_path), 'dist',`${path.basename(target_path,path.extname(target_path))}.html`);
    if(stats.isFile()){
        if(!target_path.endsWith(".md")) return;
        let file_detail = files_Map.get(target_path);
        if(file_detail){
            if(file_detail.mtime === stats.mtime.getTime() && await fileExists(html_path)){
                // 修改时间没有变 不需要修改
                return;
            }
        } else {
            file_detail = { };
            files_Map.set(target_path,file_detail);
        }
        var data = await fs.promises.readFile(target_path);

        await fs.promises.writeFile(html_path, md_render.render(data.toString()));
        // 更新时间
        stats = await fs.promises.stat(target_path);
        file_detail.mtime = stats.mtime.getTime();
        m_file_count++;
        return;
    }
    // 是目录
    // 删除目录下的构建目录
    // await rimraf(path.join(target_path,"dist"));
    const dist_path = path.join(target_path,"dist");
    await fs.promises.mkdir(dist_path, { recursive: true });
    // 遍历目录下的文件
    const files = await fs.promises.readdir(target_path);
    const promises = [];
    const name_set = new Set();
    for (const filename of files) {
        if(filename === "dist") continue;
        name_set.add(filename.replace(/\.md$/,""));
        promises.push(handle(path.join(target_path, filename)));
        // handle(path.join(target_path, filename)); // 不需要按顺序
    }
    await Promise.all(promises);
    for(const filename of await fs.promises.readdir(dist_path) ){
        if(!name_set.has(filename.replace(/\.html$/,""))) {
            await fs.promises.unlink(path.join(dist_path,filename));
            del_file_count++;
        }
    }
}


async function ensureBuildJson() {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        const content = await fs.promises.readFile(filePath, 'utf-8');
        file_data_json = JSON.parse(content);
    } catch (err) {
        // 文件不存在或读取失败时创建一个空 JSON 文件
        await fs.promises.writeFile(filePath, JSON.stringify(file_data_json, null, 2));
    }
    if(!file_data_json['files']) {
        file_data_json['files'] = [];
    }
    for (const file_detail of file_data_json['files']) {
        files_Map.set(path.join(root,file_detail.path),file_detail);
    }
}

async function run() {
    await ensureBuildJson();
    await loadModule();
    await handle(root);
    file_data_json['files'] = [];
    for (const [key,value] of files_Map) {
        file_data_json['files'].push({
            path:path.relative(root,key),
            mtime:value.mtime,
        })
    }
    await fs.promises.writeFile(filePath, JSON.stringify(file_data_json, null, 2));
    console.log(`共修改: ${m_file_count} 个文件`)
    console.log(`共删除多余html文件: ${del_file_count} 个`)
}
run() ;



