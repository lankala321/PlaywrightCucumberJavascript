import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test"
import { fixture } from "../../framework/fixtures/pageFixture";
import { invokeBrowser } from "../browsers/browserManager";
import { getEnv } from "../env/env";
import { createLogger } from "winston";
import { options } from "../util/logger";

const fs = require("fs-extra");
const loginPage = require("../../test/objectRepository/loginPage");

// Set default timeout to 60 seconds
setDefaultTimeout(60 * 1000);
let browser: Browser;
let context: BrowserContext;

// Helper function to start tracing
async function startTracing(context: BrowserContext, scenarioName: string, pickle: any) {
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true
  });
}

// Helper function to create a new context
async function createContext(scenarioName: string, options: any) {
  context = await browser.newContext(options);
  await startTracing(context, scenarioName, options.pickle);
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options.loggerOptions);
}

// BeforeAll hook
BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

// Before hook
Before(async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  await createContext(scenarioName, {
    pickle,
    loggerOptions: options(scenarioName),
    recordVideo: { dir: process.env.VIDEO_PATH || "test-results/videos" }
  });

  const baseUrl = process.env.BASE_URL;
  await fixture.page.goto(baseUrl);
  fixture.logger?.info(`Navigated to the application: ${baseUrl}`);
});

// After hook
After(async function ({ pickle, result }) {
  const path = `./test-results/trace/${pickle.id}.zip`;
  let videoPath: string | undefined;
  let img: Buffer | undefined;

  if (result?.status === Status.PASSED && fixture.page) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png"
    });

    const video = fixture.page.video();
    if (video) {
      videoPath = await video.path();
    }
  }

  // Only stop tracing if context is defined
  if (fixture.page?.context()) {
    await fixture.page.context().tracing.stop({ path });
  }

  await fixture.page?.close();

  // Attach screenshot, video, and trace file
  if (result?.status === Status.PASSED) {
    if (img) {
      await this.attach(img, "image/png");
    }

    if (videoPath) {
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    }

    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

// AfterAll hook
AfterAll(async function () {
  await fixture.page?.context()?.browser()?.close();
  fixture.logger?.info("Browser Closed");
});