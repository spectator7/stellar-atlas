"use strict";

(() => {
  const HOUR_MS = 60 * 60 * 1000;
  const DAY_MS = 24 * HOUR_MS;

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function shiftIsoDate(value, days) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    if (!match) return value;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function formatCoordinate(value, positive, negative) {
    return `${Math.abs(value).toFixed(2)}°${value >= 0 ? positive : negative}`;
  }

  function directionName(azimuth) {
    const names = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
    return names[Math.round((((azimuth % 360) + 360) % 360) / 45) % 8];
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

  function localParts(date, timezone) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    return Object.fromEntries(
      formatter.formatToParts(date)
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value]),
    );
  }

  function dateToLocalInput(date, timezone) {
    const parts = localParts(date, timezone);
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  }

  function timezoneOffset(date, timezone) {
    const parts = localParts(date, timezone);
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    return asUtc - date.getTime();
  }

  function zonedDateTimeToDate(value, timezone) {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value || "");
    if (!match) return null;
    const localEpoch = Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
    );
    let utc = localEpoch;
    try {
      for (let index = 0; index < 3; index += 1) {
        utc = localEpoch - timezoneOffset(new Date(utc), timezone);
      }
    } catch {
      return null;
    }
    const result = new Date(utc);
    if (Number.isNaN(result.getTime())) return null;
    try {
      return dateToLocalInput(result, timezone) === value ? result : null;
    } catch {
      return null;
    }
  }

  function formatInZone(date, timezone, options = {}) {
    if (!date) return "—";
    return new Intl.DateTimeFormat("zh-CN", {
      timeZone: timezone,
      month: options.date === false ? undefined : "2-digit",
      day: options.date === false ? undefined : "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date);
  }

  function formatDateOnlyInZone(date, timezone) {
    if (!date) return "—";
    return new Intl.DateTimeFormat("zh-CN", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  function formatNightEvent(date, timezone, nightDate) {
    if (!date) return "—";
    const local = dateToLocalInput(date, timezone);
    const datePart = local.slice(0, 10);
    const timePart = local.slice(11, 16);
    if (datePart === nightDate) return `当日 ${timePart}`;
    if (datePart === shiftIsoDate(nightDate, 1)) return `次日 ${timePart}`;
    if (datePart === shiftIsoDate(nightDate, -1)) return `前日 ${timePart}`;
    return formatInZone(date, timezone);
  }

  function moonPhaseInfo(angle) {
    const normalized = ((angle % 360) + 360) % 360;
    const phases = [
      { center: 0, name: "新月", symbol: "●" },
      { center: 45, name: "娥眉月", symbol: "◔" },
      { center: 90, name: "上弦月", symbol: "◐" },
      { center: 135, name: "盈凸月", symbol: "◕" },
      { center: 180, name: "满月", symbol: "○" },
      { center: 225, name: "亏凸月", symbol: "◕" },
      { center: 270, name: "下弦月", symbol: "◑" },
      { center: 315, name: "残月", symbol: "◔" },
    ];
    const index = Math.round(normalized / 45) % 8;
    return phases[index];
  }

  function weatherDescription(code) {
    const descriptions = {
      0: "晴朗", 1: "大致晴朗", 2: "局部多云", 3: "阴天",
      45: "雾", 48: "雾凇", 51: "轻微毛毛雨", 53: "毛毛雨", 55: "较强毛毛雨",
      56: "轻微冻毛毛雨", 57: "较强冻毛毛雨", 61: "小雨", 63: "中雨", 65: "大雨",
      66: "轻微冻雨", 67: "较强冻雨", 71: "小雪", 73: "中雪", 75: "大雪", 77: "米雪",
      80: "阵雨", 81: "较强阵雨", 82: "强阵雨", 85: "阵雪", 86: "强阵雪",
      95: "雷暴", 96: "雷暴伴冰雹", 99: "强雷暴伴冰雹",
    };
    return descriptions[code] || "天气状况未分类";
  }

  class TonightObserver {
    constructor(options = {}) {
      if (!window.Astronomy || !window.OBSERVING_DATA) {
        throw new Error("Observing dependencies failed to load.");
      }

      this.A = window.Astronomy;
      this.data = window.OBSERVING_DATA;
      this.constellations = options.constellations || [];
      this.skyAtlas = options.skyAtlas || { stars: [] };
      this.onSelectConstellation = options.onSelectConstellation || (() => {});
      this.onToast = options.onToast || (() => {});
      this.locationById = new Map(this.data.locations.map((location) => [location.id, location]));
      this.constellationByAbbr = new Map(
        this.constellations.map((item) => [String(item.abbr).toUpperCase(), item]),
      );
      this.bortleByLevel = new Map(this.data.bortleScale.map((entry) => [entry.level, entry]));
      this.weatherCache = new Map();
      this.weatherRequest = 0;
      this.weatherController = null;
      this.calculationRequest = 0;
      this.snapshot = null;
      this.checklist = [];
      this.horizonHits = [];
      this.locationSource = "preset";
      this.locationLabel = "北京";
      this.pollutionSource = "城市中心估计";
      this.weather = { status: "idle", data: null, error: "" };

      this.planetDefinitions = [
        { id: "mercury", name: "水星", symbol: "☿", body: this.A.Body.Mercury },
        { id: "venus", name: "金星", symbol: "♀", body: this.A.Body.Venus },
        { id: "mars", name: "火星", symbol: "♂", body: this.A.Body.Mars },
        { id: "jupiter", name: "木星", symbol: "♃", body: this.A.Body.Jupiter },
        { id: "saturn", name: "土星", symbol: "♄", body: this.A.Body.Saturn },
        { id: "uranus", name: "天王星", symbol: "♅", body: this.A.Body.Uranus },
        { id: "neptune", name: "海王星", symbol: "♆", body: this.A.Body.Neptune },
      ];

      this.dom = Object.fromEntries([
        "observerForm", "observerLocation", "useDeviceLocation", "observerLatitude", "observerLongitude",
        "observerElevation", "observerDateTime", "useCurrentTime", "useTonightTime", "observerTimezone", "observerBortle",
        "observerEquipment",
        "weatherConsent", "rememberManualLocation",
        "generateTonight", "observerFormStatus", "tonightLocation", "tonightHeadline", "nightQuality",
        "nightQualityReason", "tonightDate", "tonightCoordinates", "tonightMagnitudeLimit", "horizonCanvas",
        "horizonCaption", "horizonObjectList", "stepTimeBackward", "stepTimeForward",
        "darknessValue", "darknessDetail", "nightWindow", "moonPhaseVisual",
        "moonValue", "moonDetail", "moonTimes", "refreshWeather", "weatherValue", "weatherDetail",
        "weatherTimestamp", "pollutionValue", "pollutionDetail", "pollutionSource", "planetValue", "planetDetail",
        "bestTimeLabel", "bestTimeValue", "bestTimeDetail", "useBestTime",
        "visibleAltitudeFilter", "visibleConstellationCount", "visibleConstellationList", "eventList", "planetList",
        "observationChecklist", "planCount", "copyPlan", "sharePlan", "downloadPlan",
      ].map((id) => [id, document.querySelector(`#${id}`)]));

      this.canvas = this.dom.horizonCanvas;
      this.context = this.canvas.getContext("2d", { alpha: false });
      this.canvasWidth = 760;
      this.canvasHeight = 540;
      this.pixelRatio = 1;

      this.populateControls();
      this.bindControls();
      this.resizeObserver = new ResizeObserver(() => this.resizeHorizon());
      this.resizeObserver.observe(this.canvas.parentElement);
      this.restoreAndInitialize();
    }

    populateControls() {
      const regions = new Map();
      this.data.locations.forEach((location) => {
        if (!regions.has(location.region)) regions.set(location.region, []);
        regions.get(location.region).push(location);
      });
      regions.forEach((locations, region) => {
        const group = document.createElement("optgroup");
        group.label = region;
        locations.forEach((location) => {
          const option = document.createElement("option");
          option.value = location.id;
          option.textContent = `${location.name}${location.country === "中国" ? "" : ` · ${location.country}`}`;
          group.append(option);
        });
        this.dom.observerLocation.append(group);
      });
      const customOption = document.createElement("option");
      customOption.value = "manual";
      customOption.textContent = "手动坐标 / 设备位置";
      this.dom.observerLocation.append(customOption);

      this.data.timezones.forEach((timezone) => {
        const option = document.createElement("option");
        option.value = timezone.id;
        option.textContent = timezone.label;
        this.dom.observerTimezone.append(option);
      });
      if (typeof Intl.supportedValuesOf === "function") {
        const known = new Set([...this.dom.observerTimezone.options].map((option) => option.value));
        const group = document.createElement("optgroup");
        group.label = "全部 IANA 时区";
        Intl.supportedValuesOf("timeZone").forEach((timezone) => {
          if (known.has(timezone)) return;
          const option = document.createElement("option");
          option.value = timezone;
          option.textContent = timezone;
          group.append(option);
        });
        this.dom.observerTimezone.append(group);
      }
      this.ensureTimezoneOption(Intl.DateTimeFormat().resolvedOptions().timeZone);

      this.data.bortleScale.forEach((entry) => {
        const option = document.createElement("option");
        option.value = String(entry.level);
        option.textContent = `${entry.level} · ${entry.title}`;
        this.dom.observerBortle.append(option);
      });
    }

    bindControls() {
      this.dom.observerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.generate();
      });

      this.dom.observerLocation.addEventListener("change", () => {
        if (this.dom.observerLocation.value === "manual") {
          this.locationSource = "manual";
          this.locationLabel = "手动坐标";
          return;
        }
        this.applyLocation(this.dom.observerLocation.value, true);
      });

      [this.dom.observerLatitude, this.dom.observerLongitude, this.dom.observerElevation].forEach((input) => {
        input.addEventListener("input", () => {
          this.dom.observerLocation.value = "manual";
          this.locationSource = "manual";
          this.locationLabel = "手动坐标";
        });
      });

      this.dom.observerBortle.addEventListener("change", () => {
        this.pollutionSource = "手动设置";
      });
      this.dom.useCurrentTime.addEventListener("click", () => {
        this.setCurrentTime();
        this.generate();
      });
      this.dom.useTonightTime.addEventListener("click", () => {
        this.setTonightTime();
        this.generate();
      });
      this.dom.stepTimeBackward.addEventListener("click", () => this.stepTime(-1));
      this.dom.stepTimeForward.addEventListener("click", () => this.stepTime(1));
      this.dom.useBestTime.addEventListener("click", () => this.useBestObservationTime());
      this.dom.useDeviceLocation.addEventListener("click", () => this.useDeviceLocation());
      this.dom.refreshWeather.addEventListener("click", () => {
        this.dom.weatherConsent.checked = true;
        this.fetchWeather(true);
      });
      this.dom.weatherConsent.addEventListener("change", () => {
        if (this.dom.weatherConsent.checked) {
          this.fetchWeather(true);
        } else {
          this.cancelWeatherRequest();
          this.weather = { status: "idle", data: null, error: "" };
          this.updateBestTimeFromWeather();
          this.renderWeather();
          this.renderConditions();
          this.renderQuality();
          this.buildChecklist();
        }
      });
      this.dom.visibleAltitudeFilter.addEventListener("change", () => {
        this.renderVisibleConstellations();
        this.buildChecklist();
      });
      this.dom.visibleConstellationList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-constellation-id]");
        if (!button) return;
        this.onSelectConstellation(button.dataset.constellationId);
      });
      this.dom.observationChecklist.addEventListener("change", (event) => {
        const checkbox = event.target.closest("input[type='checkbox'][data-plan-id]");
        if (!checkbox) return;
        const item = this.checklist.find((entry) => entry.id === checkbox.dataset.planId);
        if (item) item.checked = checkbox.checked;
        this.updatePlanCount();
      });
      this.dom.copyPlan.addEventListener("click", () => this.copyPlan());
      this.dom.sharePlan.addEventListener("click", () => this.sharePlan());
      this.dom.downloadPlan.addEventListener("click", () => this.downloadPlan());
      this.canvas.addEventListener("click", (event) => this.pickHorizonObject(event));
    }

    restoreAndInitialize() {
      const shared = this.readSharedSettings();
      let saved = {};
      try {
        saved = JSON.parse(localStorage.getItem("tianxiang-observer-v1") || "{}");
      } catch {
        saved = {};
      }
      if (shared) {
        this.applySharedSettings(shared);
      } else {
        let locationId = this.locationById.has(saved.locationId) ? saved.locationId : null;
        if (locationId) {
          this.applyLocation(locationId, false);
        } else if (saved.rememberManualLocation && this.applySavedManualLocation(saved.manualLocation)) {
          this.dom.rememberManualLocation.checked = true;
        } else {
          locationId = "beijing";
          this.applyLocation(locationId, false);
        }
        if (Number.isInteger(saved.bortle) && this.bortleByLevel.has(saved.bortle)) {
          this.dom.observerBortle.value = String(saved.bortle);
          this.pollutionSource = saved.bortle === this.locationById.get(locationId)?.bortle
            ? "城市中心估计"
            : "上次手动设置";
        }
        if (["naked-eye", "binoculars", "telescope"].includes(saved.equipment)) {
          this.dom.observerEquipment.value = saved.equipment;
        }
        this.setTonightTime();
      }
      this.resizeHorizon();
      this.generate();
    }

    applySavedManualLocation(location) {
      if (!location || typeof location !== "object") return false;
      const latitude = Number(location.latitude);
      const longitude = Number(location.longitude);
      const elevation = Number(location.elevation);
      if (
        !Number.isFinite(latitude) || latitude < -90 || latitude > 90
        || !Number.isFinite(longitude) || longitude < -180 || longitude > 180
        || !Number.isFinite(elevation) || elevation < -500 || elevation > 9000
        || !this.ensureTimezoneOption(location.timezone)
      ) return false;
      this.dom.observerLocation.value = "manual";
      this.dom.observerLatitude.value = latitude.toFixed(4);
      this.dom.observerLongitude.value = longitude.toFixed(4);
      this.dom.observerElevation.value = String(Math.round(elevation));
      this.dom.observerTimezone.value = location.timezone;
      this.locationSource = "saved";
      this.locationLabel = typeof location.label === "string" && location.label.trim()
        ? location.label.trim()
        : "上次手动坐标";
      this.pollutionSource = "上次手动设置";
      return true;
    }

    readSharedSettings() {
      try {
        const params = new URL(window.location.href).searchParams;
        const locationId = params.get("loc");
        const timezone = params.get("tz") || "";
        const localDateTime = params.get("dt") || "";
        const bortle = Number(params.get("bortle"));
        const equipment = ["naked-eye", "binoculars", "telescope"].includes(params.get("gear"))
          ? params.get("gear")
          : null;
        if (locationId && this.locationById.has(locationId)) {
          return {
            locationId,
            localDateTime,
            bortle: this.bortleByLevel.has(bortle) ? bortle : null,
            equipment,
          };
        }

        const latitude = Number(params.get("lat"));
        const longitude = Number(params.get("lon"));
        const elevation = Number(params.get("elev") || 0);
        if (
          !Number.isFinite(latitude) || latitude < -90 || latitude > 90
          || !Number.isFinite(longitude) || longitude < -180 || longitude > 180
          || !Number.isFinite(elevation) || elevation < -500 || elevation > 9000
          || !this.ensureTimezoneOption(timezone)
        ) return null;
        return {
          latitude,
          longitude,
          elevation,
          timezone,
          localDateTime,
          bortle: this.bortleByLevel.has(bortle) ? bortle : null,
          equipment,
        };
      } catch {
        return null;
      }
    }

    applySharedSettings(settings) {
      if (settings.locationId) {
        this.applyLocation(settings.locationId, false);
      } else {
        this.dom.observerLocation.value = "manual";
        this.dom.observerLatitude.value = settings.latitude.toFixed(2);
        this.dom.observerLongitude.value = settings.longitude.toFixed(2);
        this.dom.observerElevation.value = String(Math.round(settings.elevation));
        this.dom.observerTimezone.value = settings.timezone;
        this.locationSource = "shared";
        this.locationLabel = "共享坐标";
        this.pollutionSource = "共享设置";
      }
      const timezone = this.dom.observerTimezone.value;
      if (settings.localDateTime && zonedDateTimeToDate(settings.localDateTime, timezone)) {
        this.dom.observerDateTime.value = settings.localDateTime;
      } else {
        this.setTonightTime();
      }
      if (Number.isInteger(settings.bortle) && this.bortleByLevel.has(settings.bortle)) {
        this.dom.observerBortle.value = String(settings.bortle);
        this.pollutionSource = settings.locationId
          && settings.bortle === this.locationById.get(settings.locationId)?.bortle
          ? "城市中心估计"
          : "共享设置";
      }
      if (settings.equipment) this.dom.observerEquipment.value = settings.equipment;
    }

    ensureTimezoneOption(timezone) {
      if (!timezone) return false;
      try {
        new Intl.DateTimeFormat("en", { timeZone: timezone }).format(new Date());
      } catch {
        return false;
      }
      if ([...this.dom.observerTimezone.options].some((option) => option.value === timezone)) return true;
      const option = document.createElement("option");
      option.value = timezone;
      option.textContent = `${timezone} · 设备时区`;
      this.dom.observerTimezone.append(option);
      return true;
    }

    applyLocation(id, regenerate) {
      const location = this.locationById.get(id);
      if (!location) return;
      this.dom.observerLocation.value = id;
      this.dom.observerLatitude.value = location.latitude.toFixed(4);
      this.dom.observerLongitude.value = location.longitude.toFixed(4);
      this.dom.observerElevation.value = String(location.elevation);
      this.ensureTimezoneOption(location.timezone);
      this.dom.observerTimezone.value = location.timezone;
      this.dom.observerBortle.value = String(location.bortle);
      this.locationSource = "preset";
      this.locationLabel = location.name;
      this.pollutionSource = "城市中心估计";
      if (!this.dom.observerDateTime.value) this.setTonightTime();
      if (regenerate) this.generate();
    }

    setCurrentTime() {
      const timezone = this.dom.observerTimezone.value || "Asia/Shanghai";
      this.dom.observerDateTime.value = dateToLocalInput(new Date(), timezone);
    }

    setTonightTime() {
      const timezone = this.dom.observerTimezone.value || "Asia/Shanghai";
      const now = new Date();
      const parts = localParts(now, timezone);
      const hour = Number(parts.hour);
      if (hour < 6 || hour >= 18) {
        this.dom.observerDateTime.value = dateToLocalInput(now, timezone);
        return;
      }
      this.dom.observerDateTime.value = `${parts.year}-${parts.month}-${parts.day}T21:00`;
    }

    stepTime(hours) {
      const form = this.readForm();
      if (!form) return;
      const next = new Date(form.date.getTime() + hours * HOUR_MS);
      this.dom.observerDateTime.value = dateToLocalInput(next, form.timezone);
      this.generate();
    }

    useBestObservationTime() {
      if (!this.snapshot?.bestTime?.time) return;
      this.dom.observerDateTime.value = dateToLocalInput(
        this.snapshot.bestTime.time,
        this.snapshot.form.timezone,
      );
      this.generate();
    }

    useDeviceLocation() {
      if (!navigator.geolocation) {
        this.setFormStatus("当前浏览器不支持设备定位，请使用城市或手动坐标。", "error");
        return;
      }
      this.dom.useDeviceLocation.disabled = true;
      this.setFormStatus("正在请求设备位置…", "loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.dom.observerLocation.value = "manual";
          this.dom.observerLatitude.value = position.coords.latitude.toFixed(4);
          this.dom.observerLongitude.value = position.coords.longitude.toFixed(4);
          if (Number.isFinite(position.coords.altitude)) {
            this.dom.observerElevation.value = String(Math.round(position.coords.altitude));
          }
          const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (this.ensureTimezoneOption(browserTimezone)) {
            this.dom.observerTimezone.value = browserTimezone;
          }
          this.locationSource = "device";
          this.locationLabel = "设备位置";
          this.pollutionSource = "手动设置";
          this.dom.useDeviceLocation.disabled = false;
          if (!this.dom.observerDateTime.value) this.setTonightTime();
          this.setFormStatus("已读取设备位置；不会查询天气，除非你勾选天气选项或点击刷新。", "success");
          this.generate();
        },
        (error) => {
          const messages = {
            1: "定位权限被拒绝，仍可使用城市或手动坐标。",
            2: "暂时无法获取位置，请检查设备定位服务。",
            3: "定位请求超时，请稍后重试。",
          };
          this.dom.useDeviceLocation.disabled = false;
          this.setFormStatus(messages[error.code] || "设备定位失败。", "error");
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 15 * 60 * 1000 },
      );
    }

    readForm() {
      const latitude = Number(this.dom.observerLatitude.value);
      const longitude = Number(this.dom.observerLongitude.value);
      const elevation = Number(this.dom.observerElevation.value);
      const timezone = this.dom.observerTimezone.value;
      const localDateTime = this.dom.observerDateTime.value;
      const bortle = Number(this.dom.observerBortle.value);
      const equipment = this.dom.observerEquipment.value;
      const validations = [
        [this.dom.observerLatitude, Number.isFinite(latitude) && latitude >= -90 && latitude <= 90],
        [this.dom.observerLongitude, Number.isFinite(longitude) && longitude >= -180 && longitude <= 180],
        [this.dom.observerElevation, Number.isFinite(elevation) && elevation >= -500 && elevation <= 9000],
        [this.dom.observerDateTime, Boolean(localDateTime)],
      ];
      validations.forEach(([input, valid]) => input.setAttribute("aria-invalid", String(!valid)));
      if (
        validations.some(([, valid]) => !valid)
        || !timezone
        || !this.bortleByLevel.has(bortle)
        || !["naked-eye", "binoculars", "telescope"].includes(equipment)
      ) {
        this.setFormStatus("请检查经纬度、海拔、日期时间和时区。", "error");
        return null;
      }
      const date = zonedDateTimeToDate(localDateTime, timezone);
      if (!date) {
        this.dom.observerDateTime.setAttribute("aria-invalid", "true");
        this.setFormStatus("该日期时间在所选时区中不存在，或时区无效；请避开夏令时跳转时段。", "error");
        return null;
      }
      const selectedLocation = this.locationById.get(this.dom.observerLocation.value);
      const label = selectedLocation?.name || this.locationLabel || "手动坐标";
      return { latitude, longitude, elevation, timezone, localDateTime, bortle, equipment, date, label };
    }

    async generate() {
      const form = this.readForm();
      if (!form) return;
      const request = ++this.calculationRequest;
      this.dom.generateTonight.disabled = true;
      this.setFormStatus("正在计算当地天空…", "loading");
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (request !== this.calculationRequest) return;

      try {
        this.cancelWeatherRequest();
        this.weather = this.dom.weatherConsent.checked
          ? { status: "loading", data: null, error: "" }
          : { status: "idle", data: null, error: "" };
        this.snapshot = this.calculateSnapshot(form);
        this.renderAll();
        this.savePreferences();
        if (this.dom.weatherConsent.checked) {
          this.setFormStatus("天文结果已更新；天气正在独立查询。", "success");
          this.fetchWeather(false);
        } else {
          this.setFormStatus("天文结果已更新；天气查询未启用。", "success");
        }
      } catch (error) {
        console.error(error);
        this.setFormStatus("天空计算失败，请检查输入或刷新页面。", "error");
      } finally {
        this.dom.generateTonight.disabled = false;
      }
    }

    calculateSnapshot(form) {
      const observer = new this.A.Observer(form.latitude, form.longitude, form.elevation);
      const sun = this.bodyPosition(this.A.Body.Sun, form.date, observer, false);
      const moon = this.bodyPosition(this.A.Body.Moon, form.date, observer, true);
      const moonIllumination = this.A.Illumination(this.A.Body.Moon, form.date);
      const moonPhase = this.A.MoonPhase(form.date);
      const darkness = this.calculateDarkness(form, observer);
      const planets = this.planetDefinitions.map((definition) => {
        let elongation = null;
        try {
          elongation = this.A.AngleFromSun(definition.body, form.date);
        } catch {
          elongation = null;
        }
        return {
          ...definition,
          ...this.bodyPosition(definition.body, form.date, observer, true),
          elongation,
          ...this.calculateBodyEvents(definition.body, darkness.anchorNoon, observer),
        };
      });
      const constellations = this.calculateConstellations(form, observer);
      const bortle = this.bortleByLevel.get(form.bortle);
      const stars = this.calculateHorizonStars(form, observer, bortle.nakedEyeLimit);
      const events = this.calculateEvents(form, observer);
      const bestTime = this.calculateBestObservationTime(form, observer, darkness, bortle);

      return {
        form,
        observer,
        sun,
        moon: { ...moon, illumination: moonIllumination.phase_fraction, phaseAngle: moonPhase },
        darkness,
        planets,
        constellations,
        stars,
        events,
        bestTime,
        bortle,
        generatedAt: new Date(),
      };
    }

    bodyPosition(body, date, observer, withIllumination) {
      const equator = this.A.Equator(body, date, observer, true, true);
      const horizon = this.A.Horizon(date, observer, equator.ra, equator.dec, "normal");
      let magnitude = null;
      if (withIllumination) {
        try {
          magnitude = this.A.Illumination(body, date).mag;
        } catch {
          magnitude = null;
        }
      }
      return {
        altitude: horizon.altitude,
        azimuth: horizon.azimuth,
        ra: equator.ra,
        dec: equator.dec,
        magnitude,
      };
    }

    calculateBodyEvents(body, startDate, observer) {
      const safeDate = (callback) => {
        try {
          const result = callback();
          return result?.date || result?.time?.date || null;
        } catch {
          return null;
        }
      };
      const rise = safeDate(() => this.A.SearchRiseSet(body, observer, +1, startDate, 1.25));
      const set = safeDate(() => this.A.SearchRiseSet(body, observer, -1, startDate, 1.25));
      let transit = null;
      try {
        transit = this.A.SearchHourAngle(body, observer, 0, startDate, +1)?.time?.date || null;
      } catch {
        transit = null;
      }
      return { rise, set, transit };
    }

    calculateDarkness(form, observer) {
      const localDate = form.localDateTime.slice(0, 10);
      const localHour = Number(form.localDateTime.slice(11, 13));
      const nightDate = localHour < 12 ? shiftIsoDate(localDate, -1) : localDate;
      const noon = zonedDateTimeToDate(`${nightDate}T12:00`, form.timezone) || form.date;
      const safeSearch = (callback) => {
        try {
          return callback()?.date || null;
        } catch {
          return null;
        }
      };
      const duskResult = safeSearch(() => this.A.SearchAltitude(this.A.Body.Sun, observer, -1, noon, 1.25, -18));
      const dawnStart = duskResult ? new Date(duskResult.getTime() + 60 * 1000) : noon;
      const dawnResult = safeSearch(() => this.A.SearchAltitude(this.A.Body.Sun, observer, +1, dawnStart, 1.5, -18));
      const sunset = safeSearch(() => this.A.SearchRiseSet(this.A.Body.Sun, observer, -1, noon, 1.25));
      const sunriseStart = sunset ? new Date(sunset.getTime() + 60 * 1000) : noon;
      const sunrise = safeSearch(() => this.A.SearchRiseSet(this.A.Body.Sun, observer, +1, sunriseStart, 1.5));
      const moonrise = safeSearch(() => this.A.SearchRiseSet(this.A.Body.Moon, observer, +1, noon, 1.25));
      const moonset = safeSearch(() => this.A.SearchRiseSet(this.A.Body.Moon, observer, -1, noon, 1.25));

      const sampledAltitudes = [];
      for (let hour = 0; hour <= 24; hour += 1) {
        sampledAltitudes.push(this.bodyPosition(
          this.A.Body.Sun,
          new Date(noon.getTime() + hour * HOUR_MS),
          observer,
          false,
        ).altitude);
      }
      const minimumSunAltitude = Math.min(...sampledAltitudes);
      const maximumSunAltitude = Math.max(...sampledAltitudes);
      let astronomicalState = "partial";
      if (maximumSunAltitude <= -18) astronomicalState = "continuous-dark";
      else if (minimumSunAltitude > -18) astronomicalState = "no-dark";

      return {
        nightDate,
        anchorNoon: noon,
        astronomicalState,
        minimumSunAltitude,
        maximumSunAltitude,
        astronomicalDusk: duskResult,
        astronomicalDawn: dawnResult,
        sunset,
        sunrise,
        moonrise,
        moonset,
      };
    }

    calculateConstellations(form, observer) {
      const rotation = this.A.Rotation_EQJ_HOR(form.date, observer);
      return this.constellations.map((item) => {
        const rawLongitude = Number(item.profile?.center?.longitude || 0);
        const longitude = ((rawLongitude % 360) + 360) % 360;
        const raHours = longitude / 15;
        const dec = Number(item.profile?.center?.declination || 0);
        const vector = this.A.VectorFromSphere(new this.A.Spherical(dec, longitude, 1), form.date);
        const horizontalVector = this.A.RotateVector(rotation, vector);
        const horizon = this.A.HorizonFromVector(horizontalVector, "normal");
        const result = {
          item,
          raHours,
          dec,
          altitude: horizon.lat,
          azimuth: horizon.lon,
          direction: directionName(horizon.lon),
          rise: null,
          set: null,
          transit: null,
          circumpolar: false,
        };
        if (horizon.lat >= 0) this.addConstellationEvents(result, form, observer);
        return result;
      }).sort((left, right) => right.altitude - left.altitude);
    }

    addConstellationEvents(result, form, observer) {
      try {
        this.A.DefineStar(this.A.Body.Star1, result.raHours, result.dec, 1000);
        result.rise = this.A.SearchRiseSet(this.A.Body.Star1, observer, +1, form.date, -1.2)?.date || null;
        result.set = this.A.SearchRiseSet(this.A.Body.Star1, observer, -1, form.date, 1.2)?.date || null;
        result.transit = this.A.SearchHourAngle(this.A.Body.Star1, observer, 0, form.date, +1)?.time?.date || null;
        result.circumpolar = !result.rise && !result.set && result.altitude >= 0;
      } catch {
        result.rise = null;
        result.set = null;
      }
    }

    calculateHorizonStars(form, observer, nakedEyeLimit) {
      const catalogLimit = Number(this.skyAtlas.meta?.starMagnitudeLimit ?? 6);
      const magnitudeLimit = Math.min(catalogLimit, nakedEyeLimit);
      const rotation = this.A.Rotation_EQJ_HOR(form.date, observer);
      const stars = [];
      this.skyAtlas.stars.forEach((star) => {
        if (star.mag > magnitudeLimit) return;
        const vector = this.A.VectorFromSphere(
          new this.A.Spherical(star.dec, star.ra, 1),
          form.date,
        );
        const horizontalVector = this.A.RotateVector(rotation, vector);
        const horizon = this.A.HorizonFromVector(horizontalVector, "normal");
        if (horizon.lat < 0) return;
        stars.push({ ...star, altitude: horizon.lat, azimuth: horizon.lon });
      });
      return stars.sort((left, right) => right.mag - left.mag);
    }

    calculateBestObservationTime(form, observer, darkness, bortle, weatherHours = []) {
      const fallbackStart = zonedDateTimeToDate(`${darkness.nightDate}T18:00`, form.timezone)
        || darkness.anchorNoon;
      const fallbackEnd = zonedDateTimeToDate(
        `${shiftIsoDate(darkness.nightDate, 1)}T06:00`,
        form.timezone,
      ) || new Date(fallbackStart.getTime() + 12 * HOUR_MS);
      const start = darkness.astronomicalDusk || darkness.sunset || fallbackStart;
      let end = darkness.astronomicalDawn || darkness.sunrise || fallbackEnd;
      if (end <= start) end = new Date(start.getTime() + 12 * HOUR_MS);

      let best = null;
      for (let time = new Date(start); time <= end; time = new Date(time.getTime() + 30 * 60 * 1000)) {
        const sun = this.bodyPosition(this.A.Body.Sun, time, observer, false);
        if (sun.altitude > -6) continue;
        const moon = this.bodyPosition(this.A.Body.Moon, time, observer, false);
        let moonIllumination = 0;
        try {
          moonIllumination = this.A.Illumination(this.A.Body.Moon, time).phase_fraction;
        } catch {
          moonIllumination = 0;
        }
        const moonImpact = moon.altitude <= 0
          ? 0
          : moonIllumination * Math.sin(clamp(moon.altitude, 0, 90) * Math.PI / 180);

        const rotation = this.A.Rotation_EQJ_HOR(time, observer);
        let targetCount = 0;
        this.constellations.forEach((item) => {
          const longitude = ((Number(item.profile?.center?.longitude || 0) % 360) + 360) % 360;
          const declination = Number(item.profile?.center?.declination || 0);
          const vector = this.A.VectorFromSphere(new this.A.Spherical(declination, longitude, 1), time);
          const horizon = this.A.HorizonFromVector(this.A.RotateVector(rotation, vector), "normal");
          if (horizon.lat >= 35) targetCount += 1;
        });

        let planetCount = 0;
        this.planetDefinitions.forEach((definition) => {
          const position = this.bodyPosition(definition.body, time, observer, true);
          let elongation = null;
          try {
            elongation = this.A.AngleFromSun(definition.body, time);
          } catch {
            elongation = null;
          }
          if (
            position.altitude >= 15
            && Number.isFinite(position.magnitude)
            && position.magnitude <= 6
            && (!Number.isFinite(elongation) || elongation >= 10)
          ) planetCount += 1;
        });

        const darknessScore = clamp((-sun.altitude - 6) / 12, 0, 1);
        const targetScore = clamp(targetCount / 10, 0, 1);
        const planetScore = clamp(planetCount / 3, 0, 1);
        const pollutionScore = clamp((10 - bortle.level) / 9, 0, 1);
        let score = darknessScore * 42
          + (1 - moonImpact) * 28
          + targetScore * 18
          + planetScore * 8
          + pollutionScore * 4;
        let weather = null;
        if (weatherHours.length) {
          weather = weatherHours.reduce((nearest, entry) => (
            !nearest || Math.abs(entry.time - time) < Math.abs(nearest.time - time) ? entry : nearest
          ), null);
          if (weather && Math.abs(weather.time - time) <= 90 * 60 * 1000) {
            score -= weather.cloudCover * 0.34;
            score -= weather.precipitationProbability * 0.28;
            score -= Math.max(0, weather.windSpeed - 15) * 0.4;
          } else {
            weather = null;
          }
        }
        if (!best || score > best.score) {
          best = {
            time,
            score,
            sunAltitude: sun.altitude,
            moonImpact,
            targetCount,
            planetCount,
            weather,
          };
        }
      }
      return best;
    }

    calculateEvents(form, observer) {
      const selectedYear = Number(form.localDateTime.slice(0, 4));
      const selectedMonth = Number(form.localDateTime.slice(5, 7));
      const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
      const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
      const monthStart = zonedDateTimeToDate(
        `${selectedYear}-${pad(selectedMonth)}-01T00:00`,
        form.timezone,
      );
      const nextMonthStart = zonedDateTimeToDate(
        `${nextYear}-${pad(nextMonth)}-01T00:00`,
        form.timezone,
      );
      if (!monthStart || !nextMonthStart) return [];

      const events = [];
      let quarter = this.A.SearchMoonQuarter(new Date(monthStart.getTime() - 1000));
      const quarterNames = ["新月", "上弦月", "满月", "下弦月"];
      for (let index = 0; index < 6 && quarter.time.date < nextMonthStart; index += 1) {
        if (quarter.time.date >= monthStart) {
          events.push({
            id: `moon-quarter-${quarter.time.ut}`,
            kind: "月相",
            title: quarterNames[quarter.quarter],
            time: quarter.time.date,
            detail: "月相时刻由 Astronomy Engine 计算。",
          });
        }
        quarter = this.A.NextMoonQuarter(quarter);
      }

      events.push(...this.monthlyMeteorShowers(
        form,
        selectedYear,
        selectedMonth,
        monthStart,
        nextMonthStart,
      ));
      events.push(...this.findMoonPlanetConjunctions(monthStart, nextMonthStart, form, observer));
      return events.sort((left, right) => left.time - right.time).slice(0, 20);
    }

    monthlyMeteorShowers(form, selectedYear, selectedMonth, monthStart, nextMonthStart) {
      const events = [];
      this.data.meteorShowers.forEach((shower) => {
        const crossesYear = shower.startMonth > shower.endMonth
          || (shower.startMonth === shower.endMonth && shower.startDay > shower.endDay);
        let startYear = selectedYear;
        let endYear = selectedYear;
        if (crossesYear) {
          if (selectedMonth <= shower.endMonth) startYear -= 1;
          else endYear += 1;
        }
        const activityStart = zonedDateTimeToDate(
          `${startYear}-${pad(shower.startMonth)}-${pad(shower.startDay)}T00:00`,
          form.timezone,
        );
        const activityEnd = zonedDateTimeToDate(
          `${endYear}-${pad(shower.endMonth)}-${pad(shower.endDay)}T23:59`,
          form.timezone,
        );
        if (!activityStart || !activityEnd || activityEnd < monthStart || activityStart >= nextMonthStart) return;

        const peakYear = crossesYear && shower.peakMonth <= shower.endMonth ? endYear : startYear;
        const peak = zonedDateTimeToDate(
          `${peakYear}-${pad(shower.peakMonth)}-${pad(shower.peakDay)}T12:00`,
          form.timezone,
        );
        if (!peak) return;
        const isPeakMonth = peak >= monthStart && peak < nextMonthStart;
        const representativeTime = isPeakMonth
          ? peak
          : new Date(Math.max(activityStart.getTime(), monthStart.getTime()));
        events.push({
          id: `meteor-${shower.id}-${selectedYear}-${pad(selectedMonth)}`,
          kind: "流星雨",
          title: `${shower.name}${isPeakMonth ? "" : "（活跃期）"}`,
          time: representativeTime,
          dateOnly: true,
          detail: `${shower.window} · 常年峰值 ${shower.peakMonth}月${shower.peakDay}日 · 辐射点 ${shower.radiant} · ${shower.zhr} · 母体 ${shower.parent} · ${shower.hemisphere}。峰值日期与流量仅供年度参考。`,
          constellation: shower.constellation,
          peakTime: peak,
          activityStart,
          activityEnd,
        });
      });
      return events;
    }

    findMoonPlanetConjunctions(startDate, endDate, form, observer) {
      const samples = [];
      const sampleCount = Math.ceil((endDate - startDate) / (6 * HOUR_MS));
      for (let index = -1; index <= sampleCount + 1; index += 1) {
        const time = new Date(startDate.getTime() + index * 6 * HOUR_MS);
        samples.push({ time, moon: this.A.GeoVector(this.A.Body.Moon, time, true) });
      }
      const events = [];
      this.planetDefinitions.forEach((planet) => {
        const angles = samples.map((sample) => this.A.AngleBetween(
          sample.moon,
          this.A.GeoVector(planet.body, sample.time, true),
        ));
        const planetEvents = [];
        for (let index = 1; index < angles.length - 1; index += 1) {
          if (angles[index] > 10 || angles[index] > angles[index - 1] || angles[index] > angles[index + 1]) continue;
          let refined = null;
          for (let minute = -360; minute <= 360; minute += 10) {
            const time = new Date(samples[index].time.getTime() + minute * 60 * 1000);
            const angle = this.A.AngleBetween(
              this.A.GeoVector(this.A.Body.Moon, time, true),
              this.A.GeoVector(planet.body, time, true),
            );
            if (!refined || angle < refined.angle) refined = { angle, time };
          }
          if (!refined || refined.time < startDate || refined.time >= endDate || refined.angle > 8) continue;
          if (planetEvents.some((entry) => Math.abs(entry.time - refined.time) < 5 * DAY_MS)) continue;
          planetEvents.push(refined);
        }
        planetEvents.forEach((best) => {
          const visibility = this.assessConjunctionVisibility(
            best.time,
            planet.body,
            observer,
            startDate,
            endDate,
          );
          const localDetail = visibility.alternative
            ? `精确接近时${visibility.label}；可在 ${formatInZone(visibility.alternative.time, form.timezone)} 附近观察，届时角距约 ${visibility.alternative.angle.toFixed(1)}°。`
            : `当地判断：${visibility.label}。`;
          events.push({
            id: `moon-${planet.id}-${best.time.toISOString().slice(0, 16)}`,
            kind: "行星合月",
            title: `月亮接近${planet.name}`,
            time: best.time,
            approximateTime: true,
            visibilityLevel: visibility.level,
            detail: `地心视角最小角距约 ${best.angle.toFixed(1)}°。${localDetail}`,
          });
        });
      });
      return events;
    }

    assessConjunctionVisibility(time, planetBody, observer, startDate, endDate) {
      const inspect = (candidate) => {
        const sun = this.bodyPosition(this.A.Body.Sun, candidate, observer, false);
        const moon = this.bodyPosition(this.A.Body.Moon, candidate, observer, false);
        const planet = this.bodyPosition(planetBody, candidate, observer, false);
        const observable = sun.altitude <= -6 && moon.altitude >= 10 && planet.altitude >= 10;
        let label = "可直接观测";
        let level = "good";
        if (!observable && sun.altitude > 0) {
          label = "发生在日光时段";
          level = "daylight";
        } else if (!observable && sun.altitude > -6) {
          label = "发生在明亮暮光中";
          level = "twilight";
        } else if (!observable && (moon.altitude < 0 || planet.altitude < 0)) {
          label = "至少一个目标在地平线下";
          level = "below";
        } else if (!observable) {
          label = "目标高度较低";
          level = "low";
        }
        return { observable, label, level, moon, planet, sun };
      };

      const exact = inspect(time);
      if (exact.observable) return exact;
      let alternative = null;
      for (let step = 1; step <= 16 && !alternative; step += 1) {
        for (const direction of [-1, 1]) {
          const candidate = new Date(time.getTime() + direction * step * 30 * 60 * 1000);
          if (candidate < startDate || candidate >= endDate) continue;
          const state = inspect(candidate);
          if (!state.observable) continue;
          const angle = this.A.AngleBetween(
            this.A.GeoVector(this.A.Body.Moon, candidate, true),
            this.A.GeoVector(planetBody, candidate, true),
          );
          alternative = { time: candidate, angle };
          break;
        }
      }
      return { ...exact, alternative };
    }

    renderAll() {
      this.renderOverview();
      this.renderConditions();
      this.renderVisibleConstellations();
      this.renderEvents();
      this.renderPlanetList();
      this.drawHorizon();
      this.buildChecklist();
    }

    renderOverview() {
      const { form, bortle } = this.snapshot;
      this.dom.tonightLocation.textContent = `${form.label} · ${formatCoordinate(form.latitude, "N", "S")}`;
      this.dom.tonightHeadline.textContent = `${form.label}的当地天空`;
      this.dom.tonightDate.textContent = `${formatInZone(form.date, form.timezone)} · ${form.timezone}`;
      this.dom.tonightCoordinates.textContent = `${formatCoordinate(form.latitude, "N", "S")} / ${formatCoordinate(form.longitude, "E", "W")}`;
      const catalogLimit = Number(this.skyAtlas.meta?.starMagnitudeLimit ?? 6);
      this.dom.tonightMagnitudeLimit.textContent = bortle.nakedEyeLimit > catalogLimit
        ? `肉眼约 ${bortle.nakedEyeLimit.toFixed(1)} 等 · 本图至 ${catalogLimit.toFixed(1)} 等`
        : `约 ${bortle.nakedEyeLimit.toFixed(1)} 等`;
      this.renderQuality();
    }

    calculateMoonImpact() {
      const { moon } = this.snapshot;
      if (moon.altitude <= 0) return 0;
      return moon.illumination * Math.sin(clamp(moon.altitude, 0, 90) * Math.PI / 180);
    }

    qualityAssessment() {
      const { sun, bortle } = this.snapshot;
      const moonImpact = this.calculateMoonImpact();
      const reasons = [];
      if (sun.altitude > -6) {
        return { level: "pending", label: "等待入夜", reasons: ["太阳仍高于民用暮光线"] };
      }

      let penalty = 0;
      if (sun.altitude > -18) {
        penalty += 2;
        reasons.push("天空尚未进入天文黑夜");
      } else {
        reasons.push("太阳已低于天文暮光线");
      }
      if (moonImpact > 0.6) {
        penalty += 3;
        reasons.push("高空月光较强");
      } else if (moonImpact > 0.25) {
        penalty += 1;
        reasons.push("月光有一定影响");
      } else {
        reasons.push("月光影响较小");
      }
      if (bortle.level >= 8) {
        penalty += 2;
        reasons.push("城市光污染明显");
      } else if (bortle.level >= 6) {
        penalty += 1;
        reasons.push("天空背景偏亮");
      } else {
        reasons.push("光污染条件较好");
      }

      if (this.weather.status === "success") {
        const weather = this.weather.data;
        if (weather.cloudCover >= 80 || weather.precipitationProbability >= 70) {
          penalty += 5;
          reasons.push("云量或降水概率很高");
        } else if (weather.cloudCover >= 50) {
          penalty += 3;
          reasons.push("云层可能频繁遮挡");
        } else if (weather.cloudCover >= 25) {
          penalty += 1;
          reasons.push("存在局部云层");
        } else {
          reasons.push("预报云量较低");
        }
      } else {
        reasons.push("天气未计入结论");
      }

      if (penalty <= 1) return { level: "excellent", label: "推荐观测", reasons };
      if (penalty <= 3) return { level: "good", label: "条件尚可", reasons };
      if (penalty <= 6) return { level: "fair", label: "条件一般", reasons };
      return { level: "poor", label: "不适合观测", reasons };
    }

    renderQuality() {
      if (!this.snapshot) return;
      const quality = this.qualityAssessment();
      this.dom.nightQuality.dataset.level = quality.level;
      this.dom.nightQuality.textContent = quality.label;
      this.dom.nightQualityReason.textContent = quality.reasons.slice(0, 4).join("；") + "。";
    }

    renderConditions() {
      const { form, sun, moon, darkness, bortle, planets } = this.snapshot;
      if (sun.altitude <= -18) {
        this.dom.darknessValue.textContent = "天文黑夜";
        this.dom.darknessDetail.textContent = `太阳高度 ${sun.altitude.toFixed(1)}°，暗弱目标对比度最佳。`;
      } else if (sun.altitude <= -12) {
        this.dom.darknessValue.textContent = "航海暮光";
        this.dom.darknessDetail.textContent = `太阳高度 ${sun.altitude.toFixed(1)}°，亮星已清楚可见。`;
      } else if (sun.altitude <= -6) {
        this.dom.darknessValue.textContent = "民用暮光";
        this.dom.darknessDetail.textContent = `太阳高度 ${sun.altitude.toFixed(1)}°，等待天空继续变暗。`;
      } else {
        this.dom.darknessValue.textContent = sun.altitude > 0 ? "日光时段" : "黄昏 / 黎明";
        this.dom.darknessDetail.textContent = `太阳高度 ${sun.altitude.toFixed(1)}°。`;
      }
      if (darkness.astronomicalDusk && darkness.astronomicalDawn) {
        this.dom.nightWindow.textContent = `天文黑夜 ${formatInZone(darkness.astronomicalDusk, form.timezone)}–${formatInZone(darkness.astronomicalDawn, form.timezone)}`;
      } else if (darkness.astronomicalState === "continuous-dark") {
        this.dom.nightWindow.textContent = `持续天文黑夜：这一当地日太阳最高约 ${darkness.maximumSunAltitude.toFixed(1)}°`;
      } else if (darkness.astronomicalState === "no-dark") {
        this.dom.nightWindow.textContent = `无天文黑夜：这一当地日太阳最低约 ${darkness.minimumSunAltitude.toFixed(1)}°`;
      } else {
        this.dom.nightWindow.textContent = "暮光交点未完整落入单夜搜索窗口，请结合太阳高度判断";
      }

      const phase = moonPhaseInfo(moon.phaseAngle);
      const illumination = Math.round(moon.illumination * 100);
      this.dom.moonPhaseVisual.textContent = phase.symbol;
      this.dom.moonValue.textContent = `${phase.name} · ${illumination}%`;
      this.dom.moonDetail.textContent = moon.altitude > 0
        ? `月亮位于${directionName(moon.azimuth)}方，高度 ${moon.altitude.toFixed(1)}°。`
        : `月亮在地平线下 ${Math.abs(moon.altitude).toFixed(1)}°。`;
      this.dom.moonTimes.textContent = `月升 ${formatInZone(darkness.moonrise, form.timezone)} · 月落 ${formatInZone(darkness.moonset, form.timezone)}`;

      this.dom.pollutionValue.textContent = `Bortle ${bortle.level} · ${bortle.title}`;
      this.dom.pollutionDetail.textContent = `${bortle.note} 理论肉眼极限约 ${bortle.nakedEyeLimit.toFixed(1)} 等。`;
      this.dom.pollutionSource.textContent = `${this.pollutionSource}，并非观测点实测值`;

      const aboveHorizonPlanets = planets.filter((planet) => planet.altitude >= 5);
      this.dom.planetValue.textContent = aboveHorizonPlanets.length ? `${aboveHorizonPlanets.length} 颗` : "暂无";
      this.dom.planetDetail.textContent = aboveHorizonPlanets.length
        ? aboveHorizonPlanets.map((planet) => `${planet.name} ${planet.altitude.toFixed(0)}°`).join(" · ")
        : "所选时刻主要行星均较低或在地平线下。";

      const best = this.snapshot.bestTime;
      if (best?.time) {
        this.dom.bestTimeLabel.textContent = best.weather ? "综合推荐时刻" : "天文推荐时刻";
        this.dom.bestTimeValue.textContent = formatInZone(best.time, form.timezone);
        const moonText = best.moonImpact < 0.15
          ? "月光影响较小"
          : best.moonImpact < 0.45 ? "月光有一定影响" : "月光影响明显";
        const weatherText = best.weather
          ? ` · 云量 ${Math.round(best.weather.cloudCover)}% · 降水 ${Math.round(best.weather.precipitationProbability)}%`
          : "";
        this.dom.bestTimeDetail.textContent = `太阳 ${best.sunAltitude.toFixed(1)}° · ${moonText} · 高空星座 ${best.targetCount} 个${best.planetCount ? ` · 亮行星 ${best.planetCount} 颗` : ""}${weatherText}`;
        this.dom.useBestTime.disabled = Math.abs(best.time - form.date) < 15 * 60 * 1000;
      } else {
        this.dom.bestTimeLabel.textContent = "天文推荐时刻";
        this.dom.bestTimeValue.textContent = "本夜无黑暗窗口";
        this.dom.bestTimeDetail.textContent = "太阳整夜未低于民用暮光线，可优先观察月亮或明亮行星。";
        this.dom.useBestTime.disabled = true;
      }
      this.renderWeather();
    }

    renderWeather() {
      const status = this.weather.status;
      if (status === "loading") {
        this.dom.weatherValue.textContent = "查询中";
        this.dom.weatherDetail.textContent = "天文结果已经可用，天气请求不会阻塞页面。";
        this.dom.weatherTimestamp.textContent = "Open-Meteo 逐小时预报";
      } else if (status === "success") {
        const weather = this.weather.data;
        this.dom.weatherValue.textContent = `${weatherDescription(weather.weatherCode)} · 云量 ${Math.round(weather.cloudCover)}%`;
        this.dom.weatherDetail.textContent = `${weather.temperature.toFixed(0)}°C · 降水概率 ${Math.round(weather.precipitationProbability)}% · 能见度 ${weather.visibility.toFixed(1)} km · 风速 ${weather.windSpeed.toFixed(1)} km/h`;
        this.dom.weatherTimestamp.textContent = `${weather.forecastTime.replace("T", " ")} · Open-Meteo`;
      } else if (status === "out-of-range") {
        this.dom.weatherValue.textContent = "超出预报范围";
        this.dom.weatherDetail.textContent = "所选时间没有逐小时预报，天文结果仍然有效。";
        this.dom.weatherTimestamp.textContent = "通常仅提供未来约 16 天";
      } else if (status === "error") {
        this.dom.weatherValue.textContent = "天气暂不可用";
        this.dom.weatherDetail.textContent = this.weather.error || "网络或服务异常；请根据当地实际云量判断。";
        this.dom.weatherTimestamp.textContent = "不会影响星空与升落计算";
      } else {
        this.dom.weatherValue.textContent = "等待查询";
        this.dom.weatherDetail.textContent = "勾选天气选项或点击刷新后，才会向 Open-Meteo 查询。";
        this.dom.weatherTimestamp.textContent = "天文计算无需联网，也不会发送位置";
      }
    }

    renderVisibleConstellations() {
      if (!this.snapshot) return;
      const threshold = Number(this.dom.visibleAltitudeFilter.value);
      const visible = this.snapshot.constellations.filter((entry) => entry.altitude >= threshold);
      this.dom.visibleConstellationCount.textContent = `${visible.length} 个`;
      this.dom.visibleConstellationList.replaceChildren();
      visible.forEach((entry) => {
        const row = document.createElement("article");
        row.className = "visible-constellation-row";
        const nameButton = document.createElement("button");
        nameButton.type = "button";
        nameButton.dataset.constellationId = entry.item.id;
        const name = document.createElement("strong");
        name.textContent = entry.item.name;
        const latin = document.createElement("small");
        latin.textContent = `${entry.item.abbr} · ${entry.item.latin}`;
        nameButton.append(name, latin);

        const altitude = document.createElement("div");
        altitude.className = "visible-altitude";
        const meter = document.createElement("span");
        meter.style.width = `${clamp(entry.altitude / 90 * 100, 0, 100)}%`;
        altitude.append(meter);

        const position = document.createElement("p");
        const positionAltitude = document.createElement("strong");
        positionAltitude.textContent = `${entry.altitude.toFixed(1)}°`;
        const positionDirection = document.createElement("span");
        positionDirection.textContent = `${entry.direction} · 方位 ${entry.azimuth.toFixed(0)}°`;
        position.append(positionAltitude, positionDirection);
        const timing = document.createElement("p");
        timing.className = "visible-timing";
        if (entry.circumpolar) {
          timing.textContent = "当前地点近似拱极，单日内不落";
        } else {
          timing.textContent = `升起 ${formatNightEvent(entry.rise, this.snapshot.form.timezone, this.snapshot.darkness.nightDate)} · 落下 ${formatNightEvent(entry.set, this.snapshot.form.timezone, this.snapshot.darkness.nightDate)}`;
        }
        row.append(nameButton, altitude, position, timing);
        this.dom.visibleConstellationList.append(row);
      });
      if (!visible.length) {
        const empty = document.createElement("p");
        empty.className = "result-empty";
        empty.textContent = "当前高度阈值下没有星座中心位于地平线以上。";
        this.dom.visibleConstellationList.append(empty);
      }
    }

    renderEvents() {
      this.dom.eventList.replaceChildren();
      this.snapshot.events.forEach((event) => {
        const article = document.createElement("article");
        if (event.visibilityLevel) article.dataset.visibility = event.visibilityLevel;
        const date = document.createElement("time");
        date.dateTime = event.time.toISOString();
        const eventTime = event.dateOnly
          ? formatDateOnlyInZone(event.time, this.snapshot.form.timezone)
          : formatInZone(event.time, this.snapshot.form.timezone);
        date.textContent = event.approximateTime ? `约 ${eventTime}` : eventTime;
        const body = document.createElement("div");
        const kind = document.createElement("p");
        kind.textContent = event.kind;
        const title = document.createElement("h4");
        title.textContent = event.title;
        const detail = document.createElement("span");
        detail.textContent = event.detail;
        body.append(kind, title, detail);
        article.append(date, body);
        if (event.constellation) {
          const related = this.constellationByAbbr.get(event.constellation);
          if (related) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = related.name;
            button.addEventListener("click", () => this.onSelectConstellation(related.id));
            article.append(button);
          }
        }
        this.dom.eventList.append(article);
      });
      if (!this.snapshot.events.length) {
        const empty = document.createElement("p");
        empty.className = "result-empty";
        empty.textContent = "所选自然月暂无本项目收录的月相、流星雨峰值或 8° 内行星合月事件。";
        this.dom.eventList.append(empty);
      }
    }

    renderPlanetList() {
      this.dom.planetList.replaceChildren();
      this.snapshot.planets.forEach((planet) => {
        const row = document.createElement("div");
        const name = document.createElement("p");
        const symbol = document.createElement("span");
        symbol.setAttribute("aria-hidden", "true");
        symbol.textContent = planet.symbol;
        const label = document.createElement("strong");
        label.textContent = planet.name;
        name.append(symbol, label);
        const altitude = document.createElement("span");
        const elongation = Number.isFinite(planet.elongation) ? ` · 离日 ${planet.elongation.toFixed(0)}°` : "";
        altitude.textContent = planet.altitude >= 0
          ? `${planet.altitude.toFixed(1)}° · ${directionName(planet.azimuth)}${elongation}`
          : `地平线下 ${Math.abs(planet.altitude).toFixed(1)}°${elongation}`;
        const magnitude = document.createElement("span");
        magnitude.textContent = Number.isFinite(planet.magnitude) ? `${planet.magnitude.toFixed(1)} 等` : "—";
        const timing = document.createElement("small");
        timing.className = "planet-timing";
        timing.textContent = `升 ${formatNightEvent(planet.rise, this.snapshot.form.timezone, this.snapshot.darkness.nightDate)} · 中天 ${formatNightEvent(planet.transit, this.snapshot.form.timezone, this.snapshot.darkness.nightDate)} · 落 ${formatNightEvent(planet.set, this.snapshot.form.timezone, this.snapshot.darkness.nightDate)}`;
        row.append(name, altitude, magnitude, timing);
        this.dom.planetList.append(row);
      });
    }

    buildChecklist() {
      if (!this.snapshot) return;
      const previous = new Map(this.checklist.map((item) => [item.id, item.checked]));
      const threshold = Number(this.dom.visibleAltitudeFilter.value);
      const isDarkEnoughForStars = this.snapshot.sun.altitude <= -6;
      const equipment = this.snapshot.form.equipment;
      const equipmentLabels = {
        "naked-eye": "裸眼",
        binoculars: "双筒望远镜",
        telescope: "小型望远镜",
      };
      const moonPenalty = this.calculateMoonImpact() * 2;
      const highConstellations = isDarkEnoughForStars
        ? this.snapshot.constellations
          .filter((entry) => entry.altitude >= Math.max(20, threshold))
          .slice(0, 6)
        : [];
      const visiblePlanets = isDarkEnoughForStars
        ? this.snapshot.planets
          .filter((planet) => (
            planet.altitude >= 10
            && Number.isFinite(planet.magnitude)
            && planet.magnitude <= (
              equipment === "naked-eye"
                ? this.snapshot.bortle.nakedEyeLimit - moonPenalty - Math.max(0, (25 - planet.altitude) / 15)
                : equipment === "binoculars" ? 9 : 12
            )
            && (!Number.isFinite(planet.elongation) || planet.elongation >= 10)
          ))
          .sort((left, right) => left.magnitude - right.magnitude)
          .slice(0, 4)
        : [];
      const activeShowers = this.snapshot.events
        .filter((event) => (
          event.kind === "流星雨"
          && event.activityStart <= this.snapshot.form.date
          && event.activityEnd >= this.snapshot.form.date
        ))
        .sort((left, right) => (
          Math.abs(left.peakTime - this.snapshot.form.date) - Math.abs(right.peakTime - this.snapshot.form.date)
        ))
        .slice(0, 2);
      const items = [
        { id: "prepare-dark-adaptation", group: "准备", text: "离开直射光并预留约 20 分钟暗适应时间。" },
        { id: "prepare-red-light", group: "准备", text: "携带红光照明、保暖衣物和离线可用的星图。" },
        { id: "equipment-mode", group: "器材", text: `本清单按${equipmentLabels[equipment]}模式筛选目标。` },
      ];

      if (this.snapshot.bestTime?.time) {
        const weatherIncluded = Boolean(this.snapshot.bestTime.weather);
        items.push({
          id: "best-observing-time",
          group: "时间",
          text: `${weatherIncluded ? "综合条件" : "天文条件"}推荐 ${formatInZone(this.snapshot.bestTime.time, this.snapshot.form.timezone)} 前后开始观测；${weatherIncluded ? "已结合逐小时云量、降水与风速。" : "天气需另行复核。"}`,
        });
      }

      if (!isDarkEnoughForStars) {
        items.push({
          id: "wait-for-darkness",
          group: "时间",
          text: `所选时刻太阳高度 ${this.snapshot.sun.altitude.toFixed(1)}°；请将时间调整到民用暮光结束后再执行星座与行星目标。`,
        });
      }

      if (this.weather.status === "success") {
        const weather = this.weather.data;
        items.push({
          id: "weather-check",
          group: "天气",
          text: `复核临出发云量：预报 ${Math.round(weather.cloudCover)}%，降水概率 ${Math.round(weather.precipitationProbability)}%。`,
        });
      } else if (this.dom.weatherConsent.checked) {
        items.push({ id: "weather-check", group: "天气", text: "出发前另行确认当地云量、降水和风况。" });
      } else {
        items.push({ id: "weather-check", group: "天气", text: "天气查询未启用；出发前请自行确认云量、降水和风况。" });
      }

      const moonPhase = moonPhaseInfo(this.snapshot.moon.phaseAngle);
      items.push({
        id: "moon-check",
        group: "月亮",
        text: `${moonPhase.name}照明 ${Math.round(this.snapshot.moon.illumination * 100)}%，${this.snapshot.moon.altitude > 0 ? `当前高度 ${this.snapshot.moon.altitude.toFixed(0)}°` : "当前在地平线下"}。`,
      });

      highConstellations.forEach((entry) => {
        const keyStar = entry.item.profile?.keyStars?.[0];
        items.push({
          id: `constellation-${entry.item.id}`,
          group: "星座",
          text: `${entry.direction}方寻找${entry.item.name}，中心高度约 ${entry.altitude.toFixed(0)}°${keyStar ? `，可先找${keyStar.zh || keyStar.name}` : ""}。`,
        });
      });
      visiblePlanets.forEach((planet) => {
        const instrumentHint = equipment === "naked-eye"
          ? "裸眼寻找"
          : equipment === "binoculars" ? "用双筒配合星图定位" : "用小型望远镜配合星图定位";
        items.push({
          id: `planet-${planet.id}`,
          group: "行星",
          text: `${instrumentHint}${planet.name}：${directionName(planet.azimuth)}方，高度约 ${planet.altitude.toFixed(0)}°，视星等 ${planet.magnitude.toFixed(1)}。`,
        });
      });
      activeShowers.forEach((event) => {
        const peakParts = localParts(event.peakTime, this.snapshot.form.timezone);
        const nearPeak = Math.abs(event.peakTime - this.snapshot.form.date) < 3 * DAY_MS;
        const timing = nearPeak
          ? "接近常年峰值"
          : `处于常年活跃期，峰值约 ${Number(peakParts.month)}月${Number(peakParts.day)}日`;
        items.push({ id: event.id, group: "天象", text: `${event.title}${timing}；避开月光并扩大视野。` });
      });

      const deepSkyWeatherOkay = this.weather.status !== "success"
        || (this.weather.data.cloudCover < 50 && this.weather.data.precipitationProbability < 50);
      if (
        this.snapshot.sun.altitude <= -18
        && this.snapshot.bortle.level <= 6
        && this.calculateMoonImpact() < 0.45
        && deepSkyWeatherOkay
      ) {
        const deepSkyMagnitudeLimit = equipment === "naked-eye" ? 4.5 : equipment === "binoculars" ? 7 : 10;
        const deepSky = highConstellations
          .flatMap((entry) => (entry.item.profile?.deepSky || []).map((target) => ({ entry, target })))
          .filter(({ target }) => Number(target.mag) <= deepSkyMagnitudeLimit)
          .sort((left, right) => Number(left.target.mag) - Number(right.target.mag))
          .slice(0, 3);
        deepSky.forEach(({ entry, target }) => {
          items.push({
            id: `dso-${entry.item.id}-${target.name}`,
            group: "深空",
            text: `用${equipmentLabels[equipment]}尝试${entry.item.name}中的 ${target.name}${target.commonName ? `（${target.commonName}）` : ""}。`,
          });
        });
      }

      this.checklist = items.slice(0, 16).map((item) => ({
        ...item,
        checked: previous.has(item.id) ? previous.get(item.id) : true,
      }));
      this.renderChecklist();
    }

    renderChecklist() {
      this.dom.observationChecklist.replaceChildren();
      this.checklist.forEach((item) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.checked;
        checkbox.dataset.planId = item.id;
        const marker = document.createElement("span");
        marker.setAttribute("aria-hidden", "true");
        const content = document.createElement("span");
        const group = document.createElement("small");
        group.textContent = item.group;
        const text = document.createElement("strong");
        text.textContent = item.text;
        content.append(group, text);
        label.append(checkbox, marker, content);
        this.dom.observationChecklist.append(label);
      });
      this.updatePlanCount();
    }

    updatePlanCount() {
      const count = this.checklist.filter((item) => item.checked).length;
      this.dom.planCount.textContent = `${count} 项`;
    }

    buildPlanText() {
      const { form } = this.snapshot;
      const quality = this.qualityAssessment();
      const selected = this.checklist.filter((item) => item.checked);
      const equipmentLabels = {
        "naked-eye": "裸眼",
        binoculars: "双筒望远镜",
        telescope: "小型望远镜",
      };
      const lines = [
        `天象志 · ${form.label}观测清单`,
        `${formatInZone(form.date, form.timezone)} · ${form.timezone}`,
        `大致位置：${formatCoordinate(Number(form.latitude.toFixed(1)), "N", "S")} / ${formatCoordinate(Number(form.longitude.toFixed(1)), "E", "W")}`,
        `器材模式：${equipmentLabels[form.equipment]}`,
        `综合判断：${quality.label}（${quality.reasons.slice(0, 3).join("；")}）`,
        "",
        ...selected.map((item, index) => `${index + 1}. [${item.group}] ${item.text}`),
        "",
        `说明：星座升落采用中心代表位置近似；${this.weather.status === "success" ? "天气来自 Open-Meteo；" : "天气未计入；"}光污染等级可手动修正。`,
        this.buildObserverShareUrl(),
      ];
      return lines.join("\n");
    }

    buildObserverShareUrl() {
      const { form } = this.snapshot;
      const url = new URL(window.location.href);
      ["loc", "lat", "lon", "elev", "tz", "dt", "bortle", "gear"].forEach((key) => {
        url.searchParams.delete(key);
      });
      const locationId = this.locationById.has(this.dom.observerLocation.value)
        ? this.dom.observerLocation.value
        : null;
      if (locationId) {
        url.searchParams.set("loc", locationId);
      } else {
        url.searchParams.set("lat", form.latitude.toFixed(1));
        url.searchParams.set("lon", form.longitude.toFixed(1));
        url.searchParams.set("elev", String(Math.round(form.elevation / 50) * 50));
        url.searchParams.set("tz", form.timezone);
      }
      url.searchParams.set("dt", form.localDateTime);
      url.searchParams.set("bortle", String(form.bortle));
      url.searchParams.set("gear", form.equipment);
      url.hash = "observe";
      return url.toString();
    }

    async copyPlan() {
      const text = this.buildPlanText();
      try {
        await navigator.clipboard.writeText(text);
        this.onToast("观测清单已复制");
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        this.onToast("观测清单已复制");
      }
    }

    async sharePlan() {
      const text = this.buildPlanText();
      if (navigator.share) {
        try {
          await navigator.share({
            title: "天象志 · 今晚观测清单",
            text,
            url: this.buildObserverShareUrl(),
          });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      await this.copyPlan();
    }

    downloadPlan() {
      const blob = new Blob([this.buildPlanText()], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `天象志-${this.snapshot.form.localDateTime.slice(0, 10)}-${this.snapshot.form.label}-观测清单.txt`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      this.onToast("观测清单已下载");
    }

    weatherKeyFor(form) {
      return [
        form.latitude.toFixed(2),
        form.longitude.toFixed(2),
        Math.round(form.elevation),
        form.timezone,
        form.localDateTime.slice(0, 13),
      ].join("|");
    }

    cancelWeatherRequest() {
      this.weatherRequest += 1;
      if (this.weatherController) {
        this.weatherController.abort();
        this.weatherController = null;
      }
    }

    async fetchWeather(force) {
      if (!this.snapshot) return;
      if (!this.dom.weatherConsent.checked) {
        this.cancelWeatherRequest();
        this.weather = { status: "idle", data: null, error: "" };
        this.updateBestTimeFromWeather();
        this.renderWeather();
        this.renderConditions();
        this.renderQuality();
        this.buildChecklist();
        return;
      }

      const snapshot = this.snapshot;
      const { form } = snapshot;
      const cacheKey = this.weatherKeyFor(form);
      const request = ++this.weatherRequest;
      if (this.weatherController) this.weatherController.abort();
      this.weatherController = null;

      const isCurrent = () => (
        request === this.weatherRequest
        && this.snapshot === snapshot
        && this.weatherKeyFor(this.snapshot.form) === cacheKey
      );
      const cached = this.weatherCache.get(cacheKey);
      if (!force && cached && Date.now() - cached.savedAt < 15 * 60 * 1000) {
        if (!isCurrent()) return;
        this.weather = { status: "success", data: cached.data, error: "" };
        this.updateBestTimeFromWeather();
        this.renderConditions();
        this.renderQuality();
        this.buildChecklist();
        return;
      }

      this.weather = { status: "loading", data: null, error: "" };
      this.renderWeather();
      const controller = new AbortController();
      this.weatherController = controller;
      const timeout = window.setTimeout(() => controller.abort(), 9000);
      const params = new URLSearchParams({
        latitude: form.latitude.toFixed(2),
        longitude: form.longitude.toFixed(2),
        elevation: String(Math.round(form.elevation)),
        hourly: "temperature_2m,cloud_cover,precipitation_probability,visibility,wind_speed_10m,weather_code",
        forecast_days: "16",
        timezone: form.timezone,
      });

      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (!isCurrent()) return;
        const hourKey = `${form.localDateTime.slice(0, 13)}:00`;
        const index = payload.hourly?.time?.indexOf(hourKey) ?? -1;
        if (index < 0) {
          this.weather = { status: "out-of-range", data: null, error: "" };
        } else {
          const values = {
            temperature: payload.hourly?.temperature_2m?.[index],
            cloudCover: payload.hourly?.cloud_cover?.[index],
            precipitationProbability: payload.hourly?.precipitation_probability?.[index],
            visibility: payload.hourly?.visibility?.[index],
            windSpeed: payload.hourly?.wind_speed_10m?.[index],
            weatherCode: payload.hourly?.weather_code?.[index],
          };
          if (Object.values(values).some((value) => value === null || value === undefined || !Number.isFinite(Number(value)))) {
            throw new Error("Weather payload contains missing hourly values.");
          }
          const data = {
            forecastTime: payload.hourly.time[index],
            temperature: Number(values.temperature),
            cloudCover: Number(values.cloudCover),
            precipitationProbability: Number(values.precipitationProbability),
            visibility: Number(values.visibility) / 1000,
            windSpeed: Number(values.windSpeed),
            weatherCode: Number(values.weatherCode),
            nightHours: (payload.hourly?.time || []).map((localTime, hourIndex) => {
              const time = zonedDateTimeToDate(localTime, form.timezone);
              const cloudCover = payload.hourly?.cloud_cover?.[hourIndex];
              const precipitationProbability = payload.hourly?.precipitation_probability?.[hourIndex];
              const windSpeed = payload.hourly?.wind_speed_10m?.[hourIndex];
              if (
                !time
                || cloudCover === null || cloudCover === undefined || !Number.isFinite(Number(cloudCover))
                || precipitationProbability === null || precipitationProbability === undefined
                || !Number.isFinite(Number(precipitationProbability))
                || windSpeed === null || windSpeed === undefined || !Number.isFinite(Number(windSpeed))
              ) return null;
              return {
                time,
                cloudCover: Number(cloudCover),
                precipitationProbability: Number(precipitationProbability),
                windSpeed: Number(windSpeed),
              };
            }).filter(Boolean),
          };
          this.weather = { status: "success", data, error: "" };
          this.weatherCache.set(cacheKey, { data, savedAt: Date.now() });
        }
      } catch (error) {
        if (!isCurrent()) return;
        this.weather = {
          status: "error",
          data: null,
          error: error.name === "AbortError" ? "天气请求超时，请稍后重试。" : "无法读取该时刻的天气预报，请根据当地实况判断。",
        };
      } finally {
        window.clearTimeout(timeout);
        if (this.weatherController === controller) this.weatherController = null;
        if (isCurrent()) {
          this.updateBestTimeFromWeather();
          this.renderConditions();
          this.renderQuality();
          this.buildChecklist();
        }
      }
    }

    updateBestTimeFromWeather() {
      if (!this.snapshot) return;
      this.snapshot.bestTime = this.calculateBestObservationTime(
        this.snapshot.form,
        this.snapshot.observer,
        this.snapshot.darkness,
        this.snapshot.bortle,
        this.weather.status === "success" ? this.weather.data.nightHours || [] : [],
      );
    }

    resizeHorizon() {
      const bounds = this.canvas.parentElement.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(360, Math.round(Math.min(width * 0.71, 560)));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (width === this.canvasWidth && height === this.canvasHeight && pixelRatio === this.pixelRatio) return;
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.pixelRatio = pixelRatio;
      this.canvas.width = Math.round(width * pixelRatio);
      this.canvas.height = Math.round(height * pixelRatio);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.drawHorizon();
    }

    drawHorizon() {
      const context = this.context;
      const width = this.canvasWidth;
      const height = this.canvasHeight;
      context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      context.globalAlpha = 1;
      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.fillStyle = "#090b10";
      context.fillRect(0, 0, width, height);
      if (!this.snapshot) return;

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.43;
      const project = (altitude, azimuth) => {
        const radial = radius * (90 - clamp(altitude, 0, 90)) / 90;
        const radians = azimuth * Math.PI / 180;
        return {
          x: centerX + radial * Math.sin(radians),
          y: centerY - radial * Math.cos(radians),
        };
      };

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = "#0d131a";
      context.fill();
      context.clip();

      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      glow.addColorStop(0, "rgba(39, 74, 77, 0.2)");
      glow.addColorStop(1, "rgba(9, 11, 16, 0)");
      context.fillStyle = glow;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      [30, 60].forEach((altitude) => {
        const ring = radius * (90 - altitude) / 90;
        context.beginPath();
        context.arc(centerX, centerY, ring, 0, Math.PI * 2);
        context.strokeStyle = "rgba(135, 182, 177, 0.2)";
        context.lineWidth = 0.8;
        context.stroke();
      });
      for (let azimuth = 0; azimuth < 360; azimuth += 45) {
        const radians = azimuth * Math.PI / 180;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(centerX + radius * Math.sin(radians), centerY - radius * Math.cos(radians));
        context.strokeStyle = "rgba(135, 182, 177, 0.12)";
        context.stroke();
      }

      this.snapshot.stars.forEach((star) => {
        const point = project(star.altitude, star.azimuth);
        const starRadius = clamp(0.55 + (6 - star.mag) * 0.4, 0.6, 3.7);
        context.globalAlpha = clamp(0.45 + (5 - star.mag) * 0.1, 0.4, 1);
        context.fillStyle = starColor(star.bv);
        context.beginPath();
        context.arc(point.x, point.y, starRadius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      this.horizonHits = [];
      const labelBoxes = [];
      const visibleConstellations = this.snapshot.constellations.filter((entry) => entry.altitude >= 8).slice(0, 22);
      context.font = "11px Inter, 'PingFang SC', sans-serif";
      context.textBaseline = "middle";
      visibleConstellations.forEach((entry) => {
        const point = project(entry.altitude, entry.azimuth);
        const selected = entry.altitude >= 45;
        context.fillStyle = selected ? "#e2b76d" : "rgba(177, 213, 207, 0.8)";
        context.beginPath();
        context.arc(point.x, point.y, selected ? 3.7 : 2.7, 0, Math.PI * 2);
        context.fill();
        const label = entry.item.name;
        const labelWidth = context.measureText(label).width + 8;
        const box = { left: point.x + 6, right: point.x + 6 + labelWidth, top: point.y - 9, bottom: point.y + 9 };
        if (box.right < centerX + radius && !labelBoxes.some((other) => this.boxesOverlap(box, other))) {
          context.fillStyle = selected ? "rgba(238, 200, 131, 0.92)" : "rgba(210, 228, 225, 0.72)";
          context.fillText(label, box.left + 2, point.y);
          labelBoxes.push(box);
        }
        this.horizonHits.push({ type: "constellation", x: point.x, y: point.y, entry });
      });

      const visiblePlanets = this.snapshot.planets.filter((planet) => planet.altitude >= 0);
      visiblePlanets.forEach((planet) => {
        const point = project(planet.altitude, planet.azimuth);
        context.strokeStyle = "#d8ab5f";
        context.lineWidth = 1.3;
        context.beginPath();
        context.arc(point.x, point.y, 6, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "#f4dcae";
        context.font = "700 11px Inter, 'PingFang SC', sans-serif";
        context.fillText(planet.name, point.x + 9, point.y);
        this.horizonHits.push({ type: "planet", x: point.x, y: point.y, entry: planet });
      });

      if (this.snapshot.moon.altitude >= 0) {
        const point = project(this.snapshot.moon.altitude, this.snapshot.moon.azimuth);
        context.fillStyle = "#f1ead8";
        context.beginPath();
        context.arc(point.x, point.y, 7.5, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#f1ead8";
        context.font = "700 11px Inter, 'PingFang SC', sans-serif";
        context.fillText("月亮", point.x + 11, point.y);
        this.horizonHits.push({ type: "moon", x: point.x, y: point.y, entry: this.snapshot.moon });
      }
      context.restore();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(216, 171, 95, 0.66)";
      context.lineWidth = 1.2;
      context.stroke();

      context.fillStyle = "rgba(238, 224, 195, 0.86)";
      context.font = "700 11px Inter, 'PingFang SC', sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      [["北", 0], ["东", 90], ["南", 180], ["西", 270]].forEach(([label, azimuth]) => {
        const radians = azimuth * Math.PI / 180;
        context.fillText(label, centerX + (radius + 17) * Math.sin(radians), centerY - (radius + 17) * Math.cos(radians));
      });
      context.fillStyle = "rgba(181, 211, 207, 0.52)";
      context.font = "9px Inter, 'PingFang SC', sans-serif";
      context.fillText("天顶", centerX, centerY);

      this.dom.horizonObjectList.replaceChildren();
      this.horizonHits.slice(0, 40).forEach((hit) => {
        const item = document.createElement("li");
        if (hit.type === "constellation") {
          item.textContent = `${hit.entry.item.name}，${hit.entry.direction}方，高度 ${hit.entry.altitude.toFixed(1)}°`;
        } else if (hit.type === "planet") {
          item.textContent = `${hit.entry.name}，${directionName(hit.entry.azimuth)}方，高度 ${hit.entry.altitude.toFixed(1)}°`;
        } else {
          item.textContent = `月亮，${directionName(this.snapshot.moon.azimuth)}方，高度 ${this.snapshot.moon.altitude.toFixed(1)}°`;
        }
        this.dom.horizonObjectList.append(item);
      });
    }

    boxesOverlap(left, right) {
      return !(left.right < right.left || left.left > right.right || left.bottom < right.top || left.top > right.bottom);
    }

    pickHorizonObject(event) {
      if (!this.horizonHits.length) return;
      const bounds = this.canvas.getBoundingClientRect();
      const x = (event.clientX - bounds.left) * this.canvasWidth / bounds.width;
      const y = (event.clientY - bounds.top) * this.canvasHeight / bounds.height;
      const hit = this.horizonHits
        .map((entry) => ({ entry, distance: Math.hypot(entry.x - x, entry.y - y) }))
        .sort((left, right) => left.distance - right.distance)[0];
      if (!hit || hit.distance > 18) return;
      if (hit.entry.type === "constellation") {
        this.onSelectConstellation(hit.entry.entry.item.id);
        this.dom.horizonCaption.textContent = `${hit.entry.entry.item.name} · ${hit.entry.entry.direction}方 · 高度 ${hit.entry.entry.altitude.toFixed(1)}°`;
      } else if (hit.entry.type === "planet") {
        this.dom.horizonCaption.textContent = `${hit.entry.entry.name} · ${directionName(hit.entry.entry.azimuth)}方 · 高度 ${hit.entry.entry.altitude.toFixed(1)}°`;
      } else {
        this.dom.horizonCaption.textContent = `月亮 · ${directionName(this.snapshot.moon.azimuth)}方 · 高度 ${this.snapshot.moon.altitude.toFixed(1)}°`;
      }
    }

    setFormStatus(message, level) {
      this.dom.observerFormStatus.textContent = message;
      this.dom.observerFormStatus.dataset.level = level;
    }

    savePreferences() {
      try {
        const locationId = this.locationById.has(this.dom.observerLocation.value)
          ? this.dom.observerLocation.value
          : null;
        const rememberManualLocation = !locationId && this.dom.rememberManualLocation.checked;
        localStorage.setItem("tianxiang-observer-v1", JSON.stringify({
          locationId,
          bortle: Number(this.dom.observerBortle.value),
          equipment: this.dom.observerEquipment.value,
          rememberManualLocation,
          manualLocation: rememberManualLocation ? {
            latitude: Number(this.dom.observerLatitude.value),
            longitude: Number(this.dom.observerLongitude.value),
            elevation: Number(this.dom.observerElevation.value),
            timezone: this.dom.observerTimezone.value,
            label: this.locationLabel,
          } : null,
        }));
      } catch {
        // The observing assistant works without local persistence.
      }
    }
  }

  window.TonightObserver = TonightObserver;
})();
