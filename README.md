# CQRS Project Overview
[![Run test Jest](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/runTest.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/runTest.yml)
[![Build](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/build.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/build.yml)
[![Linter + Prettier](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/linterAndFormatter.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/linterAndFormatter.yml)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

The goal is to create an application similar to [AppBubble](https://www.appbubble.co/).
This application aims to manage your own library at home, so that you won't forget what you have !
You can manage your books through different features such as books that you own, books that you lend, or books that were signed.

You can also get informations about books that were published but that you don't own yet.

## ROADMAP

- [X] Create a super class **Book**
- [X] Manage different **Users**
- [X] Implement the features following CQRS principles & using TDD
- [X] Apply code style and static code analysis with ESLint & Prettier
- [X] Take advantage of GitHub Actions to enforce quality thanks to tests & lint rules
- [X] Docker
- [X] Check and implement PostgreSQL with TypeORM and MongoDB with Mongoose
- [X] Generate OpenAPI Specification
- [ ] Front-end with available time
- [ ] End-to-end testing 

### Features

- [X] Owned books
- [X] Lent books
- [X] Signed books
- [ ] Missing books from books series
- [ ] Favorites books
- [ ] Subscribe to related news about peculiar book
