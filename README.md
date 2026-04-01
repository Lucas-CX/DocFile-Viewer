# DocFile Viewer

English | [简体中文](README-CN.md) | [繁體中文](README-TW.md)

A VS Code extension for previewing and editing common document formats directly in the editor. Built as a community fork of [Office Viewer](https://github.com/cweijan/vscode-office) (MIT License) with additional bug fixes and improvements.

## Supported Formats

| Category | Extensions |
|---|---|
| Spreadsheet | `.xls` `.xlsx` `.xlsm` `.csv` `.ods` |
| Document | `.docx` `.dotx` |
| PDF | `.pdf` |
| Image | `.jpg` `.png` `.gif` `.webp` `.bmp` `.ico` `.tif` `.svg` |
| Font | `.ttf` `.otf` `.woff` `.woff2` |
| Markdown | `.md` `.markdown` |
| Archive | `.zip` `.jar` `.vsix` `.rar` `.apk` |
| Web | `.html` `.htm` `.http` |
| Other | `.reg` `.class` (Java decompiler) |

## What's Different from Office Viewer

This fork includes the following fixes and improvements:

- Editable Excel and CSV files with save support
- RAR archive viewing support
- REST Client compatibility fixes
- Improved ZIP viewer with better encoding support
- Mermaid diagram export in Markdown
- Various stability and UI improvements

## Markdown Editor

This extension provides a WYSIWYG Markdown editor powered by [Vditor](https://github.com/Vanessa219/vditor).

To use the built-in VS Code editor instead, add this to your `settings.json`:

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

### Keyboard Shortcuts

Based on [Vditor shortcuts](shortcut.md), plus:

- Move list up: `Ctrl Alt I` / `⌘ ^ I`
- Move list down: `Ctrl Alt J` / `⌘ ^ J`
- Edit in VS Code: `Ctrl Alt E` / `⌘ ^ E`

### Tips

- Resize the editor with Ctrl/Cmd + mouse scroll
- Open hyperlinks with Ctrl/Meta + click or double-click
- Right-click to export Markdown as PDF, DOCX, or HTML

## HTML Live Preview

Press `Ctrl+Shift+V` while editing an HTML file to open a live preview.

## Acknowledgments

This project is a fork of [Office Viewer](https://github.com/cweijan/vscode-office) by **Weijan Chen**, licensed under the [MIT License](LICENSE).

### Open-Source Libraries

- PDF: [mozilla/pdf.js](https://github.com/mozilla/pdf.js/)
- DOCX: [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX: [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs) + [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet)
- HTTP: [Huachao/vscode-restclient](https://github.com/Huachao/vscode-restclient)
- Markdown: [Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- Icons: [PKief/vscode-material-icon-theme](https://github.com/PKief/vscode-material-icon-theme)

## License

[MIT](LICENSE) — Copyright (c) 2020 Weijan Chen, 2025 Lucas-CX
