const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const db = require('./config/keys').mongoURI;

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');


const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');


const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log('DB connected'))
//     .catch(err => console.log(err));

const app = express();

const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true
}

app.use(cors(corsOptions));

app.use(
    '/graphiql', 
    graphiqlExpress({
    endpointURL: '/graphql'
}));

app.use(
    '/graphql',
    bodyParser.json(), 
    graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
