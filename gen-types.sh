#! /bin/bash

apollo-codegen introspect-schema https://karman-graphql-api.herokuapp.com/ --output src/schema.json
apollo-codegen generate src/queries/*.ts --schema src/schema.json --target typescript --output src/types/graphql-shared-types.ts
apollo-codegen generate src/modules/**/**/*.tsx --schema src/schema.json --target typescript --output src/types/graphql-types.ts
