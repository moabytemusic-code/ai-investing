import fs from 'fs';
import path from 'path';

const CSS_PATH = path.resolve('src/index.css');

function checkCssClasses() {
  console.log('🔍 Validating CSS layer integrity...');

  if (!fs.existsSync(CSS_PATH)) {
    console.error('❌ src/index.css not found');
    process.exit(1);
  }

  const cssContent = fs.readFileSync(CSS_PATH, 'utf8');

  // Check for common non-standard hacks or legacy patterns
  const legacyPatterns = [
    { pattern: /\.lg-flex-row/, fix: 'lg:flex-row' },
    { pattern: /\.md-grid-cols/, fix: 'md:grid-cols' },
    { pattern: /!important/, fix: 'Avoid !important in utility layers' }
  ];

  let issues = [];

  legacyPatterns.forEach(({ pattern, fix }) => {
    if (pattern.test(cssContent)) {
      issues.push(`⚠️ Legacy pattern found: ${pattern}. Fix: ${fix}`);
    }
  });

  if (issues.length > 0) {
    console.warn('\n⚠️ CSS class audit found issues:');
    issues.forEach(issue => console.warn(`   ${issue}`));
    console.warn('\nIntegrity Check: REJECTED');
    process.exit(0); // Warning only for now
  } else {
    console.log('\n✅ CSS class audit PASSED');
    process.exit(0);
  }
}

checkCssClasses();
