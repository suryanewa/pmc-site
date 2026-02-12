import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

const EVIDENCE_DIR = path.join(process.cwd(), '.sisyphus/evidence');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

async function runLighthouseAudit() {
  const outputBasePath = path.join(EVIDENCE_DIR, `task-1-lighthouse-mobile-${TIMESTAMP}`);
  const outputPath = `${outputBasePath}.report.html`;
  const jsonPath = `${outputBasePath}.report.json`;

  console.log('Starting Lighthouse mobile audit...');
  console.log(`Target: ${BASE_URL}`);
  console.log(`Output: ${outputPath}`);

  try {
    const { stdout, stderr } = await execAsync(
      `npx lighthouse ${BASE_URL} ` +
      `--output=html --output=json ` +
      `--output-path=${outputBasePath} ` +
      `--preset=perf ` +
      `--form-factor=mobile ` +
      `--screenEmulation.mobile=true ` +
      `--screenEmulation.width=390 ` +
      `--screenEmulation.height=844 ` +
      `--screenEmulation.deviceScaleFactor=3 ` +
      `--throttling.cpuSlowdownMultiplier=4 ` +
      `--chrome-flags="--headless --no-sandbox --disable-gpu"`,
      { maxBuffer: 10 * 1024 * 1024 }
    );

    if (stderr) {
      console.error('Lighthouse warnings:', stderr);
    }

    console.log('Lighthouse audit complete!');
    console.log(stdout);

    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const metrics = {
      'Performance Score': jsonData.categories.performance.score * 100,
      'FCP (ms)': jsonData.audits['first-contentful-paint'].numericValue,
      'LCP (ms)': jsonData.audits['largest-contentful-paint'].numericValue,
      'CLS': jsonData.audits['cumulative-layout-shift'].numericValue,
      'TBT (ms)': jsonData.audits['total-blocking-time'].numericValue,
      'Speed Index (ms)': jsonData.audits['speed-index'].numericValue,
    };

    console.log('\n=== Lighthouse Metrics ===');
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`);
    });
    console.log(`\nFull report: ${outputPath}`);

    return metrics;
  } catch (error) {
    console.error('Lighthouse audit failed:', error);
    throw error;
  }
}

runLighthouseAudit().catch(console.error);
