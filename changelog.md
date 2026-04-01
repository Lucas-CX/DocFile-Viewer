# Change Log

> This project is forked from [Office Viewer](https://github.com/cweijan/vscode-office) by **Weijan Chen** (MIT License).
> Versions prior to 4.0.0 are inherited from the original project. This fork focuses on bug fixes and feature improvements.

# 4.1.0 2026-4-1

- Rename all command IDs, configuration properties, and custom editor view types from `vscode-office.*` / `office.*` / `cweijan.*` to `docfile.*`, resolving conflicts with the original Office Viewer extension when both are installed.
- Fix `Ctrl+V` paste hijacking non-editor contexts (e.g. Cursor AI chat panel). Tighten the keybinding `when` clause to only trigger inside a real file-based Markdown editor.
- Add safety guard in `loadClipboardImage()` — image paste-to-disk now only runs when the active editor is an on-disk Markdown file; all other contexts fall back to the default paste action.
- Fix stale command reference in the Markdown editor context menu (`office.markdown.paste` → `docfile.markdown.paste`).

# 4.0.0 2026-4-1

- Renamed extension to **DocFile Viewer**.
- New extension icon and branding.
- Migrated repository to [Lucas-CX/DocFile-Viewer](https://github.com/Lucas-CX/DocFile-Viewer).
- Rewritten README with clear attribution to the original project.
- Fix mermaid rendering by bundling mermaid v10 locally — preload mermaid 10.9.5 from the local extension path so Vditor skips the outdated CDN version (8.8.0).
- Replace `rm -rf` with cross-platform `rimraf` in the build script.
- Update package details and change publisher to nanmu.
