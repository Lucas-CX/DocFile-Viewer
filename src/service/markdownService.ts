import { adjustImgPath } from "@/common/fileUtil";
import { Output } from "@/common/Output";
import { spawn } from 'child_process';
import chromeFinder from 'chrome-finder';
import { fileTypeFromFile } from 'file-type';
import { copyFileSync, lstatSync, renameSync } from 'fs';
import { homedir } from 'os';
import path, { extname, join } from 'path';
import * as vscode from 'vscode';
import { Holder } from './markdown/holder';
import { convertMd } from "./markdown/markdown-pdf";
import { Global } from "@/common/global";
import { createMarkdownImageText, ensureImageParentDir, resolveMarkdownImageTarget } from "./markdown/pasteImageUtil";

export type ExportType = 'pdf' | 'html' | 'docx';

interface ExportOption {
    type?: ExportType;
    withoutOutline?: boolean;
}

export class MarkdownService {

    constructor(private context: vscode.ExtensionContext) {
    }

    /**
     * export markdown to another type
     * @param type pdf, html, docx 
     */
    public async exportMarkdown(uri: vscode.Uri, option: ExportOption = {}) {
        const { type = 'pdf' } = option;
        try {
            if (type != 'html') { // html导出速度快, 无需等待
                vscode.window.showInformationMessage(`Starting export markdown to ${type}.`)
            }
            await convertMd({ markdownFilePath: uri.fsPath, config: this.getConfig(option) })
            vscode.window.showInformationMessage(`Export markdown to ${type} success!`)
        } catch (error) {
            Output.log(error)
        }
    }

    public getConfig(option: ExportOption) {
        const top = Global.getConfig("pdfMarginTop")
        const { type = 'pdf', withoutOutline = false } = option;
        return {
            type,
            "styles": [],
            withoutOutline,
            // chromium path
            "executablePath": this.getChromiumPath(),
            // Set `true` to convert `\n` in paragraphs into `<br>`.
            "breaks": false,
            // pdf print option
            "printBackground": true,
            format: "A4",
            margin: { top }
        };
    }

    private paths: string[] = [
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files (x86)\\Microsoft\\Edge Beta\\Application\\msedge.exe",
        "C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe",
        join(homedir(), "AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe"),
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
        "/usr/bin/microsoft-edge",
    ]

    private getChromiumPath() {
        const chromiumPath = Global.getConfig<string>("chromiumPath")
        const paths = [chromiumPath, ...this.paths]
        for (const path of paths) {
            if (existsSync(path)) {
                console.debug(`using chromium path is ${path}`)
                return path;
            }
        }
        try {
            const chromePath = chromeFinder();
            console.debug(`using chrome path is ${chromePath}`)
            return chromePath;
        } catch (e) {
            const msg = "Not chromium found, export fail.";
            vscode.window.showErrorMessage(msg)
            throw new Error(msg)
        }
    }

    public async loadClipboardImage() {
        const editor = vscode.window.activeTextEditor;
        const document = this.getMarkdownDocument(editor?.document ?? Holder.activeDocument);
        if (!document) {
            this.logPaste('command', 'no markdown document available, fallback to default paste');
            vscode.commands.executeCommand("editor.action.clipboardPasteAction")
            return
        }
        if (document.isUntitled || document.isClosed) {
            this.logPaste('command', `skip paste for invalid document ${document.uri.fsPath}`);
            return
        }
        const markdown = await this.createMarkdownImageFromClipboard(document, 'command');
        if (!markdown) {
            this.logPaste('command', 'clipboard does not contain image content, fallback to default paste');
            vscode.commands.executeCommand("editor.action.clipboardPasteAction")
            return
        }
        if (editor?.document.uri.toString() === document.uri.toString()) {
            await editor.edit(edit => {
                const current = editor.selection;
                if (current.isEmpty) {
                    edit.insert(current.start, markdown);
                } else {
                    edit.replace(current, markdown);
                }
            });
            this.logPaste('command', `inserted markdown image into active editor ${document.uri.fsPath}`);
            return;
        }
        await this.insertMarkdownIntoDocument(document, markdown);
        this.logPaste('command', `inserted markdown image via workspace edit ${document.uri.fsPath}`);
    }

    public async createMarkdownImageFromClipboard(document: vscode.TextDocument, source = 'unknown') {
        const markdownDocument = this.getMarkdownDocument(document);
        if (!markdownDocument) {
            this.logPaste(source, 'skip clipboard image creation because document is not file markdown');
            return;
        }
        const { relPath, fullPath } = adjustImgPath(markdownDocument.uri);
        const target = resolveMarkdownImageTarget(markdownDocument.uri, relPath, fullPath);
        ensureImageParentDir(target.imagePath);
        this.logPaste(source, `resolved image target`, `doc=${markdownDocument.uri.fsPath}; rel=${target.relPath}; abs=${target.imagePath}`);
        const savedImagePath = await this.readClipboardImageToPath(target.imagePath);
        if (!savedImagePath || savedImagePath === 'no image') {
            this.logPaste(source, 'clipboard image read returned no image');
            return;
        }
        this.copyFromPath(savedImagePath, target.imagePath);
        const adjustedRelPath = await MarkdownService.imgExtGuide(target.imagePath, target.relPath);
        const markdown = createMarkdownImageText(target.imageName, adjustedRelPath);
        this.logPaste(source, `created markdown image`, `markdown=${markdown}`);
        return markdown;
    }

    public static async imgExtGuide(absPath: string, relPath: string) {
        const oldExt = extname(absPath)
        const { ext = "png" } = (await fileTypeFromFile(absPath)) ?? {};
        if (oldExt != `.${ext}`) {
            relPath = relPath.replace(oldExt, `.${ext}`)
            renameSync(absPath, absPath.replace(oldExt, `.${ext}`))
        }
        return relPath
    }

    /**
     * 如果粘贴板内是复制了一个文件, 取得路径进行复制
     */
    private copyFromPath(savedImagePath: string, targetPath: string) {
        if (savedImagePath.startsWith("copied:")) {
            const copiedFile = savedImagePath.replace("copied:", "");
            if (lstatSync(copiedFile).isDirectory()) {
                vscode.window.showErrorMessage('Not support paste directory.');
            } else {
                copyFileSync(copiedFile, targetPath);
            }
        }
    }

    private getMarkdownDocument(document?: vscode.TextDocument | null) {
        if (!document) return;
        if (document.uri.scheme !== 'file' || document.languageId !== 'markdown') return;
        return document;
    }

    private async insertMarkdownIntoDocument(document: vscode.TextDocument, markdown: string) {
        const lastLine = document.lineAt(document.lineCount - 1);
        const prefix = document.getText().length > 0 ? '\n' : '';
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, lastLine.range.end, `${prefix}${markdown}`);
        await vscode.workspace.applyEdit(edit);
    }

    private async readClipboardImageToPath(imagePath: string): Promise<string | undefined> {
        if (!imagePath) return;
        const platform = process.platform;
        return new Promise((resolve, reject) => {
            let command: string;
            let args: string[];
            if (platform === 'win32') {
                command = 'powershell';
                args = [
                    '-noprofile',
                    '-noninteractive',
                    '-nologo',
                    '-sta',
                    '-executionpolicy', 'unrestricted',
                    '-windowstyle', 'hidden',
                    '-file', path.join(this.context.extensionPath, '/lib/pc.ps1'),
                    imagePath
                ];
            } else if (platform === 'darwin') {
                command = 'osascript';
                args = [path.join(this.context.extensionPath, './lib/mac.applescript'), imagePath];
            } else {
                command = 'sh';
                args = [path.join(this.context.extensionPath, './lib/linux.sh'), imagePath];
            }
            const child = spawn(command, args);
            let output = '';
            let settled = false;
            child.stdout.on('data', data => {
                output += data.toString();
            });
            child.on('error', error => {
                if (settled) return;
                settled = true;
                reject(error);
            });
            child.on('close', () => {
                if (settled) return;
                settled = true;
                const result = output.trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage('You need to install xclip command first.');
                    resolve(undefined);
                    return;
                }
                resolve(result || undefined);
            });
        });
    }

    private logPaste(source: string, message: string, detail?: string) {
        Output.debug(`[markdown-paste][${source}] ${message}${detail ? ` | ${detail}` : ''}`);
    }

    public switchEditor(uri: vscode.Uri) {
        const editor = vscode.window.activeTextEditor;
        if (!uri) uri = editor?.document.uri;
        const type = editor ? 'docfile.markdownViewer' : 'default';
        vscode.commands.executeCommand('vscode.openWith', uri, type);
    }

}
