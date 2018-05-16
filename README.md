# Apulum Admin  

`Note: This project, 1% finished. It's in a very early development phase so expect drama.`

A local government CMS, built on a modern stack, with a focus on migrating tedious offline processes online. 

## Roadmap 

`Coming soon`


## Built with

- Node
- yarn
- Typescript
- React
- Mapbox

## Install locally

```
$> git clone https://github.com/civictechro/apulum-admin.git
$> cd apulum-admin
$> npm install
```
## Config 

```
$> cp .env_sample .env.development 
$> vim .env // add your Mapbox token here
```

## Run

```
$> yarn start // starts the server at `https://localhost:3000`.
```

## Tests

Tests are written with Jest, you'll find them in `__tests__` folders or names `foo.test.ts`.

```
$> yarn test
```

## GraphQL Integration
```
$> apollo-codegen introspect-schema http://localhost:4000 --output src/schema.json
$> apollo-codegen generate src/**/**/*.graphql --schema src/schema.json --target typescript --output src/types/graphql-types.ts
```
