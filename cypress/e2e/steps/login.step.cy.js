import {Given} from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../../support/POMFiles/loginPage.js'
import { credentials } from '../../support/dataFiles/credentials.js';

Given('I am logged in to OrangeHRM', () => {
  cy.visit('/login');

  loginPage.fillUserName(credentials.userName);
  loginPage.fillPassword(credentials.password);
  loginPage.clickLogin();
});