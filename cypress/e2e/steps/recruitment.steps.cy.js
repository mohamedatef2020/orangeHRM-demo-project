import { When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { recruitmentPage } from '../../support/POMFiles/recruitmentPage.js';
import { testData } from '../../support/dataFiles/testData.js';

When('I navigate to the Recruitment module', () => {
    recruitmentPage.clickRecruitmentMenuItem();
});

When('I filter candidates by vacancy', () => {
    recruitmentPage.clickRecruitmentMenuItem();
    recruitmentPage.clickVacancyFilter();
    recruitmentPage.selectVacancyOption(testData.Vacancy);
    cy.intercept('GET', '**/recruitment/candidates?**').as('getCandidatesRequest');
    recruitmentPage.clickSubmit();
    recruitmentPage.waitForLoadingSpinnerToFade();
});

Then('I should see only candidates for this vacancy', () => {
  cy.intercept('GET', '**/recruitment/candidates?**').as('getCandidatesRequest');

  cy.wait('@getCandidatesRequest').then(req => {
    const recordsCount = req.response.body.data.length;
    [...Array(recordsCount).keys()].forEach((index) => {
      recruitmentPage.verifyCandidatePosition(index, testData.Vacancy);
    });
  });
});
