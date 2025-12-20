import { build } from 'esbuild';
import { execSync } from 'child_process';

// Generate TypeScript declarations first
console.log('Generating TypeScript declarations...');
try {
  execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit' });
  console.log('TypeScript declarations generated successfully!');
} catch (error) {
  console.error('Failed to generate TypeScript declarations:', error.message);
  process.exit(1);
}

// Build configuration shared between entry points
const buildConfig = {
  bundle: true,
  platform: 'neutral',
  target: 'es2022',
  format: 'esm',
  external: [
    'console',
    '@fjell/logging',
    '@fjell/types'
  ],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  metafile: true,
  minify: false,
};

// Build main cross-platform version
console.log('Building cross-platform version...');
await build({
  ...buildConfig,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
});

console.log('Build completed successfully!');
console.log(`- Cross-platform build: dist/index.js`);
console.log(`- TypeScript declarations: dist/index.d.ts`);

