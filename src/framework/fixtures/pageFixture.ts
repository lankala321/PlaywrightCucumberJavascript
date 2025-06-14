import { Page } from "@playwright/test";
import { Logger } from "winston";

// This fixture is used to store the page and logger instances for testing purposes.
export const fixture: {
    
    page: Page | undefined;
    logger: Logger | undefined;
} = {
    // initially undefined, will hold the page instance
    page: undefined,

    // initially undefined, will hold the page instance
    logger: undefined
};