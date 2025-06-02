const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
  
  // Generate PNG files for different sizes
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/favicon-${size}x${size}.png`));
  }
  
  // Generate favicon.ico (16x16 and 32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat('ico')
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  // Generate apple-touch-icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
}

generateFavicons().catch(console.error); 