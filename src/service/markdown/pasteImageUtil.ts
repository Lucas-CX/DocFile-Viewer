import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, parse, resolve } from 'path';

export interface DocumentUriLike {
    fsPath: string;
}

export interface MarkdownImageTarget {
    imageName: string;
    imagePath: string;
    relPath: string;
}

export function resolveMarkdownImageTarget(
    uri: DocumentUriLike,
    relPath: string,
    fullPath: string,
): MarkdownImageTarget {
    const imagePath = isAbsolute(fullPath)
        ? fullPath
        : `${resolve(uri.fsPath, "..")}/${relPath}`.replace(/\\/g, "/");
    return {
        imageName: parse(relPath).name,
        imagePath,
        relPath,
    };
}

export function ensureImageParentDir(imagePath: string) {
    const dir = dirname(imagePath);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}

export function writeBinaryImageFile(imagePath: string, content: Buffer | string) {
    ensureImageParentDir(imagePath);
    writeFileSync(imagePath, content);
}

export function createMarkdownImageText(imageName: string, relPath: string) {
    return `![${imageName}](${relPath})`;
}
