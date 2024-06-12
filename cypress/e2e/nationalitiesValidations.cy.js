/// <reference types="cypress" />

import { loginPage } from '../support/POMFiles/loginPage.js'
import { nationalitiesPage } from '../support/POMFiles/netionalitiesPage.js';
import { credentials } from '../support/dataFiles/credentials.js'
import { testData } from '../support/dataFiles/testData'

describe('Validate Nationalities tab', () => {
  beforeEach(()=> {
    cy.visit('/login');

    loginPage.fillUserName(credentials.userName);
    loginPage.fillPassword(credentials.password);
    loginPage.clickLogin();

    nationalitiesPage.clickAdminTab();
  });

  after(()=> {
    nationalitiesPage.clickFirstEditButton();

    nationalitiesPage.fillNationalityFormWithRequest('@getNationalitiesRequest', 0);
    nationalitiesPage.clickSubmitButton();
  });

  it('User should be able to see the first 50 nationalities and the pagination component', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');
    nationalitiesPage.clickNationalitiesTab();
    cy.wait('@getNationalitiesRequest').then(req => {
      cy.wrap(req).as('getNationalitiesRequest');
    });

    cy.get('@getNationalitiesRequest').then(req => {
      req.response.body.data.forEach((nationality, index) => {
        nationalitiesPage.verifyNationalityName(index, nationality.name);
      });
    });

    nationalitiesPage.scrollToPaginationIntoView();
    nationalitiesPage.verifyPreviousNextButtonsVisibility();
    [...Array(4).keys()].forEach((number) => {
    nationalitiesPage.verifyPageButtonText(number, number+1);
    });
  });

  it('User should be able to edit the first nationality', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');

    nationalitiesPage.clickNationalitiesTab();
    cy.wait('@getNationalitiesRequest').then(req => {
      cy.wrap(req).as('getNationalitiesRequest');
    });

    nationalitiesPage.clickFirstEditButton();
    nationalitiesPage.clearAndTypeNationalityName(testData.newNationalityName);
    nationalitiesPage.clickSubmitButton();

    nationalitiesPage.verifyFirstNationalityName(testData.newNationalityName);
  });
})
