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

    type AuthData{
        token: String!
        user: User!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
        confirmPassword: String!
    }

    type RootQuery{
        login(email: String! , password: String!): AuthData
    }

    type RootMutation{
        createUser(userInput: UserInputData) : User

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)