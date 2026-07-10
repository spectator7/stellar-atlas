# 天象志 · Stellar Atlas

一部可探索的中文星空图鉴。项目用原生 HTML、CSS 与 JavaScript 构建，不需要后端或构建工具，可直接部署到 GitHub Pages。

## 内容

- 沉浸式动态星空与七幅代表星座图
- 星座连线、主要亮星、季节与方向筛选
- 中国传统星官和希腊神话的双重叙事
- 北纬 30°–45° 地区的四季入门观测线索
- 本地收藏、分享链接与响应式移动端布局
- 键盘焦点、减少动态效果偏好等无障碍支持

## 本地预览

直接打开 `index.html` 即可浏览。为了获得与 GitHub Pages 更接近的效果，也可以在项目目录运行：

```bash
python -m http.server 4173
```

然后访问 `http://localhost:4173`。

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

星座数据、故事文本与四季观测内容都位于 `app.js`。颜色、字号和响应式布局集中在 `styles.css` 的变量与媒体查询中。

## Roadmap

后续内容扩充、专业星图、观测助手和完整 88 星座图鉴的建设计划见 [ROADMAP.md](ROADMAP.md)。

## 说明

页面中的星座图用于入门识别，主要恒星位置经过视觉归一化，不用于精密天文定位。中国传统星官与现代国际天文学联合会的星座边界不是一一对应关系，项目在相关故事中保留了这一区别。

## License

[MIT](LICENSE)
