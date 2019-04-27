[![Build Status](https://travis-ci.org/mnzube/Banka.svg?branch=develop)](https://travis-ci.org/mnzube/Banka)
[![Coverage Status](https://coveralls.io/repos/github/mnzube/Banka/badge.svg)](https://coveralls.io/github/mnzube/Banka)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c0570b1713671955908/maintainability)](https://codeclimate.com/github/mnzube/Banka/maintainability)



# Description

Banka is a light weight core banking application that powers banking operations

## Documentation
| Methods         | Endpoints             | Descriptions  |
| :------------- | :--------------------| :-----|
| POST          |  /api/v1/auth/signup  |Register a client |
| POST          |  /api/v1/auth/signin  |Sign in a client |
| POST          |  /api/v1/accounts     |Create a Bank account|
| PATCH         |  /api/v1/accounts/:accountNumber |Activate or deactivate a Bank account|
| DELETE        |  /api/v1/accounts/:accountNumber | Delete a specific Bank account      |
| POST          |  /api/v1/transactions/:accountNumber/debit |Debit a Bank account       |
| POST          |  /api/v1/transactions/:accountNumber/credit | Credit a Bank account    |
| GET           |  /api/v1/accounts/:accountNumber/transactions |View an account’s transaction history|
| GET           | /api/v1/transactions/:transactionId |View a specific transaction |
| GET           | /api/v1/user/email/accounts |View all accounts owned by a specific user (client) |
| GET           | /api/v1/accounts/account-number | View a specific account’s details |
| GET           | /api/v1/accounts | View a list of all bank accounts |
| GET           | /api/v1/accounts/type/account/?status=active | View a list of all active bank accounts |
| GET           | /api/v1/accounts/type/account/?status=dormant | View a list of all dormant bank accounts |

## Setup

Clone the repository into your machine
git clone https://github.com/mnzube/Banka.git

Install dependencies
```
npm install

Start the server

npm run dev
```

### Dependencies
```
-node js 
-express

```

### Features
```
-A user (client) can sign up

-A user (client) can login

-A user (client) can create an account

-A user (client) can view account transaction history

-A user (client) can view a specific account transaction

-A staff (cashier) can debit user (client) account

-A staff (cashier) can credit user (client) account

-An admin/staff can view all user accounts

-An admin/staff can view a specific user 
account

-An admin/staff can activate or deactivate an account

-An admin/staff can delete a specific user account

-An admin can create staff and admin user accounts
```
## Testing
Clone the repository into your machine
git clone https://github.com/mnzube/banka.git

Install dependencies
```
npm install

Run Tests

npm test
```
## Contributors
```
Opeoluwa Iyi-Kuyoro

Stephen Byarugaba
```
## Deployment
gh-pages
```
http://mnzube.github.io/Banka

```
Heroku
```
https://aknab.herokuapp.com/

```
## API Documentation 
```
https://aknab.herokuapp.com/api-docs/
```

## Author
```
Michael Nzube
```
