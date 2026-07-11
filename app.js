"use strict";

const SEASONS = {
  spring: { label: "春季", months: "3–5月", short: "春" },
  summer: { label: "夏季", months: "6–8月", short: "夏" },
  autumn: { label: "秋季", months: "9–11月", short: "秋" },
  winter: { label: "冬季", months: "12–2月", short: "冬" },
};

const CONSTELLATIONS = window.CONSTELLATIONS || [];
const PAGE = document.body.dataset.page || "home";

const OBSERVE_DATA = {
  spring: {
    label: "春季 · 3月至5月",
    headline: "沿北斗斗口寻找北极星",
    description: "入夜后面向北方，找到高悬的北斗七星。连接天璇与天枢，并向斗口外延伸约五倍距离，便会抵达亮度不算突出的北极星。",
    time: "20:00–23:30",
    direction: "北至东北",
    targets: "大熊座 / 牧夫座",
    gear: "裸眼",
  },
  summer: {
    label: "夏季 · 6月至8月",
    headline: "从夏季大三角进入银河",
    description: "寻找织女星、河鼓二和天津四组成的大三角。远离城市灯光后，银河会从天蝎座方向穿过三角区域，一直延伸到北方天空。",
    time: "21:00–次日00:30",
    direction: "南至头顶",
    targets: "天蝎座 / 天琴座 / 天鹅座",
    gear: "裸眼 / 7×50 双筒",
  },
  autumn: {
    label: "秋季 · 9月至11月",
    headline: "用一只大方框丈量秋夜",
    description: "入夜后望向东南方，寻找飞马座大四边形。沿方框东北角向外延伸可进入仙女座；转向北方，则能看到醒目的仙后座 W 形。",
    time: "19:30–23:00",
    direction: "东南至北",
    targets: "飞马座 / 仙后座",
    gear: "裸眼 / 双筒",
  },
  winter: {
    label: "冬季 · 12月至次年2月",
    headline: "先找三颗排成直线的亮星",
    description: "入夜后面向东南至南方天空，找到猎户座腰带三星。向左上方延伸是参宿四，向右下方延伸是参宿七。",
    time: "20:00–23:00",
    direction: "东南至南",
    targets: "猎户座",
    gear: "裸眼 / 7×50 双筒",
  },
};

const state = {
  activeId: "orion",
  season: "all",
  visibility: "all",
  search: "",
  storyMode: "chinese",
  showLines: true,
  showLabels: true,
  showGrid: false,
  showBoundaries: false,
  showDeepSky: false,
  magnitudeLimit: 6,
  hemisphere: "all",
  favoritesOnly: false,
  favorites: new Set(),
};

const dom = {
  header: document.querySelector("#siteHeader"),
  menuToggle: document.querySelector("#menuToggle"),
  siteNav: document.querySelector("#siteNav"),
  search: document.querySelector("#constellationSearch"),
  seasonFilter: document.querySelector("#seasonFilter"),
  visibilityFilter: document.querySelector("#visibilityFilter"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  resultCount: document.querySelector("#resultCount"),
  list: document.querySelector("#constellationList"),
  celestialMap: document.querySelector("#celestialMap"),
  skyStage: document.querySelector("#skyStage"),
  chartName: document.querySelector("#chartName"),
  chartLatin: document.querySelector("#chartLatin"),
  chartCaption: document.querySelector("#chartCaption"),
  detailNumber: document.querySelector("#detailNumber"),
  detailTitle: document.querySelector("#detailTitle"),
  detailSummary: document.querySelector("#detailSummary"),
  detailQuote: document.querySelector("#detailQuote"),
  factList: document.querySelector("#factList"),
  favoriteButton: document.querySelector("#favoriteButton"),
  shareButton: document.querySelector("#shareButton"),
  linesToggle: document.querySelector("#linesToggle"),
  labelsToggle: document.querySelector("#labelsToggle"),
  gridToggle: document.querySelector("#gridToggle"),
  boundariesToggle: document.querySelector("#boundariesToggle"),
  deepSkyToggle: document.querySelector("#deepSkyToggle"),
  hemisphereFilter: document.querySelector("#hemisphereFilter"),
  mapSeasonFilter: document.querySelector("#mapSeasonFilter"),
  magnitudeRange: document.querySelector("#magnitudeRange"),
  magnitudeValue: document.querySelector("#magnitudeValue"),
  visibleStarSelect: document.querySelector("#visibleStarSelect"),
  visibleStarList: document.querySelector("#visibleStarList"),
  mapZoomIn: document.querySelector("#mapZoomIn"),
  mapZoomOut: document.querySelector("#mapZoomOut"),
  mapFocus: document.querySelector("#mapFocus"),
  mapReset: document.querySelector("#mapReset"),
  mapCenterCoordinates: document.querySelector("#mapCenterCoordinates"),
  mapZoomReadout: document.querySelector("#mapZoomReadout"),
  objectPopover: document.querySelector("#objectPopover"),
  objectClose: document.querySelector("#objectClose"),
  objectKicker: document.querySelector("#objectKicker"),
  objectTitle: document.querySelector("#objectTitle"),
  objectAlias: document.querySelector("#objectAlias"),
  objectFacts: document.querySelector("#objectFacts"),
  objectConstellation: document.querySelector("#objectConstellation"),
  skyEmpty: document.querySelector("#skyEmpty"),
  skyAnnouncer: document.querySelector("#skyAnnouncer"),
  storyCount: document.querySelector("#storyCount"),
  storyGlyph: document.querySelector("#storyGlyph"),
  storyStarName: document.querySelector("#storyStarName"),
  storyOrigin: document.querySelector("#storyOrigin"),
  storyTitle: document.querySelector("#storyTitle"),
  storyBody: document.querySelector("#storyBody"),
  storyNote: document.querySelector("#storyNote"),
  storySelect: document.querySelector("#storySelect"),
  storySeason: document.querySelector("#storySeason"),
  storyLink: document.querySelector("#storyLink"),
  chineseTab: document.querySelector("#chineseStoryTab"),
  greekTab: document.querySelector("#greekStoryTab"),
  heroName: document.querySelector("#heroConstellationName"),
  heroMeta: document.querySelector("#heroConstellationMeta"),
  heroIndex: document.querySelector("#heroSceneIndex"),
  heroPrev: document.querySelector("#heroPrev"),
  heroNext: document.querySelector("#heroNext"),
  skyCanvas: document.querySelector("#skyCanvas"),
  toast: document.querySelector("#toast"),
  observeButtons: document.querySelectorAll("[data-observe-season]"),
  observeSeasonLabel: document.querySelector("#observeSeasonLabel"),
  observeHeadline: document.querySelector("#observeHeadline"),
  observeDescription: document.querySelector("#observeDescription"),
  observeTime: document.querySelector("#observeTime"),
  observeDirection: document.querySelector("#observeDirection"),
  observeTargets: document.querySelector("#observeTargets"),
  observeGear: document.querySelector("#observeGear"),
  dossierAbbr: document.querySelector("#dossierAbbr"),
  dossierTitle: document.querySelector("#dossierTitle"),
  dossierCoordinates: document.querySelector("#dossierCoordinates"),
  dossierVisibility: document.querySelector("#dossierVisibility"),
  keyStarTable: document.querySelector("#keyStarTable"),
  deepSkyList: document.querySelector("#deepSkyList"),
  dossierObservation: document.querySelector("#dossierObservation"),
  dossierMeta: document.querySelector("#dossierMeta"),
  sourceList: document.querySelector("#sourceList"),
  relatedTopicLinks: document.querySelector("#relatedTopicLinks"),
  installApp: document.querySelector("#installApp"),
  networkStatus: document.querySelector("#networkStatus"),
  retryStoryLoad: document.querySelector("#retryStoryLoad"),
  retryObservingLoad: document.querySelector("#retryObservingLoad"),
};

let celestialAtlas;
let observingAssistant;
let storyLibrary;
let revealAnimationsReady = false;
let deferredInstallPrompt = null;
let observingLoadPromise = null;
let storyLoadPromise = null;
let storyLoadFailed = false;
const STORY_FEATURE_SCRIPTS = ["data/story-topics.js", "data/story-topics-extra.js", "story-library.js"];
const OBSERVING_FEATURE_SCRIPTS = ["data/observing-data.js", "observing.js"];

const revealFallbackTimer = window.setTimeout(() => {
  if (revealAnimationsReady) return;
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}, 1800);

function activeConstellation() {
  return CONSTELLATIONS.find((item) => item.id === state.activeId) || CONSTELLATIONS[0];
}

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem("tianxiang-favorites-v1") || "[]");
    state.favorites = new Set(stored.filter((id) => CONSTELLATIONS.some((item) => item.id === id)));
  } catch {
    state.favorites = new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem("tianxiang-favorites-v1", JSON.stringify([...state.favorites]));
  } catch {
    // The atlas remains fully usable when storage is unavailable.
  }
}

function renderList() {
  const focusedId = dom.list.contains(document.activeElement) ? document.activeElement.dataset.id : null;
  const query = state.search.trim().toLowerCase();
  const filtered = CONSTELLATIONS.filter((item) => {
    const matchesSeason = state.season === "all" || item.season === state.season;
    const visibility = item.profile.visibility;
    const matchesVisibility = state.visibility === "all"
      || (state.visibility === "china" && (visibility.includes("中国大部分") || visibility.includes("中国北方")))
      || (state.visibility === "south" && visibility.includes("华南"))
      || (state.visibility === "far-south" && visibility.includes("不可见"));
    const searchText = `${item.name} ${item.latin} ${item.abbr} ${item.glyph} ${item.profile.meaning}`.toLowerCase();
    const matchesFavorites = !state.favoritesOnly || state.favorites.has(item.id);
    return matchesSeason && matchesVisibility && matchesFavorites && searchText.includes(query);
  });

  dom.list.replaceChildren();
  dom.resultCount.textContent = `${filtered.length} / ${CONSTELLATIONS.length}`;
  dom.favoritesOnly.classList.toggle("is-active", state.favoritesOnly);
  dom.favoritesOnly.textContent = state.favoritesOnly ? "★" : "☆";
  dom.favoritesOnly.setAttribute("aria-pressed", String(state.favoritesOnly));
  dom.favoritesOnly.setAttribute("aria-label", state.favoritesOnly ? "显示全部星座" : "只看收藏");
  dom.favoritesOnly.title = state.favoritesOnly ? "显示全部星座" : "只看收藏";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = state.favoritesOnly ? "还没有符合当前条件的收藏星座。" : "没有找到匹配的星座。";
    dom.list.append(empty);
    return;
  }

  filtered.forEach((item, filteredIndex) => {
    const originalIndex = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
    const isFavorite = state.favorites.has(item.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `constellation-item${item.id === state.activeId ? " is-active" : ""}`;
    button.dataset.id = item.id;
    button.setAttribute("aria-pressed", String(item.id === state.activeId));
    button.tabIndex = item.id === state.activeId || (!filtered.some((entry) => entry.id === state.activeId) && filteredIndex === 0)
      ? 0
      : -1;

    const number = document.createElement("span");
    number.className = "list-number";
    number.textContent = padNumber(originalIndex + 1);

    const name = document.createElement("span");
    name.className = "list-name";
    const chineseName = document.createElement("strong");
    chineseName.textContent = item.name;
    const latinName = document.createElement("small");
    latinName.textContent = `${item.abbr} · ${item.latin}`;
    name.append(chineseName, latinName);

    const favorite = document.createElement("span");
    favorite.className = "list-favorite";
    favorite.setAttribute("aria-hidden", "true");
    favorite.textContent = isFavorite ? "★" : "";

    const favoriteStatus = document.createElement("span");
    favoriteStatus.className = "visually-hidden";
    favoriteStatus.textContent = isFavorite ? "，已收藏" : "，未收藏";

    button.append(number, name, favorite, favoriteStatus);
    button.addEventListener("click", () => setConstellation(item.id, true));
    dom.list.append(button);
  });
  if (focusedId) {
    const restored = dom.list.querySelector(`button[data-id="${focusedId}"]`);
    restored?.focus({ preventScroll: true });
  }

}

function renderChart(focusMap = false) {
  if (!celestialAtlas) return;
  const item = activeConstellation();
  celestialAtlas.setLayers({
    lines: state.showLines,
    labels: state.showLabels,
    grid: state.showGrid,
    boundaries: state.showBoundaries,
    deepSky: state.showDeepSky,
  });
  celestialAtlas.setFilters({
    magnitude: state.magnitudeLimit,
    hemisphere: state.hemisphere,
    season: state.season,
  });
  celestialAtlas.setSelected(item.abbr, { focus: focusMap });
}

function renderDetails() {
  const item = activeConstellation();
  const index = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
  dom.chartName.textContent = item.name;
  dom.chartLatin.textContent = item.latin;
  dom.chartCaption.textContent = item.caption;
  dom.detailNumber.textContent = padNumber(index + 1);
  dom.detailTitle.textContent = item.title;
  dom.detailSummary.textContent = item.summary;
  dom.detailQuote.textContent = `“${item.quote}”`;
  dom.factList.replaceChildren();

  item.facts.forEach(([term, description]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    row.append(dt, dd);
    dom.factList.append(row);
  });

  const isFavorite = state.favorites.has(item.id);
  dom.favoriteButton.textContent = isFavorite ? "★" : "☆";
  dom.favoriteButton.classList.toggle("is-active", isFavorite);
  dom.favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  dom.favoriteButton.setAttribute("aria-label", isFavorite ? `取消收藏${item.name}` : `收藏${item.name}`);
  dom.favoriteButton.title = isFavorite ? "取消收藏" : "收藏星座";
  const storyUrl = new URL("stories.html", window.location.href);
  storyUrl.searchParams.set("constellation", item.id);
  storyUrl.hash = "stories";
  dom.storyLink.href = storyUrl.toString();
}

function formatRightAscension(longitude) {
  const degrees = longitude < 0 ? longitude + 360 : longitude;
  const totalMinutes = Math.round((degrees / 15) * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

function formatDeclination(declination) {
  const sign = declination >= 0 ? "+" : "−";
  return `${sign}${Math.abs(declination).toFixed(1)}°`;
}

function renderDossier() {
  const item = activeConstellation();
  const profile = item.profile;
  dom.dossierAbbr.textContent = item.abbr;
  dom.dossierTitle.textContent = `${item.name}完整档案`;
  dom.dossierCoordinates.textContent = `中心赤经 ${formatRightAscension(profile.center.longitude)} · 赤纬 ${formatDeclination(profile.center.declination)}`;
  dom.dossierVisibility.textContent = profile.visibility;
  dom.dossierObservation.textContent = profile.observation;

  dom.keyStarTable.replaceChildren();
  profile.keyStars.forEach((star) => {
    const row = document.createElement("div");
    row.className = "key-star-row";
    const name = document.createElement("strong");
    const designation = document.createElement("span");
    const magnitude = document.createElement("span");
    name.textContent = star.zh ? `${star.zh} · ${star.name}` : star.name;
    designation.textContent = star.designation || `HIP ${star.hip}`;
    magnitude.textContent = `m ${Number(star.mag).toFixed(2)}`;
    row.append(name, designation, magnitude);
    dom.keyStarTable.append(row);
  });

  dom.deepSkyList.replaceChildren();
  if (profile.deepSky.length === 0) {
    const empty = document.createElement("p");
    empty.className = "deep-sky-empty";
    empty.textContent = "当前亮深空目录中没有适合入门观测的高亮目标；可从双星、变星或银河星场继续探索。";
    dom.deepSkyList.append(empty);
  } else {
    profile.deepSky.forEach((target) => {
      const entry = document.createElement("article");
      entry.className = "deep-sky-item";
      const name = document.createElement("strong");
      const type = document.createElement("span");
      name.textContent = target.commonName ? `${target.name} · ${target.commonName}` : target.name;
      type.textContent = `${target.type}${target.mag === null ? "" : ` · m ${target.mag}`}`;
      entry.append(name, type);
      dom.deepSkyList.append(entry);
    });
  }

  const metaRows = [
    ["名称含义", profile.meaning],
    ["最佳季节", `${SEASONS[item.season].label} · ${SEASONS[item.season].months}`],
    ["主要方位", item.direction],
    ["资料复核", profile.reviewedAt],
  ];
  dom.dossierMeta.replaceChildren();
  metaRows.forEach(([term, description]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    row.append(dt, dd);
    dom.dossierMeta.append(row);
  });

  dom.sourceList.replaceChildren();
  profile.sources.forEach((source) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.textContent = source.label;
    li.append(link);
    dom.sourceList.append(li);
  });

  dom.relatedTopicLinks.replaceChildren();
  const storyTopics = Array.isArray(window.STORY_TOPICS) ? window.STORY_TOPICS : null;
  if (storyLoadFailed || !storyTopics) {
    const pending = document.createElement("span");
    pending.textContent = storyLoadFailed ? "专题资料加载失败" : "专题资料加载中…";
    dom.relatedTopicLinks.append(pending);
    return;
  }
  const relatedTopics = storyTopics
    .filter((topic) => (topic.relatedConstellations || []).includes(item.abbr))
    .slice(0, 6);
  relatedTopics.forEach((topic) => {
    const link = document.createElement("a");
    const url = new URL("stories.html", window.location.href);
    url.searchParams.set("topic", topic.id);
    url.hash = "story-library";
    link.href = url.toString();
    link.textContent = topic.title;
    link.addEventListener("click", (event) => {
      if (!storyLibrary) return;
      event.preventDefault();
      storyLibrary.selectTopic(topic.id, true, { focusReader: true });
    });
    dom.relatedTopicLinks.append(link);
  });
  if (!relatedTopics.length) {
    const empty = document.createElement("span");
    empty.textContent = "当前暂无独立专题";
    dom.relatedTopicLinks.append(empty);
  }
}

function setupPwa() {
  const updateNetworkStatus = () => {
    const online = navigator.onLine;
    const cacheReady = Boolean(navigator.serviceWorker?.controller);
    dom.networkStatus.textContent = online
      ? "在线"
      : cacheReady ? "离线 · 缓存内容可用" : "离线 · 尚未建立离线缓存";
    dom.networkStatus.dataset.state = online ? "online" : "offline";
  };
  updateNetworkStatus();
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    dom.installApp.hidden = false;
  });
  dom.installApp.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === "accepted") showToast("离线版安装已开始");
    deferredInstallPrompt = null;
    dom.installApp.hidden = true;
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    dom.installApp.hidden = true;
    showToast("天象志已安装，可从设备桌面打开");
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", updateNetworkStatus);
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").then((registration) => {
        updateNetworkStatus();
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              showToast("新版本已缓存，下次打开时生效");
            }
          });
        });
      }).catch((error) => {
        console.error("Service worker registration failed", error);
      });
    });
  }
}

function renderStory() {
  const item = activeConstellation();
  const index = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
  const story = item.stories[state.storyMode];
  dom.storyCount.textContent = `${padNumber(index + 1)} / ${padNumber(CONSTELLATIONS.length)}`;
  dom.storyGlyph.textContent = item.glyph;
  dom.storyStarName.textContent = `${item.glyph} · ${item.name}`;
  dom.storyOrigin.textContent = story.origin;
  dom.storyTitle.textContent = story.title;
  dom.storyBody.replaceChildren();
  story.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    dom.storyBody.append(p);
  });
  dom.storyNote.textContent = story.note;
  dom.chineseTab.setAttribute("aria-selected", String(state.storyMode === "chinese"));
  dom.greekTab.setAttribute("aria-selected", String(state.storyMode === "greek"));
  dom.chineseTab.tabIndex = state.storyMode === "chinese" ? 0 : -1;
  dom.greekTab.tabIndex = state.storyMode === "greek" ? 0 : -1;
  dom.storyBody.setAttribute("aria-labelledby", state.storyMode === "chinese" ? "chineseStoryTab" : "greekStoryTab");
}

function renderStorySelector() {
  const item = activeConstellation();
  dom.storySelect.replaceChildren();
  ["spring", "summer", "autumn", "winter"].forEach((season) => {
    const group = document.createElement("optgroup");
    group.label = SEASONS[season].label;
    CONSTELLATIONS.filter((entry) => entry.season === season).forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = `${entry.name} · ${entry.latin}`;
      group.append(option);
    });
    dom.storySelect.append(group);
  });
  dom.storySelect.value = item.id;
  dom.storySeason.textContent = SEASONS[item.season].label;
}

function renderHeroReadout() {
  const item = activeConstellation();
  const index = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
  dom.heroName.textContent = `${item.name} · ${item.latin}`;
  dom.heroMeta.textContent = `${SEASONS[item.season].label}｜${item.direction}`;
  dom.heroIndex.textContent = `${padNumber(index + 1)} / ${padNumber(CONSTELLATIONS.length)}`;
}

function updateUrl(id) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("constellation", id);
    history.replaceState({}, "", url);
  } catch {
    // Local file previews can restrict history updates in some browsers.
  }
}

function setConstellation(id, updateAddress = false, focusMap = true) {
  if (!CONSTELLATIONS.some((item) => item.id === id)) return;
  state.activeId = id;
  if (PAGE === "atlas") {
    renderList();
    renderChart(focusMap);
    renderDetails();
    renderDossier();
  }
  if (PAGE === "stories") {
    renderStory();
    renderStorySelector();
  }
  if (PAGE === "home") renderHeroReadout();
  if (updateAddress) {
    updateUrl(id);
    document.title = PAGE === "stories"
      ? `${activeConstellation().name}故事 · 天象志`
      : `${activeConstellation().name}星图 · 天象志`;
  }
}

let toastTimer;
function showToast(message) {
  window.clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => dom.toast.classList.remove("is-visible"), 2600);
}

async function copyShareLink() {
  updateUrl(state.activeId);
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = "atlas";
  const url = shareUrl.toString();
  try {
    await navigator.clipboard.writeText(url);
    showToast("星图链接已复制");
  } catch {
    const input = document.createElement("input");
    input.value = url;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    showToast(copied ? "星图链接已复制" : "可从浏览器地址栏复制链接");
  }
}

function setStoryMode(mode) {
  state.storyMode = mode;
  renderStory();
}

function setObserveSeason(season) {
  const data = OBSERVE_DATA[season];
  if (!data) return;
  dom.observeButtons.forEach((button) => {
    const isActive = button.dataset.observeSeason === season;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  dom.observeSeasonLabel.textContent = data.label;
  dom.observeHeadline.textContent = data.headline;
  dom.observeDescription.textContent = data.description;
  dom.observeTime.textContent = data.time;
  dom.observeDirection.textContent = data.direction;
  dom.observeTargets.textContent = data.targets;
  dom.observeGear.textContent = data.gear;
}

function readInitialConstellation() {
  try {
    const id = new URL(window.location.href).searchParams.get("constellation");
    if (id && CONSTELLATIONS.some((item) => item.id === id)) state.activeId = id;
  } catch {
    state.activeId = "orion";
  }
}

function applySeasonFilter(season) {
  if (season !== "all" && !SEASONS[season]) return;
  state.season = season;
  dom.seasonFilter.querySelectorAll("button[data-season]").forEach((button) => {
    const isActive = button.dataset.season === season;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  dom.mapSeasonFilter.value = season;
  renderList();
  renderChart();
}

function bindControls() {
  dom.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderList();
  });

  dom.seasonFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-season]");
    if (!button) return;
    applySeasonFilter(button.dataset.season);
  });

  dom.mapSeasonFilter.addEventListener("change", (event) => applySeasonFilter(event.target.value));
  dom.hemisphereFilter.addEventListener("change", (event) => {
    state.hemisphere = event.target.value;
    renderChart();
  });

  dom.magnitudeRange.addEventListener("input", (event) => {
    state.magnitudeLimit = Number(event.target.value);
    dom.magnitudeValue.textContent = `+${state.magnitudeLimit.toFixed(1)}`;
    renderChart();
  });

  dom.visibilityFilter.addEventListener("change", (event) => {
    state.visibility = event.target.value;
    renderList();
  });
  dom.favoritesOnly.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    renderList();
  });
  dom.retryStoryLoad.addEventListener("click", () => {
    dom.retryStoryLoad.hidden = true;
    const count = document.querySelector("#topicResultCount");
    if (count) count.textContent = "正在重新加载专题…";
    loadStoryLibrary();
  });
  dom.retryObservingLoad.addEventListener("click", () => {
    dom.retryObservingLoad.hidden = true;
    const status = document.querySelector("#observerFormStatus");
    if (status) status.textContent = "正在重新加载观测助手…";
    loadObservingAssistant();
  });
  dom.list.addEventListener("keydown", (event) => {
    const current = event.target.closest("button[data-id]");
    if (!current) return;
    const buttons = [...dom.list.querySelectorAll("button[data-id]")];
    const index = buttons.indexOf(current);
    let target = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") target = buttons[(index + 1) % buttons.length];
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = buttons[(index - 1 + buttons.length) % buttons.length];
    else if (event.key === "Home") target = buttons[0];
    else if (event.key === "End") target = buttons[buttons.length - 1];
    if (!target) return;
    event.preventDefault();
    buttons.forEach((button) => { button.tabIndex = button === target ? 0 : -1; });
    target.focus();
  });

  dom.linesToggle.addEventListener("change", () => {
    state.showLines = dom.linesToggle.checked;
    renderChart();
  });
  dom.labelsToggle.addEventListener("change", () => {
    state.showLabels = dom.labelsToggle.checked;
    renderChart();
  });
  dom.gridToggle.addEventListener("change", () => {
    state.showGrid = dom.gridToggle.checked;
    renderChart();
  });
  dom.boundariesToggle.addEventListener("change", () => {
    state.showBoundaries = dom.boundariesToggle.checked;
    renderChart();
  });
  dom.deepSkyToggle.addEventListener("change", () => {
    state.showDeepSky = dom.deepSkyToggle.checked;
    renderChart();
  });

  dom.mapZoomIn.addEventListener("click", () => celestialAtlas?.zoomBy(1.35, true));
  dom.mapZoomOut.addEventListener("click", () => celestialAtlas?.zoomBy(1 / 1.35, true));
  dom.mapFocus.addEventListener("click", () => celestialAtlas?.focusSelected());
  dom.mapReset.addEventListener("click", () => celestialAtlas?.reset(true));

  dom.favoriteButton.addEventListener("click", () => {
    const item = activeConstellation();
    if (state.favorites.has(item.id)) {
      state.favorites.delete(item.id);
      showToast(`已取消收藏 ${item.name}`);
    } else {
      state.favorites.add(item.id);
      showToast(`已收藏 ${item.name}`);
    }
    saveFavorites();
    renderList();
    renderDetails();
  });

  dom.shareButton.addEventListener("click", copyShareLink);
  dom.chineseTab.addEventListener("click", () => setStoryMode("chinese"));
  dom.greekTab.addEventListener("click", () => setStoryMode("greek"));
  [dom.chineseTab, dom.greekTab].forEach((tab, index, tabs) => {
    tab.addEventListener("keydown", (event) => {
      let targetIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") targetIndex = 0;
      else if (event.key === "End") targetIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[targetIndex].click();
      tabs[targetIndex].focus();
    });
  });
  dom.storySelect.addEventListener("change", (event) => setConstellation(event.target.value, true));
  dom.observeButtons.forEach((button) => {
    button.addEventListener("click", () => setObserveSeason(button.dataset.observeSeason));
  });

  const changeHero = (offset) => {
    const index = CONSTELLATIONS.findIndex((item) => item.id === state.activeId);
    const nextIndex = (index + offset + CONSTELLATIONS.length) % CONSTELLATIONS.length;
    setConstellation(CONSTELLATIONS[nextIndex].id, true);
  };
  dom.heroPrev.addEventListener("click", () => changeHero(-1));
  dom.heroNext.addEventListener("click", () => changeHero(1));

  const setNavigationOpen = (open, restoreFocus = false) => {
    dom.header.classList.toggle("is-open", open);
    dom.menuToggle.setAttribute("aria-expanded", String(open));
    dom.menuToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    dom.menuToggle.querySelector("span").textContent = open ? "×" : "☰";
    if (!open && restoreFocus) dom.menuToggle.focus({ preventScroll: true });
  };

  dom.menuToggle.addEventListener("click", () => {
    setNavigationOpen(!dom.header.classList.contains("is-open"));
  });

  dom.siteNav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    setNavigationOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !dom.header.classList.contains("is-open")) return;
    event.preventDefault();
    setNavigationOpen(false, true);
  });

  document.addEventListener("click", (event) => {
    if (!dom.header.classList.contains("is-open") || dom.header.contains(event.target)) return;
    setNavigationOpen(false);
  });

  window.addEventListener("scroll", () => {
    dom.header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const revealAll = () => elements.forEach((element) => element.classList.add("is-visible"));

  try {
    if (!("IntersectionObserver" in window)) {
      revealAll();
      revealAnimationsReady = true;
      window.clearTimeout(revealFallbackTimer);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    elements.forEach((element) => observer.observe(element));
    revealAnimationsReady = true;
    window.clearTimeout(revealFallbackTimer);
  } catch (error) {
    console.error("Reveal animation initialization failed", error);
    elements.forEach((element) => element.classList.add("is-visible"));
    revealAnimationsReady = true;
    window.clearTimeout(revealFallbackTimer);
  }
}

function setupSkyCanvas() {
  const canvas = dom.skyCanvas;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let dust = [];
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const random = mulberry32(20260710);
    const starCount = Math.min(650, Math.floor((width * height) / 1750));
    stars = Array.from({ length: starCount }, () => ({
      x: random(),
      y: random(),
      size: random() > 0.965 ? 1.8 + random() * 1.5 : 0.35 + random() * 1.05,
      alpha: 0.2 + random() * 0.8,
      phase: random() * Math.PI * 2,
      speed: 0.35 + random() * 0.9,
      tone: random(),
    }));
    dust = Array.from({ length: Math.min(920, Math.floor(width * 0.9)) }, () => {
      const x = 0.36 + random() * 0.72;
      const centerY = 0.82 - x * 0.62;
      return {
        x,
        y: centerY + (random() - 0.5) * (0.17 + random() * 0.24),
        size: 0.45 + random() * 2.1,
        alpha: 0.025 + random() * 0.12,
        tone: random(),
      };
    });
  }

  function drawConstellation(item, time) {
    const minX = Math.min(...item.stars.map((star) => star.x));
    const maxX = Math.max(...item.stars.map((star) => star.x));
    const minY = Math.min(...item.stars.map((star) => star.y));
    const maxY = Math.max(...item.stars.map((star) => star.y));
    const availableWidth = width < 680 ? width * 0.52 : width * 0.34;
    const availableHeight = height * (width < 680 ? 0.37 : 0.62);
    const scale = Math.min(availableWidth / Math.max(1, maxX - minX), availableHeight / Math.max(1, maxY - minY));
    const originX = width < 680 ? width * 0.46 : width * 0.62;
    const originY = width < 680 ? height * 0.05 : height * 0.14;
    const parallaxX = pointerX * 13;
    const parallaxY = pointerY * 9;
    const point = (star) => ({
      x: originX + (star.x - minX) * scale + parallaxX,
      y: originY + (star.y - minY) * scale + parallaxY,
    });

    context.lineWidth = 1;
    context.strokeStyle = "rgba(216, 171, 95, 0.34)";
    item.edges.forEach(([from, to]) => {
      const start = point(item.stars[from]);
      const end = point(item.stars[to]);
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    });

    item.stars.forEach((star, index) => {
      const position = point(star);
      const pulse = reducedMotion ? 1 : 0.82 + Math.sin(time * 0.0014 + index) * 0.18;
      const radius = Math.max(1.8, 5.4 - star.mag * 0.65) * pulse;
      context.beginPath();
      context.arc(position.x, position.y, radius * 3.2, 0, Math.PI * 2);
      context.fillStyle = "rgba(216, 171, 95, 0.055)";
      context.fill();
      context.beginPath();
      context.arc(position.x, position.y, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 249, 226, 0.94)";
      context.fill();
    });
  }

  function draw(time = 0) {
    context.fillStyle = "#07080b";
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    dust.forEach((particle) => {
      context.beginPath();
      context.arc(particle.x * width + pointerX * 4, particle.y * height + pointerY * 3, particle.size, 0, Math.PI * 2);
      context.fillStyle = particle.tone > 0.64
        ? `rgba(150, 183, 186, ${particle.alpha})`
        : particle.tone > 0.34
          ? `rgba(178, 124, 111, ${particle.alpha})`
          : `rgba(235, 224, 198, ${particle.alpha})`;
      context.fill();
    });

    stars.forEach((star) => {
      const shimmer = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.001 * star.speed + star.phase) * 0.28;
      context.beginPath();
      context.arc(star.x * width + pointerX * star.size * 2, star.y * height + pointerY * star.size, star.size, 0, Math.PI * 2);
      if (star.tone > 0.82) {
        context.fillStyle = `rgba(181, 218, 222, ${star.alpha * shimmer})`;
      } else if (star.tone < 0.13) {
        context.fillStyle = `rgba(238, 191, 145, ${star.alpha * shimmer})`;
      } else {
        context.fillStyle = `rgba(255, 250, 232, ${star.alpha * shimmer})`;
      }
      context.fill();
    });

    drawConstellation(activeConstellation(), time);
    context.globalCompositeOperation = "source-over";

    context.fillStyle = "rgba(5, 6, 8, 0.5)";
    context.fillRect(0, height * 0.93, width, height * 0.07);
    context.beginPath();
    context.moveTo(0, height * 0.95);
    for (let index = 0; index <= 12; index += 1) {
      const x = (index / 12) * width;
      const y = height * (0.91 + ((index * 13) % 7) * 0.007);
      context.lineTo(x, y);
    }
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fillStyle = "#050608";
    context.fill();

    if (!reducedMotion) requestAnimationFrame(draw);
  }

  const hero = canvas.closest(".hero");
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  }, { passive: true });

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(draw);
}

function initializeCelestialAtlas() {
  const skyData = window.SKY_ATLAS;
  if (!window.CelestialAtlas || !window.d3 || !skyData?.stars?.length) {
    dom.skyEmpty.hidden = false;
    dom.skyEmpty.textContent = "全天星图数据加载失败，请刷新页面后重试。";
    return;
  }

  try {
    celestialAtlas = new window.CelestialAtlas({
      canvas: dom.celestialMap,
      stage: dom.skyStage,
      data: skyData,
      constellations: CONSTELLATIONS,
      dom: {
        visibleStarSelect: dom.visibleStarSelect,
        visibleStarList: dom.visibleStarList,
        mapCenterCoordinates: dom.mapCenterCoordinates,
        mapZoomReadout: dom.mapZoomReadout,
        objectPopover: dom.objectPopover,
        objectClose: dom.objectClose,
        objectKicker: dom.objectKicker,
        objectTitle: dom.objectTitle,
        objectAlias: dom.objectAlias,
        objectFacts: dom.objectFacts,
        objectConstellation: dom.objectConstellation,
        skyEmpty: dom.skyEmpty,
        skyAnnouncer: dom.skyAnnouncer,
      },
      onSelectConstellation: (id, options = {}) => {
        setConstellation(id, true, Boolean(options.focus));
      },
      onStatus: (message) => {
        dom.skyAnnouncer.textContent = message;
      },
    });
  } catch (error) {
    console.error(error);
    dom.skyEmpty.hidden = false;
    dom.skyEmpty.textContent = "星图引擎初始化失败，请检查浏览器控制台。";
  }
}

function selectConstellationFromFeature(id) {
  if (PAGE !== "atlas") {
    const url = new URL("atlas.html", window.location.href);
    url.searchParams.set("constellation", id);
    url.hash = "atlas";
    window.location.href = url.toString();
    return;
  }
  setConstellation(id, true, true);
  const atlas = document.querySelector("#atlas");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = reducedMotion ? "auto" : "smooth";
  atlas?.scrollIntoView({
    behavior,
    block: "start",
  });

  const item = CONSTELLATIONS.find((entry) => entry.id === id);
  let focusTimer;
  const focusMap = () => {
    window.removeEventListener("scrollend", focusMap);
    window.clearTimeout(focusTimer);
    dom.celestialMap?.focus({ preventScroll: true });
    dom.skyAnnouncer.textContent = "";
    window.requestAnimationFrame(() => {
      dom.skyAnnouncer.textContent = item
        ? `已打开${item.name}，焦点已移至互动星图。可使用方向键移动视野。`
        : "焦点已移至互动星图。可使用方向键移动视野。";
    });
  };

  if (behavior === "smooth" && "onscrollend" in window) {
    window.addEventListener("scrollend", focusMap);
    focusTimer = window.setTimeout(focusMap, 700);
  } else {
    window.requestAnimationFrame(focusMap);
  }
}

function initializeObservingAssistant() {
  if (observingAssistant) return true;
  if (!window.TonightObserver || !window.OBSERVING_DATA || !window.Astronomy) return false;
  try {
    observingAssistant = new window.TonightObserver({
      constellations: CONSTELLATIONS,
      skyAtlas: window.SKY_ATLAS,
      onSelectConstellation: selectConstellationFromFeature,
      onToast: showToast,
    });
    return true;
  } catch (error) {
    console.error(error);
    const status = document.querySelector("#observerFormStatus");
    if (status) status.textContent = "观测助手初始化失败，请刷新页面后重试。";
    return false;
  }
}

function initializeStoryLibrary() {
  if (storyLibrary) return true;
  if (!window.StoryLibrary || !Array.isArray(window.STORY_TOPICS)) return false;
  try {
    storyLibrary = new window.StoryLibrary({
      topics: window.STORY_TOPICS,
      constellations: CONSTELLATIONS,
      onSelectConstellation: selectConstellationFromFeature,
      onToast: showToast,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function loadFeatureScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-feature-src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.dataset.featureSrc = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.head.append(script);
  });
}

function removeFailedFeatureScripts(sources) {
  sources.forEach((src) => {
    const script = document.querySelector(`script[data-feature-src="${src}"]`);
    if (script?.dataset.loaded !== "true") script?.remove();
  });
}

function loadStoryLibrary() {
  if (storyLoadPromise) return storyLoadPromise;
  const section = document.querySelector("#story-library");
  storyLoadFailed = false;
  dom.retryStoryLoad.hidden = true;
  section?.setAttribute("aria-busy", "true");
  storyLoadPromise = loadFeatureScript(STORY_FEATURE_SCRIPTS[0])
    .then(() => loadFeatureScript(STORY_FEATURE_SCRIPTS[1]))
    .then(() => loadFeatureScript(STORY_FEATURE_SCRIPTS[2]))
    .then(() => {
      if (!initializeStoryLibrary()) throw new Error("Story library initialization failed");
      storyLoadFailed = false;
      renderDossier();
    })
    .catch((error) => {
      console.error(error);
      removeFailedFeatureScripts(STORY_FEATURE_SCRIPTS);
      storyLoadPromise = null;
      storyLoadFailed = true;
      const count = document.querySelector("#topicResultCount");
      if (count) count.textContent = "专题加载失败";
      dom.retryStoryLoad.hidden = false;
      renderDossier();
    })
    .finally(() => section?.removeAttribute("aria-busy"));
  return storyLoadPromise;
}

function loadStoryDataForAtlas() {
  return loadFeatureScript(STORY_FEATURE_SCRIPTS[0])
    .then(() => loadFeatureScript(STORY_FEATURE_SCRIPTS[1]))
    .then(() => renderDossier())
    .catch((error) => {
      console.error(error);
      storyLoadFailed = true;
      renderDossier();
    });
}

function loadObservingAssistant() {
  if (observingLoadPromise) return observingLoadPromise;
  const section = document.querySelector("#observe");
  dom.retryObservingLoad.hidden = true;
  section?.setAttribute("aria-busy", "true");
  observingLoadPromise = loadFeatureScript(OBSERVING_FEATURE_SCRIPTS[0])
    .then(() => loadFeatureScript(OBSERVING_FEATURE_SCRIPTS[1]))
    .then(() => {
      if (!initializeObservingAssistant()) throw new Error("Observing assistant initialization failed");
    })
    .catch((error) => {
      console.error(error);
      removeFailedFeatureScripts(OBSERVING_FEATURE_SCRIPTS);
      observingLoadPromise = null;
      const status = document.querySelector("#observerFormStatus");
      if (status) status.textContent = "观测助手加载失败，请检查网络后重试。";
      dom.retryObservingLoad.hidden = false;
    })
    .finally(() => section?.removeAttribute("aria-busy"));
  return observingLoadPromise;
}

function redirectLegacyHomeRoute() {
  if (PAGE !== "home") return false;
  const url = new URL(window.location.href);
  let page = "";
  let hash = url.hash;
  if (url.searchParams.has("topic") || ["#stories", "#story-library"].includes(url.hash)) {
    page = "stories.html";
    hash = url.hash === "#stories" ? "#stories" : "#story-library";
  } else if (
    ["loc", "lat", "lon", "dt", "bortle", "gear"].some((key) => url.searchParams.has(key))
    || url.hash === "#observe"
  ) {
    page = "observe.html";
    hash = "#observe";
  } else if (url.searchParams.has("constellation") || url.hash === "#atlas") {
    page = "atlas.html";
    hash = "#atlas";
  }
  if (!page) return false;
  const target = new URL(page, url);
  target.search = url.search;
  target.hash = hash;
  window.location.replace(target.toString());
  return true;
}

function initialize() {
  if (redirectLegacyHomeRoute()) return;
  if (CONSTELLATIONS.length === 0) {
    document.body.innerHTML = "<main class=\"noscript\">星座数据加载失败，请刷新页面或检查 data/constellations.js。</main>";
    return;
  }
  loadFavorites();
  readInitialConstellation();
  bindControls();
  dom.siteNav.querySelector(`[data-nav-page="${PAGE}"]`)?.setAttribute("aria-current", "page");
  if (PAGE === "home") {
    renderHeroReadout();
    setupSkyCanvas();
  }
  if (PAGE === "atlas") {
    initializeCelestialAtlas();
    renderList();
    renderChart(true);
    renderDetails();
    renderDossier();
    loadStoryDataForAtlas();
  }
  if (PAGE === "stories") {
    renderStory();
    renderStorySelector();
    loadStoryLibrary();
  }
  if (PAGE === "observe") {
    setObserveSeason("winter");
    loadObservingAssistant();
  }
  setupRevealAnimations();
  setupPwa();
}

initialize();
