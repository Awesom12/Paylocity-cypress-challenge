# cypress 'Paylocity Benefits Dashboard application' End to End Automation Project

Welcome to our Project! This repository contains automated tests built using Cypress for ensuring the quality and reliability of our application.

## Project Overview
This project aims to automate end-to-end tests for Paylocity Benefits Dashboard application. By leveraging Cypress, we can thoroughly test various user interactions, workflows, and functionalities of the application.

## Getting Started
To get started with the project, follow these steps:

**Clone the Repository:**  Clone this repository to your local machine using **'git clone'**.

**Install Dependencies:** Run **'npm install'** to install all the necessary dependencies.

**Run Tests Locally:** Execute **'npm run test'** to run the Cypress tests locally.

**View Test Results:** Once the tests finish running, Cypress will display the results in an interactive test runner.

## Test Specs:
The test specs are located under **'e2e'** directory. We can add new tests or modify existing ones as per the requirement.

## Test Data:
The test data used to run the test specs is placed in **'benefits.json'** file under **'fixtures'** directory.

## Custom Commands:
The definitions of various custom commands used in the test specs are placed in **'commands.js'** file under **'support'** directory.

## Configuration:
Cypress configuration details are placed in **'cypress.config.js'** file

## package.json:
This file defines project dependencies and scripts.

## Best practices followed in this project

- Test specs are in isolation.
- Log into the application programmatically.
- Tests run independently from one another and still pass.
- Added multiple assertions instead of writing each test with a single assertion.
- A baseUrl is set in Cypress configuration file.
- cy.wait() with arbitary period of time is **not** used anywhere in the specs.
- Custom commands are used to extend the functionality of Cypress.
- Fixtures are used to manage test data separately from test logic.
- Aliases are used to store what commands yield.