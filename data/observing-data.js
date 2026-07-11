/*
 * Curated observer presets and annual observing references for Stellar Atlas.
 * City coordinates are approximate city-center values. Bortle classes are
 * intentionally editable estimates, not measurements for a specific site.
 */
window.OBSERVING_DATA = {
  reviewedAt: "2026-07-11",
  locations: [
    { id: "beijing", name: "北京", region: "华北", country: "中国", latitude: 39.9042, longitude: 116.4074, elevation: 43, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "tianjin", name: "天津", region: "华北", country: "中国", latitude: 39.0851, longitude: 117.1994, elevation: 5, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "shijiazhuang", name: "石家庄", region: "华北", country: "中国", latitude: 38.0428, longitude: 114.5149, elevation: 83, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "hohhot", name: "呼和浩特", region: "华北", country: "中国", latitude: 40.8426, longitude: 111.7492, elevation: 1065, timezone: "Asia/Shanghai", bortle: 7 },
    { id: "taiyuan", name: "太原", region: "华北", country: "中国", latitude: 37.8706, longitude: 112.5489, elevation: 800, timezone: "Asia/Shanghai", bortle: 8 },

    { id: "shanghai", name: "上海", region: "华东", country: "中国", latitude: 31.2304, longitude: 121.4737, elevation: 4, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "nanjing", name: "南京", region: "华东", country: "中国", latitude: 32.0603, longitude: 118.7969, elevation: 20, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "hangzhou", name: "杭州", region: "华东", country: "中国", latitude: 30.2741, longitude: 120.1551, elevation: 19, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "hefei", name: "合肥", region: "华东", country: "中国", latitude: 31.8206, longitude: 117.2272, elevation: 37, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "fuzhou", name: "福州", region: "华东", country: "中国", latitude: 26.0745, longitude: 119.2965, elevation: 10, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "xiamen", name: "厦门", region: "华东", country: "中国", latitude: 24.4798, longitude: 118.0894, elevation: 10, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "jinan", name: "济南", region: "华东", country: "中国", latitude: 36.6512, longitude: 117.1201, elevation: 23, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "qingdao", name: "青岛", region: "华东", country: "中国", latitude: 36.0671, longitude: 120.3826, elevation: 10, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "nanchang", name: "南昌", region: "华东", country: "中国", latitude: 28.6820, longitude: 115.8579, elevation: 25, timezone: "Asia/Shanghai", bortle: 8 },

    { id: "guangzhou", name: "广州", region: "华南", country: "中国", latitude: 23.1291, longitude: 113.2644, elevation: 21, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "shenzhen", name: "深圳", region: "华南", country: "中国", latitude: 22.5431, longitude: 114.0579, elevation: 40, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "nanning", name: "南宁", region: "华南", country: "中国", latitude: 22.8170, longitude: 108.3669, elevation: 80, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "haikou", name: "海口", region: "华南", country: "中国", latitude: 20.0440, longitude: 110.1983, elevation: 15, timezone: "Asia/Shanghai", bortle: 7 },
    { id: "sanya", name: "三亚", region: "华南", country: "中国", latitude: 18.2528, longitude: 109.5119, elevation: 7, timezone: "Asia/Shanghai", bortle: 7 },
    { id: "hong-kong", name: "香港", region: "港澳台", country: "中国", latitude: 22.3193, longitude: 114.1694, elevation: 20, timezone: "Asia/Hong_Kong", bortle: 9 },
    { id: "macau", name: "澳门", region: "港澳台", country: "中国", latitude: 22.1987, longitude: 113.5439, elevation: 20, timezone: "Asia/Macau", bortle: 9 },
    { id: "taipei", name: "台北", region: "港澳台", country: "中国", latitude: 25.0330, longitude: 121.5654, elevation: 10, timezone: "Asia/Taipei", bortle: 9 },

    { id: "wuhan", name: "武汉", region: "华中", country: "中国", latitude: 30.5928, longitude: 114.3055, elevation: 37, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "zhengzhou", name: "郑州", region: "华中", country: "中国", latitude: 34.7466, longitude: 113.6254, elevation: 110, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "changsha", name: "长沙", region: "华中", country: "中国", latitude: 28.2282, longitude: 112.9388, elevation: 63, timezone: "Asia/Shanghai", bortle: 8 },

    { id: "chengdu", name: "成都", region: "西南", country: "中国", latitude: 30.5728, longitude: 104.0668, elevation: 500, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "chongqing", name: "重庆", region: "西南", country: "中国", latitude: 29.5630, longitude: 106.5516, elevation: 244, timezone: "Asia/Shanghai", bortle: 9 },
    { id: "kunming", name: "昆明", region: "西南", country: "中国", latitude: 25.0389, longitude: 102.7183, elevation: 1892, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "guiyang", name: "贵阳", region: "西南", country: "中国", latitude: 26.6470, longitude: 106.6302, elevation: 1100, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "lhasa", name: "拉萨", region: "西南", country: "中国", latitude: 29.6520, longitude: 91.1721, elevation: 3650, timezone: "Asia/Shanghai", bortle: 6 },
    { id: "dali", name: "大理", region: "西南", country: "中国", latitude: 25.6065, longitude: 100.2676, elevation: 1976, timezone: "Asia/Shanghai", bortle: 6 },

    { id: "xian", name: "西安", region: "西北", country: "中国", latitude: 34.3416, longitude: 108.9398, elevation: 405, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "lanzhou", name: "兰州", region: "西北", country: "中国", latitude: 36.0611, longitude: 103.8343, elevation: 1520, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "xining", name: "西宁", region: "西北", country: "中国", latitude: 36.6171, longitude: 101.7782, elevation: 2275, timezone: "Asia/Shanghai", bortle: 7 },
    { id: "yinchuan", name: "银川", region: "西北", country: "中国", latitude: 38.4872, longitude: 106.2309, elevation: 1110, timezone: "Asia/Shanghai", bortle: 7 },
    { id: "urumqi", name: "乌鲁木齐", region: "西北", country: "中国", latitude: 43.8256, longitude: 87.6168, elevation: 800, timezone: "Asia/Shanghai", bortle: 8 },

    { id: "shenyang", name: "沈阳", region: "东北", country: "中国", latitude: 41.8057, longitude: 123.4315, elevation: 55, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "changchun", name: "长春", region: "东北", country: "中国", latitude: 43.8171, longitude: 125.3235, elevation: 215, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "harbin", name: "哈尔滨", region: "东北", country: "中国", latitude: 45.8038, longitude: 126.5349, elevation: 150, timezone: "Asia/Shanghai", bortle: 8 },
    { id: "mohe", name: "漠河", region: "东北", country: "中国", latitude: 52.9723, longitude: 122.5386, elevation: 430, timezone: "Asia/Shanghai", bortle: 5 },

    { id: "tokyo", name: "东京", region: "世界城市", country: "日本", latitude: 35.6762, longitude: 139.6503, elevation: 40, timezone: "Asia/Tokyo", bortle: 9 },
    { id: "singapore", name: "新加坡", region: "世界城市", country: "新加坡", latitude: 1.3521, longitude: 103.8198, elevation: 15, timezone: "Asia/Singapore", bortle: 9 },
    { id: "sydney", name: "悉尼", region: "世界城市", country: "澳大利亚", latitude: -33.8688, longitude: 151.2093, elevation: 58, timezone: "Australia/Sydney", bortle: 8 },
    { id: "london", name: "伦敦", region: "世界城市", country: "英国", latitude: 51.5072, longitude: -0.1276, elevation: 24, timezone: "Europe/London", bortle: 9 },
    { id: "new-york", name: "纽约", region: "世界城市", country: "美国", latitude: 40.7128, longitude: -74.0060, elevation: 10, timezone: "America/New_York", bortle: 9 },
    { id: "los-angeles", name: "洛杉矶", region: "世界城市", country: "美国", latitude: 34.0522, longitude: -118.2437, elevation: 71, timezone: "America/Los_Angeles", bortle: 9 }
  ],
  timezones: [
    { id: "Asia/Shanghai", label: "中国标准时间 · Asia/Shanghai" },
    { id: "Asia/Hong_Kong", label: "香港时间 · Asia/Hong_Kong" },
    { id: "Asia/Macau", label: "澳门时间 · Asia/Macau" },
    { id: "Asia/Taipei", label: "台北时间 · Asia/Taipei" },
    { id: "Asia/Tokyo", label: "日本时间 · Asia/Tokyo" },
    { id: "Asia/Singapore", label: "新加坡时间 · Asia/Singapore" },
    { id: "Australia/Sydney", label: "悉尼时间 · Australia/Sydney" },
    { id: "Europe/London", label: "伦敦时间 · Europe/London" },
    { id: "Europe/Paris", label: "中欧时间 · Europe/Paris" },
    { id: "America/New_York", label: "纽约时间 · America/New_York" },
    { id: "America/Los_Angeles", label: "洛杉矶时间 · America/Los_Angeles" },
    { id: "Pacific/Auckland", label: "奥克兰时间 · Pacific/Auckland" },
    { id: "UTC", label: "协调世界时 · UTC" }
  ],
  bortleScale: [
    { level: 1, title: "极暗天空", nakedEyeLimit: 7.6, note: "银河结构和黄道光非常清楚，适合暗弱深空目标。" },
    { level: 2, title: "典型暗空", nakedEyeLimit: 7.1, note: "银河明亮，地平线附近仍有少量光害。" },
    { level: 3, title: "乡村天空", nakedEyeLimit: 6.6, note: "银河有明显结构，多数梅西耶天体适合双筒观测。" },
    { level: 4, title: "乡郊过渡", nakedEyeLimit: 6.2, note: "天顶银河仍醒目，近地平线受城市光穹影响。" },
    { level: 5, title: "郊区天空", nakedEyeLimit: 5.7, note: "银河较淡，星云星系需要避开月光并使用光学器材。" },
    { level: 6, title: "明亮郊区", nakedEyeLimit: 5.2, note: "银河只在透明夜晚隐约可见，优先亮星团与双星。" },
    { level: 7, title: "郊区与城市过渡", nakedEyeLimit: 4.7, note: "天空背景发亮，肉眼以主要亮星和行星为主。" },
    { level: 8, title: "城市天空", nakedEyeLimit: 4.2, note: "多数星座只剩骨架亮星，月球和行星仍适合观测。" },
    { level: 9, title: "中心城区", nakedEyeLimit: 3.8, note: "天空大范围发白，建议寻找高空亮星、月球和行星。" }
  ],
  meteorShowers: [
    { id: "quadrantids", name: "象限仪座流星雨", peakMonth: 1, peakDay: 3, window: "12月28日至1月12日", zhr: "约 80–120", radiant: "牧夫座北部", constellation: "BOO", parent: "小行星 2003 EH1", hemisphere: "北半球更佳" },
    { id: "lyrids", name: "天琴座流星雨", peakMonth: 4, peakDay: 22, window: "4月14日至30日", zhr: "约 15–20", radiant: "天琴座", constellation: "LYR", parent: "C/1861 G1 撒切尔彗星", hemisphere: "南北半球均可" },
    { id: "eta-aquariids", name: "宝瓶座η流星雨", peakMonth: 5, peakDay: 5, window: "4月19日至5月28日", zhr: "约 40–60", radiant: "宝瓶座", constellation: "AQR", parent: "1P/哈雷彗星", hemisphere: "低纬与南半球更佳" },
    { id: "delta-aquariids", name: "宝瓶座δ南流星雨", peakMonth: 7, peakDay: 30, window: "7月12日至8月23日", zhr: "约 20–25", radiant: "宝瓶座", constellation: "AQR", parent: "可能与 96P/梅克贺兹彗星族有关", hemisphere: "南半球更佳" },
    { id: "perseids", name: "英仙座流星雨", peakMonth: 8, peakDay: 12, window: "7月17日至8月24日", zhr: "约 90–110", radiant: "英仙座", constellation: "PER", parent: "109P/斯威夫特-塔特尔彗星", hemisphere: "北半球更佳" },
    { id: "draconids", name: "天龙座流星雨", peakMonth: 10, peakDay: 8, window: "10月6日至10日", zhr: "通常较低，偶有爆发", radiant: "天龙座", constellation: "DRA", parent: "21P/贾科比尼-秦诺彗星", hemisphere: "北半球" },
    { id: "orionids", name: "猎户座流星雨", peakMonth: 10, peakDay: 21, window: "10月2日至11月7日", zhr: "约 15–25", radiant: "猎户座", constellation: "ORI", parent: "1P/哈雷彗星", hemisphere: "南北半球均可" },
    { id: "taurids", name: "金牛座流星雨", peakMonth: 11, peakDay: 5, window: "9月下旬至11月下旬", zhr: "约 5，火流星比例较高", radiant: "金牛座", constellation: "TAU", parent: "2P/恩克彗星及金牛座复合体", hemisphere: "南北半球均可" },
    { id: "leonids", name: "狮子座流星雨", peakMonth: 11, peakDay: 17, window: "11月6日至30日", zhr: "通常约 10–15", radiant: "狮子座", constellation: "LEO", parent: "55P/坦普尔-塔特尔彗星", hemisphere: "南北半球均可" },
    { id: "geminids", name: "双子座流星雨", peakMonth: 12, peakDay: 14, window: "12月4日至20日", zhr: "约 120–150", radiant: "双子座", constellation: "GEM", parent: "小行星 3200 法厄同", hemisphere: "南北半球均可，北半球辐射点更高" },
    { id: "ursids", name: "小熊座流星雨", peakMonth: 12, peakDay: 22, window: "12月17日至26日", zhr: "约 5–10", radiant: "小熊座", constellation: "UMI", parent: "8P/塔特尔彗星", hemisphere: "北半球" }
  ],
  sources: [
    { label: "Astronomy Engine", url: "https://github.com/cosinekitty/astronomy", scope: "天体位置、月相、升落与暮光计算" },
    { label: "Open-Meteo Forecast API", url: "https://open-meteo.com/en/docs", scope: "逐小时天气、云量、能见度与降水概率" },
    { label: "International Meteor Organization", url: "https://www.imo.net/resources/calendar/", scope: "主要流星雨活动窗口与常年峰值参考" },
    { label: "Bortle Dark-Sky Scale", url: "https://skyandtelescope.org/astronomy-resources/light-pollution-and-astronomy-the-bortle-dark-sky-scale/", scope: "九级光污染描述框架" }
  ]
};
