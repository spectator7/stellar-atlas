import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
globalThis.window = globalThis;

const Astronomy = require("../assets/vendor/astronomy-engine-2.1.19.min.js");
const d3 = require("../assets/vendor/d3-7.9.0.min.js");
globalThis.Astronomy = Astronomy;
globalThis.d3 = d3;

require("../data/constellations.js");
require("../data/sky-atlas.js");
require("../data/observing-data.js");
require("../data/story-topics.js");
require("../data/story-topics-extra.js");
require("../observing.js");

const assistant = Object.create(globalThis.TonightObserver.prototype);
assistant.A = Astronomy;
assistant.data = globalThis.OBSERVING_DATA;
assistant.constellations = globalThis.CONSTELLATIONS;
assistant.skyAtlas = globalThis.SKY_ATLAS;
assistant.bortleByLevel = new Map(assistant.data.bortleScale.map((entry) => [entry.level, entry]));
assistant.planetDefinitions = [
  ["mercury", "水星", Astronomy.Body.Mercury],
  ["venus", "金星", Astronomy.Body.Venus],
  ["mars", "火星", Astronomy.Body.Mars],
  ["jupiter", "木星", Astronomy.Body.Jupiter],
  ["saturn", "土星", Astronomy.Body.Saturn],
  ["uranus", "天王星", Astronomy.Body.Uranus],
  ["neptune", "海王星", Astronomy.Body.Neptune],
].map(([id, name, body]) => ({ id, name, body, symbol: "" }));

const beijingForm = {
  latitude: 39.9042,
  longitude: 116.4074,
  elevation: 44,
  timezone: "Asia/Shanghai",
  localDateTime: "2026-07-11T21:00",
  bortle: 9,
  date: new Date("2026-07-11T13:00:00Z"),
  label: "北京",
};
const snapshot = assistant.calculateSnapshot(beijingForm);
assert.equal(snapshot.constellations.length, 88);
assert.equal(snapshot.planets.length, 7);
assert.ok(snapshot.stars.length > 100);
assert.ok(snapshot.planets.every((planet) => Number.isFinite(planet.elongation)));
assert.ok(snapshot.events.every((event) => {
  const month = new Intl.DateTimeFormat("en", {
    timeZone: beijingForm.timezone,
    month: "2-digit",
  }).format(event.time);
  return month === "07";
}));

const polarObserver = new Astronomy.Observer(69.6492, 18.9553, 15);
const polarSummer = assistant.calculateDarkness({
  localDateTime: "2026-07-11T21:00",
  timezone: "Europe/Oslo",
  date: new Date("2026-07-11T19:00:00Z"),
}, polarObserver);
assert.equal(polarSummer.astronomicalState, "no-dark");

const polarWinter = assistant.calculateDarkness({
  localDateTime: "2026-12-21T21:00",
  timezone: "UTC",
  date: new Date("2026-12-21T21:00:00Z"),
}, new Astronomy.Observer(89.9, 0, 0));
assert.equal(polarWinter.astronomicalState, "continuous-dark");

const earlyMorning = assistant.calculateDarkness({
  localDateTime: "2026-07-12T01:00",
  timezone: "Asia/Shanghai",
  date: new Date("2026-07-11T17:00:00Z"),
}, new Astronomy.Observer(39.9042, 116.4074, 44));
assert.equal(earlyMorning.nightDate, "2026-07-11");

const fakeInput = (value) => ({ value, setAttribute() {} });
assistant.dom = {
  observerLatitude: fakeInput("40.7128"),
  observerLongitude: fakeInput("-74.0060"),
  observerElevation: fakeInput("10"),
  observerTimezone: fakeInput("America/New_York"),
  observerDateTime: fakeInput("2026-03-08T02:30"),
  observerBortle: fakeInput("9"),
  observerLocation: fakeInput("manual"),
};
assistant.locationById = new Map();
assistant.locationLabel = "手动坐标";
assistant.setFormStatus = () => {};
assert.equal(assistant.readForm(), null, "DST 跳过的当地时间必须被拒绝");

assert.notEqual(
  assistant.weatherKeyFor(beijingForm),
  assistant.weatherKeyFor({ ...beijingForm, elevation: beijingForm.elevation + 100 }),
  "天气缓存键必须包含海拔",
);

for (const topic of globalThis.STORY_TOPICS) {
  const nodes = topic.network.nodes.map((node) => ({ ...node }));
  const links = topic.network.edges.map((edge) => ({
    ...edge,
    source: edge.from,
    target: edge.to,
  }));
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((node) => node.id))
    .stop();
  simulation.tick(5);
  assert.ok(nodes.every((node) => Number.isFinite(node.x) && Number.isFinite(node.y)));
}

console.log(JSON.stringify({
  observer: {
    constellations: snapshot.constellations.length,
    horizonStars: snapshot.stars.length,
    monthlyEvents: snapshot.events.length,
    polarSummer: polarSummer.astronomicalState,
    polarWinter: polarWinter.astronomicalState,
    earlyMorningNight: earlyMorning.nightDate,
  },
  storyGraphs: globalThis.STORY_TOPICS.length,
}, null, 2));
