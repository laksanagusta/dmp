## Installation

Switch to root folder

cd dmp/

Install all the dependencies using yarn

```
yarn install --frozen-lockfile
```

build

```
yarn build
```

Run application development server

```
yarn dev
```

## Testing API

The api can now be accessed at

    http://localhost:8000/api/v1

Request headers

| **Required** | **Key**       | **Value**        |
| ------------ | ------------- | ---------------- |
| Yes          | Content-Type  | application/json |
| Optional     | Authorization | Token {Bearer}   |

---

## API Docs

```
dmp-docs.postman_collection.json
```

## Additional Information

Please register and login first before accessing API

## Tech Stack

**Database:** PostgreSQL

**Server:** NodeJS

## Authors

- [@laksanagusta](https://www.github.com/laksanagusta)
