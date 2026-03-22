import fs from 'fs';
import path from 'path';

const TAILWIND_CONFIG_PATH = path.resolve('tailwind.config.js');
const CSS_PATH = path.resolve('src/index.css');

function checkCssVariables() {
  console.log('🔍 Checking for undefined CSS variables...');

  if (!fs.existsSync(TAILWIND_CONFIG_PATH)) {
    console.error('❌ tailwind.config.js not found');
    process.exit(1);
  }

  if (!fs.existsSync(CSS_PATH)) {
    console.error('❌ src/index.css not found');
    process.exit(1);
  }

  const tailwindConfig = fs.readFileSync(TAILWIND_CONFIG_PATH, 'utf8');
  const cssContent = fs.readFileSync(CSS_PATH, 'utf8');

  // Regex to find var(--variable-name) in tailwind config
  const varRegex = /var\((--[\w-]+)\)/g;
  const referencedVars = new Set();
  let match;

  while ((match = varRegex.exec(tailwindConfig)) !== null) {
    referencedVars.add(match[1]);
  }

  // Regex to find --variable-name: in CSS
  const definitionRegex = /(--[\w-]+):/g;
  const definedVars = new Set();

  while ((match = definitionRegex.exec(cssContent)) !== null) {
    definedVars.add(match[1]);
  }

  const undefinedVars = [...referencedVars].filter(v => !definedVars.has(v));

  if (undefinedVars.length > 0) {
    console.error('\n❌ Undefined CSS variables found in tailwind.config.js:');
    undefinedVars.forEach(v => console.error(`   ${v}`));
    console.error('\nAdd these variables to src/index.css');
    process.exit(1);
  } else {
    console.log('\n✅ All CSS variables in tailwind.config.js are defined');
    process.exit(0);
  }
}

checkCssVariables();
