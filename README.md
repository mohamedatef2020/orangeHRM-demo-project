# Test Automation Demo Project for OrangeHRM

This project demonstrates automated testing using Cypress.io on the OrangeHRM demo website (https://opensource-demo.orangehrmlive.com/).

## Getting Started
### Prerequisites
Node.js (version 10 or later) and npm (Node Package Manager) installed (https://nodejs.org/en/download/package-manager)

### Cloning the Repository
Open your terminal or command prompt.

Use git clone to clone this repository:

```
git clone https://github.com/<your-username>/test-automation-demo-project-on-orangehrm.git
``` 


Replace <your-username> with your actual GitHub username.

### Installation
Navigate to the cloned project directory:

```
cd test-automation-demo-project-on-orangehrm
```

Install the project dependencies:

```
npm install
```


## Running Tests
### Locally (Interactive)

Start the Cypress test runner in interactive mode:
```
npm run open-cypress
```
Use code with caution.
content_copy
This will open a user interface where you can view test execution and interact with the browser during the tests.
- Select Chrome browser.
- Click `Start E2E Testing in Electron`
- Click on any test file to execute

### Locally (Headless)

Run the tests in headless mode (without a browser window):

```
npm run test
```

### Generating Reports

To generate a comprehensive test report in HTML format run:

```
npm run test-and-report
```

This will first clean up any existing reports, then run the tests, merge the reports, generate an HTML report, and finally open the report in your browser.

## Test Descriptions
This project includes two test spec files that define a few automated tests for specific functionalities of the OrangeHRM demo application.

These tests demonstrate Cypress's ability to automate user interactions and validate application behavior. The project structure, utilizing the Page Object Model (POM) and data files, promotes the maintainability and reusability of test code.

### Branches
When using `Master` you will be able to execute native cypress tests while if you switched to the `bdd-version` branch you will find same tests written in BDD style using Cucumber in two feature files
