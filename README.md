[![Build Status](https://travis-ci.org/mnzube/Banka.svg?branch=develop)](https://travis-ci.org/mnzube/Banka)
[![Coverage Status](https://coveralls.io/repos/github/mnzube/Banka/badge.svg)](https://coveralls.io/github/mnzube/Banka)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c0570b1713671955908/maintainability)](https://codeclimate.com/github/mnzube/Banka/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7c0570b1713671955908/test_coverage)](https://codeclimate.com/github/mnzube/Banka/test_coverage)


# Description

Banka is a light weight core banking application that powers banking operations

## Documentation
| Resource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/auth/signup | POST | Create a user |
| /api/v1/auth/signin | POST | Log in a contact |
| /api/v1/:accountNumber/debit | POST | Debits an account |
| /api/v1/:accountNumber/credit | POST |Credits an account |
| /api/v1/accounts | POST | Creates an Account |
| /api/v1/accounts | GET | Fetches all Accounts |
| /api/v1/accounts/:id | GET | Fetch a particular Account |
| /api/v1/accounts/:id | PATCH | Updates status of an account |
| /api/v1/accounts/:id | DELETE | Deletes a  message |


## Setup

To clone this repo: in your terminal => use git clone https://github.com/mnzube/Banka.git

Switch to develop branch with => git checkout develop

### Dependencies
```
-node js 
-express

```

### Getting Started

Run npm run dev You should see: "Server started successfully! App Listening on port 3000.

## Testing

Run npm run test to check if tests are passing.
With Postman, test if all endpoints work (Find a list of endpoint in the table at the top of this page)

## Contribute

Any instructions needed to help others contribute to this repository

## Deployment

Clone this repo: in your terminal => use git clone https://github.com/mnzube/Banka.git