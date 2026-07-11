"use strict";

(() => {
  function searchableText(topic) {
    return [
      topic.title,
      topic.kicker,
      topic.summary,
      topic.period,
      ...(topic.cultures || []),
      ...(topic.sections || []).flatMap((section) => [section.title, ...(section.paragraphs || [])]),
      ...(topic.keyFigures || []).flatMap((figure) => [figure.name, figure.role, figure.contribution]),
      ...(topic.eraTags || []),
      ...(topic.quotes || []).flatMap((quote) => [quote.text, quote.attribution, quote.work]),
      ...(topic.sources || []).map((source) => source.label),
    ].join(" ").normalize("NFKC").toLowerCase();
  }

  class StoryLibrary {
    constructor(options = {}) {
      this.topics = options.topics || [];
      this.constellations = options.constellations || [];
      this.onSelectConstellation = options.onSelectConstellation || (() => {});
      this.onToast = options.onToast || (() => {});
      this.constellationByAbbr = new Map(
        this.constellations.map((item) => [String(item.abbr).toUpperCase(), item]),
      );
      this.state = {
        activeId: this.readInitialTopic(),
        search: "",
        culture: "all",
        era: "all",
      };
      this.graphNodes = [];
      this.graphWidth = 420;
      this.graphHeight = 360;
      this.pixelRatio = 1;

      this.dom = Object.fromEntries([
        "topicStatCount", "topicCultureCount", "topicConstellationCount", "topicSearch", "topicCultureFilter", "topicEraFilter", "topicResultCount", "topicList",
        "topicKicker", "topicTitle", "topicShare", "topicSummary", "topicPeriod", "topicCultures",
        "topicReadingTime", "topicReviewedAt", "topicSections", "topicRelationTitle", "topicRelationCanvas",
        "topicRelationList", "topicRelatedConstellations", "topicTimeline", "topicComparisons", "topicSources",
        "topicPrev", "topicNext",
      ].map((id) => [id, document.querySelector(`#${id}`)]));

      if (!this.topics.length || !this.dom.topicList) return;
      this.context = this.dom.topicRelationCanvas.getContext("2d");
      this.readerElements = [
        document.querySelector(".topic-reader"),
        document.querySelector(".topic-context"),
        document.querySelector(".topic-evidence"),
        document.querySelector(".topic-pagination"),
      ].filter(Boolean);
      this.populateFilters();
      this.bindControls();
      this.resizeObserver = new ResizeObserver(() => this.resizeGraph());
      this.resizeObserver.observe(this.dom.topicRelationCanvas.parentElement);
      this.dom.topicStatCount.textContent = String(this.topics.length).padStart(2, "0");
      this.dom.topicCultureCount.textContent = String(new Set(this.topics.flatMap((topic) => topic.cultures || [])).size).padStart(2, "0");
      this.dom.topicConstellationCount.textContent = String(new Set(this.topics.flatMap((topic) => topic.relatedConstellations || [])).size).padStart(2, "0");
      this.render();
      this.resizeGraph();
    }

    activeTopic() {
      return this.topics.find((topic) => topic.id === this.state.activeId) || this.topics[0];
    }

    readInitialTopic() {
      try {
        const id = new URL(window.location.href).searchParams.get("topic");
        if (id && this.topics.some((topic) => topic.id === id)) return id;
      } catch {
        // Local file previews can restrict URL parsing.
      }
      return this.topics.find((topic) => topic.featured)?.id || this.topics[0]?.id;
    }

    populateFilters() {
      const cultures = [...new Set(this.topics.flatMap((topic) => topic.cultures || []))]
        .sort((left, right) => left.localeCompare(right, "zh-CN"));
      cultures.forEach((culture) => {
        const option = document.createElement("option");
        option.value = culture;
        option.textContent = culture;
        this.dom.topicCultureFilter.append(option);
      });
      const eraTags = [...new Set(this.topics.flatMap((topic) => topic.eraTags || []))]
        .sort((left, right) => left.localeCompare(right, "zh-CN"));
      eraTags.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        this.dom.topicEraFilter.append(option);
      });
    }

    bindControls() {
      this.dom.topicSearch.addEventListener("input", (event) => {
        this.state.search = event.target.value.trim().normalize("NFKC").toLowerCase();
        this.render();
      });
      this.dom.topicCultureFilter.addEventListener("change", (event) => {
        this.state.culture = event.target.value;
        this.render();
      });
      this.dom.topicEraFilter.addEventListener("change", (event) => {
        this.state.era = event.target.value;
        this.render();
      });
      this.dom.topicList.addEventListener("click", (event) => {
        const link = event.target.closest("a[data-topic-id]");
        if (!link) return;
        event.preventDefault();
        this.selectTopic(link.dataset.topicId, true);
      });
      this.dom.topicShare.addEventListener("click", () => this.copyTopicLink());
      this.dom.topicPrev.addEventListener("click", () => this.moveTopic(-1));
      this.dom.topicNext.addEventListener("click", () => this.moveTopic(1));
      this.dom.topicRelationCanvas.addEventListener("click", (event) => this.pickGraphNode(event));
      window.addEventListener("popstate", () => {
        const id = this.readInitialTopic();
        if (id && id !== this.state.activeId) this.selectTopic(id, false);
      });
    }

    filteredTopics() {
      return this.topics.filter((topic) => {
        const matchesSearch = !this.state.search || searchableText(topic).includes(this.state.search);
        const matchesCulture = this.state.culture === "all" || (topic.cultures || []).includes(this.state.culture);
        const matchesEra = this.state.era === "all" || (topic.eraTags || []).includes(this.state.era);
        return matchesSearch && matchesCulture && matchesEra;
      });
    }

    render() {
      const filtered = this.filteredTopics();
      this.readerElements.forEach((element) => { element.hidden = filtered.length === 0; });
      if (!filtered.length) {
        this.renderIndex(filtered);
        return;
      }
      if (filtered.length && !filtered.some((topic) => topic.id === this.state.activeId)) {
        this.state.activeId = filtered[0].id;
      }
      this.renderIndex(filtered);
      this.renderTopic();
    }

    renderIndex(filtered = this.filteredTopics()) {
      this.dom.topicResultCount.textContent = `${filtered.length} 篇`;
      this.dom.topicList.replaceChildren();
      filtered.forEach((topic, index) => {
        const button = document.createElement("a");
        const url = new URL(window.location.href);
        url.searchParams.set("topic", topic.id);
        url.hash = "story-library";
        button.href = url.toString();
        button.dataset.topicId = topic.id;
        button.className = topic.id === this.state.activeId ? "is-active" : "";
        if (topic.id === this.state.activeId) button.setAttribute("aria-current", "page");
        const number = document.createElement("span");
        number.textContent = String(index + 1).padStart(2, "0");
        const content = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = topic.title;
        const meta = document.createElement("small");
        meta.textContent = `${topic.category} · ${topic.readingMinutes || 8} 分钟`;
        content.append(title, meta);
        button.append(number, content);
        this.dom.topicList.append(button);
      });
      if (!filtered.length) {
        const empty = document.createElement("p");
        empty.className = "topic-empty";
        empty.textContent = "没有找到匹配的专题。";
        this.dom.topicList.append(empty);
      }
    }

    selectTopic(id, updateAddress) {
      if (!this.topics.some((topic) => topic.id === id)) return;
      this.state.activeId = id;
      if (updateAddress) this.updateUrl(id);
      this.renderIndex();
      this.renderTopic();
    }

    renderTopic() {
      const topic = this.activeTopic();
      if (!topic) return;
      this.dom.topicKicker.textContent = topic.kicker;
      this.dom.topicTitle.textContent = topic.title;
      this.dom.topicSummary.textContent = topic.summary;
      this.dom.topicPeriod.textContent = topic.period;
      this.dom.topicCultures.textContent = (topic.cultures || []).join(" / ");
      this.dom.topicReadingTime.textContent = `约 ${topic.readingMinutes || 8} 分钟`;
      this.dom.topicReviewedAt.textContent = topic.reviewedAt || "未标注";
      this.renderSections(topic);
      this.renderRelatedConstellations(topic);
      this.renderTimeline(topic);
      this.renderComparisons(topic);
      this.renderSources(topic);
      this.renderRelationshipList(topic);
      this.dom.topicRelationTitle.textContent = topic.network?.title || "专题关系网络";
      this.dom.topicRelationCanvas.setAttribute(
        "aria-label",
        `${topic.title}：${topic.network?.title || "专题关系网络"}，${topic.network?.nodes?.length || 0} 个节点，${topic.network?.edges?.length || 0} 条关系`,
      );
      this.layoutAndDrawGraph(topic);
      this.updatePagination();
    }

    renderSections(topic) {
      this.dom.topicSections.replaceChildren();
      if (topic.evidenceNote) {
        const note = document.createElement("aside");
        note.className = "topic-evidence-note";
        const label = document.createElement("strong");
        label.textContent = "史料边界";
        const text = document.createElement("p");
        text.textContent = topic.evidenceNote;
        note.append(label, text);
        this.dom.topicSections.append(note);
      }

      (topic.sections || []).forEach((section, index) => {
        const article = document.createElement("section");
        const marker = document.createElement("p");
        marker.className = "topic-section-marker";
        marker.textContent = String(index + 1).padStart(2, "0");
        const title = document.createElement("h4");
        title.textContent = section.title;
        article.append(marker, title);
        (section.paragraphs || []).forEach((paragraph) => {
          const text = document.createElement("p");
          text.textContent = paragraph;
          article.append(text);
        });
        if (section.evidence) {
          const evidence = document.createElement("p");
          evidence.className = "section-evidence";
          evidence.textContent = `依据与口径：${section.evidence}`;
          article.append(evidence);
        }
        this.dom.topicSections.append(article);
      });

      if (topic.quotes?.length) {
        const quotes = document.createElement("section");
        quotes.className = "topic-quotes";
        const heading = document.createElement("h4");
        heading.textContent = "原典短引";
        quotes.append(heading);
        topic.quotes.forEach((quote) => {
          const blockquote = document.createElement("blockquote");
          const text = document.createElement("p");
          text.textContent = `“${quote.text}”`;
          const cite = document.createElement("cite");
          cite.textContent = `${quote.attribution}${quote.work ? ` · ${quote.work}` : ""}${quote.date ? ` · ${quote.date}` : ""}`;
          const note = document.createElement("small");
          note.textContent = quote.note || "";
          blockquote.append(text, cite, note);
          quotes.append(blockquote);
        });
        this.dom.topicSections.append(quotes);
      }

      if (topic.keyFigures?.length) {
        const figures = document.createElement("section");
        figures.className = "topic-figures";
        const heading = document.createElement("h4");
        heading.textContent = "关键人物与文本角色";
        figures.append(heading);
        const list = document.createElement("div");
        topic.keyFigures.forEach((figure) => {
          const row = document.createElement("article");
          const title = document.createElement("p");
          const name = document.createElement("strong");
          name.textContent = figure.name;
          const lifespan = document.createElement("span");
          lifespan.textContent = figure.lifespan || "";
          title.append(name, lifespan);
          const role = document.createElement("small");
          role.textContent = figure.role || "";
          const contribution = document.createElement("p");
          contribution.textContent = figure.contribution || "";
          row.append(title, role, contribution);
          list.append(row);
        });
        figures.append(list);
        this.dom.topicSections.append(figures);
      }
    }

    renderRelatedConstellations(topic) {
      this.dom.topicRelatedConstellations.replaceChildren();
      (topic.relatedConstellations || []).forEach((abbr) => {
        const item = this.constellationByAbbr.get(String(abbr).toUpperCase());
        if (!item) return;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = `${item.name} · ${item.abbr}`;
        button.addEventListener("click", () => this.onSelectConstellation(item.id));
        this.dom.topicRelatedConstellations.append(button);
      });
    }

    renderTimeline(topic) {
      this.dom.topicTimeline.replaceChildren();
      (topic.timeline || []).forEach((entry) => {
        const item = document.createElement("li");
        const time = document.createElement("time");
        time.textContent = entry.date;
        const content = document.createElement("div");
        const title = document.createElement("h4");
        title.textContent = entry.title;
        const description = document.createElement("p");
        description.textContent = entry.description;
        const certainty = document.createElement("span");
        certainty.textContent = entry.certainty || "资料节点";
        content.append(title, description, certainty);
        item.append(time, content);
        this.dom.topicTimeline.append(item);
      });
    }

    renderComparisons(topic) {
      this.dom.topicComparisons.replaceChildren();
      if (!topic.comparisons?.length) {
        const empty = document.createElement("p");
        empty.className = "topic-comparison-empty";
        empty.textContent = "本专题以单一传统内部的文本演变为主。";
        this.dom.topicComparisons.append(empty);
        return;
      }
      topic.comparisons.forEach((comparison) => {
        const section = document.createElement("section");
        const heading = document.createElement("h4");
        heading.textContent = comparison.label;
        section.append(heading);
        (comparison.traditions || []).forEach((tradition) => {
          const row = document.createElement("div");
          const culture = document.createElement("strong");
          culture.textContent = tradition.culture;
          const value = document.createElement("p");
          value.textContent = tradition.value;
          row.append(culture, value);
          section.append(row);
        });
        this.dom.topicComparisons.append(section);
      });
    }

    renderSources(topic) {
      this.dom.topicSources.replaceChildren();
      (topic.sources || []).forEach((source) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = source.label;
        const meta = document.createElement("span");
        meta.textContent = `${source.type || "参考资料"}${source.note ? ` · ${source.note}` : ""}`;
        item.append(link, meta);
        this.dom.topicSources.append(item);
      });
    }

    renderRelationshipList(topic) {
      this.dom.topicRelationList.replaceChildren();
      const nodeById = new Map((topic.network?.nodes || []).map((node) => [node.id, node]));
      (topic.network?.edges || []).forEach((edge) => {
        const item = document.createElement("li");
        item.textContent = `${nodeById.get(edge.from)?.label || edge.from}与${nodeById.get(edge.to)?.label || edge.to}：${edge.label || "相关"}`;
        this.dom.topicRelationList.append(item);
      });
    }

    resizeGraph() {
      const canvas = this.dom.topicRelationCanvas;
      const bounds = canvas.parentElement.getBoundingClientRect();
      const width = Math.max(280, Math.round(bounds.width));
      const height = Math.max(320, Math.min(460, Math.round(width * 0.86)));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (width === this.graphWidth && height === this.graphHeight && pixelRatio === this.pixelRatio) return;
      this.graphWidth = width;
      this.graphHeight = height;
      this.pixelRatio = pixelRatio;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      this.layoutAndDrawGraph(this.activeTopic());
    }

    layoutAndDrawGraph(topic) {
      if (!topic?.network?.nodes?.length || !window.d3 || !this.context) return;
      const nodes = topic.network.nodes.map((node) => ({ ...node }));
      const links = (topic.network.edges || []).map((edge) => ({
        ...edge,
        source: edge.from,
        target: edge.to,
      }));
      const simulation = window.d3.forceSimulation(nodes)
        .force("link", window.d3.forceLink(links).id((node) => node.id).distance(86).strength(0.7))
        .force("charge", window.d3.forceManyBody().strength(-220))
        .force("center", window.d3.forceCenter(this.graphWidth / 2, this.graphHeight / 2))
        .force("collide", window.d3.forceCollide().radius(38))
        .stop();
      for (let index = 0; index < 220; index += 1) simulation.tick();
      nodes.forEach((node) => {
        node.x = Math.max(45, Math.min(this.graphWidth - 45, node.x));
        node.y = Math.max(42, Math.min(this.graphHeight - 42, node.y));
      });
      this.graphNodes = nodes;
      this.drawGraph(nodes, links);
    }

    drawGraph(nodes, links) {
      const context = this.context;
      context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      context.fillStyle = "#0c0e13";
      context.fillRect(0, 0, this.graphWidth, this.graphHeight);

      context.lineWidth = 0.8;
      links.forEach((link) => {
        const source = typeof link.source === "object" ? link.source : nodes.find((node) => node.id === link.source);
        const target = typeof link.target === "object" ? link.target : nodes.find((node) => node.id === link.target);
        if (!source || !target) return;
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = "rgba(119, 178, 170, 0.42)";
        context.stroke();
        if (link.label && this.graphWidth > 360) {
          context.fillStyle = "rgba(211, 225, 221, 0.46)";
          context.font = "9px Inter, 'PingFang SC', sans-serif";
          context.textAlign = "center";
          context.fillText(link.label, (source.x + target.x) / 2, (source.y + target.y) / 2 - 4);
        }
      });

      const colors = {
        enclosure: "#d8ab5f",
        symbol: "#2e7471",
        framework: "#ad654a",
        person: "#d8ab5f",
        text: "#7ea9a4",
        constellation: "#c98567",
      };
      nodes.forEach((node) => {
        const color = colors[node.type] || "#8eb9b3";
        context.beginPath();
        context.arc(node.x, node.y, node.constellation ? 12 : 9, 0, Math.PI * 2);
        context.fillStyle = "#111820";
        context.fill();
        context.strokeStyle = color;
        context.lineWidth = node.constellation ? 2 : 1.2;
        context.stroke();
        context.fillStyle = "rgba(245, 240, 227, 0.9)";
        context.font = `${node.constellation ? "700" : "600"} 11px Inter, 'PingFang SC', sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillText(node.label, node.x, node.y + 15);
      });
    }

    pickGraphNode(event) {
      if (!this.graphNodes.length) return;
      const bounds = this.dom.topicRelationCanvas.getBoundingClientRect();
      const x = (event.clientX - bounds.left) * this.graphWidth / bounds.width;
      const y = (event.clientY - bounds.top) * this.graphHeight / bounds.height;
      const nearest = this.graphNodes
        .map((node) => ({ node, distance: Math.hypot(node.x - x, node.y - y) }))
        .sort((left, right) => left.distance - right.distance)[0];
      if (!nearest || nearest.distance > 18 || !nearest.node.constellation) return;
      const item = this.constellationByAbbr.get(String(nearest.node.constellation).toUpperCase());
      if (item) this.onSelectConstellation(item.id);
    }

    moveTopic(offset) {
      const sequence = this.filteredTopics();
      const index = sequence.findIndex((topic) => topic.id === this.state.activeId);
      const target = sequence[index + offset];
      if (target) this.selectTopic(target.id, true);
    }

    updatePagination() {
      const sequence = this.filteredTopics();
      const index = sequence.findIndex((topic) => topic.id === this.state.activeId);
      const previous = sequence[index - 1];
      const next = sequence[index + 1];
      this.dom.topicPrev.disabled = !previous;
      this.dom.topicNext.disabled = !next;
      this.dom.topicPrev.title = previous?.title || "已经是第一篇";
      this.dom.topicNext.title = next?.title || "已经是最后一篇";
      this.dom.topicPrev.setAttribute("aria-label", previous ? `上一篇：${previous.title}` : "已经是第一篇");
      this.dom.topicNext.setAttribute("aria-label", next ? `下一篇：${next.title}` : "已经是最后一篇");
      this.dom.topicPrev.querySelector("span:last-child").textContent = previous ? `上一篇 · ${previous.title}` : "上一篇";
      this.dom.topicNext.querySelector("span:first-child").textContent = next ? `下一篇 · ${next.title}` : "下一篇";
    }

    updateUrl(id) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("topic", id);
        url.hash = "story-library";
        history.pushState({}, "", url);
      } catch {
        // Local file previews can restrict history updates.
      }
    }

    async copyTopicLink() {
      const url = new URL(window.location.href);
      url.searchParams.set("topic", this.state.activeId);
      url.hash = "story-library";
      try {
        await navigator.clipboard.writeText(url.toString());
        this.onToast("专题链接已复制");
      } catch {
        this.onToast("可从浏览器地址栏复制专题链接");
      }
    }
  }

  window.StoryLibrary = StoryLibrary;
})();
