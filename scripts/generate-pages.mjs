import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(projectRoot, "index.html");
const source = fs.readFileSync(sourcePath, "utf8");
const checkOnly = process.argv.includes("--check");

const pages = [
  {
    page: "atlas",
    file: "atlas.html",
    title: "全天星图 · 天象志",
    description: "浏览 88 个现代星座、5044 颗恒星、星座边界与深空目标的中文互动全天星图。",
    url: "https://spectator7.github.io/stellar-atlas/atlas.html",
    scripts: [
      "assets/vendor/d3-7.9.0.min.js",
      "assets/vendor/astronomy-engine-2.1.19.min.js",
      "data/sky-atlas.js",
      "sky-map.js",
    ],
  },
  {
    page: "observe",
    file: "observe.html",
    title: "今晚星空 · 天象志",
    description: "根据地点、日期、器材、月光、天气与城市光污染，生成今晚可见星座、行星、天象事件和个性化观测清单。",
    url: "https://spectator7.github.io/stellar-atlas/observe.html",
    scripts: [
      "assets/vendor/astronomy-engine-2.1.19.min.js",
      "data/sky-atlas.js",
    ],
  },
  {
    page: "stories",
    file: "stories.html",
    title: "星空故事专题 · 天象志",
    description: "阅读中国星官、古代天文制度、希腊神话与其他文明的可查证星空文化专题，沿时间线探索人类如何理解同一片星空。",
    url: "https://spectator7.github.io/stellar-atlas/stories.html",
    scripts: ["assets/vendor/d3-7.9.0.min.js"],
  },
];

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*/?>)`, "i");
  return html.replace(pattern, `$1${value}$2`);
}

function renderPage(config) {
  const pageScripts = config.scripts
    .map((sourcePath) => `    <script src="${sourcePath}" defer></script>`)
    .join("\n");
  let html = source
    .replace("    <!-- PAGE_SCRIPTS -->", pageScripts)
    .replace('<body data-page="home">', `<body data-page="${config.page}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${config.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]+"\s*\/>/i,
      `<link rel="canonical" href="${config.url}" />`,
    );
  html = replaceMeta(html, "name", "description", config.description);
  html = replaceMeta(html, "property", "og:title", config.title);
  html = replaceMeta(html, "property", "og:description", config.description);
  html = replaceMeta(html, "property", "og:url", config.url);
  html = replaceMeta(html, "name", "twitter:title", config.title);
  html = replaceMeta(html, "name", "twitter:description", config.description);
  return html;
}

let failed = false;
for (const config of pages) {
  const outputPath = path.join(projectRoot, config.file);
  const expected = renderPage(config);
  if (checkOnly) {
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
    if (current !== expected) {
      console.error(`${config.file} is not synchronized with index.html`);
      failed = true;
    }
  } else {
    fs.writeFileSync(outputPath, expected);
    console.log(config.file);
  }
}

if (failed) process.exitCode = 1;
