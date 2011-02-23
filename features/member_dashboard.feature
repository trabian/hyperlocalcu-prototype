Feature: Member Dashboard

  So that I can manage the money in my accounts
  As a member
  I want to see all of my current accounts and transaction history

  @javascript
  Scenario: Show the current account
    Given a user is logged in as me
    And I have an account with the number "0987654"
    When I go to my dashboard page
    Then I should see "#0987654" within "#accounts .account-number"
