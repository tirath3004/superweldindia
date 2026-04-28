const fs = require('fs');
const content = fs.readFileSync('types/products.ts', 'utf8');
const matches = content.match(/typicalApplications:\s*\[([^\]]*)\]/g);
const allApps = new Set();
if (matches) {
  matches.forEach(m => {
    const apps = m.match(/"([^"]+)"/g);
    if (apps) {
      apps.forEach(a => allApps.add(a.replace(/"/g, '')));
    }
  });
}
console.log('All unique typical applications:');
[...allApps].sort().forEach(a => console.log('- ' + a));
console.log('\nTotal unique:', allApps.size);
