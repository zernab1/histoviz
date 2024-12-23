const { 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList
} = require('graphql');

const pool = require('../db');

// Define your Country type
const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        population: { type: GraphQLInt },
        // Add more fields as needed
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // single country query
        country: {
            type: CountryType,
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args) {
                const result = await pool.query('SELECT * FROM countries WHERE id = $1', [args.id]);
                return result.rows[0];
            }
        },
        // all countries query
        countries: {
            type: new GraphQLList(CountryType), // list of CountryType objects
            async resolve() {
                try {
                    const result = await pool.query('SELECT * FROM countries');
                    return result.rows;
                } catch (error) {
                    console.error('Error fetching countries:', error);
                    throw new Error('Could not fetch countries');
                }
            }
        }
        // Add more queries as needed
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCountry: {
            type: CountryType,
            args: {
                name: { type: GraphQLString },
                population: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                const result = await pool.query('INSERT INTO countries (name, population) VALUES ($1, $2) RETURNING *', [args.name, args.population]);
                return result.rows[0];
            }
        },
        // Add more mutations as needed
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
