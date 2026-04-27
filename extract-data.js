const fs = require('fs');
const content = fs.readFileSync('types/products.ts', 'utf8');

// Extract all brands
const brandMatches = content.match(/brand:\s*["']([^"']+)["']/g);
const brands = [...new Set(brandMatches?.map(m => m.replace(/brand:\s*["']/, '').replace(/["']$/, '')) || [])].sort();
console.log('=== UNIQUE BRANDS ===');
console.log('Total:', brands.length);
brands.forEach(b => console.log('- ' + b));

// Extract all typical applications
const appMatches = content.match(/typicalApplications:\s*\[([^\]]+)\]/g);
const allApps = [];
appMatches?.forEach(match => {
  const apps = match.match(/["']([^"']+)["']/g);
  if (apps) {
    apps.forEach(a => allApps.push(a.replace(/["']/g, '')));
  }
});
const uniqueApps = [...new Set(allApps)].sort();
console.log('\n=== UNIQUE APPLICATIONS (for industry mapping) ===');
console.log('Total unique:', uniqueApps.length);
uniqueApps.forEach(a => console.log('- ' + a));
