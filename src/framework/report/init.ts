import fs from "fs-extra";
export function setupTestResultsFolder() {
// This function sets up the test results folder by ensuring it exists and is empty.
try {
    fs.ensureDir("test-results");
    fs.emptyDir("test-results");

} catch (error) {
    console.log("Folder not created! " + error);
}
};