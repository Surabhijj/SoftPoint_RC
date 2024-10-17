import React from 'react';
import { Country } from '../types';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country | null;
  onCountryChange: (country: Country) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
  isDropdownOpen,
  setIsDropdownOpen,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <>
    <div className="country-code-box">
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedCountry && (
          <img
            src={`https://flagcdn.com/16x12/${selectedCountry.country_code.toLowerCase()}.png`}
            alt={selectedCountry.name}
            className="flag-icon"
          />
        )}
        &nbsp;
        <span className="calling-code">{selectedCountry?.calling_code || '+1'}</span>
        </div>
      
        <div>
      {isDropdownOpen && (
        <div className="dropdown">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search country"
            className="search-input"
          />
          <ul className="dropdown-list">
            {countries.map((country) => (
              <li
                key={country.id}
                onClick={() => onCountryChange(country)}
                className="dropdown-item"
              >
                <img
                  src={`https://flagcdn.com/16x12/${country.country_code.toLowerCase()}.png`}
                  alt={country.name}
                  className="flag-icon"
                />
                <span className="country-name">{country.name}</span>
                <span className="calling-code">({country.calling_code})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      </div>
    </>
  );
};

export default CountrySelector;
