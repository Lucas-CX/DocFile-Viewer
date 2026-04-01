# DocFile Viewer

[English](README.md) | 简体中文 | [繁體中文](README-TW.md)

一个 VS Code 扩展，用于在编辑器中直接预览和编辑常见的文档格式。本项目是 [Office Viewer](https://github.com/cweijan/vscode-office)（MIT 许可证）的社区 fork 版本，包含额外的 bug 修复和功能改进。

## 支持的格式

| 类别 | 扩展名 |
|---|---|
| 电子表格 | `.xls` `.xlsx` `.xlsm` `.csv` `.ods` |
| 文档 | `.docx` `.dotx` |
| PDF | `.pdf` |
| 图片 | `.jpg` `.png` `.gif` `.webp` `.bmp` `.ico` `.tif` `.svg` |
| 字体 | `.ttf` `.otf` `.woff` `.woff2` |
| Markdown | `.md` `.markdown` |
| 压缩文件 | `.zip` `.jar` `.vsix` `.rar` `.apk` |
| 网页 | `.html` `.htm` `.http` |
| 其他 | `.reg` `.class`（Java 反编译） |

## 与 Office Viewer 的区别

本 fork 版本包含以下修复和改进：

- 支持编辑和保存 Excel 及 CSV 文件
- 新增 RAR 压缩文件查看支持
- 修复 REST Client 兼容性问题
- 改进 ZIP 查看器的编码支持
- 支持 Markdown 中 Mermaid 图表的导出
- 多项稳定性和界面改进

## Markdown 编辑器

本扩展提供基于 [Vditor](https://github.com/Vanessa219/vditor) 的所见即所得 Markdown 编辑器。

如需使用 VS Code 内置编辑器，请在 `settings.json` 中添加：

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

### 快捷键

基于 [Vditor 快捷键](shortcut.md)，另外支持：

- 将列表上移一行：`Ctrl Alt I` / `⌘ ^ I`
- 将列表下移一行：`Ctrl Alt J` / `⌘ ^ J`
- 在 VS Code 中编辑：`Ctrl Alt E` / `⌘ ^ E`

### 提示

- 通过 Ctrl/Cmd + 鼠标滚轮缩放编辑器
- 通过 Ctrl/Meta + 点击或双击打开超链接
- 右键菜单可将 Markdown 导出为 PDF、DOCX 或 HTML（PDF 导出依赖 Chromium，可通过 `vscode-office.chromiumPath` 配置浏览器路径）

## HTML 实时预览

编辑 HTML 文件时按 `Ctrl+Shift+V` 可打开实时预览。

## 致谢

本项目 fork 自 **Weijan Chen** 的 [Office Viewer](https://github.com/cweijan/vscode-office)，基于 [MIT 许可证](LICENSE) 开源。

### 开源库

- PDF：[mozilla/pdf.js](https://github.com/mozilla/pdf.js/)
- DOCX：[VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX：[SheetJS/sheetjs](https://github.com/SheetJS/sheetjs) + [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)
- HTTP：[Huachao/vscode-restclient](https://github.com/Huachao/vscode-restclient)
- Markdown：[Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- 图标：[PKief/vscode-material-icon-theme](https://github.com/PKief/vscode-material-icon-theme)

## 许可证

[MIT](LICENSE) — Copyright (c) 2020 Weijan Chen, 2025 Lucas-CX
