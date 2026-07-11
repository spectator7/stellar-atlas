import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const failures = [];
const sandbox = { window: {} };

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function loadDataFile(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  try {
    vm.runInNewContext(fs.readFileSync(absolutePath, "utf8"), sandbox, {
      filename: relativePath,
    });
  } catch (error) {
    fail(`${relativePath}: could not be loaded (${error.message})`);
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validIdentifier(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function validIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime())
    && date.getUTCFullYear() === Number(match[1])
    && date.getUTCMonth() + 1 === Number(match[2])
    && date.getUTCDate() === Number(match[3]);
}

function validHttpUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validTimeZone(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date(0));
    return true;
  } catch {
    return false;
  }
}

function validMonthDay(month, day) {
  if (!Number.isInteger(month) || month < 1 || month > 12) return false;
  if (!Number.isInteger(day) || day < 1) return false;
  const date = new Date(Date.UTC(2024, month - 1, day));
  return date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

loadDataFile(path.join("data", "constellations.js"));
loadDataFile(path.join("data", "observing-data.js"));

const constellations = sandbox.window.CONSTELLATIONS;
const observingData = sandbox.window.OBSERVING_DATA;

assert(Array.isArray(constellations), "data/constellations.js: window.CONSTELLATIONS must be an array");
assert(isObject(observingData), "data/observing-data.js: window.OBSERVING_DATA must be an object");

const constellationIds = new Set(
  Array.isArray(constellations)
    ? constellations.map((item) => String(item.abbr || "").toUpperCase()).filter(Boolean)
    : [],
);
assert(constellationIds.size === 88, `constellation catalog: expected 88 unique IAU abbreviations, found ${constellationIds.size}`);

if (isObject(observingData)) {
  assert(validIsoDate(observingData.reviewedAt),
    "observingData.reviewedAt: must be a valid YYYY-MM-DD date");

  assert(Array.isArray(observingData.timezones) && observingData.timezones.length > 0,
    "observingData.timezones: at least one timezone is required");
  const timezoneIds = new Set();
  if (Array.isArray(observingData.timezones)) {
    observingData.timezones.forEach((timezone, index) => {
      const label = `observingData.timezones[${index}]`;
      assert(isObject(timezone), `${label}: must be an object`);
      if (!isObject(timezone)) return;
      assert(isNonEmptyString(timezone.id), `${label}.id: is required`);
      assert(isNonEmptyString(timezone.label), `${label}.label: is required`);
      assert(validTimeZone(timezone.id), `${label}.id: invalid IANA timezone ${timezone.id}`);
      if (isNonEmptyString(timezone.id)) {
        assert(!timezoneIds.has(timezone.id), `${label}.id: duplicate timezone ${timezone.id}`);
        timezoneIds.add(timezone.id);
      }
    });
  }

  assert(Array.isArray(observingData.locations) && observingData.locations.length > 0,
    "observingData.locations: at least one location is required");
  const locationIds = new Set();
  if (Array.isArray(observingData.locations)) {
    observingData.locations.forEach((location, index) => {
      const label = isObject(location) && isNonEmptyString(location.id)
        ? `location ${location.id}`
        : `observingData.locations[${index}]`;
      assert(isObject(location), `${label}: must be an object`);
      if (!isObject(location)) return;

      assert(validIdentifier(location.id), `${label}.id: must be a lowercase kebab-case identifier`);
      if (isNonEmptyString(location.id)) {
        assert(!locationIds.has(location.id), `${label}.id: duplicate location id`);
        locationIds.add(location.id);
      }
      ["name", "region", "country"].forEach((field) => {
        assert(isNonEmptyString(location[field]), `${label}.${field}: is required`);
      });
      assert(Number.isFinite(location.latitude)
        && location.latitude >= -90 && location.latitude <= 90,
      `${label}.latitude: must be in [-90, 90]`);
      assert(Number.isFinite(location.longitude)
        && location.longitude >= -180 && location.longitude <= 180,
      `${label}.longitude: must be in [-180, 180]`);
      assert(Number.isFinite(location.elevation)
        && location.elevation >= -500 && location.elevation <= 9000,
      `${label}.elevation: must be a plausible elevation in metres`);
      assert(isNonEmptyString(location.timezone), `${label}.timezone: is required`);
      assert(validTimeZone(location.timezone), `${label}.timezone: invalid IANA timezone ${location.timezone}`);
      assert(timezoneIds.has(location.timezone),
        `${label}.timezone: ${location.timezone} is missing from observingData.timezones`);
      assert(Number.isInteger(location.bortle) && location.bortle >= 1 && location.bortle <= 9,
        `${label}.bortle: must be an integer from 1 to 9`);
    });
  }

  assert(Array.isArray(observingData.bortleScale) && observingData.bortleScale.length === 9,
    "observingData.bortleScale: expected all nine Bortle levels");
  const bortleLevels = new Set();
  if (Array.isArray(observingData.bortleScale)) {
    observingData.bortleScale.forEach((entry, index) => {
      const label = `observingData.bortleScale[${index}]`;
      assert(isObject(entry), `${label}: must be an object`);
      if (!isObject(entry)) return;
      assert(Number.isInteger(entry.level) && entry.level >= 1 && entry.level <= 9,
        `${label}.level: must be an integer from 1 to 9`);
      if (Number.isInteger(entry.level)) {
        assert(!bortleLevels.has(entry.level), `${label}.level: duplicate Bortle level ${entry.level}`);
        bortleLevels.add(entry.level);
      }
      assert(isNonEmptyString(entry.title), `${label}.title: is required`);
      assert(Number.isFinite(entry.nakedEyeLimit)
        && entry.nakedEyeLimit >= 0 && entry.nakedEyeLimit <= 10,
      `${label}.nakedEyeLimit: must be a finite magnitude in [0, 10]`);
      assert(isNonEmptyString(entry.note), `${label}.note: is required`);
    });
    for (let level = 1; level <= 9; level += 1) {
      assert(bortleLevels.has(level), `observingData.bortleScale: missing level ${level}`);
    }
    const sorted = [...observingData.bortleScale].sort((a, b) => a.level - b.level);
    for (let index = 1; index < sorted.length; index += 1) {
      assert(sorted[index].nakedEyeLimit < sorted[index - 1].nakedEyeLimit,
        `observingData.bortleScale: naked-eye limit should decrease from level ${sorted[index - 1].level} to ${sorted[index].level}`);
    }
  }

  assert(Array.isArray(observingData.meteorShowers) && observingData.meteorShowers.length > 0,
    "observingData.meteorShowers: at least one meteor shower is required");
  const showerIds = new Set();
  if (Array.isArray(observingData.meteorShowers)) {
    observingData.meteorShowers.forEach((shower, index) => {
      const label = isObject(shower) && isNonEmptyString(shower.id)
        ? `meteor shower ${shower.id}`
        : `observingData.meteorShowers[${index}]`;
      assert(isObject(shower), `${label}: must be an object`);
      if (!isObject(shower)) return;

      assert(validIdentifier(shower.id), `${label}.id: must be a lowercase kebab-case identifier`);
      if (isNonEmptyString(shower.id)) {
        assert(!showerIds.has(shower.id), `${label}.id: duplicate meteor shower id`);
        showerIds.add(shower.id);
      }
      ["name", "window", "zhr", "radiant", "parent", "hemisphere"].forEach((field) => {
        assert(isNonEmptyString(shower[field]), `${label}.${field}: is required`);
      });
      assert(validMonthDay(shower.peakMonth, shower.peakDay),
        `${label}: peakMonth/peakDay is not a valid calendar date`);
      assert(validMonthDay(shower.startMonth, shower.startDay),
        `${label}: startMonth/startDay is not a valid calendar date`);
      assert(validMonthDay(shower.endMonth, shower.endDay),
        `${label}: endMonth/endDay is not a valid calendar date`);
      const startKey = shower.startMonth * 100 + shower.startDay;
      const endKey = shower.endMonth * 100 + shower.endDay;
      const peakKey = shower.peakMonth * 100 + shower.peakDay;
      const peakWithinActivity = startKey <= endKey
        ? peakKey >= startKey && peakKey <= endKey
        : peakKey >= startKey || peakKey <= endKey;
      assert(peakWithinActivity, `${label}: peak date must fall inside the structured activity range`);
      if (Number.isInteger(shower.peakMonth) && isNonEmptyString(shower.window)) {
        assert(shower.window.includes(`${shower.peakMonth}月`),
          `${label}.window: should include the peak month ${shower.peakMonth}月`);
        assert(/(?:至|到|—|-)/u.test(shower.window),
          `${label}.window: should describe an activity date range`);
      }
      assert(typeof shower.constellation === "string" && /^[A-Z]{3}$/.test(shower.constellation),
        `${label}.constellation: must be a three-letter uppercase IAU abbreviation`);
      assert(constellationIds.has(shower.constellation),
        `${label}.constellation: unknown constellation ${shower.constellation}`);
    });
  }

  assert(Array.isArray(observingData.sources) && observingData.sources.length > 0,
    "observingData.sources: at least one source is required");
  const sourceUrls = new Set();
  if (Array.isArray(observingData.sources)) {
    observingData.sources.forEach((source, index) => {
      const label = `observingData.sources[${index}]`;
      assert(isObject(source), `${label}: must be an object`);
      if (!isObject(source)) return;
      assert(isNonEmptyString(source.label), `${label}.label: is required`);
      assert(validHttpUrl(source.url), `${label}.url: must be an HTTP(S) URL`);
      assert(isNonEmptyString(source.scope), `${label}.scope: is required`);
      if (isNonEmptyString(source.url)) {
        assert(!sourceUrls.has(source.url), `${label}.url: duplicate source URL ${source.url}`);
        sourceUrls.add(source.url);
      }
    });
  }
}

if (failures.length > 0) {
  console.error(`[validate-observing-data] ${failures.length} error(s)`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  const countries = new Set(observingData.locations.map((location) => location.country));
  const regions = new Set(observingData.locations.map((location) => location.region));
  const showerConstellations = new Set(
    observingData.meteorShowers.map((shower) => shower.constellation),
  );
  console.log(JSON.stringify({
    validator: "observing-data",
    reviewedAt: observingData.reviewedAt,
    locations: observingData.locations.length,
    countries: countries.size,
    regions: regions.size,
    timezones: observingData.timezones.length,
    bortleLevels: observingData.bortleScale.length,
    meteorShowers: observingData.meteorShowers.length,
    showerConstellations: showerConstellations.size,
    sources: observingData.sources.length,
  }, null, 2));
}
