import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const [variant, command = 'dev', port] = process.argv.slice(2);

if (!['nueva', 'anterior'].includes(variant)) {
  console.error('Indica la home: nueva o anterior.');
  process.exit(1);
}

const astroCli = fileURLToPath(new URL('../node_modules/astro/astro.js', import.meta.url));
const astroArgs = [astroCli, command];
if (port) astroArgs.push('--port', port, '--strictPort');

const child = spawn(process.execPath, astroArgs, {
  stdio: 'inherit',
  env: { ...process.env, HOME_VARIANT: variant },
});

child.on('error', (error) => {
  console.error(`No se pudo iniciar Astro: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
