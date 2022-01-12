const {buildSchema} = require('graphql');

module.exports = buildSchema(`

    type Expense{
        _id: String!
        category: String!
        amount: Int!
        description: String!
        date: String!
        userId: String!
        createdAt: String!
        updatedAt: String!
    }

    type User{
        _id: String!
        name: String!
        password: String
        email: String!
        expenses:[Expense!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
        confirmPassword: String!
    }

    type RootQuery{
        hello: String
    }

    type RootMutation{
        createUser(userInput: UserInputData) : User

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)