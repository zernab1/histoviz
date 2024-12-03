// src/components/CountriesList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CountriesList.css';
import countries from '../data/countriesData';

const CountriesList = () => {
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
