class NationalitiesPage {
    // ***** Elements ***** \\
    firstEditButton = () => cy.get('button i.bi-pencil-fill').first();
    nationalityInputField = () => cy.get('form div input');
    submitButton = () => cy.get('button[type="submit"]');
    nationalitiesTab = () => cy.contains('a.oxd-topbar-body-nav-tab-item', 'Nationalities');
    nationalityNames = () => cy.get('div.oxd-table-card div:nth-child(2) div');
    paginationContainer = () => cy.get('ul.oxd-pagination__ul');
    nextPageButton = () => cy.get('button.oxd-pagination-page-item--previous-next');
    pageButtons = (index) => cy.get('button.oxd-pagination-page-item--page').eq(index);
    adminTab = () => cy.contains('span.oxd-main-menu-item--name', 'Admin');
  
    // ***** Actions ***** \\
    clickAdminTab = () => this.adminTab().click();
    clickFirstEditButton = () => this.firstEditButton().click();
    clearAndTypeNationality = (text) => this.nationalityInputField().clear().type(text);
    clickSubmitButton = () => this.submitButton().click();
  
    fillNationalityFormWithRequest = (reqAlias, index) => {
      cy.get(reqAlias).then(req => {
        const text = req.response.body.data[index].name;
        this.clearAndTypeNationality(text);
      });
    }

    clickNationalitiesTab = () => this.nationalitiesTab().click();
    verifyNationalityName = (index, name) => this.nationalityNames().eq(index).should('have.text', name);
    scrollToPaginationIntoView = () => this.paginationContainer().scrollIntoView();
    verifyPreviousNextButtonsVisibility = () => this.nextPageButton().should('be.visible');
    verifyPageButtonText = (index, text) => this.pageButtons(index).should('have.text', text);
    clickNationalitiesTab = () => this.nationalitiesTab().click();
    verifyLastNationalityName = (name) => this.nationalityNames().last().should('have.text', name);
    clickLastEditButton = () => this.editButton().last().click();
    clearAndTypeNationalityName = (name) => this.nationalityInputField().clear().type(name);
    clickSubmitButton = () => this.submitButton().click();
    verifyFirstNationalityName = (name) => this.nationalityNames().first().should('have.text', name);
  }
  
  export const nationalitiesPage = new NationalitiesPage();
  