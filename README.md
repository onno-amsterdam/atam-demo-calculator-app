# ATAM DEMO CALCULATOR APP

This simple application is to showcase the implementation of a test automation framework using the Awesome Test Automation Manager method developed by Onno van Piggelen. This method allows for the implementation of test automation using BDD, TDD and LEAN.

The method follows these steps:

1. Write the requirements in BDD scenarios;
2. Breakdown the scenarios into test levels using LEAN;
3. Write the automated tests;
4. Implement the code to make the tests pass;

## Test automation breakdown

The scenarios developed for this project were broken down into different test types. Find the Excel file in this project to find out how all the scenario steps are covered in the test automation framework.

## Test automation in this project

Unit test, to run:

```bash
# for the server:
$ npm run test:unit:server
```

Consumer Driven Contract Test, to run:

```bash
# consumer - the webapp
$ npm run test:contract:consumer;

# provider - the server
$ npm run test:contract:provider;
```

FE Integration Test

```bash
# to run the test the webapp must be running, run:
$ npm run startWebApp

# webapp with mocked backend
$ npm run test:fe-integration
```

E2E test

```bash
# to run the test both the webapp and server must be running, run:
$ npm run startServer & npm run startWebApp

# webapp and server
$ npm run test:e2e
```

## KNOWN ISSUES

The current implementation of the contract test using the script files of the webpage fail to run due to node not being able to handle the "export default" in the zcript files. Unable to fix this quickly the files have been copied and the export updated to "module.exports". This allows for the copied script to used in the contract test and the original files in the browser.
