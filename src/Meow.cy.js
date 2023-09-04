import Meow from './Meow.vue'

describe('Meow.vue', () => {
  beforeEach(() => {
    cy.mockGraphQL({
      resolvers: {
        Query: {
          meows: () => [
            { id: '1', text: 'Meow!' },
            { id: '2', text: 'Meow meow!' },
            { id: '3', text: 'Meow meow meow!' },
          ]
        }
      }
    })
  })

  Cypress._.times(100, () => {
    it('loads meows', () => {
      cy.mount(Meow)
      cy.get('li').should('have.length', 3)
    })
  })
})