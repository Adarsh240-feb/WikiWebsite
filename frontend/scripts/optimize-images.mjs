/**
 * Image Optimization Script
 * Converts all images in src/Images to optimized WebP format
 * and generates multiple sizes for responsive loading.
 * 
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '..', 'src', 'Images');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'Images', 'optimized');

// Define sizes for responsive images
const SIZES = {
  thumbnail: 200,   // For small team cards, volunteer avatars
  small: 400,       // For team member cards
  medium: 800,      // For about page images, card images
  large: 1200,      // For hero images, group photos
  full: 1920,       // For full-width hero backgrounds
};

// Map images to their optimal max size based on usage
const IMAGE_SIZE_MAP = {
  // Team member photos (displayed small in cards ~200-300px)
  'Adarsh.jpg': ['thumbnail', 'small'],
  'AmitSir.jpg': ['thumbnail', 'small'],
  'Arohi.jpg': ['thumbnail', 'small'],
  'Arpita.jpg': ['thumbnail', 'small'],
  'Atharva.jpg': ['thumbnail', 'small'],
  'Hridyesh.jpg': ['thumbnail', 'small'],
  'Manvi.jpg': ['thumbnail', 'small'],
  'Neelima.png': ['thumbnail', 'small'],
  'Priyanshika.jpg': ['thumbnail', 'small'],
  'Reeti.jpg': ['thumbnail', 'small'],
  'Sarthak.jpg': ['thumbnail', 'small'],
  'Sarthak1.jpg': ['thumbnail', 'small'],
  'Shiksha.jpg': ['thumbnail', 'small'],
  'Shivaansh.png': ['thumbnail', 'small'],
  'Somya.jpg': ['thumbnail', 'small'],
  'Suhani.jpg': ['thumbnail', 'small'],
  
  // Card images (displayed at ~300-600px)
  'Card1.png': ['small', 'medium'],
  'Card2.jpg': ['small', 'medium'],
  'Card3.png': ['small', 'medium'],
  
  // Event images
  'Event1.jpg': ['small', 'medium'],
  'Event2.jpg': ['small', 'medium'],
  'Event3.jpg': ['small', 'medium'],
  'Event4.jpg': ['small', 'medium'],
  'Event5.jpg': ['small', 'medium'],
  'Event6.jpg': ['small', 'medium'],
  'OpenSourceDay.jpeg': ['small', 'medium'],
  
  // About/description images (displayed at ~400-800px)
  'WikiD.jpg': ['small', 'medium'],
  'WikiH.jpg': ['small', 'medium'],
  
  // Group photo (can be large)
  'GroupWiki.png': ['medium', 'large'],
  
  // Logo images (displayed small, but keep them crisp)
  'WikiMainLogo.png': ['small', 'medium'],
  'WikiMainLogoM.png': ['small', 'medium'],
  'WikiI.png': ['medium', 'large'],
  'WikiL.png': ['thumbnail', 'small'],
  'WikiP.png': ['thumbnail', 'small'],
  'WikiS.jpg': ['thumbnail', 'small'],
  'WikiS.png': ['thumbnail', 'small'],
  'Wikilogo3.png': ['thumbnail', 'small'],
};

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'optimized' && file !== 'events' && file !== 'achievements') {
        results = results.concat(getFilesRecursively(fullPath));
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  
  return results;
}

async function optimizeImage(inputPath, relativePath, baseName) {
  const results = [];
  const targetOutputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));
  if (!fs.existsSync(targetOutputDir)) {
    fs.mkdirSync(targetOutputDir, { recursive: true });
  }
  
  const defaultOutputPath = path.join(targetOutputDir, `${baseName}.webp`);
  
  try {
    const metadata = await sharp(inputPath).metadata();
    const targetWidth = Math.min(1200, metadata.width);
    
    await sharp(inputPath)
      .resize(targetWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ 
        quality: 82,
        effort: 6,
      })
      .toFile(defaultOutputPath);

    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(defaultOutputPath);
    const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    results.push({
      file: `${baseName}.webp`,
      originalSize: (originalStats.size / 1024).toFixed(1) + ' KB',
      optimizedSize: (optimizedStats.size / 1024).toFixed(1) + ' KB',
      savings: savings + '%',
    });
  } catch (err) {
    console.error(`  ❌ Error creating WebP for ${baseName}:`, err.message);
  }
  
  return results;
}

async function main() {
  console.log('🖼️  WikiClub Tech Image Optimizer');
  console.log('================================\n');
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const files = getFilesRecursively(INPUT_DIR);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const filePath of files) {
    const relativePath = path.relative(INPUT_DIR, filePath);
    const fileName = path.basename(filePath);
    const baseName = path.parse(fileName).name;
    const sizes = IMAGE_SIZE_MAP[fileName] || ['small', 'medium'];
    
    console.log(`📸 Processing: ${relativePath}`);
    
    const originalSize = fs.statSync(filePath).size;
    totalOriginal += originalSize;
    
    const results = await optimizeImage(filePath, relativePath, baseName);
    
    for (const r of results) {
      console.log(`   ✅ ${r.file}: ${r.originalSize} → ${r.optimizedSize} (${r.savings} saved)`);
    }
    
    const targetOutputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));
    const defaultWebP = path.join(targetOutputDir, `${baseName}.webp`);
    if (fs.existsSync(defaultWebP)) {
      totalOptimized += fs.statSync(defaultWebP).size;
    }
    
    console.log('');
  }
  
  console.log('================================');
  console.log(`📊 Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  console.log('\n✨ Done! Optimized images saved to src/Images/optimized/');
}

main().catch(console.error);
