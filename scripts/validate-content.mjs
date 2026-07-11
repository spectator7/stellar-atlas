import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(projectDirectory, "data", "constellations.js");
const source = fs.readFileSync(dataPath, "utf8");
const context = { window: {} };
vm.runInNewContext(source, context, { filename: dataPath });

const constellations = context.window.CONSTELLATIONS;
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(Array.isArray(constellations), "window.CONSTELLATIONS must be an array");
assert(constellations.length === 88, `expected 88 constellations, received ${constellations.length}`);
assert(new Set(constellations.map((item) => item.id)).size === 88, "constellation ids must be unique");
assert(new Set(constellations.map((item) => item.abbr)).size === 88, "IAU abbreviations must be unique");

constellations.forEach((item) => {
  const prefix = item.abbr || item.id || "unknown";
  assert(item.name && item.latin && item.abbr, `${prefix}: names and abbreviation are required`);
  assert(item.summary?.length >= 50, `${prefix}: summary is too short`);
  assert(item.caption?.length >= 20, `${prefix}: chart caption is too short`);
  assert(Array.isArray(item.stars) && item.stars.length >= 2, `${prefix}: chart stars are missing`);
  assert(Array.isArray(item.edges) && item.edges.length >= 1, `${prefix}: chart edges are missing`);
  assert(item.edges.every(([from, to]) => item.stars[from] && item.stars[to]), `${prefix}: chart edge references an invalid star`);
  assert(item.profile?.keyStars?.length >= 3, `${prefix}: key-star list is incomplete`);
  assert(typeof item.profile?.observation === "string" && item.profile.observation.length >= 40, `${prefix}: observation guide is incomplete`);
  assert(item.stories?.chinese?.paragraphs?.length === 2, `${prefix}: Chinese story requires two paragraphs`);
  assert(item.stories?.greek?.paragraphs?.length === 2, `${prefix}: Western story requires two paragraphs`);
  assert(item.profile?.sources?.length >= 3, `${prefix}: source list is incomplete`);
});

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  const totals = constellations.reduce((summary, item) => {
    summary.chartStars += item.stars.length;
    summary.chartEdges += item.edges.length;
    summary.keyStars += item.profile.keyStars.length;
    summary.deepSky += item.profile.deepSky.length;
    return summary;
  }, { chartStars: 0, chartEdges: 0, keyStars: 0, deepSky: 0 });
  console.log(JSON.stringify({ constellations: constellations.length, ...totals }, null, 2));
}
