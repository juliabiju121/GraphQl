const express = require('express')
//const  expressGraphQL =require('express-graphql')
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
const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'The Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

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

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },

    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books',
            resolve: () => books
        },

    })
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createauthor:{
            type:BookType,
            args:{
                id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent,args)  {
                                books.push({id:books.length + 1,name:args.name,authorId:args.authorId})
                                return args
            }    }
    }
})
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation:Mutation
})

// const schema=new GraphQLSchema({
//   query:new GraphQLObjectType({
//     name:'HelloWorld',
//     fields:() =>({
//        MessageType:{
//             type:GraphQLString,
//             resolve:()=>'helloWorld'
//         }
//     })
//   })
// })
app.use('/graphql', expressGraphQL({

    schema: schema,
    graphiql: true
}))
app.listen(7087, () => console.log('server Running'))
























// var http = require('http');
// //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

// mutation{
//     createauthor(name:"julia",authorId:5){
//       name
//       authorId
      
      
//     }
//   }