# UI and API Automation Testing with Playwright, Cucumber, and Typescript

## Table of Contents
- [Installation](#installation)  
- [Usage](#usage)  
- [Scripts](#scripts)  
- [Configuration](#configuration)  
- [Testing Framewrok](#testing-framework)  
- [Technologies Used](#technologies-used)  
- [Documentation](#documentation)  
- [License](#license)

## Installation
### Install node.js
https://nodejs.org/en/download

### Clone the Repository
https://github.com/lankala321/PlaywrightCucumberTypescript.git

### Playwright Installation
npm install -D playwright@latest

### Use below only when PowerShell session does not have permission to write the policy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
Get-ExecutionPolicy -Scope CurrentUser
It should output: RemoteSigned
Get-ExecutionPolicy -List

### Cucumber framework for JavaScript/TypeScript.
npm install -D @cucumber/cucumber

### TypeScript type definitions for Node.js APIs. Since Node.js does not come with built-in TypeScript types, this package gives typings for things like fs, path, process, etc., so we get autocomplete and compile-time type checking.
npm install -D @types/node

### TypeScript execution environment for Node.js. It allows to run TypeScript files directly without compiling them first to JavaScript.
npm install -D ts-node

### Loads environment variables from a .env file into process.env
npm install -D dotenv

### fs-extra module provides extra handy functions (like recursive folder creation, copying, removing). Provides more convenient file system utilities that simplify file operations in tests or scripts.
npm install -D fs-extra

### Generates detailed HTML reports from Cucumber JSON output
npm install -D multiple-cucumber-html-reporter

### Logging for Node.js
npm install -D winston

## Testing Framework
Playwright Framework
Cucumber BDD Approach 

## Technologies Used
Javascript/typescript
Node.js

## Documentation
https://playwright.dev/docs/intro#installing-playwright



Web Application for testing
https://parabank.parasoft.com/parabank/index.htm
https://demoqa.com/
https://the-internet.herokuapp.com/
https://www.saucedemo.com/
https://demo.opencart.com/
https://petstore.swagger.io/


Playwright Codegen


 "install:all": "npm install && npm install -D @playwright/test@latest && npm install -D @cucumber/cucumber && npm install -D @types/node && npm install -D ts-node && npm install -D cross-env && npm install -D dotenv && npm install -D @types/fs-extra && npm install -D multiple-cucumber-html-reporter && npm install -D winston",

 | Task                    | Command                                                     |
| ----------------------- | ----------------------------------------------------------- |
| Run all tests           | `npm run test`                                              |
| Run only one `.feature` | `npm run test -- src/test/features/inventory.feature`       |
| Run one scenario by tag | `npm run test -- --tags @smoke`                             |
| Debug a single file     | `npm run debug:test -- src/test/features/inventory.feature` |
npm run test --TAG="@smoke"


