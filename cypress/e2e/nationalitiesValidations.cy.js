/// <reference types="cypress" />

import { loginPage } from '../support/POMFiles/loginPage.js'
import { nationalitiesPage } from '../support/POMFiles/netionalitiesPage.js';
import { recruitmentPage } from '../support/POMFiles/recruitmentPage.js';

describe('Validate Nationalities tab', () => {
  beforeEach(()=> {
    cy.visit('/login');

    loginPage.fillUserName('Admin');
    loginPage.fillPassword('admin123');
    loginPage.clickLogin();

    nationalitiesPage.clickAdminTab();
  });

  after(()=> {
    nationalitiesPage.clickFirstEditButton();

    nationalitiesPage.fillNationalityFormWithRequest('@getNationalitiesRequest', 0);
    nationalitiesPage.clickSubmitButton();
    recruitmentPage.waitForLoadingSpinnerToFade();
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
    nationalitiesPage.clearAndTypeNationalityName('001 The Galactic Republic');
    nationalitiesPage.clickSubmitButton();

    nationalitiesPage.verifyFirstNationalityName('001 The Galactic Republic');
  });
})
