const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Test the database connection
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL database');
    client.release(); // Release the client when done
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

// Middleware to handle GraphQL requests
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL interface for testing queries
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
