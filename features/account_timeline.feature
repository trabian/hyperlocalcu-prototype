@javascript
Feature: Account Timeline

  So that I can manage the money in my accounts
  As a member
  I want to see all of my current accounts and transaction history

  Background:
    Given a user is logged in as me
    And I have an account with the number "0987654"
    And account "0987654" has the following subaccounts:
      | id | name             | balance | available_balance | account_type | suffix |
      |  1 | Rewards Checking | 1234.56 | 1230.00           | share        | 1      |
    And subaccount 1 has the following events:
      | id | name             | type        | amount  |
      |  1 | Sample Event     | card_event  | 23.45   |

  Scenario: Show transaction history
    When I go to my dashboard page
    And I follow "Rewards Checking" within "#accounts .share-accounts"
    And I wait until the timeline has been loaded
    Then I should see "Sample Event" within "#timeline tbody .name"

  Scenario: Show transaction detail
    When I go to my dashboard page
    And I follow "Rewards Checking" within "#accounts .share-accounts"
    And I wait until the timeline has been loaded
    And I click "tr:first-child" within "#timeline tbody"
    Then I should see "Sample Event" within "#event-header"
