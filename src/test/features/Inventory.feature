Feature: UI validation for Inventory Page

  Background:
    Given I am logged in as a standard user

 
  Scenario: Verify inventory page loads after login
    When I am on the inventory page
    Then I should see the list of inventory items

  Scenario: Verify the page title
    Then the page title should be "Swag Labs"

  Scenario: Verify each product has name, description, image, and price
    Then each product should display name, description, image, and price

  Scenario: Verify shopping cart icon presence
    Then I should see the shopping cart icon

  Scenario: Verify hamburger menu is visible and clickable
    Then I should see the hamburger menu button
    When I click the hamburger menu button
    Then the menu should expand

  Scenario: Add item to cart
    When I click on "Add to cart" for "Sauce Labs Backpack"
    Then the cart icon should show 1 item

  Scenario: Remove item from cart
    Given I have added "Sauce Labs Backpack" to the cart
    When I click on "Remove" for "Sauce Labs Backpack"
    Then the cart icon should show no items

  Scenario: Navigate to product detail page
    When I click on the product name "Sauce Labs Backpack"
    Then I should be on the product detail page for "Sauce Labs Backpack"

  Scenario: Navigate to cart
    When I click the cart icon
    Then I should be on the cart page

  Scenario: Sort by Price (low to high)
    When I sort products by "Price (low to high)"
    Then the products should be sorted in ascending price

  Scenario: Logout from hamburger menu
    When I open the hamburger menu
    And I click logout
    Then I should be redirected to the login page

  Scenario: Cart badge updates correctly
    Given I add 2 items to the cart
    And I remove 1 item from the cart
    Then the cart badge should show 1 item
