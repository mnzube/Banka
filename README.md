[![Build Status](https://travis-ci.org/mnzube/Banka.svg?branch=develop)](https://travis-ci.org/mnzube/Banka)
[![Coverage Status](https://coveralls.io/repos/github/mnzube/Banka/badge.svg)](https://coveralls.io/github/mnzube/Banka)
# Banka
The light weight core banking application that powers banking operations
## Documentation
| Resource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/accounts | GET | Fetch all accounts |
| /api/v1/accounts/:id | GET | Fetch a specific account |
| /api/v1/accounts/ | POST | Cearte an account |
| /api/v1/accounts/:id | PATCH | Fetch Activate or deactivate an account |
| /api/v1/transactions/:id/debit | POST | Debits an account |
| /api/v1/transactions/:id/credit | POST | Credits an account |
| /api/v1/auth/signup | POST | Create a  user |
| /api/v1/auth/signin | POST | Log in a user |
| /api/v1/auth/signin | DELETE | Deletes an account |

## Setup

Step by step instructions on how to get the code setup locally. This may include:

### Dependencies
```
-node js 
-express
```

### Getting Started

List of steps to get started (e.g. clone repo, submodule, .env file, etc)

## Testing

Step by step instructions on how to run the tests so that the developer can be sure they've set up the code correctly

## Contribute

Any instructions needed to help others contribute to this repository

## Deployment

Step by step instructions so that the developer can understand how code gets updated
