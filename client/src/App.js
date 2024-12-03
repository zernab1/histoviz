import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CountryComparison from './components/CountryComparison';
import CountriesList from './components/CountriesList';
import Country from './components/Country';

function App() {
  return (
      <Router>
          <div>
              {/* Navbar */}
              <nav>
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/countries">Countries</Link></li>
                      <li><Link to="/comparison">Comparison</Link></li>
                  </ul>
              </nav>

              {/* Route definitions */}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/countries" element={<CountriesList />} />
                  <Route path="/country/:id" element={<Country />} />
                  <Route path="/comparison" element={<CountryComparison />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;

