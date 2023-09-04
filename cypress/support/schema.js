import gql from 'graphql-tag'

export const schema = gql`
type Meow {
  id: ID!
  text: String!
}

type Query {
  meows: [Meow!]!
}
`
