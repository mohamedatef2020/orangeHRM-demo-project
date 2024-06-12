/// <reference types="cypress" />

describe('Validate Nationalities tab', () => {
  beforeEach(()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"').type('Admin');
    cy.get('input[name="password"').type('admin123');
    cy.get('button.orangehrm-login-button').click();

    cy.contains('span.oxd-main-menu-item--name', 'Admin').click();
  });

  after(()=> {
    cy.get('button i.bi-pencil-fill').first().click();
    cy.get('@getNationalitiesRequest').then(req => {
      cy.get('form div input').clear().type(req.response.body.data[49].name);
    });
    cy.get('button[type="submit"]').click();
  })

  it('User should be able to see the first 50 nationalities and the pagination component', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');
    cy.contains('a.oxd-topbar-body-nav-tab-item', 'Nationalities').click();
    cy.wait('@getNationalitiesRequest').then(
      req => cy.wrap(req).as('getNationalitiesRequest'),
    );

    cy.get('@getNationalitiesRequest').then(req => {
      req.response.body.data.forEach((nationality, index) => {
        cy.get('div.oxd-table-card div:nth-child(2) div').eq(index)
        .should('have.text', nationality.name);
      });
    });

    cy.get('ul.oxd-pagination__ul').scrollIntoView();
    cy.get('button.oxd-pagination-page-item--previous-next').should('be.visible');
    cy.get('button.oxd-pagination-page-item--page').eq(0).should('have.text', '1');
    cy.get('button.oxd-pagination-page-item--page').eq(1).should('have.text', '2');
    cy.get('button.oxd-pagination-page-item--page').eq(2).should('have.text', '3');
    cy.get('button.oxd-pagination-page-item--page').eq(3).should('have.text', '4');
  })

  it('User should be able to update last nationality in the list', () => {
    cy.intercept('GET', '**/nationalities?**').as('getNationalitiesRequest');
    cy.contains('a.oxd-topbar-body-nav-tab-item', 'Nationalities').click();
    cy.wait('@getNationalitiesRequest').then(
      req => cy.wrap(req).as('getNationalitiesRequest'),
    );

    cy.get('@getNationalitiesRequest').then(req => {
      cy.get('div.oxd-table-card div:nth-child(2) div').last()
        .should('have.text', req.response.body.data[49].name);
    });

    cy.get('button i.bi-pencil-fill').last().click();
    cy.get('form div input').clear().type('001 The Galactic Republic');
    cy.get('button[type="submit"]').click();

    cy.get('@getNationalitiesRequest').then(req => {
      cy.get('div.oxd-table-card div:nth-child(2) div').last()
        .should('have.text', req.response.body.data[48].name);
    });

    cy.get('@getNationalitiesRequest').then(() => {
      cy.get('div.oxd-table-card div:nth-child(2) div').first()
      .should('have.text', '001 The Galactic Republic');
    });
  })
})