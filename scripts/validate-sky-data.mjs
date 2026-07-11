import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sandbox = { window: {} };

vm.runInNewContext(
  fs.readFileSync(path.join(projectRoot, "data", "sky-atlas.js"), "utf8"),
  sandbox,
  { filename: "data/sky-atlas.js" },
);
vm.runInNewContext(
  fs.readFileSync(path.join(projectRoot, "data", "constellations.js"), "utf8"),
  sandbox,
  { filename: "data/constellations.js" },
);

const atlas = sandbox.window.SKY_ATLAS;
const constellations = sandbox.window.CONSTELLATIONS;

function invariant(condition, message) {
  if (!condition) throw new Error(`Sky atlas validation failed: ${message}`);
}

function validCoordinate(coordinate) {
  return Array.isArray(coordinate)
    && Number.isFinite(coordinate[0])
    && Number.isFinite(coordinate[1])
    && coordinate[0] >= -180
    && coordinate[0] <= 180
    && coordinate[1] >= -90
    && coordinate[1] <= 90;
}

function everyCoordinate(value) {
  if (Array.isArray(value) && value.length >= 2
    && typeof value[0] === "number" && typeof value[1] === "number") {
    return validCoordinate(value);
  }
  return Array.isArray(value) && value.every(everyCoordinate);
}

invariant(atlas && typeof atlas === "object", "window.SKY_ATLAS is missing");
invariant(Array.isArray(constellations) && constellations.length === 88, "content catalog must contain 88 constellations");
invariant(atlas.stars.length === 5044, `expected 5044 stars, found ${atlas.stars.length}`);
invariant(atlas.boundaries.length === 88, `expected 88 boundaries, found ${atlas.boundaries.length}`);
invariant(atlas.lines.length === 88, `expected 88 line groups, found ${atlas.lines.length}`);
invariant(atlas.deepSky.filter((item) => item.catalog === "Messier").length === 110,
  "Messier catalog must contain 110 objects");

const constellationIds = new Set(atlas.boundaries.map((entry) => String(entry.id).toUpperCase()));
const contentIds = new Set(constellations.map((entry) => String(entry.abbr).toUpperCase()));
invariant(constellationIds.size === 88, "boundary identifiers are not unique");
invariant([...contentIds].every((id) => constellationIds.has(id)), "content and sky constellation identifiers differ");
invariant(new Set(atlas.stars.map((star) => star.hip)).size === atlas.stars.length, "HIP identifiers are not unique");
invariant(atlas.stars.every((star) => validCoordinate([star.ra, star.dec])), "star coordinate is outside the J2000 range");
invariant(atlas.stars.every((star) => Number.isFinite(star.mag) && star.mag <= 6), "star magnitude is missing or exceeds 6");
invariant(atlas.stars.every((star) => constellationIds.has(String(star.constellation).toUpperCase())),
  "star has an unknown constellation");
invariant(atlas.boundaries.every((entry) => everyCoordinate(entry.polygons)), "boundary coordinate is invalid");
invariant(atlas.lines.every((entry) => everyCoordinate(entry.paths)), "line coordinate is invalid");
invariant(atlas.deepSky.every((item) => validCoordinate([item.ra, item.dec])), "deep-sky coordinate is invalid");
invariant(atlas.deepSky.every((item) => constellationIds.has(String(item.constellation).toUpperCase())),
  "deep-sky object has an unknown constellation");

console.log(JSON.stringify({
  epoch: atlas.meta.epoch,
  stars: atlas.stars.length,
  constellations: atlas.boundaries.length,
  boundaryPolygons: atlas.meta.counts.boundaryPolygons,
  linePaths: atlas.meta.counts.linePaths,
  deepSky: atlas.deepSky.length,
  messier: atlas.deepSky.filter((item) => item.catalog === "Messier").length,
}, null, 2));
