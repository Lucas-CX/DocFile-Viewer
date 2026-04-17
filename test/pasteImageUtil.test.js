const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  createMarkdownImageText,
  resolveMarkdownImageTarget,
  writeBinaryImageFile,
} = require('../out/service/markdown/pasteImageUtil.js');

test('resolveMarkdownImageTarget builds nested markdown image path', () => {
  const target = resolveMarkdownImageTarget(
    { fsPath: 'E:/project/game/unity_project/figma_test/test.md' },
    'image/test/123.png',
    'image/test/123.png',
  );

  assert.equal(target.imageName, '123');
  assert.equal(
    target.imagePath.replace(/\\/g, '/'),
    'E:/project/game/unity_project/figma_test/image/test/123.png',
  );
  assert.equal(target.relPath, 'image/test/123.png');
});

test('writeBinaryImageFile creates parent directory recursively', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docfile-paste-'));
  const targetPath = path.join(tempDir, 'image', 'test', 'sample.png');
  const payload = Buffer.from('png-binary');

  writeBinaryImageFile(targetPath, payload);

  assert.equal(fs.existsSync(targetPath), true);
  assert.deepEqual(fs.readFileSync(targetPath), payload);

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('createMarkdownImageText returns markdown image syntax', () => {
  assert.equal(
    createMarkdownImageText('test', 'image/test/123.png'),
    '![test](image/test/123.png)',
  );
});
