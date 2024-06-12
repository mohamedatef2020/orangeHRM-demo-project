/// <reference types="cypress" />

describe('Validate Recruitment filters', () => {
  beforeEach(()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"').type('Admin');
    cy.get('input[name="password"').type('admin123');
    cy.get('button.orangehrm-login-button').click();

    cy.contains('span.oxd-main-menu-item--name', 'Admin').click();
  });

  it('User should be able to filter the candidates based on the vacancy', () => {
    cy.contains('a.oxd-main-menu-item', 'Recruitment').click();
    cy.contains('div.oxd-grid-item', 'Vacancy').within(()=> cy.get('div.oxd-select-text-input').click());
    cy.contains('div[role="option"] span', 'Testing position').click();
    cy.intercept('GET', '**/recruitment/candidates?**').as('getCandidatesRequest');

    cy.get('button[type="submit"]').click();
    cy.get('div.oxd-loading-spinner-container');

    cy.wait('@getCandidatesRequest').then(req => {
      const recordsCount = req.response.body.data.length;
      [...Array(recordsCount).keys()].forEach((index) => {
        cy.get('div.oxd-table-card div:nth-child(2) div').eq(index-1)
        .should('have.text', 'Testing position');
      });
    });
  })
})