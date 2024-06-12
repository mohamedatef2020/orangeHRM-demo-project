import { After, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { nationalitiesPage } from '../../support/POMFiles/netionalitiesPage.js';
import { credentials } from '../../support/dataFiles/credentials.js';
import { testData } from '../../support/dataFiles/testData';

When('I navigate to the Admin tab', () => {
    nationalitiesPage.clickAdminTab();
});

When('I navigate to the Nationalities tab', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');
    nationalitiesPage.clickNationalitiesTab();
    cy.wait('@getNationalitiesRequest').then(req => {
    cy.wrap(req).as('getNationalitiesRequest');
    });
});

Then('I should see the first 50 nationalities displayed', () => {
    cy.get('@getNationalitiesRequest').then(req => {
        req.response.body.data.forEach((nationality, index) => {
            nationalitiesPage.verifyNationalityName(index, nationality.name);
        });
    });
});

Then('I should see the pagination component with previous, next, and page numbers', () => {
    nationalitiesPage.scrollToPaginationIntoView();
    nationalitiesPage.verifyPreviousNextButtonsVisibility();

    [...Array(4).keys()].forEach((number) => {
    nationalitiesPage.verifyPageButtonText(number, number+1);
    });
});

When('I click the edit button for the first nationality', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');

    nationalitiesPage.clickNationalitiesTab();
    cy.wait('@getNationalitiesRequest').then(req => {
      cy.wrap(req).as('getNationalitiesRequest');
    });
});

When('I update the nationality name to a new name', () => {
    nationalitiesPage.clickFirstEditButton();
    nationalitiesPage.clearAndTypeNationalityName(testData.newNationalityName);
    nationalitiesPage.clickSubmitButton();
});

Then('I should see the updated nationality displayed with the new name', () => {
  nationalitiesPage.verifyFirstNationalityName(testData.newNationalityName);
});

After({tags: '@revertChanges'}, () => {
    nationalitiesPage.clickFirstEditButton();

    nationalitiesPage.fillNationalityFormWithRequest('@getNationalitiesRequest', 0);
    nationalitiesPage.clickSubmitButton();
});
