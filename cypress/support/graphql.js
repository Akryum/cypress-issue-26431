/// <reference types="cypress" />

import { execute, parse } from 'graphql'
import { buildSchemaFromTypeDefinitions, addResolversToSchema } from '@graphql-tools/schema'
import { schema as schemaDefinition } from './schema.js'

Cypress.Commands.add('mockGraphQL', ({
  resolvers = {}, delay = 0,
} = {}) => {
  const schema = buildSchemaFromTypeDefinitions(schemaDefinition)

  const mockedSchema = addResolversToSchema({
    schema,
    resolvers,
  })

  async function processGraphQLRequest (req) {
    const {
      operationName,
      query,
      variables,
    } = req.body
    req.alias = operationName

    let parsedQuery
    try {
      parsedQuery = parse(query)
    } catch (e) {
      console.error(`Error parsing query: ${e.message}`)
      console.log(req)
      throw e
    }

    const result = await execute({
      schema: mockedSchema,
      document: parsedQuery,
      variableValues: variables,
    })
    if (result.errors) {
      for (const error of result.errors) {
        console.error(error?.stack || error)
      }
    }
    return result
  }

  cy.intercept('POST', /\/graphql/, async (req) => {
    try {
      const result = await processGraphQLRequest(req)

      if (delay) {
        await new Promise(resolve => setTimeout(() => resolve(), delay))
      }

      req.reply({
        body: result,
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  })
})
