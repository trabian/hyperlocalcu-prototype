@javascript
Feature: Member Dashboard

  So that I can manage the money in my accounts
  As a member
  I want to see all of my current accounts and transaction history

  Background:
    Given a user is logged in as me
    And I have an account with the number "0987654"
    And account "0987654" has the following subaccounts:
      | name             | balance | available_balance | account_type |
      | Rewards Checking | 1234.56 | 1230.00          | share       |

  Scenario: Show the current account
    When I go to my dashboard page
    Then I should see "#0987654" within "#accounts .account-number"

  Scenario: Show subaccounts
    When I go to my dashboard page
    Then I should see "Rewards Checking" within "#accounts .share-accounts"
