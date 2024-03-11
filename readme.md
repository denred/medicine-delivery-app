# ⚕️ Medicine Delivery app

## ℹ️ General Info

This is the repository responsible for Medicine Delivery apps.

## 🏭 Applications

- [Backend](./backend) — Medicine Delivery application backend.

  _To work properly, fill in the **`.env`** file. Use the **`example.env`** file as an example._

- [Frontend](./frontend) — Medicine Delivery application frontend.

  _To work properly, fill in the **`.env`** file. Use the **`example.env`** file as an example._

- [Shared](./shared) — Medicine Delivery application common modules for reuse.

## 🖍 Requirements

- [NodeJS](https://nodejs.org/en/) (20.x.x);
- [NPM](https://www.npmjs.com/) (10.x.x);
- [PostgreSQL](https://www.postgresql.org/) (15.6)
- run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 🏃‍♂️ Simple Start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`cd backend && npm run migrate:dev`**
5. **`cd frontend && npm run start:dev`** then **`cd backend && npm run start:dev`**
6. Enjoy <3
