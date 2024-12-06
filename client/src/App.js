import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CountryComparison from './components/CountryComparison';
import CountriesList from './components/CountriesList';
import Country from './components/Country';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
          <Link to="/" className="logo">HistoViz</Link>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/countries">Countries</Link></li>
              <li><Link to="/comparison">Comparison</Link></li>
            </ul>
          </div>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<CountriesList />} />
          <Route path="/country/:id" element={<Country />} />
          <Route path="/comparison" element={<CountryComparison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

