// src/components/Country.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Country = () => {
  const { id } = useParams(); // Get country ID from the route parameters
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                country(id: ${id}) {
                  id
                  name
                  population
                }
              }
            `,
          }),
        });
        
        const result = await response.json();
        setCountry(result.data.country);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country:', error);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]); // Re-run the effect when `id` changes

  if (loading) {
    return <p>Loading country data...</p>;
  }

  return country ? (
    <div>
      <h1>{country.name}</h1>
      <p>Population: {country.population}</p>
    </div>
  ) : (
    <p>No country data available.</p>
  );
};

export default Country;
