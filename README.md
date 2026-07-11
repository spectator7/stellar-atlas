# 天象志 · Stellar Atlas

一部可探索的中文星空图鉴。项目覆盖 88 个现代星座，以真实赤经赤纬数据绘制可连续浏览的天球星图，并收录亮星、深空天体、观测路线和跨文化故事。项目用原生 HTML、CSS 与 JavaScript 构建，不需要后端或构建工具，可直接部署到 GitHub Pages。

## 内容

- 可缩放、可拖动的连续天球星图与 88 个现代星座
- 赤经赤纬网格、星座连线、边界、星名和深空天体图层
- 按极限星等、南北半球与季节筛选星图内容
- 依据视星等与 B−V 色指数表现恒星亮度、大小和颜色
- 点击恒星查看 Hipparcos 编号、坐标、星等、颜色与所属星座
- 中国传统星官与西方神话、命名史的双重叙事
- 12 篇独立星空专题，含时间线、人物、原典短引、关系图与资料来源
- 按城市、经纬度、日期、时间和时区生成当地地平星图
- 月相、黑暗窗口、行星位置、月度天象与可分享观测清单
- 可选天气查询与可手动修正的 Bortle 光污染等级
- 每个星座的完整档案、观测路线与资料来源
- 北纬 30°–45° 地区的四季入门观测线索
- 本地收藏、分享链接与响应式移动端布局
- 键盘焦点、减少动态效果偏好等无障碍支持

## 探索星图

- 在星图上拖动即可连续浏览相邻天区；使用鼠标滚轮、触摸板或双指手势缩放。
- 使用星图角落的缩放、复位和聚焦控件快速调整视野。选择一个星座后，聚焦控件会把它带到视野中心。
- 通过工具栏开关赤经赤纬网格、星名、星座连线、星座边界和深空天体；极限星等滑块决定显示到多暗的恒星。
- 半球筛选可查看北天、赤道附近或南天区域，季节筛选会突出适合该季节查找的星座。
- 点击恒星可打开资料面板。面板同时给出 J2000 坐标和基于 Astronomy Engine 计算的日期坐标；半球与季节筛选用于浏览整理，不等同于指定地点、日期和时间的地平线可见性计算。

## 本地预览

直接打开 `index.html` 即可浏览。为了获得与 GitHub Pages 更接近的效果，也可以在项目目录运行：

```bash
python -m http.server 4173
```

然后访问 `http://localhost:4173`。

检查 88 星座数据完整性：

```bash
node scripts/validate-content.mjs
node scripts/validate-sky-data.mjs
node scripts/validate-story-topics.mjs
node scripts/validate-observing-data.mjs
node scripts/smoke-runtime.mjs
```

## 发布到 GitHub Pages

将项目推送到 GitHub 的 `main` 分支后：

1. 打开仓库的 `Settings` → `Pages`。
2. 在 `Build and deployment` 中将来源设为 `Deploy from a branch`。
3. 选择 `main` 分支与 `/ (root)` 目录并保存，等待首次部署完成。
4. 页面地址通常为 `https://<你的用户名>.github.io/<仓库名>/`。

首次创建仓库时可使用：

```bash
git init -b main
git add .
git commit -m "Build interactive constellation atlas"
git remote add origin https://github.com/<你的用户名>/stellar-atlas.git
git push -u origin main
```

这种发布方式不需要额外的 GitHub Actions 工作流权限，适合本项目的纯静态结构。

## 自定义

页面状态与四季观测概览位于 `app.js`，连续星图的投影、绘制和交互位于 `sky-map.js`，今晚观测助手位于 `observing.js`，专题阅读器位于 `story-library.js`。颜色、字号和响应式布局集中在 `styles.css` 的变量与媒体查询中。

88 星座内容位于 `data/constellations.js`，连续星图使用的恒星、边界、连线和深空天体数据位于 `data/sky-atlas.js`。观测地点、光污染和流星雨资料位于 `data/observing-data.js`，故事专题位于 `data/story-topics.js` 与 `data/story-topics-extra.js`。浏览器端依赖存放在 `assets/vendor/`，第三方天文数据来源与许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## Roadmap

后续内容扩充、专业星图、观测助手和完整 88 星座图鉴的建设计划见 [ROADMAP.md](ROADMAP.md)。

## 说明

连续星图采用 J2000 赤经赤纬数据，适合星座辨认和天区浏览，但不用于精密测量、望远镜自动指向或航海定位。地平星图中的星座升落以星座中心代表位置近似，不能代替完整边界或当地无遮挡地平线。设备定位只在用户主动点击后调用；天气查询默认关闭，启用时会向 Open-Meteo 发送约两位小数的坐标和海拔。中国传统星官与现代国际天文学联合会的星座边界不是一一对应关系，项目在相关故事中保留了这一区别。

## License

[MIT](LICENSE)
