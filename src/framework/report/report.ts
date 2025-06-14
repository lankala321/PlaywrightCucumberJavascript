import { getEnv } from "../env/env";

const report = require("multiple-cucumber-html-reporter");
// Load environment variables from the .env file
getEnv();
export function generateReport() {
    try {
        report.generate({
            jsonDir: "test-results",
            reportPath: "test-results/reports/",
            reportName: process.env.REPORT_NAME,
            pageTitle: process.env.PAGE_TITLE,
            displayDuration: false,
            metadata: {
                browser: {
                    name: process.env.BROWSER,
                    version: process.env.BROWSER_VERSION,
                },
                device: process.env.DEVICE,
                platform: {
                    name: process.env.OPERATING_SYSTEM,
                    version: process.env.OS_VERSION,
                },
            },
            customData: {
                title: "Test Info",
                data: [
                    { label: "Project", value: process.env.PROJECT_NAME },
                    { label: "Release", value: process.env.RELEASE },
                    { label: "Cycle", value: process.env.CYCLE }
                ],
            },

        });
        console.log("Report generated successfully.");
    }
    catch (error) {

        console.error(`Error generating report: ${error}`);
    }
}
if (require.main === module) {
    generateReport();
};