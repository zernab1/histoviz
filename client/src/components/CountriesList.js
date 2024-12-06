// src/components/CountriesList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CountriesList.css'; 

const CountriesList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `
                            query {
                                countries {
                                    id
                                    name
                                    population
                                }
                            }
                        `,
                    }),
                });

                const result = await response.json();

                if (result.errors) {
                    throw new Error(result.errors.map(err => err.message).join(', '));
                }

                setCountries(result.data.countries);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCountries();
    }, []); // Empty dependency array to run once on mount

    if (loading) {
        return <p>Loading countries list...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Countries List</h2>
            <div className="countries-container">
                {countries.map(country => (
                    <Link 
                        key={country.id} 
                        to={`/country/${country.id}`}
                        className="country-card"
                    >
                        <h3>{country.name}</h3>
                        <p>Population: {country.population.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CountriesList;
