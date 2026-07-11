/*
 * Extended editorial story collection for Stellar Atlas.
 *
 * Each topic separates documentary evidence, later interpretation and legend.
 * Constellation references use official IAU three-letter abbreviations.
 */
(function appendStoryTopics() {
  "use strict";

  if (!Array.isArray(window.STORY_TOPICS)) {
    window.STORY_TOPICS = [];
  }

  window.STORY_TOPICS.push(
    {
      id: "beidou-calendar-seasons",
      title: "北斗与时令：斗柄真的能指示四季吗",
      kicker: "从绕极星象到历法、报时与国家礼制",
      category: "中国星空",
      featured: true,
      readingMinutes: 12,
      summary: "北斗七星是北半球最容易辨认的星群之一。中国古代文献把它与天极、月份、时辰和四方秩序联系起来；斗柄在同一时刻随季节改变方向，确能提供近似的年内标志，但这一经验必须同时说明观测时刻、纬度、岁差和历法语境。",
      period: "先秦至明清，核心文献约前1千纪至17世纪",
      eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "跨时代"],
      cultures: ["中国古代", "现代天文教育"],
      relatedConstellations: ["UMA", "UMI", "DRA", "BOO", "CVN"],
      evidenceNote: "北斗作为可辨认星群及其绕极周日运动有可靠文献与天文基础；把某一柄向机械对应所有时代的固定公历日期，则忽略了观测时刻、地理纬度、历法差异和岁差。古代所谓“斗”也不等于现代大熊座的全部范围。",
      sections: [
        {
          id: "dipper-and-constellation",
          title: "七星是一组星官，不是整个大熊座",
          kind: "framework",
          paragraphs: [
            "北斗由天枢、天璇、天玑、天权、玉衡、开阳、摇光七星构成，现代分别位于大熊座。前四星形成斗魁，后三星形成斗杓或斗柄。现代大熊座还包含大量不属于北斗星官的恒星，因此“北斗”“大熊座”“Big Dipper”只能在明确语境下近似对照。",
            "天璇与天枢的连线向北延伸，可帮助寻找当前靠近北天极的北极星；但古代观测者面对的天极位置会因岁差缓慢移动。北极星今天的导航价值，不能原样投射到数千年前。"
          ],
          evidence: "星官成员可由传统星表与现代恒星对应核对；北天极长期移动由地球自转轴岁差解释。"
        },
        {
          id: "handle-and-seasons",
          title: "斗柄为何会在四季转向",
          kind: "astronomy",
          paragraphs: [
            "北斗在中国大部分地区属于不落或长期可见的北天星群。地球每天自转，使它围绕北天极转动；地球每年公转，又使相同钟点的恒星天空每天约提前四分钟。若固定在入夜后的某个时刻观察，斗柄方向会随月份有规律地改变。",
            "“斗柄东指为春、南指为夏”等表述是一种时令纲领，不是脱离条件的万能钟表。同一夜中斗柄也会连续转动；越往南，北斗越可能贴近或落到地平线下。严谨展示应允许用户选择地点、日期和时刻，再比较古籍的概括。"
          ],
          evidence: "周日运动和周年视运动可由现代球面天文学计算；四季配向的具体读法依赖古籍版本与观测制度。"
        },
        {
          id: "calendar-and-state",
          title: "从月份标志到“帝车”象征",
          kind: "history",
          paragraphs: [
            "《史记·天官书》把斗描述为运行中央、临制四方的“帝车”，并用斗衡判断时节。这里的天文学观察与国家秩序象征并列：北天绕极运动提供稳定的视觉中心，宫廷文本又把这种中心性转译为帝王巡行和四方治理。",
            "先秦两汉文献还以斗柄所指的方位或地支安排月份。不同历法的岁首并不总相同，文字也可能属于编纂后的制度化表达。因而它们能证明北斗参与时令体系，却不能仅凭一句话复原某一时代的全部观测程序。"
          ],
          evidence: "《史记》《鹖冠子》《尚书》等传世文本可相互参照；其成篇年代、章节层累和制度背景须分别评估。"
        },
        {
          id: "observe-the-dipper",
          title: "做一次可复核的斗柄观测",
          kind: "observation",
          paragraphs: [
            "选择视野开阔的北方天空，在每月同一天、同一地方时记录北斗七星的位置，至少持续四个月。图上同时标注北极星、地平线方向、观测时间和是否采用夏令时；把照片按北天极对齐，便能看见斗柄方向的季节变化。",
            "再在同一夜每隔两小时记录一次，会发现日内转动与季节转向叠加。由此可以区分“星空是一只每天运行的钟”和“固定钟点下的季节日历”这两个尺度，也能解释古代经验为何需要守时制度配合。"
          ],
          evidence: "现代公民科学活动设计；不用于宣称古代各朝代采用同一具体测量流程。"
        }
      ],
      timeline: [
        { date: "前1千纪", title: "早期中星与璇玑材料", description: "《尚书·尧典》等文本保存以恒星配季节和“璇玑玉衡”齐七政的传统，但章节形成时间存在讨论。", certainty: "传世文本，年代有争议" },
        { date: "战国至汉初", title: "斗柄配四时的文献表达", description: "《鹖冠子》等材料把斗柄方向与春夏秋冬相配，呈现已制度化的时令框架。", certainty: "传世文本" },
        { date: "约前1世纪", title: "《史记·天官书》", description: "将北斗的时令作用、天区位置和帝车象征写入系统天官叙述。", certainty: "有作者与时代范围的传世史书" },
        { date: "7世纪中后期", title: "敦煌北极星图", description: "敦煌星图的北极圆图记录北斗及附近星官，显示唐代目录与图像传统。", certainty: "写本实物" },
        { date: "1092年", title: "《新仪象法要》", description: "苏颂的星图与仪器说明把北天星官、报时装置和观测制度并置。", certainty: "有纪年刊本传统" },
        { date: "现代", title: "岁差与地方星空可计算", description: "现代坐标和天文软件可以按地点、日期、时刻复现斗柄方向，并检验古代概括适用的条件。", certainty: "现代天文学" }
      ],
      keyFigures: [
        { name: "司马迁", lifespan: "约前145—约前86年", role: "《史记·天官书》作者", contribution: "保存北斗时令功能与“帝车”政治象征相结合的经典叙述。" },
        { name: "刘安及淮南学者群", lifespan: "前2世纪", role: "《淮南子》编纂传统", contribution: "系统讨论天道、斗运、月份与方位，为理解汉代宇宙论提供材料。" },
        { name: "苏颂", lifespan: "1020—1101年", role: "北宋仪器工程与著述主持者", contribution: "以水运仪象台和星图连接观星、报时与国家历法。" },
        { name: "郭守敬", lifespan: "1231—1316年", role: "元代天文学家", contribution: "主持观测、仪器和授时历工作，代表传统时令知识向精密测量推进。" }
      ],
      quotes: [
        { text: "斗为帝车，运于中央，临制四乡。", attribution: "司马迁", work: "《史记·天官书》", date: "约前1世纪", note: "短引呈现北斗的政治宇宙论意象，不等于现代物理解释。", sourceUrl: "https://ctext.org/shi-ji/tian-guan-shu/zhs" },
        { text: "斗柄东指，天下皆春。", attribution: "《鹖冠子》", work: "环流", date: "成篇年代有争议", note: "仅节引四季配向中的一句；实际观测必须指定地方与时刻。", sourceUrl: "https://ctext.org/he-guan-zi/huan-liu/zhs" }
      ],
      network: {
        title: "北斗的观测与意义网络",
        nodes: [
          { id: "dipper", label: "北斗七星", constellation: "UMA", type: "asterism" },
          { id: "bowl", label: "斗魁四星", constellation: "UMA", type: "stars" },
          { id: "handle", label: "斗柄三星", constellation: "UMA", type: "stars" },
          { id: "pole", label: "北天极", constellation: "UMI", type: "coordinate" },
          { id: "polaris", label: "北极星 Polaris", constellation: "UMI", type: "star" },
          { id: "seasons", label: "四季与月份", type: "calendar" },
          { id: "imperial-carriage", label: "帝车意象", type: "interpretation" },
          { id: "timekeeping", label: "守时与历法", type: "practice" }
        ],
        edges: [
          { from: "dipper", to: "bowl", label: "包含" },
          { from: "dipper", to: "handle", label: "包含" },
          { from: "bowl", to: "polaris", label: "指极辅助线" },
          { from: "polaris", to: "pole", label: "目前接近" },
          { from: "handle", to: "seasons", label: "固定时刻下方向变化" },
          { from: "dipper", to: "imperial-carriage", label: "古代象征解释" },
          { from: "dipper", to: "timekeeping", label: "绕极运动提供标志" }
        ]
      },
      comparisons: [
        { label: "天区单位", traditions: [{ culture: "中国星官", value: "北斗七星，属于紫微垣外附近的重要星官" }, { culture: "现代 IAU", value: "七颗星均在大熊座边界内，但大熊座远大于北斗" }] },
        { label: "方向变化", traditions: [{ culture: "古代时令概括", value: "斗柄配四方、月份或四季" }, { culture: "现代计算", value: "方向由地点、日期、地方时和历元共同决定" }] },
        { label: "北方基准", traditions: [{ culture: "历史天空", value: "天极附近恒星随岁差时代而变" }, { culture: "当代天空", value: "北极星目前距北天极很近，可辅助定向" }] }
      ],
      sources: [
        { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "北斗、天极、时令与帝车叙述。" },
        { label: "《鹖冠子·环流》", url: "https://ctext.org/he-guan-zi/huan-liu/zhs", type: "一手史料", note: "斗柄方向与四时配属；篇章年代需谨慎。" },
        { label: "《尚书·尧典》", url: "https://ctext.org/shang-shu/canon-of-yao/zhs", type: "一手史料", note: "早期中星、季节与璇玑玉衡材料。" },
        { label: "The Dunhuang Chinese Sky", url: "https://arxiv.org/abs/0906.3034", type: "学术论文", note: "敦煌星图年代、投影和北极区图研究。" },
        { label: "香港太空馆：天文教育资源", url: "https://hk.space.museum/en/web/spm/resources.html", type: "公共天文教育", note: "中国天文史与公众观星资源入口。" },
        { label: "IAU：The Constellations", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "现代大熊座、小熊座范围与命名背景。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "ziwei-enclosure-imperial-seat",
      title: "紫微垣与帝座：北天为何被想象成宫城",
      kicker: "从天极观测到帝王秩序的历史投影",
      category: "中国星空",
      featured: true,
      readingMinutes: 13,
      summary: "紫微垣环绕古人所见的北天中枢，由垣墙、宫门、辅臣、后宫与禁卫等众多星官组成。它既是一片可记录的天区，也是帝国政治词汇在天空中的投影；不过“紫微”“北极”“天皇大帝”和现代北极星并非任何时代都能简单画上等号。",
      period: "战国秦汉至明清，核心图像约前1世纪至17世纪",
      eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "跨时代"],
      cultures: ["中国古代"],
      relatedConstellations: ["UMI", "DRA", "CEP", "CAM", "CAS", "UMA"],
      evidenceNote: "紫微垣及内部星官在史书、星表和星图中有连续证据，但成员、星数和恒星对应随时代调整。“帝座”是制度与占候语境中的象征术语，不应当作某颗恒星具有政治属性的自然科学结论。",
      sections: [
        {
          id: "walls-and-palace",
          title: "两列垣墙围出的北天宫城",
          kind: "framework",
          paragraphs: [
            "紫微垣以左右垣墙围成不规则天区，大致跨越今天的小熊、天龙、仙王、鹿豹和部分大熊、仙后座。垣内可见北极、四辅、勾陈、天皇大帝、尚书、柱史、女史、御女等星官；名称和星数并非一张图从古至今不变。",
            "现代 IAU 星座以边界覆盖全天，紫微垣则以星官和垣墙组织空间。两套系统可以叠加帮助定位，却不能一对一翻译：同一垣会跨越多个现代星座，一颗现代恒星在不同古星表中的归属也可能需要校勘。"
          ],
          evidence: "《史记》《晋书》《隋书》天文志以及敦煌、宋代星图提供互证；具体恒星对应以所用星表为准。"
        },
        {
          id: "moving-pole",
          title: "北天中心会慢慢移动",
          kind: "astronomy",
          paragraphs: [
            "地球自转轴在天球上的指向因岁差以约二万六千年的周期缓慢绕行。今天的勾陈一 Polaris 接近北天极，但在秦汉、唐宋，它与天极的距离更大；更早时代天龙座附近的恒星曾更接近极点。",
            "古人可以用多星关系表示“北极”或围绕一个无星点的几何中心，而不必把全部政治中心概念压到现代北极星上。数字星图若允许切换历元，读者就能看到宫城意象为何稳定，而中心恒星的实际几何关系却在变化。"
          ],
          evidence: "岁差是可计算的天文学效应；古星名与具体恒星的历史对应仍需星表和注本证据。"
        },
        {
          id: "imperial-metaphor",
          title: "天极、太一与帝王：象征并非简单复制",
          kind: "interpretation",
          paragraphs: [
            "《史记·天官书》将中宫天极与太一常居联系，并把北斗写作帝车。后世星官目录继续扩展宫门、辅弼、内厨、华盖等名称，构成一个可辨认又可解释天象的政治空间。天象进入奏报时，星官提供了说明客星、彗星或五星位置的共同词汇。",
            "这种对应不是把地面宫殿按比例搬上天空。星官传统由不同时代的目录、占辞、礼制和观测累积而成；研究者需要问“哪一部文本、哪一张图、哪个年代”，而不是把所有名称拼成一套静止的帝国蓝图。"
          ],
          evidence: "政治含义来自史书和占候文本的语言；其社会解释需要和星表的技术用途分开讨论。"
        },
        {
          id: "reading-ziwei-map",
          title: "怎样读一张紫微垣历史图层",
          kind: "method",
          paragraphs: [
            "第一层显示古图的星点、连线和文字；第二层标出赤道坐标与历元；第三层叠加现代恒星编号和 IAU 边界；第四层列出各版本差异。读者应能点击星官查看“史料首次可见”“后世增改”“现代拟合”三类说明。",
            "比较敦煌北极图、苏颂星图与清代星表时，不应只看画面像不像，还要比较投影、纸张年代、抄写系统、观测精度和编纂目的。图像的缺星、错位或旋转可能来自投影和传抄，不必立即解释为天象变化。"
          ],
          evidence: "现代数字人文展示方法；历史结论仍须回到原始图本和学术校勘。"
        }
      ],
      timeline: [
        { date: "约前1世纪", title: "《史记·天官书》描述中宫", description: "天极、太一、后宫与北斗帝车被放在同一套天官秩序中。", certainty: "传世史书" },
        { date: "3至7世纪", title: "三家星目录合流", description: "陈卓传统及隋唐史志使北极区星官的名称和成员更系统化。", certainty: "后世史志与目录" },
        { date: "7世纪中后期", title: "敦煌北极圆图", description: "S.3326 以圆形投影呈现北天极附近星官，是现存重要早期纸本星图。", certainty: "写本实物" },
        { date: "1092年", title: "苏颂星图", description: "《新仪象法要》记录北宋星官和仪象系统，便于与唐代图本比较。", certainty: "有纪年著作" },
        { date: "1247年", title: "苏州石刻天文图", description: "南宋石刻将全天星官与宇宙论说明公开保存，紫微垣位于北天核心。", certainty: "有纪年石刻" },
        { date: "17至18世纪", title: "测量体系更新", description: "耶稣会士与钦天监工作把欧洲坐标测量、新增南天恒星和传统星官名并置。", certainty: "官修星表与图本" }
      ],
      keyFigures: [
        { name: "司马迁", lifespan: "约前145—约前86年", role: "史官与天官体系记录者", contribution: "保存中宫天极、太一和北斗帝车的经典叙述。" },
        { name: "陈卓", lifespan: "3世纪", role: "天文学家", contribution: "后世称其综合三家星，影响隋唐以后紫微垣目录。" },
        { name: "苏颂", lifespan: "1020—1101年", role: "仪器与星图工程主持者", contribution: "以《新仪象法要》留下可比较的北宋北天星图。" },
        { name: "南怀仁", lifespan: "1623—1688年", role: "清初钦天监天文学家", contribution: "参与仪器和星图编制，代表传统星官与欧洲测量并置的阶段。" }
      ],
      quotes: [
        { text: "中宫天极星，其一明者，太一常居也。", attribution: "司马迁", work: "《史记·天官书》", date: "约前1世纪", note: "“天极星”的历史成员与现代北极星不宜直接等同。", sourceUrl: "https://ctext.org/shi-ji/tian-guan-shu/zhs" }
      ],
      network: {
        title: "紫微垣的空间与制度关系",
        nodes: [
          { id: "ziwei", label: "紫微垣", constellation: "UMI", type: "enclosure" },
          { id: "left-wall", label: "左垣", constellation: "DRA", type: "wall" },
          { id: "right-wall", label: "右垣", constellation: "DRA", type: "wall" },
          { id: "north-pole", label: "历史北天极", type: "coordinate" },
          { id: "beiji", label: "北极星官", constellation: "UMI", type: "asterism" },
          { id: "gouchen", label: "勾陈星官", constellation: "UMI", type: "asterism" },
          { id: "imperial-order", label: "宫廷秩序意象", type: "interpretation" },
          { id: "reports", label: "天象观测与奏报", type: "practice" }
        ],
        edges: [
          { from: "ziwei", to: "left-wall", label: "垣墙组成" },
          { from: "ziwei", to: "right-wall", label: "垣墙组成" },
          { from: "ziwei", to: "beiji", label: "包含星官" },
          { from: "ziwei", to: "gouchen", label: "包含星官" },
          { from: "beiji", to: "north-pole", label: "历史上围绕" },
          { from: "ziwei", to: "imperial-order", label: "名称与空间象征" },
          { from: "ziwei", to: "reports", label: "提供位置词汇" }
        ]
      },
      comparisons: [
        { label: "中心概念", traditions: [{ culture: "古代星官", value: "北极、天极、太一等概念随文本和星表出现" }, { culture: "现代坐标", value: "北天极是地球自转轴向北延长与天球的交点" }] },
        { label: "空间边界", traditions: [{ culture: "紫微垣", value: "由左右垣墙和内部星官组织，历史版本可变" }, { culture: "IAU 星座", value: "以固定赤经赤纬边界覆盖全天" }] },
        { label: "帝座含义", traditions: [{ culture: "历史语境", value: "礼制、占候与政治宇宙论的象征" }, { culture: "现代天文学", value: "恒星没有政治属性，名称属于文化史资料" }] }
      ],
      sources: [
        { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "中宫、天极、太一和北斗的核心汉代叙述。" },
        { label: "《晋书·天文志》", url: "https://ctext.org/wiki.pl?if=gb&chapter=160605", type: "一手史料", note: "三家星、陈卓传统及中宫星官材料。" },
        { label: "The Dunhuang Chinese Sky", url: "https://arxiv.org/abs/0906.3034", type: "学术论文", note: "敦煌北极圆图的年代、投影与星官辨识。" },
        { label: "International Dunhuang Programme", url: "https://idp.bl.uk/", type: "数字典藏", note: "敦煌写本与研究资源入口。" },
        { label: "香港太空馆：天文教育资源", url: "https://hk.space.museum/en/web/spm/resources.html", type: "公共天文教育", note: "中国天文史与公众观星资源入口。" },
        { label: "IAU：The Constellations", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "用于区分现代星座边界与古代垣区。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "chinese-star-maps-poetry-history",
      title: "纸上星河：中国古代星图、诗词与天文史",
      kicker: "物质图像、观测制度与文学想象的三条线",
      category: "天文史",
      featured: true,
      readingMinutes: 14,
      summary: "从曾侯乙墓漆箱、敦煌纸本到苏州石刻和清代星图，中国星空留下了跨越两千年的物质证据；《尚书》《诗经》、汉乐府与唐诗又把中星、银河、参商和牛女写进文学。二者相互照明，却不能彼此替代：诗句不是精密星表，星图也不自动说明一首诗的全部意义。",
      period: "战国至近现代数字化，约前5世纪至21世纪",
      eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "近现代", "跨时代"],
      cultures: ["中国古代", "东亚文献传统", "现代天文史"],
      relatedConstellations: ["UMA", "UMI", "ORI", "SCO", "AQL", "LYR", "CYG", "VIR"],
      evidenceNote: "有纪年器物、写本纸张、石刻和刊本可用于建立星图史序列；诗词的成篇与流传年代需逐篇考证。文学意象可以保存认星经验，但不能在没有坐标、时刻和版本依据时直接当作观测记录。",
      sections: [
        {
          id: "maps-as-objects",
          title: "星图首先是物件：漆、纸、木版与石碑",
          kind: "material-history",
          paragraphs: [
            "约前433年的曾侯乙墓漆箱以二十八宿名称环列，是早期宿名系统的重要实物。敦煌 S.3326 则以纸卷分段绘制赤道带，并另设北极圆图；星点颜色、图旁题签、纸张和书写风格共同帮助研究者判断其目录传统与年代。",
            "北宋《新仪象法要》把星图编入仪器专著，1247年苏州石刻天文图则将全天星象与说明文字刻石保存。载体改变了图的用途：墓葬器物、便携写本、官修刊本和公共石刻面对的读者、复制方式与权威来源都不相同。"
          ],
          evidence: "考古出土信息、有纪年题记、纸张分析和版本学构成证据链；不能只凭现代摹本的视觉风格断代。"
        },
        {
          id: "measurement-behind-image",
          title: "连线背后还有坐标、距星和仪器",
          kind: "astronomy",
          paragraphs: [
            "传统星图并非都按同一投影精确绘制。二十八宿以距星和宿度组织赤道位置，浑仪、简仪等仪器用于测量天体相对赤道、地平或子午线的位置；绘图者还要处理球面铺到平面的变形。",
            "比较两张古图时，应先确认历元、投影方向、星官目录和用途，再讨论星点误差。岁差会改变恒星相对春分点的坐标，新增南天观测和重测又会改变图面内容，因此“古图与今天不重合”不必意味着古人认错了星。"
          ],
          evidence: "星图投影可由现代坐标反演评估，但原图缺损和抄写误差必须进入不确定度说明。"
        },
        {
          id: "poetry-is-not-catalogue",
          title: "诗里的银河不等于星表中的银河",
          kind: "literature",
          paragraphs: [
            "《诗经·大东》以牵牛、织女讽喻有名无实的劳作，《古诗十九首》把银河写成相隔恋人的水界，杜甫又以参商比喻乱世久别。相同星名进入不同文类时，会承担政治讽喻、离情、节俗和个人记忆，意义不由恒星坐标单独决定。",
            "反过来，诗歌也能提示古人熟悉哪些醒目星群、何时观察它们，以及星名如何进入日常语言。可靠做法是把诗句、注本年代、可见星空模拟和相关星官并列，让读者区分“作品明确写了什么”与“现代研究据此推测什么”。"
          ],
          evidence: "文学文本可确认意象和修辞；具体观测日期、作者亲见与否通常需要额外证据。"
        },
        {
          id: "digital-layered-reading",
          title: "数字专题怎样同时尊重图、文与天空",
          kind: "method",
          paragraphs: [
            "一个可复核的数字星图应保留原件影像、释文、坐标拟合、现代恒星编号和版本差异。用户点击星官时，可以沿时间线查看它在敦煌图、宋代图和清代星表中的成员变化，而不是只看到一条看似永恒的连线。",
            "文学专题则应把短引控制在必要范围，链接公版原文，标明成篇与作品系年争议；当星名可能指向不同星官时，用“常见对应”“有争议对应”标记。这样，数字化不是把复杂历史压平成漂亮插画，而是让证据层次可见。"
          ],
          evidence: "现代数字人文编辑原则；原件版权、开放许可和图像元数据需逐项核对。"
        }
      ],
      timeline: [
        { date: "约前433年", title: "曾侯乙墓漆箱", description: "以二十八宿名称环列并配苍龙、白虎等图像，是有明确墓葬年代的早期天文实物。", certainty: "考古实物" },
        { date: "前2至前1世纪", title: "天官与星名进入史传体系", description: "《史记·天官书》等文本系统整理星官、日月五星与天象解释。", certainty: "传世史书" },
        { date: "7世纪中后期", title: "敦煌星图 S.3326", description: "分段星图与北极图保存一千余星及三家星着色传统。", certainty: "纸本写本" },
        { date: "1092年", title: "《新仪象法要》刊图", description: "仪器结构、报时系统和多幅星图共同记录北宋官方天文学。", certainty: "有纪年著作" },
        { date: "1247年", title: "苏州石刻天文图", description: "全天星官、银河、赤道和黄道连同说明文字被刻于石碑。", certainty: "有纪年石刻" },
        { date: "17至18世纪", title: "中西星表和南天知识并置", description: "新测坐标、望远镜时代知识与传统星官名进入官修图表。", certainty: "官修文献与器物" },
        { date: "20至21世纪", title: "摄影、数据库与高分辨率数字化", description: "全球典藏机构开放图像，学者可进行投影复原、跨版本标注和在线校勘。", certainty: "现代典藏与研究" }
      ],
      keyFigures: [
        { name: "司马迁", lifespan: "约前145—约前86年", role: "史官", contribution: "以《天官书》保存秦汉以前星官和天象叙述的综合框架。" },
        { name: "一行", lifespan: "683—727年", role: "唐代天文学家", contribution: "参与历法与大地测量，体现星图目录和实测校正之间的联系。" },
        { name: "苏颂", lifespan: "1020—1101年", role: "北宋科学著述主持者", contribution: "把星图、浑仪与机械报时系统收入《新仪象法要》。" },
        { name: "黄裳", lifespan: "12世纪", role: "南宋学者", contribution: "传统上与苏州天文图底本相关；具体绘刻环节仍须依据题记与研究区分。" },
        { name: "杜甫", lifespan: "712—770年", role: "唐代诗人", contribution: "将参商、北斗与银河等星空意象写入战乱和人生经验。" }
      ],
      quotes: [
        { text: "维天有汉，监亦有光。跂彼织女，终日七襄。", attribution: "《诗经》", work: "小雅·大东", date: "约前1千纪，成篇年代有讨论", note: "诗句确认银河与织女意象，后世爱情故事不能全部倒推至此。", sourceUrl: "https://ctext.org/book-of-poetry/xiao-ya-da-dong/zhs" },
        { text: "星汉灿烂，若出其里。", attribution: "曹操", work: "观沧海", date: "约207年", note: "文学中的“星汉”是银河意象，不是星表术语定义。", sourceUrl: "https://zh.wikisource.org/zh-hans/%E8%A7%80%E6%BB%84%E6%B5%B7" }
      ],
      network: {
        title: "古代星空知识的载体网络",
        nodes: [
          { id: "observation", label: "实地观测", type: "practice" },
          { id: "instruments", label: "浑仪与测量", type: "instrument" },
          { id: "catalogues", label: "星表与历书", type: "record" },
          { id: "maps", label: "星图与石刻", type: "image" },
          { id: "poetry", label: "诗词与典故", type: "literature" },
          { id: "ritual", label: "礼制与占候", type: "institution" },
          { id: "digital", label: "数字典藏与复原", type: "method" },
          { id: "modern-sky", label: "现代坐标星空", type: "reference" }
        ],
        edges: [
          { from: "observation", to: "instruments", label: "测量" },
          { from: "instruments", to: "catalogues", label: "形成数据" },
          { from: "catalogues", to: "maps", label: "编绘依据" },
          { from: "catalogues", to: "ritual", label: "提供时日与位置" },
          { from: "maps", to: "poetry", label: "共享星名但文类不同" },
          { from: "maps", to: "digital", label: "影像与标注" },
          { from: "modern-sky", to: "digital", label: "坐标拟合" }
        ]
      },
      comparisons: [
        { label: "主要证据", traditions: [{ culture: "星图史", value: "器物、写本、石刻、刊本和坐标" }, { culture: "文学史", value: "作品文本、注本、文类和接受史" }] },
        { label: "可确认内容", traditions: [{ culture: "星图", value: "星官成员、相对位置、投影与目录传统" }, { culture: "诗词", value: "星名意象、修辞关系和时代情感" }] },
        { label: "常见误区", traditions: [{ culture: "以诗证天", value: "把比喻当精密观测记录" }, { culture: "以图释诗", value: "认为坐标能穷尽作品意义" }, { culture: "数字复原", value: "把拟合结果误当无争议原貌" }] }
      ],
      sources: [
        { label: "The Dunhuang Chinese Sky", url: "https://arxiv.org/abs/0906.3034", type: "学术论文", note: "敦煌星图年代、纸张、投影和星数的综合研究。" },
        { label: "International Dunhuang Programme", url: "https://idp.bl.uk/", type: "数字典藏", note: "敦煌写本图像、目录和研究资源入口。" },
        { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "汉代星官、天象与制度叙述。" },
        { label: "《诗经·小雅·大东》", url: "https://ctext.org/book-of-poetry/xiao-ya-da-dong/zhs", type: "一手史料", note: "牵牛、织女与银河意象的早期文本。" },
        { label: "《新仪象法要》", url: "https://zh.wikisource.org/zh-hans/%E6%96%B0%E5%84%80%E8%B1%A1%E6%B3%95%E8%A6%81", type: "一手史料", note: "北宋仪器、报时与星图文献。" },
        { label: "IAU：The Constellations", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "用于现代坐标和边界对照，不替代古星官。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "greek-hero-constellation-network",
      title: "英雄升上天空：希腊星座故事关系图",
      kicker: "珀尔修斯家族、海怪与飞马怎样被后世连成一片",
      category: "希腊故事",
      featured: true,
      readingMinutes: 13,
      summary: "秋季北天的仙王、仙后、仙女、英仙和飞马座常被讲成一幅连续的英雄图景：卡西俄珀亚夸耀、安德洛墨达受难、珀尔修斯斩杀海怪并迎娶公主。古典文献确实保存这些人物关系，但不同作者的细节并不一致，现代星座相邻也不证明它们从一开始就是一张完整的“连环画”。",
      period: "古风希腊至现代星座标准，约前8世纪至20世纪",
      eraTags: ["古典地中海", "中古", "近现代", "跨时代"],
      cultures: ["古希腊", "古罗马", "欧洲星图传统"],
      relatedConstellations: ["AND", "PER", "CAS", "CEP", "CET", "PEG", "HER", "ORI"],
      evidenceNote: "人物和情节来自荷马、阿拉托斯、伪埃拉托斯特尼、奥维德、许癸努斯等不同时代文本；“珀尔修斯骑飞马营救安德洛墨达”是后世常见图像，但并非所有早期版本如此。现代 IAU 星座边界在20世纪才固定。",
      sections: [
        {
          id: "perseus-family-cycle",
          title: "一组相邻星座如何形成家族故事",
          kind: "legend",
          paragraphs: [
            "卡西俄珀亚与刻甫斯是安德洛墨达的父母。因母亲夸耀女儿或自己的美貌触怒海中神灵，国家遭灾，安德洛墨达被缚在海边献给怪物；珀尔修斯在杀死美杜莎归来途中发现她，击败海怪并要求履行婚约。具体由谁发怒、灾害为何发生、怪物怎样被杀，各文本并不完全相同。",
            "今天，仙王、仙后、仙女和英仙座在北天相邻，鲸鱼座位于更南方，飞马座连接仙女座一侧。这种布局非常适合教学叙事，但星座位置、人物亲属关系和故事成篇是三种不同证据，不应只因“画得连在一起”就推断某个细节古已有之。"
          ],
          evidence: "古典文本可确认人物关系；具体图像组合需按星图年代追踪。"
        },
        {
          id: "pegasus-problem",
          title: "珀尔修斯是否骑着飞马",
          kind: "historiography",
          paragraphs: [
            "飞马在许多古典谱系中由美杜莎被斩时诞生，后来最重要的骑手却是柏勒洛丰。珀尔修斯拥有飞行能力的版本常归因于有翼鞋、神助或其他器物，而不是明确骑乘飞马。近现代绘画、电影和儿童读物常把两个便利元素合并。",
            "专题关系图应分别画出“血缘或诞生关系”“文本中的行动关系”和“后世图像常见组合”。这样既能解释飞马座为何靠近仙女座，也不会把星图邻接误作一条所有古典作者都赞同的情节。"
          ],
          evidence: "不同作者和艺术传统的版本对读；不能用现代大众叙事替代古典文本。"
        },
        {
          id: "other-hero-cycles",
          title: "赫拉克勒斯与俄里翁属于另外的故事圈",
          kind: "comparison",
          paragraphs: [
            "武仙座常与赫拉克勒斯联系，但古典星诗也曾只称其为“跪者”，身份解释经历变化。俄里翁则有自己的猎人、黎明女神、阿耳忒弥斯和蝎子版本。把所有英雄星座连成同一场冒险，会抹去各自的文本谱系。",
            "关系图因此需要“同一故事”“共享角色”“仅为天区相邻”“后世艺术并置”等不同边型。使用者既能追踪珀尔修斯家族，也能跳到赫拉克勒斯或俄里翁专题，而不误以为三者在一部古代史诗中会面。"
          ],
          evidence: "星座身份来自多层古典注释与图像传统；现代专题链接属于编辑导航。"
        },
        {
          id: "from-figures-to-regions",
          title: "从人物图形到88个天区",
          kind: "astronomy-history",
          paragraphs: [
            "古代星表记录的是某个人物图形中的恒星，边缘并不覆盖全天。文艺复兴印刷星图不断改变人物姿势、朝向和服饰；同一颗星在画面中可能落在手、脚或武器上。1922年 IAU 采用88个星座名称，1930年公布边界后，星座才成为无缝覆盖全天的标准区域。",
            "现代网站可以保留两个可切换图层：一层是 IAU 边界和恒星坐标，另一层是有明确年代和来源的历史人物图像。故事关系应附文本来源，人物插图应附图版来源，避免创造一张看似“古希腊原版”的现代拼贴。"
          ],
          evidence: "现代边界有明确标准史；历史图像必须按具体图版归属。"
        }
      ],
      timeline: [
        { date: "约前8世纪", title: "荷马史诗中的星座与英雄材料", description: "《伊利亚特》《奥德赛》提到大熊、俄里翁等星象，也保存珀尔修斯相关英雄传统，但尚非完整星座关系图。", certainty: "古典文本，成篇层累" },
        { date: "约前3世纪", title: "阿拉托斯《物象》", description: "以星诗描述人物星座在天空中的相对位置，影响后世识图传统。", certainty: "传世诗作" },
        { date: "前3至前1世纪传统", title: "星座神话汇编成形", description: "归于埃拉托斯特尼的《星变》传统把人物传说逐一连接到天上图形。", certainty: "作品归属与版本复杂" },
        { date: "约8年", title: "奥维德《变形记》", description: "以长篇叙事重写珀尔修斯、安德洛墨达与婚宴冲突，深刻影响欧洲艺术。", certainty: "有作者的文学作品" },
        { date: "2世纪", title: "托勒密星表", description: "《天文学大成》列出48星座的恒星位置，为后世地图提供坐标骨架。", certainty: "科学文本" },
        { date: "1603年", title: "拜耳《测天图》", description: "印刷图谱把古典人物图像、恒星位置和字母命名结合。", certainty: "有纪年印刷星图" },
        { date: "1922—1930年", title: "IAU 名称与边界标准化", description: "英雄人物名称被保留为现代星座名，边界则改为统一坐标区域。", certainty: "国际标准" }
      ],
      keyFigures: [
        { name: "珀尔修斯", lifespan: "传说人物", role: "英雄", contribution: "斩杀美杜莎并营救安德洛墨达，是北天家族星座故事的行动核心。" },
        { name: "安德洛墨达", lifespan: "传说人物", role: "埃塞俄比亚公主", contribution: "从献祭受难者到英雄配偶，不同文本和艺术对其主动性呈现不同。" },
        { name: "卡西俄珀亚", lifespan: "传说人物", role: "王后", contribution: "其夸耀引发神罚的版本把家庭关系连接到海怪叙事。" },
        { name: "阿拉托斯", lifespan: "约前315—约前240年", role: "希腊星诗作者", contribution: "以《物象》系统描述星座相对位置和识别顺序。" },
        { name: "奥维德", lifespan: "前43—17或18年", role: "罗马诗人", contribution: "《变形记》的珀尔修斯叙事成为后世欧洲图像的重要来源。" }
      ],
      quotes: [
        { text: "英雄看见她被锁在岩石上，几乎以为那是大理石雕像。", attribution: "奥维德", work: "《变形记》第四卷", date: "约8年", note: "据拉丁文本意译，用于提示文学视角；不同译本措辞不一。", sourceUrl: "https://www.perseus.tufts.edu/hopper/text?doc=Ov.+Met.+4&fromdoc=Perseus%3Atext%3A1999.02.0028" }
      ],
      network: {
        title: "珀尔修斯故事圈与相邻星座",
        nodes: [
          { id: "cepheus", label: "刻甫斯", constellation: "CEP", type: "character" },
          { id: "cassiopeia", label: "卡西俄珀亚", constellation: "CAS", type: "character" },
          { id: "andromeda", label: "安德洛墨达", constellation: "AND", type: "character" },
          { id: "perseus", label: "珀尔修斯", constellation: "PER", type: "character" },
          { id: "cetus", label: "海怪 Ketos", constellation: "CET", type: "monster" },
          { id: "pegasus", label: "飞马", constellation: "PEG", type: "creature" },
          { id: "medusa", label: "美杜莎", type: "character" },
          { id: "bellerophon", label: "柏勒洛丰", type: "character" }
        ],
        edges: [
          { from: "cepheus", to: "andromeda", label: "父女" },
          { from: "cassiopeia", to: "andromeda", label: "母女" },
          { from: "perseus", to: "andromeda", label: "营救与婚姻" },
          { from: "cetus", to: "andromeda", label: "献祭威胁" },
          { from: "perseus", to: "cetus", label: "英雄对抗" },
          { from: "medusa", to: "pegasus", label: "部分谱系中的诞生关系" },
          { from: "bellerophon", to: "pegasus", label: "古典传统中的主要骑手" },
          { from: "perseus", to: "pegasus", label: "后世图像常合并，非通行早期情节" }
        ]
      },
      comparisons: [
        { label: "关系证据", traditions: [{ culture: "古典文本", value: "亲属、神罚、营救和婚姻情节" }, { culture: "现代星图", value: "星座边界邻接与视位置" }, { culture: "后世艺术", value: "可重排姿势并合并不同版本" }] },
        { label: "珀尔修斯的飞行", traditions: [{ culture: "部分古典版本", value: "神赐飞行器物或有翼鞋" }, { culture: "大众图像", value: "常画成骑飞马营救公主" }] },
        { label: "“家族星座”", traditions: [{ culture: "教学简称", value: "便于识别一组北天相邻星座" }, { culture: "历史研究", value: "需逐一核对各人物进入星图的文本和图像年代" }] }
      ],
      sources: [
        { label: "阿拉托斯《物象》", url: "https://www.theoi.com/Text/AratusPhaenomena.html", type: "一手文本译本", note: "古代星座位置与人物图形的诗体描述。" },
        { label: "奥维德《变形记》第四卷", url: "https://www.perseus.tufts.edu/hopper/text?doc=Ov.+Met.+4&fromdoc=Perseus%3Atext%3A1999.02.0028", type: "一手文本", note: "珀尔修斯与安德洛墨达故事的重要罗马版本。" },
        { label: "许癸努斯《天文诗》", url: "https://topostext.org/work/207", type: "一手文本译本", note: "星座神话多版本汇编；作者归属和年代需说明。" },
        { label: "Perseus Digital Library", url: "https://www.perseus.tufts.edu/", type: "古典文献数据库", note: "希腊罗马原文、译本和形态分析入口。" },
        { label: "Ptolemy's Almagest, translated by G. J. Toomer", url: "https://press.princeton.edu/books/paperback/9780691002606/ptolemys-almagest", type: "学术译注", note: "托勒密星表与48星座的现代校订译本。" },
        { label: "IAU：The Constellations", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "88星座名称和现代边界史。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "orion-myth-variant-traditions",
      title: "谁杀死了俄里翁：猎户神话的多种版本",
      kicker: "黎明女神、阿耳忒弥斯、蝎子与失明故事并存",
      category: "希腊故事",
      featured: true,
      readingMinutes: 13,
      summary: "俄里翁并没有一部唯一、完整、从出生讲到升天的“标准神话”。荷马让阿耳忒弥斯射杀黎明女神所爱的猎人，并在冥界描写他继续狩猎；后来的作者又记录俄诺庇翁使其失明、太阳恢复视力、大地派蝎子惩罚夸口，以及阿波罗诱使阿耳忒弥斯误射等版本。",
      period: "古风希腊至罗马帝国，约前8世纪至2世纪，后续影响至现代",
      eraTags: ["古典地中海", "中古", "近现代", "跨时代"],
      cultures: ["古希腊", "古罗马", "欧洲星图传统"],
      relatedConstellations: ["ORI", "SCO", "TAU", "LEP", "CMA", "CMI", "ERI"],
      evidenceNote: "每个情节必须注明最早或主要保存它的文本；荷马、伪阿波罗多洛斯、伪埃拉托斯特尼和许癸努斯相隔数百年，不能拼成一份无矛盾传记。猎户座与天蝎座在天空中近乎相对，是后世星变解释的有力背景，却不是神话历史事件的证据。",
      sections: [
        {
          id: "homeric-orion",
          title: "荷马笔下：被女神爱过，也仍在冥界狩猎",
          kind: "evidence",
          paragraphs: [
            "《奥德赛》第五卷由卡吕普索提到：黎明女神厄俄斯爱上俄里翁，众神嫉妒，阿耳忒弥斯在俄耳堤癸亚以箭杀死他。这里没有蝎子，也没有阿波罗设计误射；故事服务于“不死女神爱上凡人会遭惩罚”的论辩。",
            "第十一卷中，奥德修斯在冥界看见身材高大的俄里翁驱赶生前猎杀的野兽。两段文字证明猎人身份和死亡传统在古风史诗中已经存在，但没有交代后世熟悉的全部生平。"
          ],
          evidence: "《奥德赛》传世文本；史诗形成和编定经历口头传统，具体行文年代不宜精确到单年。"
        },
        {
          id: "blindness-and-return",
          title: "俄诺庇翁版本：失明、向东与复明",
          kind: "legend-variant",
          paragraphs: [
            "一组后世材料讲俄里翁来到希俄斯，追求或侵犯俄诺庇翁之女墨洛珀，因此被灌醉、刺瞎并逐走。他得到神谕或引导，朝日出的东方前行，最终由赫利俄斯恢复视力。不同文本对冲突责任、引路者和复明过程有差异。",
            "这条故事线强调暴力、惩罚和太阳治愈，与“阿耳忒弥斯的亲密猎伴”并不天然衔接。专题不应为追求顺滑叙事而删除令人不适的版本，也不应把一个作者的道德判断泛化为全部古希腊社会的共同立场。"
          ],
          evidence: "伪阿波罗多洛斯及后世汇编保存多版本；涉及性暴力的情节应准确而克制地标注。"
        },
        {
          id: "scorpion-and-artemis",
          title: "蝎子、夸口与误射：死亡原因继续分叉",
          kind: "legend-variant",
          paragraphs: [
            "星变传统常说俄里翁夸口要杀尽野兽，大地盖亚派出蝎子；也有版本称蝎子因俄里翁追逐阿耳忒弥斯或其同伴而来。猎人与蝎子死后被置于天空两侧，一个升起时另一个趋向落下，形成道德惩罚的可视化解释。",
            "另一条传播很广的故事让阿波罗不满妹妹阿耳忒弥斯与俄里翁亲近，诱她射向海面远处的黑点，事后才发现死者是俄里翁。它与荷马所述阿耳忒弥斯主动射杀、以及蝎子致死版本互不相同，来源和流行年代需要分别标记。"
          ],
          evidence: "伪埃拉托斯特尼、许癸努斯等汇编保存彼此竞争的解释；“最古老版本”需限定到现存文本。"
        },
        {
          id: "sky-opposition",
          title: "为什么猎户与天蝎适合被写成仇敌",
          kind: "astronomy",
          paragraphs: [
            "猎户座中心赤经约5至6小时，天蝎座中心约16至17小时，两者相隔接近半个天球。在北半球中纬度，猎户最适合冬夜观察，天蝎最适合夏夜观察；当一方在傍晚高挂，另一方通常接近太阳方向。",
            "“蝎子升起、猎人落下”是有观测基础的概括，但不是每颗边界星在所有纬度和日期都严格同时越过地平线。网站可用同一地点的逐时动画展示季节错开，再把神话文本作为解释层，而非把故事当作轨道计算。"
          ],
          evidence: "现代赤道坐标和地平坐标计算；星座人物图形没有物理相互作用。"
        }
      ],
      timeline: [
        { date: "约前8至前7世纪", title: "《奥德赛》两次提及俄里翁", description: "一处讲厄俄斯之爱与阿耳忒弥斯射杀，一处让猎人在冥界继续追逐野兽。", certainty: "古风史诗传世文本" },
        { date: "前7至前6世纪传统", title: "归于赫西俄德的俄里翁材料", description: "失传著作的残篇和后世引文可能保存出生、狩猎及星变故事，重建需谨慎。", certainty: "残篇与后世引文" },
        { date: "约前3世纪", title: "阿拉托斯描述天上猎户", description: "《物象》把俄里翁作为醒目的识星图形，强调腰带、肩足和邻近星座。", certainty: "传世星诗" },
        { date: "希腊化至罗马早期", title: "星变汇编加入蝎子解释", description: "归于埃拉托斯特尼的传统把神话人物为何升天与星座相对位置连接。", certainty: "作者归属和版本复杂" },
        { date: "约前1世纪至1世纪", title: "许癸努斯汇集多种死因", description: "《天文诗》并列盖亚、阿耳忒弥斯、俄诺庇翁等说法，是后世版本库的重要来源。", certainty: "传世汇编，作者身份有讨论" },
        { date: "2世纪", title: "托勒密记录猎户座恒星", description: "《天文学大成》提供星表位置，与神话叙事属于不同知识文类。", certainty: "科学文本" },
        { date: "20世纪", title: "现代猎户座与天蝎座边界固定", description: "IAU 保留传统名称，但把两者定义为有坐标边界的全天区域。", certainty: "国际标准" }
      ],
      keyFigures: [
        { name: "俄里翁", lifespan: "传说人物", role: "巨人猎手", contribution: "作为多个互相竞争的出生、爱情、失明和死亡版本的共同中心。" },
        { name: "阿耳忒弥斯", lifespan: "神话人物", role: "狩猎与月亮相关女神", contribution: "在不同文本中可能是杀死俄里翁者、猎伴或受阿波罗欺骗的射手。" },
        { name: "厄俄斯", lifespan: "神话人物", role: "黎明女神", contribution: "荷马版本中爱上俄里翁，使其死亡成为神与凡人爱情的例证。" },
        { name: "俄诺庇翁", lifespan: "传说人物", role: "希俄斯王", contribution: "在失明故事中惩罚俄里翁，推动其向东方寻求复明。" },
        { name: "许癸努斯", lifespan: "传统归于前1世纪至1世纪", role: "神话与星座汇编作者名", contribution: "其名下《天文诗》保存大量相互并列的俄里翁版本。" }
      ],
      quotes: [
        { text: "黎明女神曾爱上俄里翁，直到阿耳忒弥斯以箭射杀他。", attribution: "荷马传统", work: "《奥德赛》第五卷", date: "约前8至前7世纪", note: "据希腊文意译；这一版本没有提到蝎子。", sourceUrl: "https://www.perseus.tufts.edu/hopper/text?doc=Hom.+Od.+5.121&fromdoc=Perseus%3Atext%3A1999.01.0136" }
      ],
      network: {
        title: "俄里翁死亡版本关系",
        nodes: [
          { id: "orion", label: "俄里翁", constellation: "ORI", type: "character" },
          { id: "eos", label: "厄俄斯", type: "deity" },
          { id: "artemis", label: "阿耳忒弥斯", type: "deity" },
          { id: "apollo", label: "阿波罗", type: "deity" },
          { id: "oenopion", label: "俄诺庇翁", type: "character" },
          { id: "merope", label: "墨洛珀", type: "character" },
          { id: "helios", label: "赫利俄斯", type: "deity" },
          { id: "scorpion", label: "蝎子", constellation: "SCO", type: "creature" },
          { id: "gaia", label: "盖亚", type: "deity" }
        ],
        edges: [
          { from: "eos", to: "orion", label: "荷马版本中的爱恋" },
          { from: "artemis", to: "orion", label: "多版本中的射杀或猎伴" },
          { from: "apollo", to: "artemis", label: "误射版本中的设计者" },
          { from: "oenopion", to: "orion", label: "失明版本中的惩罚" },
          { from: "orion", to: "merope", label: "求婚或侵犯，版本不一" },
          { from: "helios", to: "orion", label: "恢复视力" },
          { from: "gaia", to: "scorpion", label: "部分版本中派遣" },
          { from: "scorpion", to: "orion", label: "星变版本中的致死" }
        ]
      },
      comparisons: [
        { label: "死亡原因", traditions: [{ culture: "荷马《奥德赛》", value: "阿耳忒弥斯在俄耳堤癸亚射杀" }, { culture: "星变传统", value: "蝎子因夸口或追逐而攻击" }, { culture: "后世误射版本", value: "阿波罗诱使阿耳忒弥斯远射" }] },
        { label: "俄里翁与阿耳忒弥斯", traditions: [{ culture: "不同文本", value: "杀手、猎伴、亲密者等关系并存" }, { culture: "现代合成故事", value: "常选一种关系并省略其他版本" }] },
        { label: "猎户与天蝎", traditions: [{ culture: "神话", value: "仇敌被置于天空两侧" }, { culture: "天文学", value: "赤经近相对、最佳观测季节约隔半年" }] }
      ],
      sources: [
        { label: "《奥德赛》第五卷", url: "https://www.perseus.tufts.edu/hopper/text?doc=Hom.+Od.+5.121&fromdoc=Perseus%3Atext%3A1999.01.0136", type: "一手文本", note: "厄俄斯爱俄里翁、阿耳忒弥斯射杀的早期版本。" },
        { label: "《奥德赛》第十一卷", url: "https://www.perseus.tufts.edu/hopper/text?doc=Hom.+Od.+11.572&fromdoc=Perseus%3Atext%3A1999.01.0136", type: "一手文本", note: "俄里翁在冥界继续狩猎的描写。" },
        { label: "伪阿波罗多洛斯《书库》", url: "https://www.perseus.tufts.edu/hopper/text?doc=Apollod.+1.4.3&fromdoc=Perseus%3Atext%3A1999.01.0022", type: "一手文本译本", note: "俄诺庇翁、失明与复明故事的重要汇编。" },
        { label: "许癸努斯《天文诗》", url: "https://topostext.org/work/207", type: "一手文本译本", note: "蝎子和其他死亡版本的星座汇编。" },
        { label: "阿拉托斯《物象》", url: "https://www.theoi.com/Text/AratusPhaenomena.html", type: "一手文本译本", note: "猎户座的古代天区描述。" },
        { label: "IAU：Orion and Scorpius", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "现代星座名称与边界参考。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "arabic-star-name-traditions",
      title: "从群星之书到星表：阿拉伯恒星名称怎样传到今天",
      kicker: "翻译、观测、抄写与拉丁化共同塑造的名字",
      category: "星名文化",
      featured: true,
      readingMinutes: 14,
      summary: "Aldebaran、Betelgeuse、Rigel、Vega、Deneb 等现代专名保留了阿拉伯语痕迹，但它们并非出自同一时代或同一种命名法。中世纪伊斯兰天文学家翻译托勒密、校测恒星，也记录阿拉伯本土星名；词语在阿拉伯文、拉丁文和印刷星图之间反复转写，才形成今天的拼法。",
      period: "2世纪希腊星表，经8至15世纪伊斯兰天文学，延续至现代",
      eraTags: ["古典地中海", "中古", "近现代", "跨时代"],
      cultures: ["希腊化天文学", "阿拉伯—伊斯兰天文学", "拉丁欧洲", "现代国际天文学"],
      relatedConstellations: ["ORI", "TAU", "LYR", "CYG", "AQL", "LEO", "UMA", "AND"],
      evidenceNote: "“阿拉伯星名”可指阿拉伯语本土星群名称、托勒密身体部位描述的阿拉伯译法，或经拉丁抄本变形的词。现代拼写和语源应以语言学研究及 IAU 名录为准，不能只按英语外观猜测。",
      sections: [
        {
          id: "translation-and-observation",
          title: "《天文学大成》进入阿拉伯语之后",
          kind: "history",
          paragraphs: [
            "8至9世纪的翻译运动将托勒密《天文学大成》等希腊科学著作译成阿拉伯语。星表中的位置描述，例如“猎户的左足”或“金牛眼部”，被翻译、校订并与实际可见星空核对；这些描述后来常缩短成专名。",
            "伊斯兰天文学不是简单保存希腊文本。观测者修正坐标、讨论星等和岁差，编制新的 zij 星表，并把阿拉伯传统中已有的星群名称与托勒密体系并列。因而同一恒星可能同时拥有图形部位名、本土星群名和计算表中的编号。"
          ],
          evidence: "阿拉伯文手稿、译本谱系和星表可追踪术语；具体译者与版本需按手稿研究确认。"
        },
        {
          id: "al-sufi-fixed-stars",
          title: "苏菲的《恒星之书》：两种视角与两套知识",
          kind: "primary-source",
          paragraphs: [
            "阿卜杜勒-拉赫曼·苏菲约在964年完成《恒星之书》。许多手稿为每个星座绘制两图：从天球外部观看的托勒密式图形，以及从地面仰望时的镜像；文字评议恒星位置、亮度和阿拉伯名称。",
            "苏菲的图并不是现代意义的照片，也不是所有存世抄本都由作者亲绘。后世抄写员改变服饰、姿势、色彩和星点，因此研究时要记录手稿年代与传承，而不能把任一精美图页称为“10世纪原图”。"
          ],
          evidence: "存世《恒星之书》手稿与现代校勘；具体图像须标明馆藏号和抄本年代。"
        },
        {
          id: "names-on-the-move",
          title: "Aldebaran、Betelgeuse 与 Rigel 的词语旅行",
          kind: "etymology",
          paragraphs: [
            "Aldebaran 来自 al-dabarān，意为“跟随者”，描述它在天空中跟随昴星团；Rigel 源自表示“脚”的 rijl，属于猎户图形身体部位；Betelgeuse 通常追溯到 yad al-jawzāʾ，即 al-Jawzāʾ 的手，其首字母在抄写和拉丁化过程中发生了著名变形。",
            "Vega 与“俯冲的鹰”有关，Deneb 则来自表示“尾”的 dhanab，因此多颗恒星历史上都可能带有 Deneb 成分，必须连同所属星座辨识。语源说明的是名称历史，不等于这些星在阿拉伯世界只有一种故事或所有地区发音一致。"
          ],
          evidence: "依据阿拉伯语词源学和手稿传递研究；大众化直译需保留词形与语境说明。"
        },
        {
          id: "iau-standard-names",
          title: "现代 IAU 名录如何处理历史名称",
          kind: "modern-standard",
          paragraphs: [
            "2016年起，IAU 恒星名称工作组逐步建立标准专名目录，目标是让一个专名对应一颗明确恒星，并解决重复拼写、转写和多星系统归属问题。它会吸收多种文化传统，但采用某个标准拼法并不宣称该名字是唯一正确的历史形式。",
            "网站展示最好并列“IAU 标准专名”“阿拉伯文词形与转写”“历史拉丁拼法”“语源可信度”和“其他文化名称”。搜索可以容纳别名，数据层则用 HIP、HD 或 Gaia 等标识符锁定天体，避免名称相似造成误连。"
          ],
          evidence: "IAU WGSN 公告与标准名录；历史语源仍应引用专业语言学研究。"
        }
      ],
      timeline: [
        { date: "约150年", title: "托勒密《天文学大成》", description: "以希腊语记录48星座恒星的位置和图形部位，为后来的阿拉伯译本提供基础。", certainty: "传世科学文本" },
        { date: "8至9世纪", title: "希腊天文学译入阿拉伯语", description: "巴格达等地的译者形成多版《天文学大成》，术语在翻译和校订中稳定。", certainty: "译本与书目证据" },
        { date: "约964年", title: "苏菲《恒星之书》", description: "评议托勒密星表、记录阿拉伯星名和亮度，并形成影响深远的图像传统。", certainty: "有作者的传世著作" },
        { date: "12至13世纪", title: "阿拉伯星表进入拉丁欧洲", description: "翻译和抄写使大量阿拉伯词形进入拉丁天文学，同时产生新的拼写变体。", certainty: "手稿与翻译史" },
        { date: "1603年", title: "拜耳《测天图》", description: "印刷星图把传统专名、拉丁图形和希腊字母标识并置，扩大名称传播。", certainty: "有纪年印刷本" },
        { date: "19至20世纪", title: "语源学整理与误读修正", description: "东方学家和天文学史家利用阿拉伯手稿追踪名称来源，也纠正早期汇编的民间词源。", certainty: "现代学术史" },
        { date: "2016年至今", title: "IAU WGSN 标准化专名", description: "工作组公布可持续更新的官方专名表，为数据库和公众使用消除歧义。", certainty: "现代国际标准" }
      ],
      keyFigures: [
        { name: "克劳狄乌斯·托勒密", lifespan: "约100—约170年", role: "希腊化天文学家", contribution: "其星表和星座部位描述成为阿拉伯译注传统的重要起点。" },
        { name: "伊斯哈格·伊本·侯奈因", lifespan: "约830—910年", role: "翻译家", contribution: "参与《天文学大成》等希腊科学文本的阿拉伯语翻译与校订传统。" },
        { name: "阿卜杜勒-拉赫曼·苏菲", lifespan: "903—986年", role: "波斯天文学家", contribution: "在《恒星之书》中校评托勒密、记录阿拉伯名称并绘制星座。" },
        { name: "约翰·拜耳", lifespan: "1572—1625年", role: "德国星图制作者", contribution: "以印刷星图和希腊字母标记推动传统名称的近代传播。" },
        { name: "保罗·库尼奇", lifespan: "1930—2020年", role: "阿拉伯天文学与星名史学者", contribution: "通过手稿和语言学研究系统厘清大量现代星名的阿拉伯来源。" }
      ],
      quotes: [],
      network: {
        title: "阿拉伯星名的传递链",
        nodes: [
          { id: "greek-catalogue", label: "希腊星表与部位描述", type: "source" },
          { id: "arabic-translation", label: "阿拉伯语翻译", type: "translation" },
          { id: "arab-star-lore", label: "阿拉伯本土星名", type: "tradition" },
          { id: "al-sufi", label: "苏菲《恒星之书》", type: "record" },
          { id: "latin-transmission", label: "拉丁译本与抄本", type: "transmission" },
          { id: "printed-atlases", label: "近代印刷星图", type: "image" },
          { id: "wgsn", label: "IAU WGSN", type: "standard" },
          { id: "aldebaran", label: "Aldebaran", constellation: "TAU", type: "star" },
          { id: "betelgeuse", label: "Betelgeuse", constellation: "ORI", type: "star" },
          { id: "vega", label: "Vega", constellation: "LYR", type: "star" }
        ],
        edges: [
          { from: "greek-catalogue", to: "arabic-translation", label: "翻译与校订" },
          { from: "arab-star-lore", to: "al-sufi", label: "记录与比较" },
          { from: "arabic-translation", to: "al-sufi", label: "星表基础" },
          { from: "al-sufi", to: "latin-transmission", label: "手稿与知识传播" },
          { from: "latin-transmission", to: "printed-atlases", label: "拼写定型与变体" },
          { from: "printed-atlases", to: "wgsn", label: "现代标准化的历史输入" },
          { from: "arab-star-lore", to: "aldebaran", label: "“跟随者”词源" },
          { from: "arabic-translation", to: "betelgeuse", label: "身体部位名的转写" },
          { from: "arab-star-lore", to: "vega", label: "鹰的星群意象" }
        ]
      },
      comparisons: [
        { label: "名称来源", traditions: [{ culture: "托勒密描述", value: "人物或动物图形上的身体部位" }, { culture: "阿拉伯星群", value: "本土星群、动物、方位和季节名称" }, { culture: "现代 IAU", value: "为单颗恒星选定唯一标准专名" }] },
        { label: "拼写", traditions: [{ culture: "历史手稿", value: "阿拉伯文、拉丁文和地方抄写存在多种形式" }, { culture: "现代数据库", value: "标准拼法用于消歧，别名仍可保留" }] },
        { label: "Deneb 类名称", traditions: [{ culture: "阿拉伯语", value: "dhanab 表示“尾”，可用于不同星座的尾星" }, { culture: "现代专名", value: "Deneb 单独标准指天鹅座 α，其他名称需完整区分" }] }
      ],
      sources: [
        { label: "IAU：Naming Stars", url: "https://www.iau.org/public/themes/naming_stars/", type: "现代标准", note: "WGSN 任务、标准专名原则和官方列表入口。" },
        { label: "IAU WGSN：A Review of Recent Activities", url: "https://doi.org/10.3724/SP.J.140-2807.2025.01.16", type: "学术综述", note: "恒星专名标准化的目标、方法与近期工作。" },
        { label: "苏菲《恒星之书》手稿（法国国家图书馆）", url: "https://gallica.bnf.fr/ark:/12148/btv1b8406161s", type: "数字手稿", note: "历史抄本图像；需按馆藏说明核对年代。" },
        { label: "Encyclopaedia Iranica：ʿAbd-al-Raḥmān Ṣūfī", url: "https://iranicaonline.org/articles/abd-al-rahman-sufi", type: "学术百科", note: "苏菲生平、著作和科学背景。" },
        { label: "Kunitzsch & Smart, A Dictionary of Modern Star Names", url: "https://search.worldcat.org/title/61127414", type: "专业工具书", note: "现代恒星专名的语言学来源和历史拼写。" },
        { label: "Ptolemy's Almagest, translated by G. J. Toomer", url: "https://press.princeton.edu/books/paperback/9780691002606/ptolemys-almagest", type: "学术译注", note: "托勒密星表及身体部位描述的校订译本。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "babylon-egypt-polynesia-navigation-skies",
      title: "沿星而行：巴比伦、埃及与波利尼西亚的天空比较",
      kicker: "星表、星钟与无仪器远洋寻路并不是同一种技术",
      category: "跨文明比较",
      featured: true,
      readingMinutes: 15,
      summary: "巴比伦书吏以星表、初见和历月组织天象，古埃及以天狼星、旬星与星钟连接季节、夜间时间和仪式，波利尼西亚航海者则综合星辰出没方位、涌浪、风、云、鸟与岛屿经验横渡海洋。三者都精细观察天空，但用途、证据载体和传承方式差异巨大。",
      period: "约前3千纪末至21世纪传统复兴",
      eraTags: ["古典地中海", "中古", "近现代", "跨时代"],
      cultures: ["美索不达米亚", "古埃及", "波利尼西亚", "密克罗尼西亚航海传统"],
      relatedConstellations: ["ORI", "TAU", "CMA", "UMA", "UMI", "CRU", "CEN", "CAR", "CYG"],
      evidenceNote: "“古代航海星空”不能作为统一标签：现存巴比伦材料主要服务历法、占候和天体计算，埃及旬星材料主要关联夜间计时与宗教环境，并没有与波利尼西亚远洋寻路同等直接的证据。波利尼西亚和密克罗尼西亚也不是单一文化，星罗盘名称与教学法因岛群、语言和师承而异。",
      sections: [
        {
          id: "compare-with-purpose",
          title: "先比较任务，再比较星名",
          kind: "method",
          paragraphs: [
            "相同恒星可以服务完全不同的问题：确定月份、预测祭日、划分夜间时辰、校准建筑方位，或在看不见陆地时保持航向。比较研究若只列“他们都看北极星”之类相似点，会忽略纬度、地平线、季风、文字制度和航行距离。",
            "本专题用四个问题并列材料：观察者要完成什么任务；使用哪一类天体与环境线索；知识怎样记录和传授；现存证据离实际操作有多远。只有在这四项都说明后，才讨论某颗星是否可能承担相似功能。"
          ],
          evidence: "比较框架来自天文学史、考古天文学和民族志方法；不同地区材料不可按同一证据等级处理。"
        },
        {
          id: "mesopotamian-scribal-sky",
          title: "巴比伦：泥板上的星路、初见与历月",
          kind: "mesopotamia",
          paragraphs: [
            "《MUL.APIN》传统把恒星和星群列入恩利尔、阿努与埃亚三条“道路”，记录偕日升落、同时升落、昼夜长度和历法规则。书吏通过长期观测把天象整理为可复制的楔形文字清单，后来又发展出行星现象记录和数学预测。",
            "这些材料显示天空可用于确定年内秩序和方位，但现存泥板并非远洋船员的航海手册。两河流域确有河运和区域航行，却不能仅因星表存在就声称巴比伦人使用一套与太平洋星罗盘相同的导航术。"
          ],
          evidence: "楔形文字泥板、抄本谱系和现代释读；对实际航海应用的推断需要独立航运证据。"
        },
        {
          id: "egyptian-decans-and-time",
          title: "埃及：旬星、天狼星与夜间星钟",
          kind: "egypt",
          paragraphs: [
            "中王国棺盖上的对角星表和新王国墓室中的星钟利用旬星依次出现来划分夜间和年内时段。天狼星的偕日升与埃及季节、尼罗河水情和历法传统密切相关，但具体历法关系会随年代、地点和观测定义变化。",
            "神庙、墓葬和仪式文本还把北天不落星、萨赫与索普德特等天区纳入死后世界和神祇秩序。星光可能帮助地面定向或夜行，但现存星钟首先是计时与宗教材料，不能直接等同于一套船上海图。"
          ],
          evidence: "棺椁、墓室图像、历法文本和建筑测量；恒星与现代星座的对应常有不确定范围。"
        },
        {
          id: "polynesian-wayfinding-system",
          title: "波利尼西亚：星位只是完整寻路系统的一部分",
          kind: "navigation",
          paragraphs: [
            "远洋寻路者记忆恒星和星群从地平线升起、落下的方位，以连续的“星路”维持航向；当某颗引导航星升高或落下后，换用下一颗。太阳、月亮、海浪方向、风、云形、鸟类活动、海水颜色和岛屿造成的涌浪反射共同提供位置线索。",
            "知识通过语言、歌谣、模型和师徒训练传承，各岛群的星罗盘、方位名与航线并不相同。20世纪后期 Hōkūleʻa 的实验航行证明传统无现代仪器寻路可以完成长距离航程，但这是活态知识复兴与严格训练的成果，不是对所有史前航次细节的直接录像式证明。"
          ],
          evidence: "口述传统、民族志、实验航行与考古定居年代相互支持；殖民时期记录需评估记录者和社区授权。"
        }
      ],
      timeline: [
        { date: "约前2100—前1800年", title: "埃及对角星表", description: "中王国棺盖保存旬星序列，用于组织夜间时段和死后仪式空间。", certainty: "有考古语境的器物" },
        { date: "约前13至前11世纪", title: "拉美西斯时期星钟", description: "墓室图表以人体和格网表现不同月份、时刻下的星位。", certainty: "墓室图像与铭文" },
        { date: "约前1000年传统", title: "《MUL.APIN》编纂", description: "现存抄本较晚，但内容形成于前1千纪初，汇集星路、升落和历法规则。", certainty: "抄本与文本重建" },
        { date: "前1千纪", title: "巴比伦系统天象记录发展", description: "书吏持续记录月、行星与异常天象，为数学天文学奠定资料基础。", certainty: "大量楔形文字泥板" },
        { date: "约公元前后至第二千纪初", title: "远洋定居逐步扩展东波利尼西亚", description: "考古、语言和遗传研究显示多阶段航行与定居；各岛群年代仍需分别讨论。", certainty: "跨学科年代范围" },
        { date: "1769年", title: "图帕亚绘制岛屿关系图", description: "塔希提航海家图帕亚与库克航行期间记录广阔岛屿知识，图的读取方式仍有学术讨论。", certainty: "历史图稿与航海记录" },
        { date: "1976年", title: "Hōkūleʻa 首航夏威夷至塔希提", description: "密克罗尼西亚领航者 Mau Piailug 以传统寻路完成航程，推动波利尼西亚航海复兴。", certainty: "现代有记录航行" },
        { date: "2017年", title: "Mālama Honua 环球航行完成", description: "Hōkūleʻa 以传统寻路结合现代安全体系完成全球教育航程。", certainty: "现代有记录航行" }
      ],
      keyFigures: [
        { name: "《MUL.APIN》书吏群", lifespan: "前1千纪", role: "美索不达米亚知识编纂者", contribution: "以楔形文字整理星路、偕日现象、昼夜长度和历法规则。" },
        { name: "古埃及天文与祭司书吏", lifespan: "约前3至前1千纪", role: "星钟和历法知识维护者", contribution: "把旬星、天狼星和北天星象纳入计时、历法与仪式文本。" },
        { name: "图帕亚", lifespan: "约1725—1770年", role: "塔希提航海家与知识传递者", contribution: "向欧洲航行者展示跨岛群地理、航线和方向知识；其图需按波利尼西亚空间观解读。" },
        { name: "Mau Piailug", lifespan: "1932—2010年", role: "萨塔瓦尔传统领航者", contribution: "在1976年引领 Hōkūleʻa 至塔希提，并训练新一代太平洋寻路者。" },
        { name: "Nainoa Thompson", lifespan: "1953—", role: "夏威夷领航者", contribution: "发展并传承适用于夏威夷复兴航行的星罗盘和综合环境寻路训练。" }
      ],
      quotes: [],
      network: {
        title: "三种天空知识系统的任务网络",
        nodes: [
          { id: "horizon", label: "地平线升落方位", type: "observation" },
          { id: "calendar", label: "历月与季节", type: "task" },
          { id: "night-clock", label: "夜间计时", type: "task" },
          { id: "ocean-course", label: "远洋航向", type: "task" },
          { id: "mulapin", label: "《MUL.APIN》星表", type: "record" },
          { id: "decans", label: "埃及旬星", constellation: "ORI", type: "framework" },
          { id: "star-compass", label: "太平洋星罗盘", type: "framework" },
          { id: "sirius", label: "天狼星", constellation: "CMA", type: "star" },
          { id: "environment", label: "涌浪、风、云与鸟", type: "environment" },
          { id: "oral-training", label: "口述与师徒训练", type: "transmission" }
        ],
        edges: [
          { from: "horizon", to: "mulapin", label: "升落记录" },
          { from: "mulapin", to: "calendar", label: "历法规则" },
          { from: "decans", to: "night-clock", label: "依次报时" },
          { from: "sirius", to: "calendar", label: "偕日升季节标志" },
          { from: "horizon", to: "star-compass", label: "方位基准" },
          { from: "star-compass", to: "ocean-course", label: "连续换星保持航向" },
          { from: "environment", to: "ocean-course", label: "全天候交叉校验" },
          { from: "oral-training", to: "star-compass", label: "记忆与实践传承" }
        ]
      },
      comparisons: [
        { label: "核心任务", traditions: [{ culture: "巴比伦", value: "历法、占候、现象记录与预测" }, { culture: "古埃及", value: "夜间计时、季节、仪式和宇宙秩序" }, { culture: "波利尼西亚", value: "远洋航向、航程判断与寻找岛屿" }] },
        { label: "主要载体", traditions: [{ culture: "巴比伦", value: "楔形文字泥板和书吏学校" }, { culture: "古埃及", value: "棺盖、墓室、纸草与神庙文本" }, { culture: "波利尼西亚", value: "口述、歌谣、模型、师徒训练和实航" }] },
        { label: "天空之外", traditions: [{ culture: "巴比伦", value: "历月、祭祀和政治占候记录" }, { culture: "古埃及", value: "尼罗季节、仪式建筑与来世观念" }, { culture: "波利尼西亚", value: "涌浪、风、云、鸟和岛屿生态" }] },
        { label: "“导航”证据", traditions: [{ culture: "巴比伦", value: "星表明确，远洋航海用途不可直接推出" }, { culture: "古埃及", value: "定时定向明确，具体船用方法证据有限" }, { culture: "波利尼西亚", value: "口述、民族志和现代实验航行直接展示综合寻路" }] }
      ],
      sources: [
        { label: "British Museum：MUL.APIN collection search", url: "https://www.britishmuseum.org/collection/search?keyword=MUL.APIN", type: "博物馆典藏", note: "相关楔形文字泥板和馆藏记录入口。" },
        { label: "Cuneiform Digital Library Initiative", url: "https://cdli.mpiwg-berlin.mpg.de/", type: "学术数据库", note: "楔形文字泥板图像、编目和释读研究入口。" },
        { label: "Astronomy and Astrology in Ancient Egypt", url: "https://escholarship.org/uc/item/7t75z9mn", type: "学术百科论文", note: "旬星、星钟、历法与宗教天文学综述。" },
        { label: "The Metropolitan Museum of Art：Astronomy in Ancient Egypt", url: "https://www.metmuseum.org/toah/hd/astr/hd_astr.htm", type: "博物馆学术资源", note: "古埃及星图、历法和器物背景。" },
        { label: "Polynesian Voyaging Society：Polynesian Navigation", url: "https://hokulea.com/education-at-sea/polynesian-navigation/", type: "活态传统教育", note: "星罗盘、环境线索和现代复兴航行说明。" },
        { label: "Te Ara：Canoe navigation", url: "https://teara.govt.nz/en/canoe-navigation", type: "国家百科", note: "毛利与波利尼西亚航海知识、星辰和海洋线索综述。" },
        { label: "Smithsonian Ocean：Wayfinders of the Pacific", url: "https://ocean.si.edu/human-connections/culture-and-history/wayfinders-pacific", type: "博物馆教育", note: "太平洋寻路的多线索系统和文化复兴。" }
      ],
      reviewedAt: "2026-07-11"
    },
    {
      id: "orion-sky-cross-cultural-comparison",
      title: "同一片三星：猎户天区的跨文明比较",
      kicker: "参宿、俄里翁、萨赫、真牧者与 Tautoru 看见的是同一组星吗",
      category: "跨文明比较",
      featured: true,
      readingMinutes: 16,
      summary: "猎户腰带三星和周围亮星醒目、接近天球赤道，因而在许多地区都容易识别；但“容易看见”不意味着各文化把它们画成同一个人物。中国的参宿、希腊的俄里翁、美索不达米亚的“阿努的真牧者”、埃及的萨赫、阿拉伯 al-Jawzāʾ 与毛利 Tautoru 各有不同边界、用途和史料。",
      period: "约前3千纪至当代活态传统",
      eraTags: ["先秦", "秦汉", "古典地中海", "中古", "近现代", "跨时代"],
      cultures: ["中国古代", "古希腊与罗马", "美索不达米亚", "古埃及", "阿拉伯—伊斯兰世界", "毛利与波利尼西亚"],
      relatedConstellations: ["ORI", "TAU", "GEM", "LEP", "CMA", "CMI", "ERI", "SCO"],
      evidenceNote: "各传统的星群边界不等于现代猎户座边界；有些对应只覆盖腰带或亮星，有些扩展到现代金牛、天兔、双子等邻区。埃及萨赫和早期美索不达米亚星群的精确星点对应仍有讨论；毛利知识应尊重不同 iwi 的名称和解释，不宜视为单一固定版本。",
      sections: [
        {
          id: "same-light-different-patterns",
          title: "同样的光点，不同的分组规则",
          kind: "method",
          paragraphs: [
            "猎户腰带三星亮度相近、几乎成直线，参宿四与参宿七又形成醒目的对角，因此这片天区适合做季节标志和记忆图形。它靠近天球赤道，在南北两半球广大地区都能看见，但图形朝向会随纬度和观看方向改变。",
            "比较时应先画出每个传统明确包含的星点，再讨论人物或器物形象。现代猎户座边界是1930年的标准区域，不是所有古代文化共享的天然轮廓；用整幅现代线稿覆盖古名，会制造并不存在的一致性。"
          ],
          evidence: "现代坐标解释共同可见性；历史分组必须依据各传统自己的文本、图像和口述资料。"
        },
        {
          id: "shen-and-orion",
          title: "参宿与俄里翁：军阵季节标志和巨人猎手",
          kind: "comparison",
          paragraphs: [
            "中国参宿属于西方白虎七宿，以参宿三星及周围亮星构成重要识别核心，相关星官还承载军政、斩伐和季节意义。参商相对的传统把它与心宿、大火放在一年相反季节讨论；这些用途并不要求天空中出现一个希腊式全身猎人。",
            "希腊俄里翁是巨人猎手，腰带、肩、足和佩剑被安置在人物身体上，并与猎犬、野兔、金牛和天蝎故事相连。古典作者对其死亡原因并不一致，因此即便在“希腊传统”内部，也没有只有一条神话解释。"
          ],
          evidence: "《史记》与中国星表可确认参宿框架；荷马、阿拉托斯和星变文献提供不同层次的俄里翁证据。"
        },
        {
          id: "sah-and-true-shepherd",
          title: "萨赫与“阿努的真牧者”：古老名称不等于精确边界",
          kind: "ancient-near-east",
          paragraphs: [
            "古埃及金字塔文和后世天文图像把萨赫（Sah）与索普德特、亡者升天和奥西里斯联系。现代研究通常把萨赫放在猎户天区，但它在不同时代究竟包含哪些星点，并不像 IAU 边界那样确定，把“萨赫就是整个 Orion”写成等号会过度简化。",
            "《MUL.APIN》列出通常译作“阿努的真牧者”的星群，学界常与猎户天区对应，并把附近星群放进神路和历法序列。名称、神祇归属、星点对应和后来的希腊猎户并非一条无缝传承链；相似位置可以反映共同观察对象，却不能单独证明故事互相借用。"
          ],
          evidence: "古埃及宗教文本、墓室图像和楔形文字星表；具体恒星识别依赖语言学与考古天文学重建。"
        },
        {
          id: "al-jawza-and-tautoru",
          title: "al-Jawzāʾ 与 Tautoru：名称可以覆盖不同尺度",
          kind: "living-traditions",
          paragraphs: [
            "阿拉伯天文学中的 al-Jawzāʾ 与猎户图形相关，yad al-Jawzāʾ、rijl al-Jawzāʾ 等身体部位名称经拉丁转写成为 Betelgeuse、Rigel 等现代专名的一部分。与此同时，苏菲等作者还记录阿拉伯本土星群，不能把所有阿拉伯名都视为希腊词的直译。",
            "毛利语 Tautoru 常指猎户腰带三星，字面和教学解释强调成列的三颗星；Puanga 常与参宿七 Rigel 对应，并在部分地区成为新年季节标志。不同 iwi 对名称、故事和历法作用可以不同，网站应提供来源社区和方言标签，而不是发布一张“全波利尼西亚标准猎户图”。"
          ],
          evidence: "阿拉伯语手稿与星名语源研究；毛利国家百科、词典、社区教育和口述传统相互参照。"
        }
      ],
      timeline: [
        { date: "约前24至前23世纪", title: "埃及金字塔文中的萨赫", description: "萨赫与亡者升天、索普德特及奥西里斯观念出现于王室宗教文本。", certainty: "有考古语境的铭文，星点范围有讨论" },
        { date: "约前1000年传统", title: "《MUL.APIN》列出真牧者星群", description: "美索不达米亚星表将猎户附近星群纳入阿努之路和年内升落序列。", certainty: "抄本与文本重建" },
        { date: "约前8至前7世纪", title: "荷马史诗中的俄里翁", description: "猎人、黎明女神、阿耳忒弥斯与冥界狩猎已见于古风史诗。", certainty: "传世史诗" },
        { date: "约前433年", title: "二十八宿实物证据", description: "曾侯乙墓漆箱保存参等宿名，表明中国宿系统已形成重要早期形态。", certainty: "考古实物" },
        { date: "约前1世纪", title: "《史记·天官书》系统描述参宿", description: "参、白虎和周边星官进入汉代天官体系的综合记录。", certainty: "传世史书" },
        { date: "约964年", title: "苏菲绘录 al-Jawzāʾ 天区", description: "《恒星之书》比较托勒密星表、阿拉伯名称、亮度和星座图像。", certainty: "有作者的传世著作" },
        { date: "18至20世纪", title: "毛利星名进入书面记录", description: "Tautoru、Puanga 等知识被多位毛利传承者和记录者写下；资料受地区与殖民语境影响。", certainty: "口述、民族志与社区知识" },
        { date: "1930年", title: "现代猎户座边界公布", description: "IAU 坐标边界为全球数据库提供统一 Orion 区域，但不取代历史星群。", certainty: "国际标准" }
      ],
      keyFigures: [
        { name: "俄里翁", lifespan: "传说人物", role: "希腊巨人猎手", contribution: "为古典猎户座人物图形和多版本死亡神话提供核心身份。" },
        { name: "司马迁", lifespan: "约前145—约前86年", role: "中国史官", contribution: "在《天官书》中保存参宿、白虎及其占候语境的系统材料。" },
        { name: "《MUL.APIN》书吏群", lifespan: "前1千纪", role: "美索不达米亚星表编纂者", contribution: "记录“阿努的真牧者”及附近星群的升落和历法关系。" },
        { name: "阿卜杜勒-拉赫曼·苏菲", lifespan: "903—986年", role: "天文学家", contribution: "把托勒密猎户图形、实测评议与阿拉伯名称汇入《恒星之书》。" },
        { name: "毛利知识传承者", lifespan: "跨世代", role: "iwi 与航海、历法知识持有者", contribution: "保存 Tautoru、Puanga 等地区性名称和季节知识；应按具体社区署名。" }
      ],
      quotes: [],
      network: {
        title: "猎户天区的多种文化分组",
        nodes: [
          { id: "belt", label: "腰带三星", constellation: "ORI", type: "stars" },
          { id: "orion", label: "俄里翁", constellation: "ORI", type: "greek-tradition" },
          { id: "shen", label: "参宿", constellation: "ORI", type: "chinese-tradition" },
          { id: "sah", label: "萨赫 Sah", constellation: "ORI", type: "egyptian-tradition" },
          { id: "true-shepherd", label: "阿努的真牧者", constellation: "ORI", type: "mesopotamian-tradition" },
          { id: "al-jawza", label: "al-Jawzāʾ", constellation: "ORI", type: "arabic-tradition" },
          { id: "tautoru", label: "Tautoru", constellation: "ORI", type: "maori-tradition" },
          { id: "puanga", label: "Puanga / Rigel", constellation: "ORI", type: "star" },
          { id: "scorpius", label: "天蝎 / 心宿天区", constellation: "SCO", type: "seasonal-counterpart" },
          { id: "modern-boundary", label: "IAU 猎户座边界", constellation: "ORI", type: "standard" }
        ],
        edges: [
          { from: "belt", to: "orion", label: "人物腰带" },
          { from: "belt", to: "shen", label: "参宿识别核心" },
          { from: "belt", to: "tautoru", label: "名称直接聚焦三星" },
          { from: "puanga", to: "tautoru", label: "同一天区的季节标志" },
          { from: "orion", to: "scorpius", label: "希腊仇敌与季节相对" },
          { from: "shen", to: "scorpius", label: "参商季节相对" },
          { from: "al-jawza", to: "orion", label: "图形与翻译传统交叠" },
          { from: "sah", to: "belt", label: "常见天区对应，边界未定" },
          { from: "true-shepherd", to: "belt", label: "常见天区对应" },
          { from: "modern-boundary", to: "belt", label: "现代坐标容纳" }
        ]
      },
      comparisons: [
        { label: "核心图形", traditions: [{ culture: "希腊", value: "有肩、腰带、足与武器的猎人全身" }, { culture: "中国", value: "参宿三星及周边星官，属于白虎七宿" }, { culture: "毛利", value: "Tautoru 常聚焦成列三星，Puanga 另作亮星标志" }] },
        { label: "主要角色", traditions: [{ culture: "美索不达米亚", value: "阿努的真牧者，位于星路与历法序列" }, { culture: "古埃及", value: "萨赫与奥西里斯、亡者升天相关" }, { culture: "阿拉伯", value: "al-Jawzāʾ 图形与本土星名、托勒密译注并存" }] },
        { label: "季节关系", traditions: [{ culture: "中国参商", value: "参宿与心宿分居冬夏夜空" }, { culture: "希腊猎户—蝎子", value: "一个升起时另一个趋向落下的星变解释" }, { culture: "毛利", value: "Puanga、Tautoru 的季节意义依地区历法而异" }] },
        { label: "证据形态", traditions: [{ culture: "古埃及与美索不达米亚", value: "铭文、墓室图像和泥板，星点重建有不确定性" }, { culture: "希腊与中国", value: "传世文本、星表和图像可交叉校勘" }, { culture: "毛利与波利尼西亚", value: "活态口述、社区知识与历史记录，须尊重来源群体" }] }
      ],
      sources: [
        { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "参宿及中国天官体系的汉代综合叙述。" },
        { label: "《奥德赛》第五、十一卷", url: "https://www.perseus.tufts.edu/hopper/text?doc=Hom.+Od.+5.121&fromdoc=Perseus%3Atext%3A1999.01.0136", type: "一手文本", note: "俄里翁作为猎人与死亡人物的早期希腊材料。" },
        { label: "British Museum：MUL.APIN collection search", url: "https://www.britishmuseum.org/collection/search?keyword=MUL.APIN", type: "博物馆典藏", note: "真牧者及美索不达米亚星表相关泥板入口。" },
        { label: "Astronomy and Astrology in Ancient Egypt", url: "https://escholarship.org/uc/item/7t75z9mn", type: "学术百科论文", note: "萨赫、索普德特、旬星与埃及天文学材料综述。" },
        { label: "苏菲《恒星之书》手稿", url: "https://gallica.bnf.fr/ark:/12148/btv1b8406161s", type: "数字手稿", note: "猎户图形、阿拉伯名称与手稿图像传统。" },
        { label: "Te Ara：Matariki and Māori astronomy", url: "https://teara.govt.nz/en/matariki-maori-new-year", type: "国家百科", note: "Tautoru、Puanga 与毛利季节星空的地区性背景。" },
        { label: "Te Aka Māori Dictionary：Tautoru", url: "https://maoridictionary.co.nz/search?keywords=Tautoru", type: "语言与文化词典", note: "名称词义和用例入口；具体故事仍按 iwi 来源核对。" },
        { label: "IAU：Orion", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "现代猎户座名称和边界，用于坐标对照。" }
      ],
      reviewedAt: "2026-07-11"
    }
  );
})();
