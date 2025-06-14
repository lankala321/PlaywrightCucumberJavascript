const { format } = require("path");

// common settings for all configuration
const commonSettings = {
    formatOptions: {
        snippetInterface: "async-await"
    },
    dryRun: false,
    require: [
        "src/test/steps/*.ts",
        "src/framework/hooks/hooks.ts"
    ],
    requireModule: [
        "ts-node/register"
    ],
    format: [
        "progress-bar",
        "html:test-results/cucumber-report.html",
        "json:test-results/cucumber-report.json",
        "rerun:@rerun.txt"
    ]
};

module.exports = {
    // smoke: {
    //     tags: "@smoke",
    //     ...commonSettings,
    //     paths: [
    //         "src/test/features/smoke/"
    //     ],
    //     publishQuiet: true,
    //     parallel: 1
    // },
    // regression: {
    //     tags: "@regression",
    //     ...commonSettings,
    //     paths: [
    //         "src/test/features/regression/"
    //     ],
    //     publishQuiet: true,
    //     parallel: 1
    // },
    // e2e: {
    //     tags: "@e2e",
    //     ...commonSettings,
    //     paths: [
    //         "src/test/features/e2e/"
    //     ],
    //     publishQuiet: true,
    //     parallel: 1
    // },
    default: {
        tags: process.env.npm_config_TAGS || "",
        paths: [
            "src/test/features/"
        ],
        parallel: 1,
        ...commonSettings,
    },
    rerun: {
        parallel: 2,
        ...commonSettings,
    }
};