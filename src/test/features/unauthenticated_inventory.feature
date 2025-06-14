Feature: Inventory access and cart behavior without login

  Scenario: Access inventory page without login
    Given I am not logged in
    When I navigate to the inventory page
    Then I should be redirected to the login page

  Scenario: Add to cart after session expiry
    Given I was previously logged in and session expired
    When I try to add an item to the cart
    Then I should be redirected to the login page

  @smoke
  Scenario: Remove item not added to cart
    Given I am on the inventory page
    When I click remove for an item not in the cart
    Then no error should be shown and cart count remains the same

  @smoke
  Scenario: Inject invalid cart values via console
    Given I tamper cart values via browser console
    Then the site should reset the cart or redirect to login

  Scenario: Buttons and links are clickable on all devices
    Given I am using various devices
    Then all inventory page buttons and links should be clickable
