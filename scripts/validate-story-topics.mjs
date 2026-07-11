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

const historicalDateHint = /(?:\d|前|公元|世纪|千纪|年代|时期|时代|现代|当代|近现代|后世|至今|先秦|战国|秦|汉|晋|隋|唐|宋|元|明|清|希腊|罗马|中世纪|传统|纪元)/u;

function validateHumanDate(value, label) {
  assert(isNonEmptyString(value), `${label}: date/period is required`);
  if (!isNonEmptyString(value)) return;
  assert(value.length <= 100, `${label}: date/period is unexpectedly long`);
  assert(historicalDateHint.test(value), `${label}: date/period lacks a recognizable era or numeric date`);
}

function validateStringArray(value, label, { minimum = 1, unique = false } = {}) {
  assert(Array.isArray(value), `${label}: must be an array`);
  if (!Array.isArray(value)) return;
  assert(value.length >= minimum, `${label}: expected at least ${minimum} item(s)`);
  value.forEach((item, index) => {
    assert(isNonEmptyString(item), `${label}[${index}]: must be a non-empty string`);
  });
  if (unique) {
    assert(new Set(value).size === value.length, `${label}: entries must be unique`);
  }
}

loadDataFile(path.join("data", "constellations.js"));
loadDataFile(path.join("data", "story-topics.js"));
const baseTopicCount = Array.isArray(sandbox.window.STORY_TOPICS)
  ? sandbox.window.STORY_TOPICS.length
  : 0;
loadDataFile(path.join("data", "story-topics-extra.js"));

const constellations = sandbox.window.CONSTELLATIONS;
const topics = sandbox.window.STORY_TOPICS;

assert(Array.isArray(constellations), "data/constellations.js: window.CONSTELLATIONS must be an array");
assert(Array.isArray(topics), "story topic files: window.STORY_TOPICS must be an array");

const constellationIds = new Set(
  Array.isArray(constellations)
    ? constellations.map((item) => String(item.abbr || "").toUpperCase()).filter(Boolean)
    : [],
);
assert(constellationIds.size === 88, `constellation catalog: expected 88 unique IAU abbreviations, found ${constellationIds.size}`);

const topicIds = new Set();
const totals = {
  sections: 0,
  timelineEntries: 0,
  networkNodes: 0,
  networkEdges: 0,
  comparisons: 0,
  sources: 0,
};

if (Array.isArray(topics)) {
  assert(topics.length > 0, "story topic files: at least one topic is required");

  topics.forEach((topic, topicIndex) => {
    const fallbackLabel = `topic[${topicIndex}]`;
    assert(isObject(topic), `${fallbackLabel}: must be an object`);
    if (!isObject(topic)) return;

    const topicLabel = isNonEmptyString(topic.id) ? topic.id : fallbackLabel;
    assert(validIdentifier(topic.id), `${topicLabel}: id must be a lowercase kebab-case identifier`);
    if (isNonEmptyString(topic.id)) {
      assert(!topicIds.has(topic.id), `${topicLabel}: duplicate topic id`);
      topicIds.add(topic.id);
    }

    ["title", "kicker", "category", "summary", "evidenceNote"].forEach((field) => {
      assert(isNonEmptyString(topic[field]), `${topicLabel}.${field}: is required`);
    });
    assert(typeof topic.featured === "boolean", `${topicLabel}.featured: must be boolean`);
    assert(Number.isInteger(topic.readingMinutes) && topic.readingMinutes > 0,
      `${topicLabel}.readingMinutes: must be a positive integer`);
    validateHumanDate(topic.period, `${topicLabel}.period`);
    validateStringArray(topic.eraTags, `${topicLabel}.eraTags`, { minimum: 1, unique: true });
    validateStringArray(topic.cultures, `${topicLabel}.cultures`, { minimum: 1, unique: true });
    validateStringArray(topic.relatedConstellations, `${topicLabel}.relatedConstellations`, {
      minimum: 1,
      unique: true,
    });
    if (Array.isArray(topic.relatedConstellations)) {
      topic.relatedConstellations.forEach((abbreviation, index) => {
        assert(typeof abbreviation === "string" && /^[A-Z]{3}$/.test(abbreviation),
          `${topicLabel}.relatedConstellations[${index}]: must be a three-letter uppercase IAU abbreviation`);
        assert(constellationIds.has(abbreviation),
          `${topicLabel}.relatedConstellations[${index}]: unknown constellation ${abbreviation}`);
      });
    }

    assert(Array.isArray(topic.sections) && topic.sections.length > 0,
      `${topicLabel}.sections: at least one section is required`);
    const sectionIds = new Set();
    if (Array.isArray(topic.sections)) {
      totals.sections += topic.sections.length;
      topic.sections.forEach((section, sectionIndex) => {
        const sectionLabel = `${topicLabel}.sections[${sectionIndex}]`;
        assert(isObject(section), `${sectionLabel}: must be an object`);
        if (!isObject(section)) return;
        assert(validIdentifier(section.id), `${sectionLabel}.id: must be a lowercase kebab-case identifier`);
        if (isNonEmptyString(section.id)) {
          assert(!sectionIds.has(section.id), `${topicLabel}: duplicate section id ${section.id}`);
          sectionIds.add(section.id);
        }
        ["title", "kind", "evidence"].forEach((field) => {
          assert(isNonEmptyString(section[field]), `${sectionLabel}.${field}: is required`);
        });
        validateStringArray(section.paragraphs, `${sectionLabel}.paragraphs`, { minimum: 1 });
      });
    }

    assert(Array.isArray(topic.timeline) && topic.timeline.length > 0,
      `${topicLabel}.timeline: at least one timeline entry is required`);
    if (Array.isArray(topic.timeline)) {
      totals.timelineEntries += topic.timeline.length;
      topic.timeline.forEach((entry, entryIndex) => {
        const entryLabel = `${topicLabel}.timeline[${entryIndex}]`;
        assert(isObject(entry), `${entryLabel}: must be an object`);
        if (!isObject(entry)) return;
        validateHumanDate(entry.date, `${entryLabel}.date`);
        ["title", "description", "certainty"].forEach((field) => {
          assert(isNonEmptyString(entry[field]), `${entryLabel}.${field}: is required`);
        });
      });
    }

    assert(Array.isArray(topic.keyFigures), `${topicLabel}.keyFigures: must be an array`);
    if (Array.isArray(topic.keyFigures)) {
      topic.keyFigures.forEach((figure, figureIndex) => {
        const figureLabel = `${topicLabel}.keyFigures[${figureIndex}]`;
        assert(isObject(figure), `${figureLabel}: must be an object`);
        if (!isObject(figure)) return;
        ["name", "lifespan", "role", "contribution"].forEach((field) => {
          assert(isNonEmptyString(figure[field]), `${figureLabel}.${field}: is required`);
        });
      });
    }

    assert(Array.isArray(topic.quotes), `${topicLabel}.quotes: must be an array`);
    if (Array.isArray(topic.quotes)) {
      topic.quotes.forEach((quote, quoteIndex) => {
        const quoteLabel = `${topicLabel}.quotes[${quoteIndex}]`;
        assert(isObject(quote), `${quoteLabel}: must be an object`);
        if (!isObject(quote)) return;
        ["text", "attribution", "work", "date", "note"].forEach((field) => {
          assert(isNonEmptyString(quote[field]), `${quoteLabel}.${field}: is required`);
        });
        if (isNonEmptyString(quote.date)) validateHumanDate(quote.date, `${quoteLabel}.date`);
        assert(validHttpUrl(quote.sourceUrl), `${quoteLabel}.sourceUrl: must be an HTTP(S) URL`);
      });
    }

    assert(isObject(topic.network), `${topicLabel}.network: is required`);
    if (isObject(topic.network)) {
      assert(isNonEmptyString(topic.network.title), `${topicLabel}.network.title: is required`);
      assert(Array.isArray(topic.network.nodes) && topic.network.nodes.length > 0,
        `${topicLabel}.network.nodes: at least one node is required`);
      assert(Array.isArray(topic.network.edges), `${topicLabel}.network.edges: must be an array`);

      const nodeIds = new Set();
      if (Array.isArray(topic.network.nodes)) {
        totals.networkNodes += topic.network.nodes.length;
        topic.network.nodes.forEach((node, nodeIndex) => {
          const nodeLabel = `${topicLabel}.network.nodes[${nodeIndex}]`;
          assert(isObject(node), `${nodeLabel}: must be an object`);
          if (!isObject(node)) return;
          assert(validIdentifier(node.id), `${nodeLabel}.id: must be a lowercase kebab-case identifier`);
          if (isNonEmptyString(node.id)) {
            assert(!nodeIds.has(node.id), `${topicLabel}.network: duplicate node id ${node.id}`);
            nodeIds.add(node.id);
          }
          assert(isNonEmptyString(node.label), `${nodeLabel}.label: is required`);
          assert(isNonEmptyString(node.type), `${nodeLabel}.type: is required`);
          if (node.constellation !== undefined) {
            assert(typeof node.constellation === "string" && /^[A-Z]{3}$/.test(node.constellation),
              `${nodeLabel}.constellation: must be a three-letter uppercase IAU abbreviation`);
            assert(constellationIds.has(node.constellation),
              `${nodeLabel}.constellation: unknown constellation ${node.constellation}`);
          }
        });
      }

      if (Array.isArray(topic.network.edges)) {
        totals.networkEdges += topic.network.edges.length;
        topic.network.edges.forEach((edge, edgeIndex) => {
          const edgeLabel = `${topicLabel}.network.edges[${edgeIndex}]`;
          assert(isObject(edge), `${edgeLabel}: must be an object`);
          if (!isObject(edge)) return;
          assert(isNonEmptyString(edge.from), `${edgeLabel}.from: is required`);
          assert(isNonEmptyString(edge.to), `${edgeLabel}.to: is required`);
          assert(isNonEmptyString(edge.label), `${edgeLabel}.label: is required`);
          assert(nodeIds.has(edge.from), `${edgeLabel}.from: references unknown node ${edge.from}`);
          assert(nodeIds.has(edge.to), `${edgeLabel}.to: references unknown node ${edge.to}`);
          assert(edge.from !== edge.to, `${edgeLabel}: self-referencing edges are not allowed`);
        });
      }
    }

    assert(Array.isArray(topic.comparisons) && topic.comparisons.length > 0,
      `${topicLabel}.comparisons: at least one comparison is required`);
    if (Array.isArray(topic.comparisons)) {
      totals.comparisons += topic.comparisons.length;
      topic.comparisons.forEach((comparison, comparisonIndex) => {
        const comparisonLabel = `${topicLabel}.comparisons[${comparisonIndex}]`;
        assert(isObject(comparison), `${comparisonLabel}: must be an object`);
        if (!isObject(comparison)) return;
        assert(isNonEmptyString(comparison.label), `${comparisonLabel}.label: is required`);
        assert(Array.isArray(comparison.traditions) && comparison.traditions.length >= 2,
          `${comparisonLabel}.traditions: at least two traditions are required`);
        if (Array.isArray(comparison.traditions)) {
          comparison.traditions.forEach((tradition, traditionIndex) => {
            const traditionLabel = `${comparisonLabel}.traditions[${traditionIndex}]`;
            assert(isObject(tradition), `${traditionLabel}: must be an object`);
            if (!isObject(tradition)) return;
            assert(isNonEmptyString(tradition.culture), `${traditionLabel}.culture: is required`);
            assert(isNonEmptyString(tradition.value), `${traditionLabel}.value: is required`);
          });
        }
      });
    }

    assert(Array.isArray(topic.sources) && topic.sources.length > 0,
      `${topicLabel}.sources: at least one source is required`);
    if (Array.isArray(topic.sources)) {
      totals.sources += topic.sources.length;
      const sourceUrls = new Set();
      topic.sources.forEach((source, sourceIndex) => {
        const sourceLabel = `${topicLabel}.sources[${sourceIndex}]`;
        assert(isObject(source), `${sourceLabel}: must be an object`);
        if (!isObject(source)) return;
        ["label", "type", "note"].forEach((field) => {
          assert(isNonEmptyString(source[field]), `${sourceLabel}.${field}: is required`);
        });
        assert(validHttpUrl(source.url), `${sourceLabel}.url: must be an HTTP(S) URL`);
        if (isNonEmptyString(source.url)) {
          assert(!sourceUrls.has(source.url), `${topicLabel}.sources: duplicate URL ${source.url}`);
          sourceUrls.add(source.url);
        }
      });
    }

    assert(validIsoDate(topic.reviewedAt), `${topicLabel}.reviewedAt: must be a valid YYYY-MM-DD date`);
  });
}

if (failures.length > 0) {
  console.error(`[validate-story-topics] ${failures.length} error(s)`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  const categories = new Set(topics.map((topic) => topic.category));
  const relatedConstellations = new Set(topics.flatMap((topic) => topic.relatedConstellations));
  console.log(JSON.stringify({
    validator: "story-topics",
    baseTopics: baseTopicCount,
    extraTopics: topics.length - baseTopicCount,
    topics: topics.length,
    categories: categories.size,
    relatedConstellations: relatedConstellations.size,
    ...totals,
  }, null, 2));
}
