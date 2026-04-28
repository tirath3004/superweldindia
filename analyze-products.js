const fs = require('fs');

// Read the products file
const content = fs.readFileSync('types/products.ts', 'utf8');

// Extract all products with their brand and typicalApplications
const productMatches = content.match(/id:\s*"([^"]+)"[\s\S]*?brand:\s*"([^"]+)"[\s\S]*?typicalApplications:\s*\[([^\]]*)\]/g);

const products = [];
if (productMatches) {
  productMatches.forEach(match => {
    const idMatch = match.match(/id:\s*"([^"]+)"/);
    const brandMatch = match.match(/brand:\s*"([^"]+)"/);
    const appMatch = match.match(/typicalApplications:\s*\[([^\]]*)\]/);
    
    if (idMatch && brandMatch && appMatch) {
      const apps = appMatch[1].match(/"([^"]+)"/g) || [];
      products.push({
        id: idMatch[1],
        brand: brandMatch[1],
        typicalApplications: apps.map(a => a.replace(/"/g, ''))
      });
    }
  });
}

console.log('Total products found:', products.length);

// Count by brand
const brandCounts = {};
products.forEach(p => {
  brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
});

console.log('\n=== BRAND COUNTS ===');
Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
  console.log(`${brand}: ${count}`);
});

// Define industry segments with keywords
const INDUSTRY_SEGMENTS = [
  { id: "construction", name: "Construction & Infrastructure", keywords: ["Construction", "Building", "Structural", "Projects and construction sites", "TMT bars", "Project sites", "PEB structures", "Channel", "Angle cutting", "Angle iron", "Infrastructure", "Civil works", "Bridges", "Dams", "Power plants", "Pipelines", "Pipeline construction", "Railway", "Metro", "Shipbuilding", "Marine", "Offshore", "Infrastructure work", "Structural fabrication", "Structural welding", "Structural applications", "Unalloyed structural steels", "Build-up welding", "Ship building", "Dredger parts", "Piling rigs", "Water turbines", "Rail crossings", "Rail points and crossings", "Rails", "Surfacing rails", "Pelton wheels", "Wind mill towers", "Hydro power", "Pit casings", "Dam gates", "Penstocks", "Refineries", "Tankers", "Process industry", "Paper mills", "Paper making", "Pulp and paper", "Pulp and paper industry", "Rayon industry", "Sinter plants", "Sinter handling", "Cement kiln", "Cement industry", "Raw mill ducts", "Pipe cutting", "Pipe welding", "Valves", "Valve components", "Pump", "Pump impellers"] },
  { id: "manufacturing", name: "Manufacturing & Fabrication", keywords: ["Manufacturing", "Factory", "Industrial", "Fabrication", "Workshop", "Light fabrication", "Medium fabrication", "Heavy fabrication", "General fabrication", "Sheet metal", "Sheet metal cutting", "Sheet cutting", "Kitchen equipment", "SS furniture", "MS cutting", "Wood sanding", "Surface preparation", "SS fabrication", "Stainless steel fabrication", "Small and medium scale fabrication", "Light to medium fabrication", "Medium to heavy fabrication", "SS hinges", "Utensils", "SS polishing", "SS blending and polishing", "Precision cutting", "Thick material cutting", "Thin sheet welding", "Thin plate welding", "Root pass welding", "Single side melt through welding", "Production environments", "Service below 260°C", "Pre- and post-heating", "Marking", "Stampers", "Trimming dies", "Punching tools", "Punches", "Knives", "Machine bodies", "Component building", "Building machinery", "Sugar industry", "Sugar mill rolls", "Steel mills", "Cane knives", "Paper making", "Pulp and paper", "Pharma equipments", "Pharmaceutical equipment", "Bio-fertilizers", "Mixer blades", "Mixer wings", "Mixing paddles", "Screw flights", "Pug mill knives", "Sand mixing blades", "Chain links", "Chain sprockets", "Gears"] },
  { id: "engineering", name: "Engineering & Precision Work", keywords: ["Engineering", "Technical", "Weld removal", "Surface finishing", "Chamfering", "Deburring", "Burr removal", "Grinding", "Surface blending", "Precision work", "Weld blending", "Surface cleaning", "Weld blending and removal", "SS and MS weld blending", "Light weld blending", "Scale removal", "Parting line removal", "Runner/riser grinding", "Back gouging", "Rust removal", "Surface preparation", "Polishing", "Metal scrubbing", "Scrapers", "X-ray quality welds", "Precision cutting", "Professional cutting", "Mechanized cutting", "TIG welding", "MIG welding", "MMA welding", "MIG/MAG welding", "Multi-process", "Multi-process welding", "Semi-automatic welding", "Welding", "Stainless steel welding", "Super duplex steel welding", "Superaustenitic steels", "Martensitic stainless welding", "Duplex welding", "Dissimilar steel welding", "Low alloy steel welding", "Tool steel repair", "Tool steel surfacing", "Toolroom", "Carbide dies", "Hot work tools", "Hot pressing tools", "Boiler tubes", "Boiler tube panels", "Water wall panels", "Creep resistant steels", "High temperature applications", "High temperature service", "High temperature steels", "Turbine blades", "Turbine casings", "Pump impellers", "Valve components", "Boring bars"] },
  { id: "mining", name: "Mining & Heavy Industry", keywords: ["Mining", "Mining equipment", "Mining industry", "Mining machinery", "Quarry", "Quarry hoppers", "Ore crushing", "Ore crushing rolls", "Ore-breaker teeth", "Ore-crushing rolls", "Coal crushing", "Coal crusher rolls", "Crusher jaws", "Crusher mantles", "Crushing hammers", "Dredger teeth", "Dredger wear plates", "Dragline buckets", "Shovel cheeks", "Shovel teeth", "Grizzly bars", "Drag chain", "Drag links", "Scraper blades", "Scraper rings", "Ring sectors", "Hot shear blades", "Hot shears", "Hot-shearing blades", "Milling tools", "Cutter teeth", "Cutter drums", "Cutter heads", "Digger teeth", "Ripper teeth", "Cone crushers", "Earth moving", "Earth drilling", "Coal plow bits", "Coal cutter bits", "Auger blades", "Beater bars", "Beater arms", "Slurry pump parts", "Cement industry", "Cement kiln", "Sugar mill rolls", "Sinter plants", "Steel mills", "Rolling mill", "Guide rollers", "Table rollers", "Hot work tools", "Hot pressing tools", "Hot shear blades", "Pallet cars"] },
  { id: "automotive", name: "Automotive & Transportation", keywords: ["Automotive", "Vehicle", "Auto industries", "Car manufacturing", "Transportation", "Vehicle repair", "Body works", "Frame welding", "Cross-country vehicles", "Mobile equipment", "Mobile welding", "Portable applications", "Portable cutting", "On-site work", "Offsite welding", "Remote welding", "Tractor parts", "Tankers", "Transport containers", "Turbine blades", "Turbine casings"] },
  { id: "energy", name: "Energy & Power", keywords: ["Energy", "Power", "Oil", "Gas", "Petrochemical", "Thermal", "Solar", "Renewable energy", "Power generation", "Boiler tubes", "Boiler tube panels", "Water wall panels", "Creep resistant steels", "High temperature applications", "High temperature service", "High temperature steels", "Wind mill towers", "Hydro power", "Penstocks", "Dam gates", "Thermal power", "Nuclear applications", "Thick material cutting", "Anaerobic service", "Water turbines", "Pelton wheels", "Turbine blades", "Turbine casings"] }
];

// Count products per industry with word boundary matching
function matchesKeyword(app, keyword) {
  const appLower = app.toLowerCase();
  const kwLower = keyword.toLowerCase();
  return appLower === kwLower ||
         appLower.startsWith(kwLower + ' ') ||
         appLower.endsWith(' ' + kwLower) ||
         appLower.includes(' ' + kwLower + ' ');
}

const industryCounts = {};
const industryProducts = {};

INDUSTRY_SEGMENTS.forEach(segment => {
  let count = 0;
  const matchedProducts = [];
  
  products.forEach(p => {
    const matches = p.typicalApplications.some(app => 
      segment.keywords.some(kw => matchesKeyword(app, kw))
    );
    if (matches) {
      count++;
      matchedProducts.push(p.id);
    }
  });
  
  industryCounts[segment.name] = count;
  industryProducts[segment.name] = matchedProducts;
});

console.log('\n=== INDUSTRY COUNTS ===');
Object.entries(industryCounts).sort((a, b) => b[1] - a[1]).forEach(([industry, count]) => {
  console.log(`${industry}: ${count}`);
});

// Find unmatched products
const allMatchedIds = new Set();
Object.values(industryProducts).forEach(ids => ids.forEach(id => allMatchedIds.add(id)));
const unmatchedProducts = products.filter(p => !allMatchedIds.has(p.id));

console.log('\n=== UNMATCHED PRODUCTS ===');
console.log(`Count: ${unmatchedProducts.length}`);
if (unmatchedProducts.length > 0) {
  unmatchedProducts.slice(0, 10).forEach(p => {
    console.log(`- ${p.id} (${p.brand}): ${p.typicalApplications.join(', ')}`);
  });
}

// Find products matching multiple industries
console.log('\n=== PRODUCTS MATCHING MULTIPLE INDUSTRIES ===');
const multiMatchProducts = [];
products.forEach(p => {
  const matchedIndustries = [];
  INDUSTRY_SEGMENTS.forEach(segment => {
    const matches = p.typicalApplications.some(app => 
      segment.keywords.some(kw => matchesKeyword(app, kw))
    );
    if (matches) matchedIndustries.push(segment.name);
  });
  if (matchedIndustries.length > 1) {
    multiMatchProducts.push({ id: p.id, brand: p.brand, industries: matchedIndustries, count: matchedIndustries.length });
  }
});

multiMatchProducts.sort((a, b) => b.count - a.count).slice(0, 10).forEach(p => {
  console.log(`${p.id} (${p.brand}): ${p.count} industries - ${p.industries.join(', ')}`);
});
