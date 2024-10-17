
import React, { useEffect, useState } from 'react';
import CountrySelector from './components/CountrySelector.tsx';
import PhoneInput from './components/PhoneInput.tsx';
import { fetchCountries, submitPhoneNumber } from './apiServices.ts';
import { Country } from './types.ts';
import '../assets/styles/PhoneNumberForm.css';

const PhoneNumberForm: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [phonePlaceholder, setPhonePlaceholder] = useState<string>('(000)-000-0000');

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setSelectedCountry(data[2]);
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setPhonePlaceholder(generatePhonePlaceholder(selectedCountry.phone_length));
    }
  }, [selectedCountry]);

  const generatePhonePlaceholder = (phoneLength: string) => {
    const length = Number(phoneLength);
    if (length == 10) {
      return "(000)-000-0000";
    }
    return Array(length).fill("0").join("").replace(/(\d{1,3})(\d{1,3})?(\d{1,4})?/, (_, p1, p2, p3) => {
      let formatted = `(${p1}`;
      if (p2) formatted += `)-${p2}`;
      if (p3) formatted += `-${p3}`;
      return formatted;
    });
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setPhone('');
    setSearchTerm('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCountry) {
      await submitPhoneNumber(phone, selectedCountry.id);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="phone-form">
        <div className="input-group">
          <CountrySelector
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <PhoneInput
            phone={phone}
            setPhone={setPhone}
            selectedCountry={selectedCountry}
            phonePlaceholder={phonePlaceholder}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PhoneNumberForm;
