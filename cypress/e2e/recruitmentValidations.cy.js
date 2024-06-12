/// <reference types="cypress" />

import { loginPage } from '../support/POMFiles/loginPage.js'
import { recruitmentPage } from '../support/POMFiles/recruitmentPage';

describe('Validate Recruitment filters', () => {
  before(()=> {
    cy.visit('/login');

    loginPage.fillUserName('Admin');
    loginPage.fillPassword('admin123');
    loginPage.clickLogin();
  });

  it('User should be able to filter the candidates based on the vacancy', () => {
    recruitmentPage.clickRecruitmentMenuItem();
    recruitmentPage.clickVacancyFilter();
    recruitmentPage.selectVacancyOption('Senior QA Lead');
    cy.intercept('GET', '**/recruitment/candidates?**').as('getCandidatesRequest');

    recruitmentPage.clickSubmit();
    recruitmentPage.waitForLoadingSpinnerToFade();

    cy.wait('@getCandidatesRequest').then(req => {
      const recordsCount = req.response.body.data.length;
      [...Array(recordsCount).keys()].forEach((index) => {
        recruitmentPage.verifyCandidatePosition(index, 'Senior QA Lead');
      });
    });
  });
});
