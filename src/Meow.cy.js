import Meow from './Meow.vue'

describe('Meow.vue', () => {
  let meows = []

  beforeEach(() => {
    cy.mockGraphQL({
      resolvers: {
        Query: {
          meows: () => meows,
        },
      },
    })
  })

  it('loads meows', () => {
    meows = [
      { id: '1', text: 'Meow!' },
      { id: '2', text: 'Meow meow!' },
      { id: '3', text: 'Meow meow meow!' },
    ]
    cy.mount(Meow)
    cy.get('li').should('have.length', 3)
  })

  it('no meows', () => {
    meows = []
    cy.mount(Meow)
    cy.get('li').should('have.length', 0)
  })

  it('one meow', () => {
    meows = [
      { id: '1', text: 'Meow!' },
    ]
    cy.mount(Meow)
    cy.get('li').should('have.length', 1)
  })

  it('one more meow', () => {
    meows = [
      { id: '2', text: 'Meow meow!' },
    ]
    cy.mount(Meow)
    cy.get('li').should('have.length', 1)
  })

  it('no meows again', () => {
    meows = []
    cy.mount(Meow)
    cy.get('li').should('have.length', 0)
  })

  it('loads meows again?', () => {
    meows = [
      { id: '1', text: 'Meow!' },
      { id: '2', text: 'Meow meow!' },
      { id: '3', text: 'Meow meow meow!' },
    ]
    cy.mount(Meow)
    cy.get('li').should('have.length', 3)
  })
})