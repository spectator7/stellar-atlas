"use strict";

(() => {
  const DEG = Math.PI / 180;
  const MIN_ZOOM = 0.82;
  const MAX_ZOOM = 8;

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function normalizeLongitude(value) {
    return ((value + 180) % 360 + 360) % 360 - 180;
  }

  function normalizeRaDegrees(value) {
    return ((value % 360) + 360) % 360;
  }

  function formatRightAscension(longitude, includeSeconds = false) {
    const totalHours = normalizeRaDegrees(longitude) / 15;
    if (includeSeconds) {
      const totalSeconds = Math.round(totalHours * 3600) % 86400;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
    }
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  }

  function formatDeclination(value, includeMinutes = false) {
    const sign = value >= 0 ? "+" : "−";
    const absolute = Math.abs(value);
    const degrees = Math.floor(absolute);
    if (!includeMinutes) return `${sign}${String(degrees).padStart(2, "0")}°`;
    const totalMinutes = Math.round(absolute * 60);
    const roundedDegrees = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${sign}${String(roundedDegrees).padStart(2, "0")}° ${String(minutes).padStart(2, "0")}′`;
  }

  function constellationCenter(item) {
    const rawLongitude = Number(item?.profile?.center?.longitude ?? 0);
    const longitude = Math.abs(rawLongitude) <= 24 ? rawLongitude * 15 : rawLongitude;
    return {
      longitude: normalizeLongitude(longitude),
      declination: clamp(Number(item?.profile?.center?.declination ?? 0), -89, 89),
    };
  }

  function starColor(bv) {
    if (!Number.isFinite(bv)) return "#fff8e7";
    if (bv < -0.1) return "#9fc4ff";
    if (bv < 0.3) return "#c8dcff";
    if (bv < 0.6) return "#fffaf0";
    if (bv < 1) return "#ffe7ae";
    if (bv < 1.5) return "#ffc17c";
    return "#ff9874";
  }

  function starColorName(bv) {
    if (!Number.isFinite(bv)) return "色指数未标注";
    if (bv < -0.1) return "蓝色";
    if (bv < 0.3) return "蓝白色";
    if (bv < 0.6) return "白色";
    if (bv < 1) return "黄白色";
    if (bv < 1.5) return "橙黄色";
    return "橙红色";
  }

  function deepSkyType(type) {
    const normalized = String(type || "").toUpperCase();
    if (normalized.includes("PN")) return "行星状星云";
    if (normalized.includes("BN") || normalized === "N") return "星云";
    if (normalized.includes("GC")) return "球状星团";
    if (normalized.includes("OC") || normalized.includes("CL")) return "疏散星团";
    if (normalized.includes("G")) return "星系";
    if (normalized.includes("SN")) return "超新星遗迹";
    return "深空天体";
  }

  class CelestialAtlas {
    constructor(options) {
      if (!window.d3) throw new Error("D3 failed to load.");
      if (!options?.data?.stars?.length) throw new Error("Sky atlas data failed to load.");

      this.canvas = options.canvas;
      this.stage = options.stage;
      this.context = this.canvas.getContext("2d", { alpha: false });
      this.data = options.data;
      this.constellations = options.constellations || [];
      this.onSelectConstellation = options.onSelectConstellation || (() => {});
      this.onStatus = options.onStatus || (() => {});
      this.dom = options.dom || {};
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      this.contentByAbbr = new Map(
        this.constellations.map((item) => [String(item.abbr).toUpperCase(), item]),
      );
      this.contentById = new Map(this.constellations.map((item) => [item.id, item]));
      this.starsByHip = new Map(this.data.stars.map((star) => [String(star.hip), star]));
      this.stars = [...this.data.stars].sort((left, right) => right.mag - left.mag);

      this.layers = {
        lines: true,
        labels: true,
        grid: false,
        boundaries: false,
        deepSky: false,
      };
      this.filters = {
        magnitude: 6,
        hemisphere: "all",
        season: "all",
      };
      this.selectedAbbr = "ORI";
      this.center = { longitude: 90, declination: 0 };
      this.zoomLevel = 1;
      this.width = 800;
      this.height = 620;
      this.pixelRatio = 1;
      this.baseScale = 100;
      this.renderQueued = false;
      this.pointerMoved = false;
      this.previousZoomTransform = window.d3.zoomIdentity;
      this.visibleObjects = [];
      this.visibleStarPoints = [];
      this.constellationLabelBoxes = [];
      this.accessibleSignature = "";
      this.viewTimer = null;

      this.projection = window.d3.geoAzimuthalEquidistant()
        .reflectX(true)
        .clipAngle(179.3)
        .precision(0.45);
      this.graticule = window.d3.geoGraticule().step([15, 10])();
      this.path = window.d3.geoPath(this.projection, this.context);
      this.prepareGeometry();
      this.bindInteractions();

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.stage);
      this.resize();
    }

    prepareGeometry() {
      this.boundaries = this.data.boundaries.map((entry) => ({
        type: "Feature",
        id: String(entry.id).toUpperCase(),
        geometry: entry.polygons.length === 1
          ? { type: "Polygon", coordinates: entry.polygons[0] }
          : { type: "MultiPolygon", coordinates: entry.polygons },
      }));

      this.lines = this.data.lines.map((entry) => ({
        type: "Feature",
        id: String(entry.id).toUpperCase(),
        geometry: entry.paths.length === 1
          ? { type: "LineString", coordinates: entry.paths[0] }
          : { type: "MultiLineString", coordinates: entry.paths },
      }));

      this.labelEntries = this.constellations.map((item) => ({
        item,
        abbr: String(item.abbr).toUpperCase(),
        center: constellationCenter(item),
      }));
    }

    bindInteractions() {
      this.zoomBehavior = window.d3.zoom()
        .scaleExtent([MIN_ZOOM, MAX_ZOOM])
        .filter((event) => event.type !== "dblclick" && (event.type !== "mousedown" || event.button === 0))
        .on("start", (event) => {
          this.previousZoomTransform = event.transform;
          this.pointerMoved = false;
          this.canvas.classList.add("is-dragging");
        })
        .on("zoom", (event) => {
          const previous = this.previousZoomTransform || event.transform;
          const sourceType = event.sourceEvent?.type || "";
          const deltaX = event.transform.x - previous.x;
          const deltaY = event.transform.y - previous.y;

          if (event.sourceEvent && sourceType !== "wheel") {
            if (Math.hypot(deltaX, deltaY) > 0.35) this.pointerMoved = true;
            this.rotateByPixels(deltaX, deltaY, event.transform.k);
          }

          this.zoomLevel = clamp(event.transform.k, MIN_ZOOM, MAX_ZOOM);
          this.previousZoomTransform = event.transform;
          this.updateProjection();
          this.scheduleRender();
        })
        .on("end", () => {
          this.canvas.classList.remove("is-dragging");
        });

      window.d3.select(this.canvas)
        .call(this.zoomBehavior)
        .on("dblclick.zoom", null);

      this.canvas.addEventListener("click", (event) => {
        if (this.pointerMoved) return;
        this.pickAt(...window.d3.pointer(event, this.canvas), true);
      });

      this.canvas.addEventListener("keydown", (event) => this.handleKeydown(event));
      this.dom.visibleStarSelect?.addEventListener("change", (event) => {
        const star = this.starsByHip.get(event.target.value);
        if (!star) return;
        const point = this.projectObject(star);
        this.selectObject({ kind: "star", data: star, ...point }, true);
      });
      this.dom.objectClose?.addEventListener("click", () => this.closeObjectPanel(true));
      this.dom.objectConstellation?.addEventListener("click", () => {
        const abbr = this.dom.objectPopover?.dataset.constellation;
        const item = this.contentByAbbr.get(String(abbr || "").toUpperCase());
        if (!item) return;
        this.onSelectConstellation(item.id, { focus: true });
        this.closeObjectPanel(false);
      });
    }

    rotateByPixels(deltaX, deltaY, zoom) {
      if (!Number.isFinite(deltaX) || !Number.isFinite(deltaY)) return;
      const degreesPerPixel = 56 / Math.max(60, this.baseScale * zoom);
      const latitudeScale = Math.max(0.3, Math.cos(this.center.declination * DEG));
      this.center.longitude = normalizeLongitude(
        this.center.longitude + (deltaX * degreesPerPixel) / latitudeScale,
      );
      this.center.declination = clamp(
        this.center.declination + deltaY * degreesPerPixel,
        -88,
        88,
      );
    }

    handleKeydown(event) {
      const panStep = 7 / this.zoomLevel;
      let handled = true;

      if (event.key === "ArrowLeft") this.center.longitude = normalizeLongitude(this.center.longitude + panStep);
      else if (event.key === "ArrowRight") this.center.longitude = normalizeLongitude(this.center.longitude - panStep);
      else if (event.key === "ArrowUp") this.center.declination = clamp(this.center.declination + panStep, -88, 88);
      else if (event.key === "ArrowDown") this.center.declination = clamp(this.center.declination - panStep, -88, 88);
      else if (event.key === "+" || event.key === "=") this.zoomBy(1.3, true);
      else if (event.key === "-" || event.key === "_") this.zoomBy(1 / 1.3, true);
      else if (event.key === "Home") this.reset(true);
      else if (event.key === "Enter") this.pickAt(this.width / 2, this.height / 2, true);
      else if (event.key === "Escape") this.closeObjectPanel(false);
      else handled = false;

      if (!handled) return;
      event.preventDefault();
      this.updateProjection();
      this.scheduleRender();
    }

    resize() {
      const bounds = this.stage.getBoundingClientRect();
      const width = Math.max(320, Math.round(bounds.width));
      const height = Math.max(380, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (width === this.width && height === this.height && pixelRatio === this.pixelRatio) return;
      this.width = width;
      this.height = height;
      this.pixelRatio = pixelRatio;
      this.canvas.width = Math.round(width * pixelRatio);
      this.canvas.height = Math.round(height * pixelRatio);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.baseScale = Math.min(width, height) / (2 * Math.PI + 0.32);
      this.updateProjection();
      this.scheduleRender();
    }

    updateProjection() {
      this.projection
        .translate([this.width / 2, this.height / 2])
        .scale(this.baseScale * this.zoomLevel)
        .rotate([-this.center.longitude, -this.center.declination, 0]);
    }

    scheduleRender() {
      if (this.renderQueued) return;
      this.renderQueued = true;
      requestAnimationFrame(() => {
        this.renderQueued = false;
        this.draw();
      });
    }

    draw() {
      const context = this.context;
      context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = "#090b10";
      context.fillRect(0, 0, this.width, this.height);

      context.save();
      context.beginPath();
      this.path({ type: "Sphere" });
      context.fillStyle = "#0d1118";
      context.fill();
      context.restore();

      if (this.layers.grid) this.drawGrid();
      if (this.layers.boundaries) this.drawBoundaries();
      if (this.layers.lines) this.drawConstellationLines();

      this.visibleObjects = [];
      this.visibleStarPoints = [];
      if (this.layers.deepSky) this.drawDeepSky();
      const namedStars = this.drawStars();

      this.constellationLabelBoxes = [];
      const occupiedLabels = [];
      if (this.layers.labels) {
        this.drawConstellationLabels(occupiedLabels);
        this.drawStarLabels(namedStars, occupiedLabels);
      }

      context.save();
      context.beginPath();
      this.path({ type: "Sphere" });
      context.strokeStyle = "rgba(216, 171, 95, 0.42)";
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      this.hitIndex = this.visibleObjects.length
        ? window.d3.Delaunay.from(this.visibleObjects, (entry) => entry.x, (entry) => entry.y)
        : null;
      this.updateHud();
      this.updateAccessibleStars(namedStars);
      if (this.dom.skyEmpty) this.dom.skyEmpty.hidden = this.visibleStarPoints.length > 0;
    }

    drawGrid() {
      const context = this.context;
      context.save();
      context.beginPath();
      this.path(this.graticule);
      context.strokeStyle = "rgba(143, 190, 184, 0.18)";
      context.lineWidth = 0.72;
      context.stroke();

      context.fillStyle = "rgba(196, 222, 218, 0.52)";
      context.font = "10px Inter, 'PingFang SC', sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let longitude = -180; longitude < 180; longitude += 30) {
        const point = this.projection([longitude, 0]);
        if (!this.pointInsideViewport(point, 16) || !this.coordinateVisible(longitude, 0)) continue;
        context.fillText(`${String(Math.round(normalizeRaDegrees(longitude) / 15)).padStart(2, "0")}h`, point[0], point[1] - 8);
      }

      for (let declination = -60; declination <= 60; declination += 30) {
        if (declination === 0) continue;
        const point = this.projection([this.center.longitude, declination]);
        if (!this.pointInsideViewport(point, 16) || !this.coordinateVisible(this.center.longitude, declination)) continue;
        context.fillText(formatDeclination(declination), point[0] + 17, point[1]);
      }
      context.restore();
    }

    drawBoundaries() {
      const context = this.context;
      context.save();
      context.setLineDash([4, 5]);

      this.boundaries.forEach((feature) => {
        if (!this.constellationMatches(feature.id)) return;
        const selected = feature.id === this.selectedAbbr;
        context.beginPath();
        this.path(feature);
        context.strokeStyle = selected
          ? "rgba(224, 180, 104, 0.78)"
          : "rgba(115, 171, 164, 0.34)";
        context.lineWidth = selected ? 1.15 : 0.7;
        context.stroke();
      });
      context.restore();
    }

    drawConstellationLines() {
      const context = this.context;
      context.save();
      context.setLineDash([]);

      this.lines.forEach((feature) => {
        if (!this.constellationMatches(feature.id)) return;
        const selected = feature.id === this.selectedAbbr;
        context.beginPath();
        this.path(feature);
        context.strokeStyle = selected
          ? "rgba(229, 183, 101, 0.92)"
          : "rgba(158, 197, 190, 0.42)";
        context.lineWidth = selected ? 1.75 : 0.72;
        context.stroke();
      });
      context.restore();
    }

    drawDeepSky() {
      const context = this.context;
      context.save();
      context.lineWidth = 0.9;

      this.data.deepSky.forEach((object) => {
        if (!this.constellationMatches(object.constellation, object.dec)) return;
        if (this.zoomLevel < 1.8 && object.catalog !== "Messier") return;
        if (this.zoomLevel < 3 && object.catalog !== "Messier" && Number(object.mag) > 3.5) return;
        const point = this.projectObject(object);
        if (!this.pointInsideViewport(point, 8) || !this.coordinateVisible(object.ra, object.dec)) return;

        const selected = String(object.constellation).toUpperCase() === this.selectedAbbr;
        const size = selected ? 4.3 : 3.2;
        context.strokeStyle = selected ? "rgba(231, 184, 102, 0.9)" : "rgba(121, 188, 178, 0.66)";
        context.beginPath();
        if (deepSkyType(object.type).includes("星系")) {
          context.ellipse(point.x, point.y, size + 1.5, size - 0.9, -0.45, 0, Math.PI * 2);
        } else if (deepSkyType(object.type).includes("星团")) {
          context.arc(point.x, point.y, size, 0, Math.PI * 2);
          context.moveTo(point.x - size - 2, point.y);
          context.lineTo(point.x + size + 2, point.y);
        } else {
          context.rect(point.x - size, point.y - size, size * 2, size * 2);
        }
        context.stroke();
        this.visibleObjects.push({ kind: "deep-sky", data: object, ...point });
      });
      context.restore();
    }

    drawStars() {
      const context = this.context;
      const namedStars = [];
      context.save();

      this.stars.forEach((star) => {
        if (star.mag > this.filters.magnitude) return;
        if (!this.constellationMatches(star.constellation, star.dec)) return;
        const point = this.projectObject(star);
        if (!this.pointInsideViewport(point, 7) || !this.coordinateVisible(star.ra, star.dec)) return;

        const selected = String(star.constellation).toUpperCase() === this.selectedAbbr;
        const radius = clamp(
          (0.5 + (6.25 - star.mag) * 0.42) * Math.min(1.42, 0.88 + Math.sqrt(this.zoomLevel) * 0.2),
          0.55,
          4.4,
        );
        const alpha = clamp(0.44 + (6 - star.mag) * 0.095 + (selected ? 0.12 : 0), 0.42, 1);

        if (star.mag < 1.6) {
          const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 4.2);
          glow.addColorStop(0, `rgba(255, 243, 211, ${0.22 * alpha})`);
          glow.addColorStop(1, "rgba(255, 243, 211, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(point.x, point.y, radius * 4.2, 0, Math.PI * 2);
          context.fill();
        }

        context.globalAlpha = alpha;
        context.fillStyle = starColor(star.bv);
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;

        const entry = { kind: "star", data: star, radius, ...point };
        this.visibleObjects.push(entry);
        this.visibleStarPoints.push(entry);
        if (star.zh || star.name || star.designation) namedStars.push(entry);
      });

      context.restore();
      return namedStars;
    }

    drawConstellationLabels(occupied) {
      const context = this.context;
      const candidates = this.labelEntries
        .filter((entry) => this.constellationMatches(entry.abbr))
        .map((entry) => ({ ...entry, point: this.projection([entry.center.longitude, entry.center.declination]) }))
        .filter((entry) => this.pointInsideViewport(entry.point, 28)
          && this.coordinateVisible(entry.center.longitude, entry.center.declination))
        .sort((left, right) => Number(right.abbr === this.selectedAbbr) - Number(left.abbr === this.selectedAbbr));

      context.save();
      context.textAlign = "center";
      context.textBaseline = "middle";

      candidates.forEach((entry) => {
        const selected = entry.abbr === this.selectedAbbr;
        const label = this.zoomLevel > 2.5 ? `${entry.item.name} ${entry.abbr}` : entry.item.name;
        context.font = selected
          ? "700 13px Inter, 'PingFang SC', sans-serif"
          : "600 10px Inter, 'PingFang SC', sans-serif";
        const width = context.measureText(label).width + 12;
        const height = selected ? 22 : 18;
        const box = {
          left: entry.point[0] - width / 2,
          right: entry.point[0] + width / 2,
          top: entry.point[1] - height / 2,
          bottom: entry.point[1] + height / 2,
        };
        if (!selected && occupied.some((other) => this.boxesOverlap(box, other))) return;

        context.fillStyle = selected ? "rgba(235, 193, 117, 0.94)" : "rgba(195, 217, 213, 0.5)";
        context.fillText(label, entry.point[0], entry.point[1]);
        occupied.push(box);
        this.constellationLabelBoxes.push({ ...box, abbr: entry.abbr });
      });
      context.restore();
    }

    drawStarLabels(namedStars, occupied) {
      const context = this.context;
      const ordinaryLimit = this.zoomLevel < 1.35 ? 1.15 : this.zoomLevel < 2.4 ? 2.35 : 4.15;
      const selectedLimit = this.zoomLevel < 1.35 ? 2.4 : this.zoomLevel < 2.4 ? 3.7 : 5.2;
      const maximumLabels = clamp(Math.floor((this.width * this.height) / 15000), 16, 90);
      let drawn = 0;

      const candidates = [...namedStars].sort((left, right) => {
        const leftSelected = String(left.data.constellation).toUpperCase() === this.selectedAbbr;
        const rightSelected = String(right.data.constellation).toUpperCase() === this.selectedAbbr;
        return Number(rightSelected) - Number(leftSelected) || left.data.mag - right.data.mag;
      });

      context.save();
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.font = "11px Inter, 'PingFang SC', sans-serif";

      for (const entry of candidates) {
        if (drawn >= maximumLabels) break;
        const selected = String(entry.data.constellation).toUpperCase() === this.selectedAbbr;
        if (entry.data.mag > (selected ? selectedLimit : ordinaryLimit)) continue;
        const label = entry.data.zh || entry.data.name || entry.data.designation;
        const width = context.measureText(label).width + 8;
        const box = {
          left: entry.x + entry.radius + 5,
          right: entry.x + entry.radius + 5 + width,
          top: entry.y - 9,
          bottom: entry.y + 9,
        };
        if (box.right > this.width - 5 || occupied.some((other) => this.boxesOverlap(box, other))) continue;
        context.fillStyle = selected ? "rgba(244, 210, 146, 0.9)" : "rgba(231, 238, 236, 0.68)";
        context.fillText(label, box.left + 3, entry.y);
        occupied.push(box);
        drawn += 1;
      }
      context.restore();
    }

    boxesOverlap(left, right) {
      return !(left.right < right.left || left.left > right.right || left.bottom < right.top || left.top > right.bottom);
    }

    constellationMatches(abbr, declination = 0) {
      const normalized = String(abbr || "").toUpperCase();
      if (normalized === this.selectedAbbr) return true;
      const item = this.contentByAbbr.get(normalized);
      if (this.filters.season !== "all" && item?.season !== this.filters.season) return false;

      if (this.filters.hemisphere === "all") return true;
      const centerDec = item ? constellationCenter(item).declination : Number(declination);
      if (this.filters.hemisphere === "north") return centerDec >= 0;
      if (this.filters.hemisphere === "south") return centerDec < 0;
      if (this.filters.hemisphere === "equatorial") return Math.abs(centerDec) <= 25;
      return true;
    }

    coordinateVisible(longitude, declination) {
      return window.d3.geoDistance(
        [longitude, declination],
        [this.center.longitude, this.center.declination],
      ) <= 179.25 * DEG;
    }

    pointInsideViewport(point, margin = 0) {
      const x = Array.isArray(point) ? point[0] : point?.x;
      const y = Array.isArray(point) ? point[1] : point?.y;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      return x >= -margin && x <= this.width + margin
        && y >= -margin && y <= this.height + margin;
    }

    projectObject(object) {
      const point = this.projection([object.ra, object.dec]);
      return { x: point?.[0] ?? -1000, y: point?.[1] ?? -1000 };
    }

    pickAt(x, y, announce = false) {
      const label = this.constellationLabelBoxes.find((box) => (
        x >= box.left && x <= box.right && y >= box.top && y <= box.bottom
      ));
      if (label) {
        const item = this.contentByAbbr.get(label.abbr);
        if (item) {
          this.onSelectConstellation(item.id, { focus: true });
        }
        return;
      }

      if (!this.hitIndex || this.visibleObjects.length === 0) return;
      const index = this.hitIndex.find(x, y);
      const entry = this.visibleObjects[index];
      if (!entry || Math.hypot(entry.x - x, entry.y - y) > 15) {
        this.closeObjectPanel(false);
        return;
      }
      this.selectObject(entry, announce);
    }

    selectObject(entry, announce = false) {
      if (!entry?.data) return;
      let abbr = String(entry.data.constellation || "").toUpperCase();

      if (entry.kind === "star" && window.Astronomy) {
        try {
          abbr = String(window.Astronomy.Constellation(
            normalizeRaDegrees(entry.data.ra) / 15,
            entry.data.dec,
          ).symbol).toUpperCase();
        } catch {
          // The generated catalog already contains a boundary-based fallback.
        }
      }

      const constellation = this.contentByAbbr.get(abbr);
      if (constellation) {
        this.selectedAbbr = abbr;
        this.onSelectConstellation(constellation.id, { focus: false });
      }

      this.openObjectPanel(entry, abbr, announce);
      this.scheduleRender();
    }

    openObjectPanel(entry, abbr, announce) {
      const object = entry.data;
      const constellation = this.contentByAbbr.get(abbr);
      const isStar = entry.kind === "star";
      const title = isStar
        ? object.zh || object.name || object.designation || `HIP ${object.hip}`
        : object.zh || object.name || object.designation || object.id;
      const aliases = isStar
        ? [object.name, object.designation, `HIP ${object.hip}`]
        : [object.designation, object.alternate, object.name, object.id];
      const uniqueAliases = [...new Set(aliases.filter((value) => value && value !== title))];

      this.dom.objectKicker.textContent = isStar ? "恒星资料" : deepSkyType(object.type);
      this.dom.objectTitle.textContent = title;
      this.dom.objectAlias.textContent = uniqueAliases.join(" · ");
      this.dom.objectFacts.replaceChildren();

      const facts = [];
      facts.push(["视星等", Number.isFinite(Number(object.mag)) ? Number(object.mag).toFixed(2) : "未标注"]);
      if (isStar) {
        facts.push(["恒星颜色", `${starColorName(object.bv)}${Number.isFinite(object.bv) ? ` · B−V ${Number(object.bv).toFixed(2)}` : ""}`]);
      } else if (object.dimensions) {
        facts.push(["视尺寸", object.dimensions]);
      }
      facts.push(["J2000 赤经", formatRightAscension(object.ra, true)]);
      facts.push(["J2000 赤纬", formatDeclination(object.dec, true)]);

      const current = this.coordinatesOfDate(object.ra, object.dec);
      if (current) {
        facts.push(["当前赤经", formatRightAscension(current.raHours * 15, true)]);
        facts.push(["当前赤纬", formatDeclination(current.decDeg, true)]);
      }
      if (constellation) facts.push(["所属星座", `${constellation.name} · ${constellation.latin}`]);

      facts.forEach(([term, description]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = term;
        dd.textContent = description;
        row.append(dt, dd);
        this.dom.objectFacts.append(row);
      });

      this.dom.objectPopover.dataset.constellation = abbr;
      this.dom.objectConstellation.hidden = !constellation;
      this.dom.objectPopover.hidden = false;
      this.positionObjectPanel(entry.x, entry.y);
      this.dom.objectClose.focus({ preventScroll: true });

      if (announce) {
        const magnitude = Number(object.mag);
        const magnitudeText = Number.isFinite(magnitude) ? `，视星等 ${magnitude.toFixed(2)}` : "";
        const message = `${title}${magnitudeText}${constellation ? `，位于${constellation.name}` : ""}`;
        if (this.dom.skyAnnouncer) this.dom.skyAnnouncer.textContent = message;
        this.onStatus(message);
      }
    }

    positionObjectPanel(x, y) {
      const panel = this.dom.objectPopover;
      if (!panel) return;
      panel.style.left = "12px";
      panel.style.top = "12px";
      const width = panel.offsetWidth || 300;
      const height = panel.offsetHeight || 320;
      const left = clamp(x + 18, 12, this.width - width - 12);
      const preferredTop = y - Math.min(height / 2, 120);
      const top = clamp(preferredTop, 12, this.height - height - 12);
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
    }

    closeObjectPanel(returnFocus = false) {
      if (!this.dom.objectPopover || this.dom.objectPopover.hidden) return;
      this.dom.objectPopover.hidden = true;
      if (returnFocus) this.canvas.focus({ preventScroll: true });
    }

    coordinatesOfDate(longitude, declination) {
      if (!window.Astronomy) return null;
      try {
        const time = window.Astronomy.MakeTime(new Date());
        const eqj = window.Astronomy.VectorFromSphere(
          new window.Astronomy.Spherical(declination, normalizeRaDegrees(longitude), 1),
          time,
        );
        const eqd = window.Astronomy.RotateVector(window.Astronomy.Rotation_EQJ_EQD(time), eqj);
        const result = window.Astronomy.EquatorFromVector(eqd);
        return { raHours: result.ra, decDeg: result.dec };
      } catch {
        return null;
      }
    }

    updateHud() {
      if (this.dom.mapCenterCoordinates) {
        this.dom.mapCenterCoordinates.textContent = `RA ${formatRightAscension(this.center.longitude)} · Dec ${formatDeclination(this.center.declination)}`;
      }
      if (this.dom.mapZoomReadout) this.dom.mapZoomReadout.textContent = `${this.zoomLevel.toFixed(1)}×`;
    }

    updateAccessibleStars(namedStars) {
      if (!this.dom.visibleStarSelect || !this.dom.visibleStarList) return;
      const entries = [...namedStars]
        .sort((left, right) => left.data.mag - right.data.mag)
        .slice(0, 36);
      const signature = entries.map((entry) => entry.data.hip).join(",");
      if (signature === this.accessibleSignature) return;
      this.accessibleSignature = signature;

      const previousValue = this.dom.visibleStarSelect.value;
      this.dom.visibleStarSelect.replaceChildren();
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = entries.length ? "选择亮星…" : "暂无可选亮星";
      this.dom.visibleStarSelect.append(placeholder);
      this.dom.visibleStarList.replaceChildren();

      entries.forEach((entry) => {
        const star = entry.data;
        const name = star.zh || star.name || star.designation || `HIP ${star.hip}`;
        const item = this.contentByAbbr.get(String(star.constellation).toUpperCase());
        const option = document.createElement("option");
        option.value = String(star.hip);
        option.textContent = `${name} · ${star.mag.toFixed(2)} 等${item ? ` · ${item.name}` : ""}`;
        this.dom.visibleStarSelect.append(option);

        const listItem = document.createElement("li");
        listItem.textContent = option.textContent;
        this.dom.visibleStarList.append(listItem);
      });

      if (entries.some((entry) => String(entry.data.hip) === previousValue)) {
        this.dom.visibleStarSelect.value = previousValue;
      }
    }

    setSelected(value, options = {}) {
      const direct = String(value || "").toUpperCase();
      const fromId = this.contentById.get(value);
      const abbr = fromId ? String(fromId.abbr).toUpperCase() : direct;
      if (!this.contentByAbbr.has(abbr)) return;
      this.selectedAbbr = abbr;
      if (options.focus) this.focusSelected();
      else this.scheduleRender();
    }

    setLayers(layers) {
      Object.assign(this.layers, layers);
      this.scheduleRender();
    }

    setFilters(filters) {
      const previousHemisphere = this.filters.hemisphere;
      Object.assign(this.filters, filters);
      this.filters.magnitude = clamp(Number(this.filters.magnitude) || 6, 1, 6);

      if (previousHemisphere !== this.filters.hemisphere) {
        if (this.filters.hemisphere === "north") this.animateView({ longitude: this.center.longitude, declination: 45 }, this.zoomLevel);
        else if (this.filters.hemisphere === "south") this.animateView({ longitude: this.center.longitude, declination: -45 }, this.zoomLevel);
        else if (this.filters.hemisphere === "equatorial") this.animateView({ longitude: this.center.longitude, declination: 0 }, this.zoomLevel);
      }
      this.scheduleRender();
    }

    focusSelected() {
      const item = this.contentByAbbr.get(this.selectedAbbr);
      if (!item) return;
      this.animateView(constellationCenter(item), 3);
    }

    reset(announce = false) {
      this.animateView({ longitude: 90, declination: 0 }, 1);
      this.closeObjectPanel(false);
      if (announce) this.onStatus("已重置为全天视野");
    }

    zoomBy(factor, announce = false) {
      const target = clamp(this.zoomLevel * factor, MIN_ZOOM, MAX_ZOOM);
      this.animateView({ ...this.center }, target, 220);
      if (announce) this.onStatus(`星图缩放 ${target.toFixed(1)} 倍`);
    }

    animateView(targetCenter, targetZoom, duration = 620) {
      if (this.viewTimer) this.viewTimer.stop();
      const startCenter = { ...this.center };
      const startZoom = this.zoomLevel;
      const longitudeDelta = normalizeLongitude(targetCenter.longitude - startCenter.longitude);
      const finish = () => {
        this.center = {
          longitude: normalizeLongitude(targetCenter.longitude),
          declination: clamp(targetCenter.declination, -88, 88),
        };
        this.zoomLevel = clamp(targetZoom, MIN_ZOOM, MAX_ZOOM);
        this.syncZoomTransform();
        this.updateProjection();
        this.scheduleRender();
      };

      if (this.reducedMotion || duration <= 0) {
        finish();
        return;
      }

      this.viewTimer = window.d3.timer((elapsed) => {
        const progress = clamp(elapsed / duration, 0, 1);
        const eased = window.d3.easeCubicInOut(progress);
        this.center.longitude = normalizeLongitude(startCenter.longitude + longitudeDelta * eased);
        this.center.declination = startCenter.declination
          + (targetCenter.declination - startCenter.declination) * eased;
        this.zoomLevel = startZoom + (targetZoom - startZoom) * eased;
        this.updateProjection();
        this.scheduleRender();
        if (progress >= 1) {
          this.viewTimer.stop();
          this.viewTimer = null;
          finish();
        }
      });
    }

    syncZoomTransform() {
      const transform = window.d3.zoomIdentity.scale(this.zoomLevel);
      this.previousZoomTransform = transform;
      window.d3.select(this.canvas).call(this.zoomBehavior.transform, transform);
    }
  }

  window.CelestialAtlas = CelestialAtlas;
})();
