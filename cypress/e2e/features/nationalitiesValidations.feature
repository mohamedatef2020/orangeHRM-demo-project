Feature: Manage Nationalities

  Background:
    Given I am logged in to OrangeHRM
    And I navigate to the Admin tab
    When I navigate to the Nationalities tab

  Scenario: User sees first 50 nationalities and pagination
      Then I should see the first 50 nationalities displayed
      And I should see the pagination component with previous, next, and page numbers
  
  @revertChanges
  Scenario: User edits the first nationality
      And I click the edit button for the first nationality
      And I update the nationality name to a new name
      Then I should see the updated nationality displayed with the new name