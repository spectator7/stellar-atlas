import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deployedUrl = "https://spectator7.github.io/stellar-atlas/";
const deployedPath = new URL(deployedUrl).pathname;
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  try {
    return fs.readFileSync(absolutePath, "utf8");
  } catch (error) {
    failures.push(`${relativePath}: cannot be read (${error.message})`);
    return "";
  }
}

function parseAttributes(source) {
  const attributes = {};
  const pattern = /([^\s"'=<>`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(source))) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attributes;
}

function parseTags(html) {
  const tags = [];
  const pattern = /<([a-z][\w:-]*)(\s[^<>]*?)?\s*\/?\s*>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    tags.push({ name: match[1].toLowerCase(), attributes: parseAttributes(match[2] || "") });
  }
  return tags;
}

function metaContent(tags, key, value) {
  return tags.find((tag) => tag.name === "meta" && tag.attributes[key]?.toLowerCase() === value.toLowerCase())
    ?.attributes.content?.trim();
}

function linkHref(tags, relation) {
  return tags.find((tag) => tag.name === "link"
    && tag.attributes.rel?.toLowerCase().split(/\s+/).includes(relation.toLowerCase()))
    ?.attributes.href?.trim();
}

function localPathFromReference(reference, htmlFile) {
  const cleanReference = reference.trim();
  if (!cleanReference || cleanReference.startsWith("#")) return null;
  if (/^(?:data|mailto|tel|javascript):/i.test(cleanReference) || cleanReference.startsWith("//")) return null;

  let parsed;
  try {
    parsed = new URL(cleanReference, new URL(htmlFile.replace(/\\/g, "/"), deployedUrl));
  } catch {
    failures.push(`${htmlFile}: invalid local reference "${cleanReference}"`);
    return null;
  }

  if (parsed.origin !== new URL(deployedUrl).origin) return null;
  if (!parsed.pathname.startsWith(deployedPath)) {
    failures.push(`${htmlFile}: same-origin reference escapes the Pages scope: ${cleanReference}`);
    return null;
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(parsed.pathname.slice(deployedPath.length));
  } catch {
    failures.push(`${htmlFile}: malformed encoded path in ${cleanReference}`);
    return null;
  }

  return relativePath || ".";
}

function validateHtmlFile(relativePath, { seo = false } = {}) {
  const html = read(relativePath);
  if (!html) return;

  const tags = parseTags(html);
  const ids = new Map();
  tags.forEach((tag) => {
    const id = tag.attributes.id;
    if (!id) return;
    ids.set(id, (ids.get(id) || 0) + 1);
  });
  ids.forEach((count, id) => {
    assert(count === 1, `${relativePath}: duplicate id "${id}" appears ${count} times`);
  });

  const referenceAttributes = ["href", "src", "poster"];
  tags.forEach((tag) => {
    referenceAttributes.forEach((attribute) => {
      const reference = tag.attributes[attribute];
      if (!reference) return;
      const localPath = localPathFromReference(reference, relativePath);
      if (localPath === null) return;
      const absolutePath = path.resolve(projectRoot, localPath);
      const withinProject = absolutePath === projectRoot || absolutePath.startsWith(`${projectRoot}${path.sep}`);
      assert(withinProject, `${relativePath}: reference escapes the project: ${reference}`);
      if (withinProject) {
        assert(fs.existsSync(absolutePath), `${relativePath}: missing local reference ${reference}`);
      }
    });

    if (tag.attributes.srcset) {
      tag.attributes.srcset.split(",").forEach((candidate) => {
        const reference = candidate.trim().split(/\s+/)[0];
        const localPath = localPathFromReference(reference, relativePath);
        if (localPath === null) return;
        assert(fs.existsSync(path.resolve(projectRoot, localPath)), `${relativePath}: missing srcset reference ${reference}`);
      });
    }
  });

  if (!seo) return;

  const htmlTag = tags.find((tag) => tag.name === "html");
  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim();
  const canonical = linkHref(tags, "canonical");
  const ogUrl = metaContent(tags, "property", "og:url");
  const ogImage = metaContent(tags, "property", "og:image");
  const twitterImage = metaContent(tags, "name", "twitter:image");

  assert(htmlTag?.attributes.lang === "zh-CN", "index.html: html lang must be zh-CN");
  assert(tags.some((tag) => tag.name === "meta" && "charset" in tag.attributes), "index.html: charset meta is required");
  assert(Boolean(title), "index.html: a non-empty title is required");
  assert(Boolean(metaContent(tags, "name", "viewport")), "index.html: viewport meta is required");
  assert((metaContent(tags, "name", "description") || "").length >= 40, "index.html: description meta must be at least 40 characters");
  assert(Boolean(metaContent(tags, "name", "theme-color")), "index.html: theme-color meta is required");
  assert(/index\s*,?\s*follow/i.test(metaContent(tags, "name", "robots") || ""), "index.html: robots meta must allow index and follow");
  assert(canonical === deployedUrl, `index.html: canonical must be ${deployedUrl}`);
  assert(linkHref(tags, "manifest") === "site.webmanifest", "index.html: manifest link must reference site.webmanifest");

  ["og:title", "og:description", "og:type", "og:url", "og:image"].forEach((property) => {
    assert(Boolean(metaContent(tags, "property", property)), `index.html: ${property} meta is required`);
  });
  assert(ogUrl === deployedUrl, `index.html: og:url must be ${deployedUrl}`);
  assert(/^https:\/\//i.test(ogImage || ""), "index.html: og:image must be an absolute HTTPS URL");

  ["twitter:card", "twitter:title", "twitter:description", "twitter:image"].forEach((name) => {
    assert(Boolean(metaContent(tags, "name", name)), `index.html: ${name} meta is required`);
  });
  assert(["summary", "summary_large_image"].includes(metaContent(tags, "name", "twitter:card")), "index.html: twitter:card must be summary or summary_large_image");
  assert(/^https:\/\//i.test(twitterImage || ""), "index.html: twitter:image must be an absolute HTTPS URL");

  [ogImage, twitterImage].filter(Boolean).forEach((imageUrl) => {
    const localPath = localPathFromReference(imageUrl, relativePath);
    if (localPath) {
      assert(fs.existsSync(path.resolve(projectRoot, localPath)), `index.html: social image is missing: ${imageUrl}`);
    }
  });
}

function validateManifest() {
  let manifest;
  try {
    manifest = JSON.parse(read("site.webmanifest"));
  } catch (error) {
    failures.push(`site.webmanifest: invalid JSON (${error.message})`);
    return;
  }

  ["name", "short_name", "description", "id", "start_url", "scope", "lang", "dir", "display", "background_color", "theme_color"].forEach((key) => {
    assert(typeof manifest[key] === "string" && manifest[key].trim(), `site.webmanifest: ${key} is required`);
  });
  assert(manifest.lang === "zh-CN", "site.webmanifest: lang must be zh-CN");
  assert(["ltr", "rtl", "auto"].includes(manifest.dir), "site.webmanifest: dir is invalid");
  assert(Array.isArray(manifest.categories) && manifest.categories.length >= 2, "site.webmanifest: at least two categories are required");
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 1, "site.webmanifest: at least one icon is required");
  assert(Array.isArray(manifest.shortcuts) && manifest.shortcuts.length >= 3, "site.webmanifest: at least three shortcuts are required");

  const scopeUrl = new URL(manifest.scope || "./", deployedUrl);
  ["id", "start_url"].forEach((key) => {
    const resolved = new URL(manifest[key] || "./", deployedUrl);
    assert(resolved.origin === scopeUrl.origin && resolved.pathname.startsWith(scopeUrl.pathname), `site.webmanifest: ${key} must stay within scope`);
  });

  manifest.icons?.forEach((icon, index) => {
    assert(icon.src && icon.sizes && icon.type && icon.purpose, `site.webmanifest: icon ${index + 1} is incomplete`);
    const localPath = localPathFromReference(icon.src || "", "site.webmanifest");
    if (localPath) assert(fs.existsSync(path.resolve(projectRoot, localPath)), `site.webmanifest: icon file is missing: ${icon.src}`);
  });

  manifest.shortcuts?.forEach((shortcut, index) => {
    assert(shortcut.name && shortcut.url, `site.webmanifest: shortcut ${index + 1} needs name and url`);
    const resolved = new URL(shortcut.url || "./", deployedUrl);
    assert(resolved.origin === scopeUrl.origin && resolved.pathname.startsWith(scopeUrl.pathname), `site.webmanifest: shortcut ${index + 1} must stay within scope`);
  });
}

function validateDiscoveryFiles() {
  const robots = read("robots.txt");
  const sitemap = read("sitemap.xml");
  const serviceWorker = read("service-worker.js");
  const registrationSource = `${read("index.html")}\n${read("app.js")}`;
  assert(/User-agent:\s*\*/i.test(robots), "robots.txt: wildcard user-agent is required");
  assert(robots.includes(`${deployedUrl}sitemap.xml`), "robots.txt: sitemap URL is missing or incorrect");
  assert(sitemap.includes(`<loc>${deployedUrl}</loc>`), "sitemap.xml: deployed homepage URL is missing");
  assert(fs.existsSync(path.join(projectRoot, "service-worker.js")), "service-worker.js is required");
  assert(/serviceWorker[\s\S]{0,400}register\s*\(\s*["'`](?:\.\/)?service-worker\.js["'`]/.test(registrationSource), "index.html or app.js must register service-worker.js");
  assert(fs.existsSync(path.join(projectRoot, "404.html")), "404.html is required");

  const coreAssetsBlock = /const CORE_ASSETS\s*=\s*\[([\s\S]*?)\];/.exec(serviceWorker)?.[1] || "";
  const coreAssets = [...coreAssetsBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  assert(coreAssets.length >= 10, "service-worker.js: CORE_ASSETS is unexpectedly small");
  coreAssets.forEach((reference) => {
    const localPath = localPathFromReference(reference, "service-worker.js");
    if (localPath) assert(fs.existsSync(path.resolve(projectRoot, localPath)), `service-worker.js: missing core asset ${reference}`);
  });
}

validateHtmlFile("index.html", { seo: true });
validateHtmlFile("404.html");
validateManifest();
validateDiscoveryFiles();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    htmlFiles: 2,
    manifestShortcuts: 3,
    deployedUrl,
    status: "ok"
  }, null, 2));
}
