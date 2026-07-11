/*
 * Editorial story collection for Stellar Atlas.
 *
 * These topics distinguish documented evidence, later interpretation and legend.
 * Constellation references use official IAU three-letter abbreviations so the
 * stories can link directly to the interactive atlas.
 */
window.STORY_TOPICS = [
  {
    id: "three-enclosures-twenty-eight-mansions",
    title: "三垣二十八宿：另一种组织天空的方法",
    kicker: "中国传统星空的总体骨架",
    category: "中国星空",
    featured: true,
    readingMinutes: 12,
    summary: "三垣围绕北天中枢，二十八宿沿月亮和日月五星运行的天区铺开；它们共同构成中国传统天文学最重要的定位框架。这个系统不是把现代十二黄道星座换成中文名称，而是以星官、距星、宿度和政治空间为基本单位。",
    period: "战国至清代，核心材料约前5世纪至17世纪",
    eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "跨时代"],
    cultures: ["中国古代"],
    relatedConstellations: ["UMI", "DRA", "CEP", "CAS", "VIR", "COM", "LEO", "OPH", "SER", "SCO", "SGR", "ORI"],
    evidenceNote: "二十八宿的早期实物证据较明确；三垣的范围、星官成员和距星则随时代与星表发生过调整。现代 IAU 星座边界不应反向套用到古代星图。",
    sections: [
      {
        id: "two-layer-framework",
        title: "中央与环带：两层互补的天区",
        kind: "overview",
        paragraphs: [
          "三垣是紫微垣、太微垣和天市垣。紫微垣围绕北天极附近展开，太微垣大致位于今天的狮子座、室女座和后发座一带，天市垣则横跨蛇夫座、巨蛇座与武仙座附近。三垣不是三幅封闭且永远不变的现代星座，而是由垣墙和内部许多星官共同组成的大片天区。",
          "二十八宿沿天球赤道和黄道附近依次排列，用来标记月亮、太阳和行星的运动位置。每宿以一颗距星作为量度起点，相邻距星之间的赤经差形成宿度。它既是认星系统，也是历法、占候和位置测量的工具。"
        ],
        evidence: "《史记·天官书》《汉书·天文志》等传世文献与曾侯乙墓漆箱、唐宋星图可以相互参照，但不同材料不完全同制。"
      },
      {
        id: "four-symbols-list",
        title: "四象之下的二十八宿",
        kind: "reference",
        paragraphs: [
          "东方苍龙七宿为角、亢、氐、房、心、尾、箕；北方玄武七宿为斗、牛、女、虚、危、室、壁；西方白虎七宿为奎、娄、胃、昴、毕、觜、参；南方朱雀七宿为井、鬼、柳、星、张、翼、轸。四象是对七宿组合的整体想象，不意味着每一颗星都固定画成动物身体的一部分。",
          "二十八宿与十二次、十二辰、州国分野等系统能够互相配合，却不是同一套划分。研究具体时代时，需要先说明所依据的星表、距星和历法，不能把后世定型的表格当作所有朝代都完全相同。"
        ],
        evidence: "宿名的早期形态可见于战国实物；四象图像、方位配色和星数在后世文献与墓室图像中逐渐丰富。"
      },
      {
        id: "how-it-was-used",
        title: "从报时到测量：宿不是装饰图案",
        kind: "method",
        paragraphs: [
          "古人可以记录月亮进入某宿、行星守犯某星官，或以昏旦中星判断季节。到了需要更精细量化时，宿度成为赤道坐标的一部分。它所回答的首先是天体位于哪个基准区间，而非故事角色像什么。",
          "岁差会使春分点和恒星坐标的关系缓慢改变，仪器、观测地点和历元也会影响测值。历代重新测定距星与宿度，正说明传统体系具有计算和校正的一面，而不是一套静止不动的象征表。"
        ],
        evidence: "历代星表、浑仪记录与历书显示宿度被用于实际位置表达；具体精度应按文献年代分别评价。"
      },
      {
        id: "reading-boundaries",
        title: "阅读古星图时的三个边界",
        kind: "historiography",
        paragraphs: [
          "第一，不把一宿等同于一个现代星座：宿区可能横跨多个 IAU 星座。第二，不把星官等同于单颗恒星：同名星官往往由多星组成。第三，不把天文记录自动视为现代意义的物理解释：观测、历法、政治象征与占候在古代制度中常同时存在。",
          "数字化展示最好保留多套图层：现代星座边界、中国星官连线、历代距星和原始文献出处。只有让这些图层并置，读者才看得见传统之间真实的对应与错位。"
        ],
        evidence: "这是现代比较研究的方法说明，不是古人使用的术语。"
      }
    ],
    timeline: [
      { date: "约前433年", title: "曾侯乙墓漆箱", description: "漆箱盖面环列二十八宿名称，是目前讨论二十八宿早期形态时最重要的有纪年实物之一。", certainty: "考古实物" },
      { date: "前2至前1世纪", title: "《史记·天官书》成书", description: "系统叙述中宫、二十八舍及其他星官，把天象、地理和政治秩序并置。", certainty: "传世文献" },
      { date: "约3世纪", title: "陈卓综合三家星", description: "后世记载陈卓汇合石氏、甘氏、巫咸三家星官，形成影响隋唐星图的目录传统。", certainty: "后世文献追述" },
      { date: "7世纪中后期", title: "敦煌星图绘成", description: "S.3326 以分段图和北极区图呈现一千余颗恒星，并以颜色区分三家传统。", certainty: "写本与纸张年代研究" },
      { date: "1092年", title: "《新仪象法要》", description: "苏颂主持的仪器专著收入多幅星图，展示北宋星官体系与赤道分区。", certainty: "有纪年刊本传统" },
      { date: "1247年", title: "苏州石刻天文图", description: "把星图、赤道黄道结构和说明文字刻于石碑，保存南宋国家天文知识的公开表达。", certainty: "有纪年石刻" },
      { date: "17世纪", title: "中西测算并置", description: "徐光启、李天经及来华耶稣会士参与历法修订，传统星官名称与新的测量、南天星区逐步结合。", certainty: "官修历书与星图" }
    ],
    keyFigures: [
      { name: "司马迁", lifespan: "约前145—约前86年", role: "史官与《天官书》作者", contribution: "保存汉代以前星官、天象与政治地理关系的重要综合叙述。" },
      { name: "陈卓", lifespan: "3世纪", role: "天文学家", contribution: "据后世史志汇合石氏、甘氏、巫咸三家星，为隋唐以后星图奠定目录基础。" },
      { name: "一行", lifespan: "683—727年", role: "僧人与天文学家", contribution: "参与唐代大规模测量和历法工作，使宿度与实测问题进入新的阶段。" },
      { name: "苏颂", lifespan: "1020—1101年", role: "北宋官员与科学著述主持者", contribution: "主持水运仪象台并编成《新仪象法要》，留下重要星图。" },
      { name: "徐光启", lifespan: "1562—1633年", role: "明代科学家与历法改革者", contribution: "主持崇祯历书工作，推动传统星官框架与欧洲天文学测量结合。" }
    ],
    quotes: [
      { text: "日中星鸟，以殷仲春。", attribution: "《尚书·尧典》", work: "尧典", date: "成篇年代有争议", note: "以昏中星配合季节的经典表述；不能据此断定整套二十八宿已经定型。", sourceUrl: "https://ctext.org/shang-shu/canon-of-yao/zhs" },
      { text: "斗为帝车，运于中央，临制四乡。", attribution: "司马迁", work: "《史记·天官书》", date: "约前1世纪", note: "短引为公版古籍原文。", sourceUrl: "https://ctext.org/shi-ji/tian-guan-shu/zhs" }
    ],
    network: {
      title: "三垣与四象关系",
      nodes: [
        { id: "ziwei", label: "紫微垣", constellation: "UMI", type: "enclosure" },
        { id: "taiwei", label: "太微垣", constellation: "VIR", type: "enclosure" },
        { id: "tianshi", label: "天市垣", constellation: "OPH", type: "enclosure" },
        { id: "azure-dragon", label: "东方苍龙七宿", constellation: "SCO", type: "symbol" },
        { id: "black-tortoise", label: "北方玄武七宿", constellation: "SGR", type: "symbol" },
        { id: "white-tiger", label: "西方白虎七宿", constellation: "ORI", type: "symbol" },
        { id: "vermilion-bird", label: "南方朱雀七宿", constellation: "GEM", type: "symbol" },
        { id: "equatorial-belt", label: "二十八宿环带", type: "framework" }
      ],
      edges: [
        { from: "equatorial-belt", to: "azure-dragon", label: "包含七宿" },
        { from: "equatorial-belt", to: "black-tortoise", label: "包含七宿" },
        { from: "equatorial-belt", to: "white-tiger", label: "包含七宿" },
        { from: "equatorial-belt", to: "vermilion-bird", label: "包含七宿" },
        { from: "ziwei", to: "equatorial-belt", label: "中央天区与环带互补" },
        { from: "taiwei", to: "equatorial-belt", label: "中央天区与环带互补" },
        { from: "tianshi", to: "equatorial-belt", label: "中央天区与环带互补" }
      ]
    },
    comparisons: [
      { label: "基本单元", traditions: [{ culture: "中国传统", value: "星官、宿与距星" }, { culture: "现代 IAU", value: "88 个有严格边界的星座区域" }] },
      { label: "主要用途", traditions: [{ culture: "中国传统", value: "位置量度、历法、占候与国家礼制" }, { culture: "现代 IAU", value: "全球统一的天区命名与目标定位" }] },
      { label: "边界性质", traditions: [{ culture: "中国传统", value: "成员和宿度会随星表、时代调整" }, { culture: "现代 IAU", value: "1930 年公布的赤经赤纬边界" }] }
    ],
    sources: [
      { label: "《尚书·尧典》", url: "https://ctext.org/shang-shu/canon-of-yao/zhs", type: "一手史料", note: "早期中星与季节材料。" },
      { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "汉代星官体系核心文本。" },
      { label: "《汉书·天文志》", url: "https://ctext.org/han-shu/tian-wen-zhi/zhs", type: "一手史料", note: "星官、天象与制度记录。" },
      { label: "The Dunhuang Chinese Sky: A Comprehensive Study of the Oldest Known Star Atlas", url: "https://arxiv.org/abs/0906.3034", type: "学术论文", note: "敦煌星图年代、投影与星数研究。" },
      { label: "IAU：The Constellations", url: "https://www.iau.org/public/themes/constellations/", type: "现代标准", note: "用于说明现代 88 星座与边界。" }
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "chinese-asterism-bureaucracy",
    title: "天上有官署：中国古代星官制度",
    kicker: "星名背后的国家、市场与日常生活",
    category: "中国星空",
    featured: true,
    readingMinutes: 11,
    summary: "中国古代的星官规模不一：有的是一颗主星，有的是城墙、道路、官署、军队或器物构成的多星组合。它们把可见天空编成一套能识别、记录和解释变化的词汇，同时也投射出不同时代的政治制度与社会想象。",
    period: "战国至明清，目录传统约前4世纪至17世纪",
    eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "跨时代"],
    cultures: ["中国古代"],
    relatedConstellations: ["UMI", "UMA", "DRA", "CEP", "CAS", "VIR", "LEO", "OPH", "HER", "AQL", "ORI", "SCO"],
    evidenceNote: "石氏、甘氏与巫咸的原书多已散佚，今天对“三家星”的理解依赖史志、类书和星图的后世保存。星官的星数与对应恒星在不同版本中可能不一致。",
    sections: [
      {
        id: "what-is-an-asterism",
        title: "星官不等于星座",
        kind: "overview",
        paragraphs: [
          "星官是传统星空中的命名单元。一官可由一星或多星组成，彼此之间还有垣墙、道路、座席和隶属关系。现代星座则是国际天文学联合会规定的全天分区；同一星官经常跨越两个或更多现代星座。",
          "例如紫微垣内部有北极、四辅、勾陈、天皇大帝、尚书、女史等星官，外围以左右垣墙构成宫城意象。星官名称告诉读者古人怎样组织天空，却不能单独证明某颗星在所有朝代都承担完全相同的象征。"
        ],
        evidence: "历代星表与星图可确认星官作为目录单元；社会含义还需结合史书、礼制和占书语境。"
      },
      {
        id: "three-schools",
        title: "三家星与目录的合流",
        kind: "history",
        paragraphs: [
          "传统文献把早期星家概括为石氏、甘氏和巫咸三家，并用黑、赤、白等颜色在部分后世星图中区分其归属。相关著作大多不以原貌存世，因此不能把今天整理出的星名表直接当作战国原书。",
          "约3世纪的陈卓被后世认为汇合三家，形成二百八十三官、一千四百六十四星的目录。这个数字成为隋唐以后常被引用的标准，但抄写、实测和增星持续发生，实际图本并非毫无差别。"
        ],
        evidence: "《晋书·天文志》《隋书·天文志》《开元占经》及敦煌星图是追索三家传统的主要材料。"
      },
      {
        id: "celestial-state",
        title: "宫廷、市场、军阵与农事",
        kind: "interpretation",
        paragraphs: [
          "北极附近的星官常使用帝座、宫门、辅臣与禁卫词汇；太微垣侧重朝廷礼仪和官位；天市垣容纳市楼、车肆、屠肆与度量衡。二十八宿周围又分布军井、天田、库楼、弧矢、天仓等大量生产和军事意象。",
          "这幅“天上国家”不是一次设计完成的静态蓝图。新制度、新地域知识和南天观测会进入星表，旧名也可能被重新解释。专题展示应把名称的制度含义与恒星坐标分开呈现，避免把象征叙事误作天文学的唯一内容。"
        ],
        evidence: "星名和占辞反映制度语汇，但从名称推断社会史时需要文本年代与版本证据。"
      },
      {
        id: "records-and-office",
        title: "谁来观天：国家机构与连续记录",
        kind: "institution",
        paragraphs: [
          "太史、司天台、钦天监等机构的名称和职掌历代不同，核心工作包括编历、守时、观测日月五星、记录异常天象并为礼仪提供日期。观测员需要共享稳定的星官词汇，才能说明客星“见于何官”或彗星“经何宿”。",
          "古代记录的价值来自连续文本与相对位置描述，现代研究仍需核对历法换算、抄本异文、天气和作者目的。把“客星”直接等同于某个现代超新星遗迹，必须依靠位置、日期与多学科证据，而不能只凭一个星官名称。"
        ],
        evidence: "制度史可由正史职官志与历志交叉核对；现代天体对应属于进一步的科学解释。"
      }
    ],
    timeline: [
      { date: "战国时期", title: "甘、石等星家传统", description: "后世书目和史志保存其声名与部分内容，但原书面貌及具体作者问题仍有争议。", certainty: "后世追述" },
      { date: "约3世纪", title: "陈卓合三家星", description: "综合早期目录，成为隋唐星官体系的重要来源。", certainty: "史志记载" },
      { date: "729年", title: "《开元占经》编成", description: "瞿昙悉达主持汇集大量早期天文与占候文献，为校勘失传材料提供线索。", certainty: "官修类书" },
      { date: "7世纪中后期", title: "敦煌星图以颜色标家法", description: "星点用不同颜色表现传统归属，直观展示目录合流后的层次。", certainty: "写本实物" },
      { date: "11世纪", title: "北宋星图与仪器", description: "苏颂等人的著作把星官目录、赤道位置和机械仪器结合。", certainty: "传世著作" },
      { date: "17至18世纪", title: "钦天监星表重测", description: "欧洲测量方法与新增南天星区进入官修星图，同时保留大量传统星官名称。", certainty: "官修星表" }
    ],
    keyFigures: [
      { name: "甘德", lifespan: "约前4世纪，传统年代", role: "战国星家", contribution: "后世归于甘氏的天文材料构成三家星传统之一；原著散佚，生平须谨慎表述。" },
      { name: "石申", lifespan: "约前4世纪，传统年代", role: "战国星家", contribution: "后世归于石氏的星表与占测传统影响深远；现存文本多为辑佚。" },
      { name: "陈卓", lifespan: "3世纪", role: "吴晋间天文学家", contribution: "被认为统一三家星官目录，为后代星图提供框架。" },
      { name: "瞿昙悉达", lifespan: "8世纪", role: "唐代天文学家", contribution: "主持《开元占经》，保存大量早期星占与历算引文。" },
      { name: "苏颂", lifespan: "1020—1101年", role: "北宋仪器与星图工程主持者", contribution: "以《新仪象法要》记录仪象台结构及多幅星图。" }
    ],
    quotes: [
      { text: "天有五星，地有五行。", attribution: "司马迁", work: "《史记·天官书》", date: "约前1世纪", note: "展示古代文本将天象与地上秩序并论的语言方式，不代表现代自然科学分类。", sourceUrl: "https://ctext.org/shi-ji/tian-guan-shu/zhs" },
      { text: "中宫天极星，其一明者，太一常居也。", attribution: "司马迁", work: "《史记·天官书》", date: "约前1世纪", note: "公版古籍短引；不同注本对具体星的对应有讨论。", sourceUrl: "https://ctext.org/shi-ji/tian-guan-shu/zhs" }
    ],
    network: {
      title: "星官制度的知识链",
      nodes: [
        { id: "observers", label: "观测官员", type: "institution" },
        { id: "catalogues", label: "星表与星图", type: "record" },
        { id: "asterisms", label: "星官", type: "framework" },
        { id: "calendar", label: "历法与守时", type: "practice" },
        { id: "omens", label: "天象占候", type: "practice" },
        { id: "ziwei-palace", label: "紫微垣宫城意象", constellation: "UMI", type: "example" },
        { id: "tianshi-market", label: "天市垣市场意象", constellation: "OPH", type: "example" },
        { id: "military", label: "军阵与器物星官", constellation: "ORI", type: "example" }
      ],
      edges: [
        { from: "observers", to: "catalogues", label: "记录与校测" },
        { from: "catalogues", to: "asterisms", label: "规定成员与位置" },
        { from: "asterisms", to: "calendar", label: "提供位置语言" },
        { from: "asterisms", to: "omens", label: "提供解释单位" },
        { from: "asterisms", to: "ziwei-palace", label: "制度投影" },
        { from: "asterisms", to: "tianshi-market", label: "社会投影" },
        { from: "asterisms", to: "military", label: "军事与生产投影" }
      ]
    },
    comparisons: [
      { label: "命名单元", traditions: [{ culture: "中国星官", value: "一星或多星组成、规模不一" }, { culture: "希腊—IAU 星座", value: "古代人物图形，现代成为全天有界区域" }] },
      { label: "知识载体", traditions: [{ culture: "中国星官", value: "官修星表、历志、占书与仪器" }, { culture: "欧洲近代星图", value: "印刷图谱、坐标网与学会标准" }] }
    ],
    sources: [
      { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "星官与天象叙述。" },
      { label: "《晋书·天文志》", url: "https://ctext.org/wiki.pl?if=gb&chapter=160605", type: "一手史料", note: "三家星和陈卓传统的重要史志来源。" },
      { label: "《隋书·天文志》", url: "https://ctext.org/wiki.pl?if=gb&res=976285", type: "一手史料", note: "隋以前星官、仪器与学术源流。" },
      { label: "The Dunhuang Chinese Sky", url: "https://arxiv.org/abs/0906.3034", type: "学术论文", note: "三家着色、星数和投影分析。" },
      { label: "Chinese Ancient Star Map（International Dunhuang Programme）", url: "https://idp.bl.uk/", type: "数字典藏", note: "敦煌写本及相关研究入口。" }
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "cowherd-weaver-girl",
    title: "银河两岸：牛郎织女故事如何长成",
    kicker: "从《诗经》星名到七夕传说",
    category: "中国故事",
    featured: true,
    readingMinutes: 10,
    summary: "牵牛与织女最早见于古典诗歌时，已经可以承担人间劳作的比喻，却尚未完整讲述一年一会的爱情。汉以后诗歌、岁时习俗和民间叙事不断叠加，才逐渐形成今天熟悉的牛郎、织女、银河与鹊桥。",
    period: "西周晚期至近现代，文本线索约前8世纪起",
    eraTags: ["先秦", "秦汉", "中古", "宋元", "明清", "近现代", "跨时代"],
    cultures: ["中国古代", "东亚七夕传统"],
    relatedConstellations: ["AQL", "LYR", "CYG", "CAP"],
    evidenceNote: "应区分《诗经》中的牵牛星官、传统河鼓星官与现代俗称“牛郎星”的河鼓二。爱情情节和鹊桥细节并非在最早文本中一次出现。",
    sections: [
      {
        id: "earliest-poem",
        title: "《大东》：会织却不成章，会牵却不服箱",
        kind: "evidence",
        paragraphs: [
          "《诗经·小雅·大东》写织女终日移动却织不出布帛，牵牛明亮却不能拉车。星名被用来反衬地上劳作与不公平，但诗中没有牛郎被贬、天河阻隔或七夕鹊桥的完整情节。",
          "这组早期诗句说明牵牛、织女的名称和劳作联想已经成立，也提醒我们：看见两个角色，不等于后来故事的所有部分都已经存在。"
        ],
        evidence: "传世《诗经》文本；篇章年代只能给出大致范围。"
      },
      {
        id: "love-across-river",
        title: "汉代诗歌让银河成为离别",
        kind: "literature",
        paragraphs: [
          "《古诗十九首》中的《迢迢牵牛星》把牵牛、河汉女写成盈盈一水间却脉脉不得语的两人。星空从劳作讽喻转为强烈的离别图景，对后世爱情叙事影响极大。",
          "汉魏六朝文献又把七月七日、乞巧和相会传闻连接起来。不同地区、不同文类保留的情节并不相同，鹊桥、婚姻、孩子和王母阻隔等要素有各自的传播史。"
        ],
        evidence: "诗歌可确认意象的变化；民俗起源不能只由后世故事倒推。"
      },
      {
        id: "stars-not-one-to-one",
        title: "河鼓二为何成了“牛郎星”",
        kind: "astronomy",
        paragraphs: [
          "今天通常把天鹰座河鼓二 Altair 称为牛郎星，把天琴座织女一 Vega 称为织女星，两者隔着银河，天津四 Deneb 与它们组成醒目的“夏季大三角”。河鼓三星两侧较暗的星也常被民间解释成扁担上的孩子。",
          "严格按传统星官，牵牛位于牛宿，主要落在现代摩羯座；Altair 属于河鼓星官。因此专题地图应同时标出“牵牛”“河鼓”和现代俗称，避免把不同时代的名称压成唯一对应。"
        ],
        evidence: "星官对应可用传统星表与现代坐标核对；人物解释属于民俗叙事。"
      },
      {
        id: "qixi-living-tradition",
        title: "七夕不只有爱情",
        kind: "reception",
        paragraphs: [
          "传统七夕的重要活动包括妇女乞巧、穿针、陈设瓜果和观察蛛网等，各地做法差异很大。把七夕单纯称为“古代情人节”，会遮蔽技艺、家庭、女性生活与地方节俗。",
          "现代影视、绘本与城市灯光活动继续改写故事。可靠的数字专题可以把原典、历代图像、地方民俗和现代改编分层，让“流传”本身成为可阅读的历史。"
        ],
        evidence: "民俗材料需注明采集地区与年代，不宜用单一版本代表整个中国或东亚。"
      }
    ],
    timeline: [
      { date: "约前8至前6世纪", title: "《诗经·大东》", description: "牵牛与织女作为星名和劳作比喻出现，尚无完整鹊桥爱情故事。", certainty: "传世诗篇，年代约数" },
      { date: "汉代", title: "星空意象转向离别", description: "汉代相关文献与画像材料增加，牵牛织女逐步人格化。", certainty: "多类材料" },
      { date: "约1至2世纪", title: "《迢迢牵牛星》", description: "以河汉阻隔和无言凝望塑造经典爱情意象；确切作者不详。", certainty: "作品年代约数" },
      { date: "6世纪", title: "岁时文献记录七夕", description: "《荆楚岁时记》等保存乞巧与七月七日习俗，显示节俗已形成丰富层次。", certainty: "传世岁时文献" },
      { date: "唐宋以后", title: "鹊桥叙事广泛传播", description: "诗词、笔记、节令活动与民间故事不断组合今天熟悉的情节。", certainty: "渐进传播" },
      { date: "20至21世纪", title: "七夕的现代再定义", description: "教育、商业与大众文化强化爱情主题，同时地方乞巧传统得到重新整理。", certainty: "现代文化史" }
    ],
    keyFigures: [
      { name: "《大东》无名作者", lifespan: "先秦", role: "《诗经》诗人", contribution: "留下牵牛、织女劳作比喻的早期文本证据。" },
      { name: "《古诗十九首》无名作者", lifespan: "汉代", role: "文人诗传统", contribution: "把银河两岸写成可感的离别与凝望。" },
      { name: "宗懔", lifespan: "约501—565年", role: "《荆楚岁时记》作者", contribution: "记录南朝荆楚地区岁时活动，为七夕民俗史提供重要材料。" },
      { name: "杜牧", lifespan: "803—852年", role: "唐代诗人", contribution: "《秋夕》等作品强化七夕、天阶与牵牛织女的文学想象。" }
    ],
    quotes: [
      { text: "跂彼织女，终日七襄。", attribution: "《诗经·小雅·大东》", work: "大东", date: "先秦", note: "公版古籍短引；下文强调“不成报章”。", sourceUrl: "https://ctext.org/book-of-poetry/xiao-ya-da-dong/zhs" },
      { text: "迢迢牵牛星，皎皎河汉女。", attribution: "无名氏", work: "《古诗十九首·迢迢牵牛星》", date: "汉代", note: "公版古诗短引。", sourceUrl: "https://zh.wikisource.org/zh-hans/%E8%BF%A2%E8%BF%A2%E7%89%BD%E7%89%9B%E6%98%9F" },
      { text: "天阶夜色凉如水，卧看牵牛织女星。", attribution: "杜牧", work: "《秋夕》", date: "9世纪", note: "公版唐诗短引。", sourceUrl: "https://zh.wikisource.org/zh-hans/%E7%A7%8B%E5%A4%95_(%E6%9D%9C%E7%89%A7)" }
    ],
    network: {
      title: "名称、星官与传说角色",
      nodes: [
        { id: "altair", label: "河鼓二 Altair", constellation: "AQL", type: "star" },
        { id: "vega", label: "织女一 Vega", constellation: "LYR", type: "star" },
        { id: "deneb", label: "天津四 Deneb", constellation: "CYG", type: "star" },
        { id: "qianniu", label: "传统牵牛星官", constellation: "CAP", type: "asterism" },
        { id: "milky-way", label: "银河 / 河汉", type: "sky-feature" },
        { id: "cowherd", label: "牛郎", type: "legend" },
        { id: "weaver", label: "织女", type: "legend" },
        { id: "magpie-bridge", label: "鹊桥", type: "later-legend" }
      ],
      edges: [
        { from: "altair", to: "cowherd", label: "现代常见对应" },
        { from: "qianniu", to: "cowherd", label: "古星名来源之一" },
        { from: "vega", to: "weaver", label: "传统与现代对应" },
        { from: "cowherd", to: "milky-way", label: "传说中隔于一岸" },
        { from: "weaver", to: "milky-way", label: "传说中隔于一岸" },
        { from: "magpie-bridge", to: "cowherd", label: "后世相会媒介" },
        { from: "magpie-bridge", to: "weaver", label: "后世相会媒介" },
        { from: "altair", to: "vega", label: "夏季大三角两端" },
        { from: "deneb", to: "altair", label: "夏季大三角" },
        { from: "deneb", to: "vega", label: "夏季大三角" }
      ]
    },
    comparisons: [
      { label: "牵牛的指代", traditions: [{ culture: "古代星官", value: "牛宿中的牵牛，主要位于现代摩羯座" }, { culture: "现代民间", value: "多指天鹰座河鼓二 Altair" }] },
      { label: "七夕主题", traditions: [{ culture: "早期诗歌", value: "劳作讽喻与银河离别" }, { culture: "传统节俗", value: "乞巧、家庭与地方仪式" }, { culture: "现代传播", value: "爱情节日与大众文化" }] }
    ],
    sources: [
      { label: "《诗经·小雅·大东》", url: "https://ctext.org/book-of-poetry/xiao-ya-da-dong/zhs", type: "一手史料", note: "牵牛织女早期诗歌文本。" },
      { label: "《古诗十九首·迢迢牵牛星》", url: "https://zh.wikisource.org/zh-hans/%E8%BF%A2%E8%BF%A2%E7%89%BD%E7%89%9B%E6%98%9F", type: "一手史料", note: "汉代银河离别意象。" },
      { label: "《荆楚岁时记》", url: "https://zh.wikisource.org/zh-hans/%E8%8D%8A%E6%A5%9A%E6%AD%B2%E6%99%82%E8%A8%98", type: "一手史料", note: "南朝岁时习俗记录。" },
      { label: "IAU：Named Stars", url: "https://www.iau.org/public/themes/naming_stars/", type: "现代标准", note: "核对 Vega、Altair、Deneb 的标准专名。" },
      { label: "香港太空馆：中国星官资料", url: "https://www.lcsd.gov.hk/CE/Museum/Space/en_US/web/spm/starshine/resources/chinese-asterisms.html", type: "公共天文教育", note: "传统星官与现代恒星对应参考。" }
    ],
    reviewedAt: "2026-07-11"
  },
  {
    id: "shen-and-shang",
    title: "参商为何不相见",
    kicker: "猎户与心宿之间的季节距离",
    category: "中国故事",
    featured: true,
    readingMinutes: 9,
    summary: "“参商”后来成为亲友分离、难以相见的经典比喻。它连接了《左传》中实沈与阏伯的冲突、参宿与大火的季节位置，以及杜甫把天文距离写成人生聚散的名句。",
    period: "春秋叙事至唐代诗歌，约前6世纪至8世纪",
    eraTags: ["先秦", "秦汉", "中古"],
    cultures: ["中国古代"],
    relatedConstellations: ["ORI", "SCO"],
    evidenceNote: "参通常指猎户座腰带附近的参宿；“商星”常与辰星、大火及心宿联系，但古注存在层次。两片天区接近天球相对方向，适合做季节比喻，却不宜绝对表述为在地球任何地点永远不能同时出现在地平线上。",
    sections: [
      {
        id: "zuo-tradition",
        title: "实沈与阏伯：先有冲突叙事",
        kind: "legend",
        paragraphs: [
          "《左传》昭公元年叙述高辛氏二子阏伯、实沈互不相容，长期争斗，后来分别被迁往商丘和大夏，主管辰与参。该段借古代族群、地域与祭祀传统解释星神来源，并不是现代意义的恒星形成故事。",
          "后世把辰、商星、大火和心宿联系起来，再与实沈所主的参宿相对，逐渐凝练成“参商不相见”的说法。不同注家对地名、族属和星名有细部解释，专题应保留这些差异。"
        ],
        evidence: "《左传》为主要传世依据；故事设定的年代早于文本编定年代。"
      },
      {
        id: "sky-geometry",
        title: "一冬一夏的两组亮星",
        kind: "astronomy",
        paragraphs: [
          "参宿的标志是猎户座腰带三星及周边亮星，北半球冬夜最醒目。大火常指心宿二 Antares 所在的心宿区域，是北半球夏季南方天空的红色标志。二者赤经大约相差十一小时，接近分居天球两侧。",
          "当一个在傍晚升到适合观测的位置，另一个通常已接近太阳方向或地平线，因此形成强烈的季节轮替感。不过“绝不同时可见”是文学化概括；纬度、日期、暮光和地平高度都会改变短暂共现的可能。"
        ],
        evidence: "现代坐标可量化两区间隔；文学命题不应被误作严格几何定理。"
      },
      {
        id: "du-fu",
        title: "杜甫把星距写成人生",
        kind: "literature",
        paragraphs: [
          "759年前后，杜甫在《赠卫八处士》中写久别重逢。开头“人生不相见，动如参与商”不是复述完整神话，而是借两宿分处冬夏天空，压缩战乱时代朋友难聚的经验。",
          "此后“参商”成为汉语中高度稳定的离别典故。理解它既要知道天上两区的位置，也要知道诗歌并不追求逐分逐秒的观测报告。"
        ],
        evidence: "诗歌文本明确；作年与会面背景依据杜甫行迹研究，细节可有不同考证。"
      },
      {
        id: "observe-both",
        title: "用一年完成一次对照观测",
        kind: "observation",
        paragraphs: [
          "冬季先记录猎户座腰带三星与参宿四的方位和时间；约半年后在相同钟点观察天蝎座心宿二。把两次星图叠加，能直观看到恒星日与地球公转如何改变季节星空。",
          "若尝试捕捉一落一升的极低空共现，应事先计算当地纬度、日期与暮光，并选择开阔地平线。这种挑战反而能说明典故和严格可见性之间的差别。"
        ],
        evidence: "现代观测活动设计。"
      }
    ],
    timeline: [
      { date: "前541年（叙事年代）", title: "《左传》昭公元年事件", description: "文本借阏伯、实沈解释商与参的祭祀及地域传统。", certainty: "后世编定的历史叙事" },
      { date: "约前5至前4世纪", title: "《左传》成书层累", description: "现代研究通常认为文本经历编纂，不能把叙事年代等同于成书年代。", certainty: "学术约数" },
      { date: "汉晋时期", title: "注释传统连接辰、大火与商星", description: "史志和注家逐步固定参商对应及其不相见解释。", certainty: "文献传统" },
      { date: "759年前后", title: "《赠卫八处士》", description: "杜甫以参与商比喻乱世人生的久别难逢。", certainty: "作品系年约数" },
      { date: "后世", title: "“参商”成为离别成语", description: "诗词、戏曲和书信不断引用，神话背景常被压缩成两字典故。", certainty: "接受史" }
    ],
    keyFigures: [
      { name: "阏伯", lifespan: "传说人物", role: "商族与火正传统中的星神人物", contribution: "《左传》称其迁于商丘、主辰，后与商星和大火解释相连。" },
      { name: "实沈", lifespan: "传说人物", role: "参宿祭祀传统中的人物", contribution: "《左传》称其迁于大夏、主参。" },
      { name: "杜预", lifespan: "222—285年", role: "《左传》注家", contribution: "其注释是后世理解参、商、辰与地域关系的重要环节。" },
      { name: "杜甫", lifespan: "712—770年", role: "唐代诗人", contribution: "以“参与商”把星宿轮替转化为久别重逢的文学典故。" }
    ],
    quotes: [
      { text: "居于旷林，不相能也，日寻干戈。", attribution: "《左传》", work: "昭公元年", date: "叙事年代前541年", note: "公版古籍短引，描述阏伯与实沈的冲突。", sourceUrl: "https://ctext.org/chun-qiu-zuo-zhuan/zhao-gong-yuan-nian/zhs" },
      { text: "人生不相见，动如参与商。", attribution: "杜甫", work: "《赠卫八处士》", date: "约759年", note: "公版唐诗短引。", sourceUrl: "https://zh.wikisource.org/zh-hans/%E8%B4%88%E5%8D%AB%E5%85%AB%E5%A4%84%E5%A3%AB" }
    ],
    network: {
      title: "人物、星宿与诗歌典故",
      nodes: [
        { id: "shichen", label: "实沈", type: "legend" },
        { id: "ebo", label: "阏伯", type: "legend" },
        { id: "shen", label: "参宿", constellation: "ORI", type: "asterism" },
        { id: "shang", label: "商星 / 大火", constellation: "SCO", type: "asterism" },
        { id: "antares", label: "心宿二 Antares", constellation: "SCO", type: "star" },
        { id: "orion-belt", label: "猎户腰带三星", constellation: "ORI", type: "stars" },
        { id: "dufu-poem", label: "《赠卫八处士》", type: "literature" }
      ],
      edges: [
        { from: "shichen", to: "shen", label: "传说中主参" },
        { from: "ebo", to: "shang", label: "传说中主辰 / 商" },
        { from: "shen", to: "orion-belt", label: "现代识别核心" },
        { from: "shang", to: "antares", label: "常见恒星对应" },
        { from: "shen", to: "shang", label: "接近天球相对方向" },
        { from: "dufu-poem", to: "shen", label: "借作离别比喻" },
        { from: "dufu-poem", to: "shang", label: "借作离别比喻" }
      ]
    },
    comparisons: [
      { label: "最醒目季节", traditions: [{ culture: "参宿 / 猎户", value: "北半球冬季夜空" }, { culture: "商星 / 心宿", value: "北半球夏季夜空" }] },
      { label: "“不相见”的含义", traditions: [{ culture: "文学", value: "长久分离、难以相逢" }, { culture: "天文学", value: "赤经近相对，最佳观测季节相隔约半年，并非所有地点绝对零共现" }] }
    ],
    sources: [
      { label: "《春秋左传·昭公元年》", url: "https://ctext.org/chun-qiu-zuo-zhuan/zhao-gong-yuan-nian/zhs", type: "一手史料", note: "阏伯、实沈与参辰叙事。" },
      { label: "《史记·天官书》", url: "https://ctext.org/shi-ji/tian-guan-shu/zhs", type: "一手史料", note: "参、心及其他星官的汉代系统描述。" },
      { label: "杜甫《赠卫八处士》", url: "https://zh.wikisource.org/zh-hans/%E8%B4%88%E5%8D%AB%E5%85%AB%E5%A4%84%E5%A3%AB", type: "一手史料", note: "“参与商”典故的经典诗歌用例。" },
      { label: "IAU：Orion", url: "https://www.iau.org/public/themes/constellations/#ori", type: "现代标准", note: "现代猎户座范围参考。" },
      { label: "SIMBAD：Antares", url: "https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Antares", type: "天文数据库", note: "心宿二现代坐标与恒星资料。" }
    ],
    reviewedAt: "2026-07-11"
  },
  /* STORY_TOPICS_INSERT */
];
