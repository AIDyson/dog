import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, devices } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.resolve(projectRoot, 'build');
const outDir = path.resolve(projectRoot, 'screenshots');

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml; charset=utf-8';
    case '.ico':
      return 'image/x-icon';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.map':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function startSpaStaticServer({ rootDir, port = 0 }) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const safePath = path.posix
        .normalize(urlPath)
        .replace(/^(\.\.(\/|\\|$))+/, '');

      let candidate = path.join(rootDir, safePath);
      const stat = await fs
        .stat(candidate)
        .catch(() => null);

      if (stat?.isDirectory()) {
        candidate = path.join(candidate, 'index.html');
      }

      // SPA fallback: if file doesn't exist, serve index.html
      if (!(await fileExists(candidate))) {
        candidate = path.join(rootDir, 'index.html');
      }

      const data = await fs.readFile(candidate);
      res.statusCode = 200;
      res.setHeader('Content-Type', contentTypeFor(candidate));
      res.end(data);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`Server error: ${e?.message || String(e)}`);
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });

  const address = server.address();
  const actualPort = typeof address === 'object' && address ? address.port : port;

  return {
    baseUrl: `http://127.0.0.1:${actualPort}`,
    close: async () => {
      await new Promise((resolve) => server.close(resolve));
    },
  };
}

async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function capture(page, targetDir, name) {
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, `${name}.png`),
    fullPage: true,
  });
}

async function captureUploadFlow({ page, baseUrl, targetDir }) {
  const logoPng = path.resolve(buildDir, 'logo192.png');

  await page.goto(`${baseUrl}/upload`, { waitUntil: 'networkidle' });
  await capture(page, targetDir, 'upload-step1');

  // Step 1 -> Step 2: select a file
  await page.setInputFiles('#file-upload', logoPng);
  await page.waitForSelector('.payment-section', { timeout: 10_000 });
  await capture(page, targetDir, 'upload-step2');

  // Step 2 -> Step 3: "支付 $1.90" (simulated payment)
  await page.getByRole('button', { name: /支付/i }).click();
  await page.waitForSelector('.dog-info-form', { timeout: 10_000 });
  await capture(page, targetDir, 'upload-step3');

  // Step 3 -> Step 4: fill form and submit
  const form = page.locator('.dog-info-form');
  await form.locator('input[type="text"]').fill('Mochi');
  await form.locator('input[type="number"]').fill('3');
  await form.locator('textarea').fill('一只很乖很爱笑的小狗。');
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('.result-section', { timeout: 10_000 });
  await capture(page, targetDir, 'upload-step4');
}

async function main() {
  const indexHtml = path.join(buildDir, 'index.html');
  if (!(await fileExists(indexHtml))) {
    throw new Error(
      `未找到生产构建产物：${indexHtml}\n请先在 client/ 下执行：npm run build`
    );
  }

  await ensureDir(outDir);

  const routes = [
    { name: 'home', path: '/' },
    { name: 'ranking-weekly', path: '/ranking/weekly' },
    { name: 'ranking-global', path: '/ranking/global' },
    { name: 'ranking-local', path: '/ranking/local' },
    { name: 'country-japan', path: '/country/Japan' },
    { name: 'dog-1', path: '/dog/1' },
  ];

  const server = await startSpaStaticServer({ rootDir: buildDir, port: 0 });
  const browser = await chromium.launch();

  const desktopDir = path.join(outDir, 'desktop');
  const mobileDir = path.join(outDir, 'mobile');
  await ensureDir(desktopDir);
  await ensureDir(mobileDir);

  const runSet = async ({ label, contextOptions, targetDir }) => {
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await disableAnimations(page);

    for (const r of routes) {
      const url = `${server.baseUrl}${r.path}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      // 给 Three/Web 字体一点渲染时间，避免首屏还在过渡
      await capture(page, targetDir, r.name);
      // console.log(`[${label}] saved ${r.name}.png`);
    }

    await captureUploadFlow({ page, baseUrl: server.baseUrl, targetDir });
    await context.close();
  };

  await runSet({
    label: 'desktop',
    contextOptions: { viewport: { width: 1440, height: 900 } },
    targetDir: desktopDir,
  });

  await runSet({
    label: 'mobile',
    contextOptions: {
      ...devices['iPhone 13'],
    },
    targetDir: mobileDir,
  });

  await browser.close();
  await server.close();
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

