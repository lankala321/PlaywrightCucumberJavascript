Feature: Login testing with various users from environment

  Scenario Outline: Login attempt with <username> and <password>
    Given I navigate to the SauceDemo login page
    When I login using "<username>" and "<password>"
    Then I should see "<outcome>"

    Examples:
      | username           | password         | outcome                                                     |
      | USER_NAME          | PASSWORD         | Products                                                    |
      | LOCKED_OUT_USER    | PASSWORD         | Epic sadface: Sorry, this user has been locked out.         |
      | PROBLEM_USER       | PASSWORD         | Products                                                    |
      | PERFORMANCE_USER   | PASSWORD         | Products                                                    |
      | ERROR_USER         | PASSWORD         | Products                                                    |
      | VISUAL_USER        | PASSWORD         | Products                                                    |
      | USER_NAME          | wrong_password   | Epic sadface: Username and password do not match any user   |
      |                    | secret_sauce     | Epic sadface: Username is required                          |
      | USER_NAME          |                  | Epic sadface: Password is required                          |


  Scenario: <label>
    Given I navigate to the SauceDemo login page
    When I login using "<username>" and "<password>"
    Then I should see "<outcome>"

  Examples:
    | label                             | username           | password         | outcome                                                     |
    | Standard user login               | USER_NAME          | PASSWORD         | Products                                                    |
    | Locked out user blocked           | LOCKED_OUT_USER    | PASSWORD         | Epic sadface: Sorry, this user has been locked out.         |
    | Problem user login                | PROBLEM_USER       | PASSWORD         | Products                                                    |
    | Performance user login            | PERFORMANCE_USER   | PASSWORD         | Products                                                    |
    | Error user login                  | ERROR_USER         | PASSWORD         | Products                                                    |
    | Visual user login                 | VISUAL_USER        | PASSWORD         | Products                                                    |
    | Wrong password for standard user  | USER_NAME          | wrong_password   | Epic sadface: Username and password do not match any user   |
    | Missing username                  |                    | secret_sauce     | Epic sadface: Username is required                          |
    | Missing password                  | USER_NAME          |                  | Epic sadface: Password is required                          |
