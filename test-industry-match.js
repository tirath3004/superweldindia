const INDUSTRY_SEGMENTS = [
  { id: "construction", name: "Construction", keywords: ["Construction", "Building", "Structural", "Projects and construction sites", "TMT bars", "Project sites", "PEB structures", "Channel", "Angle", "Infrastructure work", "Civil works"] },
  { id: "infrastructure", name: "Infrastructure", keywords: ["Infrastructure", "Bridges", "Dams", "Power plants", "Pressure vessels", "Pipelines", "Railway", "Metro", "Shipbuilding", "Marine", "Offshore"] },
  { id: "manufacturing", name: "Manufacturing", keywords: ["Manufacturing", "Factory", "Industrial", "Fabrication", "Workshop", "Light fabrication", "Medium fabrication", "Heavy fabrication", "General fabrication", "Sheet metal", "Pipe cutting", "Angle cutting", "Kitchen equipment", "SS furniture", "MS cutting", "Wood sanding", "Surface preparation"] },
  { id: "engineering", name: "Engineering", keywords: ["Engineering", "Technical", "Weld removal", "Surface finishing", "Chamfering", "Deburring", "Burr removal", "Grinding", "Surface blending", "Precision work"] },
  { id: "energy", name: "Energy & Power", keywords: ["Energy", "Power", "Oil", "Gas", "Petrochemical", "Pipeline", "Thermal", "Solar", "Renewable energy", "Power generation"] },
  { id: "automotive", name: "Automotive", keywords: ["Automotive", "Vehicle", "Auto industries", "Car manufacturing", "Transportation", "Vehicle repair", "Sheet metal cutting"] }
];

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

// Find unmatched applications
const unmatched = [];
[...allApps].forEach(app => {
  const appLower = app.toLowerCase();
  let matched = false;
  for (const industry of INDUSTRY_SEGMENTS) {
    if (industry.keywords.some(k => appLower.includes(k.toLowerCase()))) {
      matched = true;
      break;
    }
  }
  if (!matched) unmatched.push(app);
});

console.log('UNMATCHED applications (' + unmatched.length + '):');
unmatched.sort().forEach(a => console.log('- ' + a));
