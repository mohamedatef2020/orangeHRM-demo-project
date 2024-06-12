Feature: Filter Candidates by Vacancy

  Scenario: User filters candidates by vacancy
      Given I am logged in to OrangeHRM
      When I navigate to the Recruitment module
      And I filter candidates by vacancy
      Then I should see only candidates for this vacancy