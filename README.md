# 9Router Guide — Next.js starter

一个面向 9Router 用户的独立教程与故障排查站点原型。采用 Next.js App Router + TypeScript，默认静态导出，适合部署到 Cloudflare Pages 静态站点。

## 当前包含

- 首页：价值说明、常见问题入口、热门指南、故障排查入口
- 指南列表：安装、Cursor、Claude Code、Docker 等内容入口
- 故障排查文章：Windows 连接失败诊断流程，可交互选择客户端、错误现象并显示下一步
- 集成教程：Cursor、Claude Code
- 对比页：9Router vs OpenRouter（中立的比较框架，发布前请核对事实）
- About：独立第三方声明与反馈渠道占位
- 法律页面：Privacy Policy、Terms of Use、Disclaimer，并已加入页脚和 sitemap
- SEO 基础：metadata、canonical、robots.txt、sitemap.xml、JSON-LD
- 复制命令按钮、移动端导航、搜索筛选（前端示例）

## 本地运行

建议 Node.js 20.19+。

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 构建静态文件

```bash
npm run build
```

静态产物会生成在 `out/` 目录。部署到 Cloudflare Pages 时，Build command 填 `npm run build`，Build output directory 填 `out`。如需使用 Workers/OpenNext 动态功能，应另行调整部署方案；本项目目前刻意保持静态化。

## 上线前必须替换

1. 在 `src/lib/site.ts` 设置正式域名。默认是 `https://9router-guide.example`，请勿原样上线。
2. 核对官方文档中的当前版本、端口、接口路径与每个命令。
3. 检查对比文章，不要将未经验证的差异写成确定结论。
4. 配置真实且有人维护的联系渠道，并同步更新 About、Privacy Policy 和 Terms 页面中的联系说明。
5. 根据实际部署检查隐私政策：若启用统计、Cookie、广告、联系表单或第三方嵌入内容，需要准确更新披露内容，并在适用法律要求时配置同意机制。
6. 加入自己制作的截图和实际测试结果。示例内容不是官方支持承诺。
7. 品牌/商标：本站为独立第三方指南，不隶属于 9Router 项目。不要使用官方 Logo 造成混淆；域名也应避免让用户误以为官方站点。

## 内容维护建议

- 每篇故障排查文档注明最后验证日期、适用系统/客户端和官方参考链接。
- 命令要先在对应环境实测再发布。
- 日志上传前提醒用户删除 API key、Authorization header、邮箱、IP 和其他敏感信息。

## 法律页面上线前检查

- `src/lib/site.ts` 的 `url` 必须替换为实际正式域名，否则 canonical、Open Graph 和 sitemap 会使用占位域名。
- 隐私政策是通用起始模板，不构成法律意见；请根据真实的数据处理方式、托管商设置和适用法律审核。
- 本项目默认没有账号、支付或联系表单，也未集成独立分析工具；如后来添加任何追踪或第三方服务，应及时更新政策。
- 在 Privacy Policy 页面上线前，添加可用的联系渠道，便于用户提出隐私相关请求。
