import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', '..', 'frontend', 'dist');
const dest = path.join(__dirname, '..', 'frontend_dist');

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error('Source dist not found:', srcDir);
    process.exit(1);
  }
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir(src, dest);
  console.log('Copied frontend dist to', dest);
} catch (e) {
  console.error('Failed to copy frontend dist:', e && e.message ? e.message : e);
  process.exit(1);
}
