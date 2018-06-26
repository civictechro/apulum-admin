#! /bin/bash

apollo-codegen introspect-schema http://localhost:4000 --output src/schema.json
apollo-codegen generate src/modules/**/**/*.tsx --schema src/schema.json --target typescript --output src/types/graphql-types.ts
