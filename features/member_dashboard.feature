@javascript
Feature: Member Dashboard

  So that I can get an overview of my accounts
  As a member
  I want to see all of my current accounts

  Background:
    Given a user is logged in as me
    And I have an account with the number "0987654"
    And account "0987654" has the following subaccounts:
      | id | name             | balance | available_balance | account_type | suffix |
      |  1 | Rewards Checking | 1234.56 | 1230.00           | share        | 1      |
    And subaccount 1 has the following statements:
      | statement_date |
      | 2/28/2011      |

  Scenario: Show the current account
    When I go to my dashboard page
    Then I should see "#0987654" within "#accounts .account-number"

  Scenario: Show subaccounts
    When I go to my dashboard page
    Then I should see "Rewards Checking" within "#accounts .share-accounts"

  @wip
  Scenario: View available statements
    When I go to my dashboard page
    And I follow "Rewards Checking" within "#accounts .share-accounts"
    Then show me the page
    Then I should see "Feb. 2011" within "#accounts .share-accounts .statements"
