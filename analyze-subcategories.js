const fs = require('fs');

// Read the products file
const content = fs.readFileSync('types/products.ts', 'utf8');

// Extract category data
const categoryMatches = content.match(/export\s+const\s+PRODUCT_CATEGORIES\s*:\s*ProductCategory\[\]\s*=\s*\[([\s\S]*?)\];/);

if (!categoryMatches) {
  console.log('Could not find PRODUCT_CATEGORIES');
  process.exit(1);
}

// Parse products by category and sub-category
const products = [];

// Find all category objects
const categoryBlocks = content.match(/\{\s*id:\s*"[^"]+",\s*name:\s*"[^"]+",[\s\S]*?products:\s*\[[\s\S]*?\]\s*\}/g);

if (categoryBlocks) {
  categoryBlocks.forEach(catBlock => {
    const catId = catBlock.match(/id:\s*"([^"]+)"/)?.[1];
    const catName = catBlock.match(/name:\s*"([^"]+)"/)?.[1];
    
    // Find all products in this category
    const productBlocks = catBlock.match(/\{\s*id:\s*"[^"]+",\s*name:\s*"[^"]+",[\s\S]*?\}(?=,\s*\{|$)/g);
    
    if (productBlocks) {
      productBlocks.forEach(prodBlock => {
        const id = prodBlock.match(/id:\s*"([^"]+)"/)?.[1];
        const name = prodBlock.match(/name:\s*"([^"]+)"/)?.[1];
        const subCategory = prodBlock.match(/subCategory:\s*"([^"]+)"/)?.[1];
        const brand = prodBlock.match(/brand:\s*"([^"]+)"/)?.[1];
        
        if (id && name) {
          products.push({
            id,
            name,
            categoryId: catId,
            categoryName: catName,
            subCategory: subCategory || 'NO SUBCATEGORY',
            brand: brand || 'NO BRAND'
          });
        }
      });
    }
  });
}

console.log('=== TOTAL PRODUCTS FOUND:', products.length, '===');
console.log('');

// Group by category
const byCategory = {};
products.forEach(p => {
  if (!byCategory[p.categoryName]) {
    byCategory[p.categoryName] = [];
  }
  byCategory[p.categoryName].push(p);
});

// Group by sub-category within each category
Object.entries(byCategory).forEach(([catName, catProducts]) => {
  console.log(`\n=== ${catName} (${catProducts.length} products) ===`);
  
  const bySubCategory = {};
  catProducts.forEach(p => {
    if (!bySubCategory[p.subCategory]) {
      bySubCategory[p.subCategory] = [];
    }
    bySubCategory[p.subCategory].push(p);
  });
  
  Object.entries(bySubCategory).sort((a, b) => b[1].length - a[1].length).forEach(([subCat, subProducts]) => {
    console.log(`  ${subCat}: ${subProducts.length} products`);
    // Show first 3 product names
    subProducts.slice(0, 3).forEach(p => {
      console.log(`    - ${p.name} (${p.brand})`);
    });
    if (subProducts.length > 3) {
      console.log(`    ... and ${subProducts.length - 3} more`);
    }
  });
});

// Check for products with NO sub-category
const noSubcat = products.filter(p => p.subCategory === 'NO SUBCATEGORY');
if (noSubcat.length > 0) {
  console.log('\n\n=== WARNING: PRODUCTS WITHOUT SUBCATEGORY ===');
  noSubcat.forEach(p => {
    console.log(`  ${p.id} in ${p.categoryName}`);
  });
}

// Check for products with NO brand
const noBrand = products.filter(p => p.brand === 'NO BRAND');
if (noBrand.length > 0) {
  console.log('\n\n=== WARNING: PRODUCTS WITHOUT BRAND ===');
  noBrand.forEach(p => {
    console.log(`  ${p.id} in ${p.categoryName}`);
  });
}

// Show all unique sub-categories
console.log('\n\n=== ALL UNIQUE SUB-CATEGORIES ===');
const allSubCats = new Set(products.map(p => p.subCategory));
const sortedSubCats = Array.from(allSubCats).sort();
sortedSubCats.forEach(subCat => {
  const count = products.filter(p => p.subCategory === subCat).length;
  console.log(`  ${subCat}: ${count} products`);
});
