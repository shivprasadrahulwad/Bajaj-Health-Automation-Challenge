# Bajaj-Health-Automation-Challenge


## Introduction

This repository contains a test suite for validating various scenarios of an API designed for creating users. It includes tests for valid and invalid user creation, handling of duplicate entries, and security considerations.

## Getting Started

### Clone the Repository


#### Environment Setup
Ensure that Node.js is installed on your system. You will also need the following dependencies:

axios: HTTP client for making API requests
express: Node.js framework for building the test server

## Installation
Install the necessary dependencies by running:npm install

## Running the Server
Start the server by executing:node app.js

## Running Tests
Open a browser and visit http://localhost:3000/run-tests to execute all test cases.

## Test Cases Overview
The test suite includes several test cases to validate different scenarios:

Valid user creation: Tests valid user creation with unique phone and email.
Duplicate phone number: Checks if the API prevents users with the same phone number.
Missing required fields: Tests when firstName, lastName, phoneNumber, or emailId are missing.
Invalid email format: Tests when the email format is invalid.
SQL Injection attempt: Ensures that the API handles potential SQL injections securely.
Long input strings: Tests the API’s behavior with extremely long strings in name fields

## Test Output
After running the tests, the results will be displayed in the terminal or browser. The output includes the HTTP response status and the success/failure of each test case.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Node.js
Express
Axios

To get started, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>

