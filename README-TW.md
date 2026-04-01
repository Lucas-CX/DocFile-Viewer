# DocFile Viewer

[English](README.md) | [简体中文](README-CN.md) | 繁體中文

一個 VS Code 擴充功能，用於在編輯器中直接預覽和編輯常見的文件格式。本專案是 [Office Viewer](https://github.com/cweijan/vscode-office)（MIT 授權條款）的社群 fork 版本，包含額外的 bug 修復和功能改進。

## 支援的格式

| 類別 | 副檔名 |
|---|---|
| 試算表 | `.xls` `.xlsx` `.xlsm` `.csv` `.ods` |
| 文件 | `.docx` `.dotx` |
| PDF | `.pdf` |
| 圖片 | `.jpg` `.png` `.gif` `.webp` `.bmp` `.ico` `.tif` `.svg` |
| 字型 | `.ttf` `.otf` `.woff` `.woff2` |
| Markdown | `.md` `.markdown` |
| 壓縮檔案 | `.zip` `.jar` `.vsix` `.rar` `.apk` |
| 網頁 | `.html` `.htm` `.http` |
| 其他 | `.reg` `.class`（Java 反編譯） |

## 與 Office Viewer 的差異

本 fork 版本包含以下修復和改進：

- 支援編輯和儲存 Excel 及 CSV 檔案
- 新增 RAR 壓縮檔案檢視支援
- 修復 REST Client 相容性問題
- 改進 ZIP 檢視器的編碼支援
- 支援 Markdown 中 Mermaid 圖表的匯出
- 多項穩定性和介面改進

## Markdown 編輯器

本擴充功能提供基於 [Vditor](https://github.com/Vanessa219/vditor) 的所見即所得 Markdown 編輯器。

如需使用 VS Code 內建編輯器，請在 `settings.json` 中加入：

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

### 快捷鍵

基於 [Vditor 快捷鍵](shortcut.md)，另外支援：

- 將清單上移一行：`Ctrl Alt I` / `⌘ ^ I`
- 將清單下移一行：`Ctrl Alt J` / `⌘ ^ J`
- 在 VS Code 中編輯：`Ctrl Alt E` / `⌘ ^ E`

### 提示

- 透過 Ctrl/Cmd + 滑鼠滾輪縮放編輯器
- 透過 Ctrl/Meta + 點擊或雙擊開啟超連結
- 右鍵選單可將 Markdown 匯出為 PDF、DOCX 或 HTML（PDF 匯出依賴 Chromium，可透過 `vscode-office.chromiumPath` 設定瀏覽器路徑）

## HTML 即時預覽

編輯 HTML 檔案時按 `Ctrl+Shift+V` 可開啟即時預覽。

## 致謝

本專案 fork 自 **Weijan Chen** 的 [Office Viewer](https://github.com/cweijan/vscode-office)，基於 [MIT 授權條款](LICENSE) 開源。

### 開源程式庫

- PDF：[mozilla/pdf.js](https://github.com/mozilla/pdf.js/)
- DOCX：[VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX：[SheetJS/sheetjs](https://github.com/SheetJS/sheetjs) + [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)
- HTTP：[Huachao/vscode-restclient](https://github.com/Huachao/vscode-restclient)
- Markdown：[Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- 圖示：[PKief/vscode-material-icon-theme](https://github.com/PKief/vscode-material-icon-theme)

## 授權條款

[MIT](LICENSE) — Copyright (c) 2020 Weijan Chen, 2025 Lucas-CX
