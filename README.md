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

### Add Typescript typings for queries:

```
$> apollo-codegen introspect-schema ${REACT_APP_GRAPHQL_HOST} --output src/schema.json
$> apollo-codegen generate src/**/**/*.tsx --schema src/schema.json --target typescript --output src/types/graphql-types.ts
```

### Handling fragments 

Since we use union and interface fragment queries, and Apollo has no knowledge of the Graph, we need to feed this information to the Apollo cache, in `index.ts`, since the default heuristic fragment matcher doesn't work for these cases:

```
import { fragmentMatcher } from './utils/fragmentMatcher';

const client = new ApolloClient({
  // config
  cache: new InMemoryCache({ fragmentMatcher })
});
```

The matcher uses a `json` file which is generated from the graph by running `./src/utils/makeIntrospectionFragmentTypes.js`. 

**TODO:** Run this auto-magically in the postinstall step, or at build time.

### Why fragments

Apollo uses a normalized cache, splitting out each item with an id into its own entity in the cache. So it makes sense that mutations would be able to return a `MaybeEntity` union type which may be an error, or it may be the mutated entity:

```
type Foo {
  id
  bar
}

type Error {
  path
  message
}

type MaybeFoo = Foo | Error

Mutation {
  makeFoo(bar): [MaybeFoo!] 
}
```
