# Task App 🙌 [![Build Status](https://app.travis-ci.com/ShubhamBansal1997/optilyz-assignment.svg?branch=master)](https://app.travis-ci.com/ShubhamBansal1997/optilyz-assignment)
___


# Contents

* [Global Requisites](#global-requisites)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)
* [Todo](#Todo)

# Global Requisites

* node (>= 16.3.0)
* mongodb (>= 4.4.6)

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/ShubhamBansal1997/optilyz-assignment.git;

# Goto the cloned project folder.
cd optilyz-assignment;
```

```bash
# Without Docker

# Note: It is pre-assumed here that you have mongoose running in background & you have created the database.

# Install NPM dependencies.
npm install;

# Edit your DotEnv file using any editor of your choice.
# Please Note: You should add all the configurations details
# or else default values will be used!
cp .env.sample .env;
vim .env;

# Run the app
npm run dev;
```

```bash
# With Docker

# Note: It is preassumed here that you have docker running in background

# Run the app in docker as a foreground process
docker-compose up

# Run the app in docker as a background process
docker-compose up -d
```


# List of Routes

```sh
# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /
  POST   | /register
  POST   | /login
  GET    | /me
  GET    | /task
  GET    | /task/:id
  POST   | /task
  PUT    | /task/:id
  DELETE | /task/:id
+--------+-------------------------+
```

# Todo

- [ ] Add tests at the service level
- [ ] Implement Cache to Store tokens
