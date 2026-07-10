"use strict";

const SEASONS = {
  spring: { label: "春季", months: "3–5月", short: "春" },
  summer: { label: "夏季", months: "6–8月", short: "夏" },
  autumn: { label: "秋季", months: "9–11月", short: "秋" },
  winter: { label: "冬季", months: "12–2月", short: "冬" },
};

const CONSTELLATIONS = [
  {
    id: "orion",
    name: "猎户座",
    latin: "ORION",
    season: "winter",
    direction: "东南至南",
    glyph: "参",
    title: "冬夜的巨人",
    summary: "猎户座横跨天赤道，是冬季夜空最容易辨认的星座之一。参宿四的橙红与参宿七的蓝白分立两端，中间由“腰带三星”钉住轮廓。",
    caption: "猎户座最醒目的标志，是几乎排成直线的“腰带三星”。",
    quote: "人生不相见，动如参与商。",
    facts: [
      ["最佳月份", "12月至次年2月"],
      ["最亮星", "参宿七 · Rigel"],
      ["辨识标志", "参宿三星"],
      ["所在天区", "天赤道附近"],
    ],
    stars: [
      { name: "Meissa", zh: "觜宿一", x: 48, y: 10, mag: 3.4 },
      { name: "Betelgeuse", zh: "参宿四", x: 31, y: 27, mag: 0.5 },
      { name: "Bellatrix", zh: "参宿五", x: 65, y: 29, mag: 1.6 },
      { name: "Alnitak", zh: "参宿一", x: 40, y: 49, mag: 1.8 },
      { name: "Alnilam", zh: "参宿二", x: 50, y: 50, mag: 1.7 },
      { name: "Mintaka", zh: "参宿三", x: 60, y: 48, mag: 2.2 },
      { name: "Hatsya", zh: "伐三", x: 46, y: 65, mag: 2.8 },
      { name: "Saiph", zh: "参宿六", x: 34, y: 81, mag: 2.1 },
      { name: "Rigel", zh: "参宿七", x: 67, y: 83, mag: 0.2 },
    ],
    edges: [[0, 1], [0, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 7], [5, 8], [4, 6]],
    stories: {
      chinese: {
        origin: "二十八宿 · 西方白虎",
        title: "参商永隔",
        paragraphs: [
          "中国传统星空并不把这里看作一位猎人。猎户座核心区域属于参宿，腰间三颗亮星因此得名“参宿三星”。参宿与东方苍龙中的心宿分处天空两端，此起彼落，很难同时高悬。",
          "古代传说把参、商的错开写成兄弟失和：阏伯与实沈争斗不休，后来被迁往不同地域，分别主掌辰星与参星。杜甫所写“人生不相见，动如参与商”，便借这对星宿说久别难逢。",
        ],
        note: "参宿的范围与现代猎户座高度重合，但传统星官的划分方式不同。",
      },
      greek: {
        origin: "古希腊神话 · Orion",
        title: "永远追猎的人",
        paragraphs: [
          "在希腊神话里，俄里翁是一位骁勇却骄傲的猎人。关于他的结局有许多版本，其中最著名的一支说，他扬言要猎尽世间野兽，于是大地女神派出毒蝎将他刺死。",
          "众神把猎人与毒蝎同时升上天空，却让它们分居相反季节：天蝎座从东方升起时，猎户座正从西方落下。于是这场追逐永远持续，却永远不会真正相遇。",
        ],
        note: "神话存在多个版本；星座故事反映的是文化传统，而非现代天文学命名依据。",
      },
    },
  },
  {
    id: "ursa-major",
    name: "大熊座",
    latin: "URSA MAJOR",
    season: "spring",
    direction: "北方天空",
    glyph: "斗",
    title: "指向北方的勺柄",
    summary: "大熊座中的北斗七星全年可见于中国大部分地区。斗口两星天枢、天璇的连线向外延伸约五倍，便能找到北极星。",
    caption: "北斗七星只是大熊座的一部分，却是北方天空最重要的路标。",
    quote: "斗柄东指，天下皆春。",
    facts: [
      ["最佳月份", "3月至5月"],
      ["最亮星", "玉衡 · Alioth"],
      ["辨识标志", "北斗七星"],
      ["主要方位", "北方"],
    ],
    stars: [
      { name: "Dubhe", zh: "天枢", x: 14, y: 29, mag: 1.8 },
      { name: "Merak", zh: "天璇", x: 19, y: 52, mag: 2.4 },
      { name: "Phecda", zh: "天玑", x: 40, y: 57, mag: 2.4 },
      { name: "Megrez", zh: "天权", x: 50, y: 42, mag: 3.3 },
      { name: "Alioth", zh: "玉衡", x: 67, y: 38, mag: 1.8 },
      { name: "Mizar", zh: "开阳", x: 79, y: 32, mag: 2.2 },
      { name: "Alkaid", zh: "摇光", x: 93, y: 24, mag: 1.9 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
    stories: {
      chinese: {
        origin: "紫微垣 · 北斗星官",
        title: "斗转星移",
        paragraphs: [
          "北斗七星由天枢、天璇、天玑、天权、玉衡、开阳、摇光组成。古人把它看作天帝的车，也把斗柄的朝向当作辨别季节与时辰的重要依据。",
          "当北斗绕北极星旋转，斗柄在不同季节指向不同方位。“斗柄东指，天下皆春；斗柄南指，天下皆夏”的说法，把天空的周期与人间物候连在了一起。",
        ],
        note: "北斗是中国星官；现代大熊座还包括许多未画入“勺形”的恒星。",
      },
      greek: {
        origin: "古希腊神话 · Ursa Major",
        title: "被升上天空的卡利斯托",
        paragraphs: [
          "一则希腊神话说，宁芙卡利斯托因赫拉的嫉妒被变成熊。多年后，她的儿子阿卡斯在狩猎时差点误伤母亲，宙斯及时把两人升上天空。",
          "卡利斯托成为大熊座，阿卡斯则与小熊座或牧夫座相联系。它们绕着北天极久久不落，像一段被固定在夜空中的重逢。",
        ],
        note: "希腊、罗马作者对人物身份与结局的记述并不完全一致。",
      },
    },
  },
  {
    id: "scorpius",
    name: "天蝎座",
    latin: "SCORPIUS",
    season: "summer",
    direction: "南方低空",
    glyph: "心",
    title: "银河边的赤红心脏",
    summary: "天蝎座沿着夏季银河蜿蜒，轮廓在明亮星座中格外完整。中央的心宿二呈橙红色，古称“大火”，是辨认天蝎的关键。",
    caption: "从心宿二向下追随弯曲星链，可以一直找到蝎尾的尾宿八与尾宿九。",
    quote: "七月流火，九月授衣。",
    facts: [
      ["最佳月份", "6月至8月"],
      ["最亮星", "心宿二 · Antares"],
      ["辨识标志", "红色心脏与弯尾"],
      ["主要方位", "南方低空"],
    ],
    stars: [
      { name: "Acrab", zh: "房宿四", x: 25, y: 16, mag: 2.6 },
      { name: "Dschubba", zh: "房宿三", x: 38, y: 22, mag: 2.3 },
      { name: "Pi Sco", zh: "房宿一", x: 51, y: 14, mag: 2.9 },
      { name: "Antares", zh: "心宿二", x: 43, y: 40, mag: 1.1 },
      { name: "Tau Sco", zh: "心宿一", x: 49, y: 53, mag: 2.8 },
      { name: "Epsilon Sco", zh: "尾宿二", x: 58, y: 63, mag: 2.3 },
      { name: "Mu Sco", zh: "尾宿三", x: 66, y: 74, mag: 3.0 },
      { name: "Shaula", zh: "尾宿八", x: 80, y: 84, mag: 1.6 },
      { name: "Lesath", zh: "尾宿九", x: 88, y: 78, mag: 2.7 },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
    stories: {
      chinese: {
        origin: "二十八宿 · 东方苍龙",
        title: "七月流火",
        paragraphs: [
          "天蝎座中央的三颗亮星在中国传统中属于心宿，心宿二因颜色赤红而被称为“大火”。它曾是古人观察季节的重要星辰，却并不是今天所说从天而降的火焰。",
          "《诗经》里的“七月流火”说的是农历七月之后，大火星开始向西沉落，暑气也将转衰。短短四个字，把恒星运行、季节更替与人间劳作连在一起。",
        ],
        note: "这里的“流火”指心宿二西沉，不是流星或天气炎热。",
      },
      greek: {
        origin: "古希腊神话 · Scorpius",
        title: "为猎人而来的毒蝎",
        paragraphs: [
          "希腊神话常把天蝎与猎户俄里翁的死亡联系起来。猎人的狂妄触怒了大地女神盖亚，一只毒蝎从土中出现，以微小身躯终结了不可一世的巨人。",
          "升上天空后，天蝎与猎户仍被安排在相反季节。夏夜天蝎升起，冬夜猎户退场；一个出现，另一个便消失在地平线下。",
        ],
        note: "这则故事也解释了天蝎座与猎户座为何不会同时占据夜空中央。",
      },
    },
  },
  {
    id: "cygnus",
    name: "天鹅座",
    latin: "CYGNUS",
    season: "summer",
    direction: "头顶至北方",
    glyph: "津",
    title: "沿银河飞行的天鹅",
    summary: "天鹅座顺着夏季银河展开，天津四、辇道增七与中央亮星构成醒目的十字形，因此也常被称作“北十字”。",
    caption: "天津四位于十字顶端，也是夏季大三角中最靠北的一颗亮星。",
    quote: "迢迢牵牛星，皎皎河汉女。",
    facts: [
      ["最佳月份", "7月至9月"],
      ["最亮星", "天津四 · Deneb"],
      ["辨识标志", "北十字"],
      ["所在天区", "夏季银河"],
    ],
    stars: [
      { name: "Deneb", zh: "天津四", x: 50, y: 8, mag: 1.3 },
      { name: "Delta Cyg", zh: "天津二", x: 77, y: 35, mag: 2.9 },
      { name: "Sadr", zh: "天津一", x: 50, y: 41, mag: 2.2 },
      { name: "Gienah", zh: "天津九", x: 22, y: 50, mag: 2.5 },
      { name: "Albireo", zh: "辇道增七", x: 50, y: 87, mag: 3.1 },
    ],
    edges: [[0, 2], [1, 2], [2, 3], [2, 4]],
    stories: {
      chinese: {
        origin: "女宿附近 · 天津星官",
        title: "银河上的渡口",
        paragraphs: [
          "天鹅座的大部分亮星位于中国传统的天津星官附近。“天津”不是今天的城市名，而是天河上的渡口或桥梁：横跨银河的一列星，为两岸建立了想象中的通道。",
          "在牛郎织女故事不断演变的过程中，银河上的桥与渡口也被纳入七夕叙事。天津四高悬在银河之中，使这片天区看起来仿佛真的有一座通往彼岸的星桥。",
        ],
        note: "天津星官与现代天鹅座并非完全重合；传统星官跨越今日星座边界。",
      },
      greek: {
        origin: "古希腊神话 · Cygnus",
        title: "化作天鹅的神与人",
        paragraphs: [
          "天鹅座对应多条希腊传说。最广为流传的一支与宙斯化身天鹅接近勒达有关；另一些版本则把它视为为朋友哀悼、最终被诸神升上天空的青年库克诺斯。",
          "不同故事共享同一种形象：一只展开双翼的白鸟，沿银河缓慢飞行。星座中央的十字结构，恰好勾勒出长颈、身体与两翼。",
        ],
        note: "古典文献中的天鹅故事并不只有一个统一版本。",
      },
    },
  },
  {
    id: "cassiopeia",
    name: "仙后座",
    latin: "CASSIOPEIA",
    season: "autumn",
    direction: "东北至北方",
    glyph: "王",
    title: "北天的折线王座",
    summary: "仙后座由五颗主要亮星排成醒目的 W 或 M 形。它与北斗分处北极星两侧，是北斗贴近地平线时寻找北方的重要替代路标。",
    caption: "五颗亮星组成的折线，会随季节与时刻在 W 与 M 之间转动。",
    quote: "王良策马，阁道连宫。",
    facts: [
      ["最佳月份", "9月至11月"],
      ["代表亮星", "仙后座 α"],
      ["辨识标志", "W / M 形折线"],
      ["主要方位", "东北至北方"],
    ],
    stars: [
      { name: "Caph", zh: "王良一", x: 10, y: 55, mag: 2.3 },
      { name: "Schedar", zh: "王良四", x: 30, y: 25, mag: 2.2 },
      { name: "Navi", zh: "策", x: 49, y: 58, mag: 2.2 },
      { name: "Ruchbah", zh: "阁道三", x: 70, y: 31, mag: 2.7 },
      { name: "Segin", zh: "阁道二", x: 91, y: 50, mag: 3.4 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    stories: {
      chinese: {
        origin: "紫微垣外 · 王良与阁道",
        title: "御者与天宫栈道",
        paragraphs: [
          "仙后座一带在中国传统星图中分属王良、策、阁道等星官。王良是古代著名御者，策代表马鞭；阁道则被想象为连接天宫楼阁的高架道路。",
          "同一组折线亮星，在这里不再是一位坐在王座上的王后，而是一套围绕车马、道路与宫廷秩序展开的天上系统。星空由此成为人间制度的镜像。",
        ],
        note: "王良与阁道只覆盖仙后座的部分恒星，并延伸到邻近天区。",
      },
      greek: {
        origin: "古希腊神话 · Cassiopeia",
        title: "因夸耀而倒悬的王后",
        paragraphs: [
          "卡西奥佩娅是埃塞俄比亚王后。她夸耀自己或女儿安德洛墨达比海中仙女更美，引来海神波塞冬的愤怒，王国因此遭到海怪与洪水惩罚。",
          "她被放上天空后仍坐在王座上，却随着北天旋转，不时头朝下方。古人把这种倒悬看作对虚荣的永恒提醒。",
        ],
        note: "仙后座属于围绕仙女座、仙王座、英仙座展开的一组连贯神话。",
      },
    },
  },
  {
    id: "pegasus",
    name: "飞马座",
    latin: "PEGASUS",
    season: "autumn",
    direction: "东南至头顶",
    glyph: "室",
    title: "秋夜的巨大四边形",
    summary: "飞马座最醒目的部分是“飞马座大四边形”。其中一角今天划归仙女座，但这个近乎空旷的巨大方框仍是秋季寻找周边星座的起点。",
    caption: "大四边形内部亮星稀少，反而让它成为秋夜最容易识别的几何结构。",
    quote: "营室中，离宫六星。",
    facts: [
      ["最佳月份", "9月至11月"],
      ["最亮星", "危宿三 · Enif"],
      ["辨识标志", "飞马大四边形"],
      ["主要方位", "东南至头顶"],
    ],
    stars: [
      { name: "Scheat", zh: "室宿二", x: 25, y: 18, mag: 2.4 },
      { name: "Alpheratz", zh: "壁宿二", x: 75, y: 16, mag: 2.1 },
      { name: "Markab", zh: "室宿一", x: 27, y: 70, mag: 2.5 },
      { name: "Algenib", zh: "壁宿一", x: 77, y: 72, mag: 2.8 },
      { name: "Homam", zh: "雷电一", x: 48, y: 81, mag: 3.4 },
      { name: "Enif", zh: "危宿三", x: 9, y: 88, mag: 2.4 },
    ],
    edges: [[0, 1], [1, 3], [3, 2], [2, 0], [2, 4], [4, 5]],
    stories: {
      chinese: {
        origin: "二十八宿 · 室宿与壁宿",
        title: "天上的宫室",
        paragraphs: [
          "飞马座大四边形附近对应传统二十八宿中的室宿、壁宿部分星官。室宿又称营室，被视为天上的宫室、军粮仓或营建之所；壁宿则像宫室东墙。",
          "秋夜里，这个巨大方框升到高空时，古人看到的并不是飞马躯干，而是一座秩序井然的天上建筑。星形相同，命名背后的世界却完全不同。",
        ],
        note: "大四边形东北角的壁宿二，现代星座边界中属于仙女座。",
      },
      greek: {
        origin: "古希腊神话 · Pegasus",
        title: "从海与鲜血中诞生",
        paragraphs: [
          "珀伽索斯是一匹有翼神马。传说英雄珀尔修斯斩下美杜莎的头颅时，它从飞溅的鲜血与海水中诞生，随后飞向群山与众神所在之地。",
          "后来，英雄柏勒洛丰骑着珀伽索斯战胜怪物喀迈拉，却因企图直登奥林匹斯而跌落。飞马最终被宙斯留在天上，并为他运送雷霆。",
        ],
        note: "飞马座大四边形勾勒的是飞马身体，而完整星座只呈现其前半身。",
      },
    },
  },
  {
    id: "lyra",
    name: "天琴座",
    latin: "LYRA",
    season: "summer",
    direction: "东方至头顶",
    glyph: "织",
    title: "银河岸边的织女星",
    summary: "天琴座面积不大，却拥有全天最明亮的恒星之一织女星。它与天津四、河鼓二组成夏季大三角，是寻找夏季银河的绝佳起点。",
    caption: "先找到明亮的织女星，再辨认旁边由四颗较暗恒星组成的小平行四边形。",
    quote: "盈盈一水间，脉脉不得语。",
    facts: [
      ["最佳月份", "6月至9月"],
      ["最亮星", "织女一 · Vega"],
      ["辨识标志", "亮星旁的小四边形"],
      ["所在天区", "夏季银河西岸"],
    ],
    stars: [
      { name: "Vega", zh: "织女一", x: 24, y: 12, mag: 0.0 },
      { name: "Zeta Lyr", zh: "织女二", x: 41, y: 35, mag: 4.3 },
      { name: "Delta Lyr", zh: "织女增三", x: 58, y: 31, mag: 4.2 },
      { name: "Sheliak", zh: "渐台二", x: 47, y: 67, mag: 3.5 },
      { name: "Sulafat", zh: "渐台三", x: 69, y: 61, mag: 3.3 },
    ],
    edges: [[0, 1], [1, 2], [2, 4], [4, 3], [3, 1]],
    stories: {
      chinese: {
        origin: "牛宿附近 · 织女星官",
        title: "一年一度的鹊桥",
        paragraphs: [
          "织女星在中国传统中称织女一，与两颗较暗的星共同组成织女星官。银河另一侧的河鼓二被民间称为牛郎星，两者隔河相望，逐渐演化出牛郎织女的七夕故事。",
          "每到农历七月初七，传说喜鹊在银河上搭桥，让分离的恋人短暂相会。真正的织女星距离我们约二十五光年，明亮的蓝白色光芒让它成为夏夜最醒目的主角之一。",
        ],
        note: "牛郎星是天鹰座的河鼓二，并不属于天琴座。",
      },
      greek: {
        origin: "古希腊神话 · Lyra",
        title: "俄耳甫斯的琴声",
        paragraphs: [
          "天琴座代表诗人与乐师俄耳甫斯的七弦琴。他的音乐能使野兽停步、树木俯身，甚至打动冥界之主，让亡妻欧律狄刻获得重返人间的机会。",
          "但他在走出冥界前违背约定回头看了一眼，欧律狄刻再次消失。俄耳甫斯死后，他的琴被缪斯女神放到天空，继续在银河岸边发出无声的乐音。",
        ],
        note: "织女星 Vega 的英文名源自阿拉伯语传统，与希腊琴神话属于不同命名层次。",
      },
    },
  },
];

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
  search: "",
  storyMode: "chinese",
  showLines: true,
  showLabels: true,
  showGrid: false,
  favorites: new Set(),
};

const dom = {
  header: document.querySelector("#siteHeader"),
  menuToggle: document.querySelector("#menuToggle"),
  siteNav: document.querySelector("#siteNav"),
  search: document.querySelector("#constellationSearch"),
  seasonFilter: document.querySelector("#seasonFilter"),
  list: document.querySelector("#constellationList"),
  chart: document.querySelector("#constellationChart"),
  chartTitle: document.querySelector("#chartSvgTitle"),
  chartDesc: document.querySelector("#chartSvgDesc"),
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
  storyCount: document.querySelector("#storyCount"),
  storyGlyph: document.querySelector("#storyGlyph"),
  storyStarName: document.querySelector("#storyStarName"),
  storyOrigin: document.querySelector("#storyOrigin"),
  storyTitle: document.querySelector("#storyTitle"),
  storyBody: document.querySelector("#storyBody"),
  storyNote: document.querySelector("#storyNote"),
  storyRail: document.querySelector("#storyRail"),
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
};

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
  const query = state.search.trim().toLowerCase();
  const filtered = CONSTELLATIONS.filter((item) => {
    const matchesSeason = state.season === "all" || item.season === state.season;
    const searchText = `${item.name} ${item.latin} ${item.glyph}`.toLowerCase();
    return matchesSeason && searchText.includes(query);
  });

  dom.list.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = "没有找到匹配的星座。";
    dom.list.append(empty);
    return;
  }

  filtered.forEach((item) => {
    const originalIndex = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `constellation-item${item.id === state.activeId ? " is-active" : ""}`;
    button.dataset.id = item.id;
    button.setAttribute("aria-pressed", String(item.id === state.activeId));
    button.innerHTML = `
      <span class="list-number">${padNumber(originalIndex + 1)}</span>
      <span class="list-name"><strong>${item.name}</strong><small>${item.latin}</small></span>
      <span class="list-favorite" aria-hidden="true">${state.favorites.has(item.id) ? "★" : ""}</span>
    `;
    button.addEventListener("click", () => setConstellation(item.id, true));
    dom.list.append(button);
  });
}

function svgElement(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, String(value)));
  return element;
}

function chartPoint(star) {
  return {
    x: 58 + star.x * 6.84,
    y: 42 + star.y * 5.28,
  };
}

function renderChart() {
  const item = activeConstellation();
  const random = mulberry32(hashString(item.id));
  dom.chart.replaceChildren();

  const background = svgElement("g", { "aria-hidden": "true" });
  for (let index = 0; index < 95; index += 1) {
    const radius = random() > 0.91 ? 1.35 : random() > 0.7 ? 0.85 : 0.52;
    const star = svgElement("circle", {
      class: "background-star",
      cx: 18 + random() * 764,
      cy: 18 + random() * 584,
      r: radius,
      opacity: 0.2 + random() * 0.48,
    });
    background.append(star);
  }
  dom.chart.append(background);

  if (state.showGrid) {
    const grid = svgElement("g", { "aria-hidden": "true" });
    [100, 220, 340, 460, 580, 700].forEach((x, index) => {
      grid.append(svgElement("line", { class: "chart-grid-line", x1: x, y1: 18, x2: x, y2: 602 }));
      const label = svgElement("text", { class: "coordinate-label", x: x + 5, y: 32 });
      label.textContent = `${(index * 4 + 2).toString().padStart(2, "0")}h`;
      grid.append(label);
    });
    [100, 205, 310, 415, 520].forEach((y, index) => {
      grid.append(svgElement("line", { class: "chart-grid-line", x1: 18, y1: y, x2: 782, y2: y }));
      const label = svgElement("text", { class: "coordinate-label", x: 24, y: y - 7 });
      label.textContent = `${60 - index * 30}°`;
      grid.append(label);
    });
    dom.chart.append(grid);
  }

  if (state.showLines) {
    const lines = svgElement("g", { "aria-hidden": "true" });
    item.edges.forEach(([from, to]) => {
      const start = chartPoint(item.stars[from]);
      const end = chartPoint(item.stars[to]);
      lines.append(svgElement("line", {
        class: "constellation-line",
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      }));
    });
    dom.chart.append(lines);
  }

  const starGroup = svgElement("g");
  item.stars.forEach((star) => {
    const point = chartPoint(star);
    const radius = Math.max(2.5, 7.3 - star.mag * 1.12);
    const halo = svgElement("circle", {
      class: "constellation-star-halo",
      cx: point.x,
      cy: point.y,
      r: radius + 6,
    });
    const dot = svgElement("circle", {
      class: "constellation-star",
      cx: point.x,
      cy: point.y,
      r: radius,
    });
    const hit = svgElement("circle", {
      class: "star-hit",
      cx: point.x,
      cy: point.y,
      r: 17,
      tabindex: 0,
      role: "img",
      "aria-label": `${star.zh}，${star.name}，视星等 ${star.mag}`,
    });
    const title = svgElement("title");
    title.textContent = `${star.zh} · ${star.name} · 视星等 ${star.mag}`;
    hit.append(title);
    starGroup.append(halo, dot, hit);

    if (state.showLabels) {
      const label = svgElement("text", {
        class: "star-label",
        x: point.x + 13,
        y: point.y - 11,
      });
      label.textContent = star.zh;
      starGroup.append(label);
    }
  });
  dom.chart.append(starGroup);
}

function renderDetails() {
  const item = activeConstellation();
  const index = CONSTELLATIONS.findIndex((entry) => entry.id === item.id);
  dom.chartName.textContent = item.name;
  dom.chartLatin.textContent = item.latin;
  dom.chartCaption.textContent = item.caption;
  dom.chartTitle.textContent = `${item.name}星图`;
  dom.chartDesc.textContent = `显示${item.name}主要恒星与传统连线的示意星图。`;
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
}

function renderStoryRail() {
  dom.storyRail.replaceChildren();
  CONSTELLATIONS.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = item.id === state.activeId ? "is-active" : "";
    button.setAttribute("aria-pressed", String(item.id === state.activeId));
    button.innerHTML = `<span>${padNumber(index + 1)}</span><span>${item.name}</span>`;
    button.addEventListener("click", () => setConstellation(item.id, true));
    dom.storyRail.append(button);
  });
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

function setConstellation(id, updateAddress = false) {
  if (!CONSTELLATIONS.some((item) => item.id === id)) return;
  state.activeId = id;
  renderList();
  renderChart();
  renderDetails();
  renderStory();
  renderStoryRail();
  renderHeroReadout();
  if (updateAddress) updateUrl(id);
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
  const url = window.location.href;
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

function bindControls() {
  dom.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderList();
  });

  dom.seasonFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-season]");
    if (!button) return;
    state.season = button.dataset.season;
    dom.seasonFilter.querySelectorAll("button").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderList();
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

  dom.menuToggle.addEventListener("click", () => {
    const open = !dom.header.classList.contains("is-open");
    dom.header.classList.toggle("is-open", open);
    dom.menuToggle.setAttribute("aria-expanded", String(open));
    dom.menuToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    dom.menuToggle.querySelector("span").textContent = open ? "×" : "☰";
  });

  dom.siteNav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    dom.header.classList.remove("is-open");
    dom.menuToggle.setAttribute("aria-expanded", "false");
    dom.menuToggle.setAttribute("aria-label", "打开导航");
    dom.menuToggle.querySelector("span").textContent = "☰";
  });

  window.addEventListener("scroll", () => {
    dom.header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
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

function initialize() {
  loadFavorites();
  readInitialConstellation();
  bindControls();
  renderList();
  renderChart();
  renderDetails();
  renderStory();
  renderStoryRail();
  renderHeroReadout();
  setObserveSeason("winter");
  setupRevealAnimations();
  setupSkyCanvas();
}

initialize();
