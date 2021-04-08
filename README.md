# CQRS Project Overview
[![Run test Jest](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/runTest.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/runTest.yml)
[![Build](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/build.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/build.yml)
[![Linter + Prettier](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/linterAndFormatter.yml/badge.svg)](https://github.com/CS-DesignParLesTests/cqrs-sample/actions/workflows/linterAndFormatter.yml)


The goal is to create an application similar to [AppBubble](https://www.appbubble.co/).
This application aims to manage your own library at home, so that you won't forget what you have !
You can manage your books through different features such as books that you own, books that you lend, or books that were signed.

You can also get informations about books that were published but that you don't own yet.

## ROADMAP

* Create a super class **Book**
* Manage different **Users**
* Implement the features following CQRS principles & using TDD
* Apply code style and static code analysis with ESLint & Prettier
* Take advantage of GitHub Actions to enforce quality thanks to tests & lint rules
* Docker?
* Front-end with available time
* Check how to implement PostgreSQL with TypeORM and MongoDB with Mongoose
* Generate OpenAPI Specification

### Features

* Owned books
* Lent books
* Signed books
* Missing books from books series
* Favorites books
* Subscribe to related news about peculiar book
