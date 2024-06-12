let reporter = require('cucumber-html-reporter');

let options = {
  theme: 'hierarchy',
  brandTitle: 'Test Report',
  jsonDir: 'report/JSON',
  output: 'report/HTML/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  columnLayout: 1,
};

reporter.generate(options);
