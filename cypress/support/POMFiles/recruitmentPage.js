class RecruitmentPage {
    // ***** Elements ***** \\
    recruitmentMenuItem = () => cy.contains('a.oxd-main-menu-item', 'Recruitment');
    vacancyFilter = () => cy.contains('div.oxd-grid-item', 'Vacancy').find('div.oxd-select-text-input');
    vacancyOption = (option) => cy.contains('div[role="option"] span', option);
    submitButton = () => cy.get('button[type="submit"]');
    loadingSpinner = () => cy.get('div.oxd-loading-spinner-container');
    candidatePosition = (index) => cy.get('div.oxd-table-card div:nth-child(2) div').eq(index);
  
    // ***** Actions ***** \\
    clickRecruitmentMenuItem = () => this.recruitmentMenuItem().click();
    clickVacancyFilter = () => this.vacancyFilter().click();
    selectVacancyOption = (option) => this.vacancyOption(option).click();
    clickSubmit = () => this.submitButton().click();
    waitForLoadingSpinnerToFade = () => {
      this.loadingSpinner();
      this.loadingSpinner().should('not.be.exist');
    }
    verifyCandidatePosition = (index, position) => this.candidatePosition(index).should('have.text', position);
  }
  
  export const recruitmentPage = new RecruitmentPage();
  