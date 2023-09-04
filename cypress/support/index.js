import { mount } from 'cypress/vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './graphql.js'

Cypress.Commands.add('mount', (component, args = {}) => {
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push({
    install (app) {
      const apolloClient = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache(),
      })
      app.provide(DefaultApolloClient, apolloClient)
    }
  })
  return mount(component, args)
})
