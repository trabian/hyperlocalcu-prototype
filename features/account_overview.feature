Feature: Account Overview

  So that I can manage the money in my accounts
  As a member
  I want to see all of my current accounts and transaction history

  @wip
  Scenario: Show the current account
    Given "My Account" is an account with the number "0987654"
    And a user is logged in as me
    When I go to my account page
    Then show me the page
    And I should see "0987654" within "#account .account-number"
