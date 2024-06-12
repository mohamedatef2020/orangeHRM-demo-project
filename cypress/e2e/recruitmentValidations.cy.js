/// <reference types="cypress" />

import { loginPage } from '../support/POMFiles/loginPage.js'
import { recruitmentPage } from '../support/POMFiles/recruitmentPage';
import { credentials } from '../support/dataFiles/credentials.js'
import { testData } from '../support/dataFiles/testData'

describe('Validate Recruitment filters', () => {
  before(()=> {
    cy.visit('/login');

    loginPage.fillUserName(credentials.userName);
    loginPage.fillPassword(credentials.password);
    loginPage.clickLogin();
  });

  it('User should be able to filter the candidates based on the vacancy', () => {
    recruitmentPage.clickRecruitmentMenuItem();
    recruitmentPage.clickVacancyFilter();
    recruitmentPage.selectVacancyOption(testData.Vacancy);
    cy.intercept('GET', '**/recruitment/candidates?**').as('getCandidatesRequest');

    recruitmentPage.clickSubmit();
    recruitmentPage.waitForLoadingSpinnerToFade();

    cy.wait('@getCandidatesRequest').then(req => {
      const recordsCount = req.response.body.data.length;
      [...Array(recordsCount).keys()].forEach((index) => {
        recruitmentPage.verifyCandidatePosition(index, testData.Vacancy);
      });
    });
  });
});
