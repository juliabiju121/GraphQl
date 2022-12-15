const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    graphql,
    GraphQLInt,

} = require('graphql')
const { GraphQLNonNull } = require('graphql/type/definition')
const { GraphQLList } = require('graphql/type/definition')
const app = express()
const AuthorType= require('../index.js')

 const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Root Query',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})
module.exports=BookType