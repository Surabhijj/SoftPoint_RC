import React from 'react';
import { Country } from '../types';

interface PhoneInputProps {
  phone: string;
  setPhone: (phone: string) => void;
  selectedCountry: Country | null;
  phonePlaceholder: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ phone, setPhone, selectedCountry, phonePlaceholder }) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const numericInput = rawInput.replace(/\D/g, '');

    const phoneLength = selectedCountry ? Number(selectedCountry.phone_length) : 10;

    if (numericInput.length <= phoneLength) {
      const formatted = formatPhoneNumber(numericInput, phoneLength);
      setPhone(formatted);
    }
  };

  const formatPhoneNumber = (input: string, phoneLength: number) => {
    const numericInput = input.replace(/\D/g, '');

    return numericInput.replace(
      /(\d{1,3})(\d{1,3})?(\d{1,4})?/,
      (_, p1, p2, p3) => {
        let formatted = `(${p1}`;
        if (p2) formatted += `) ${p2}`;
        if (p3) formatted += `-${p3}`;
        return formatted;
      }
    );
  };

  return (
    
    <input
      type="text"
      value={phone}
      onChange={handlePhoneChange}
      placeholder={phonePlaceholder}
      className="phone-input"
      maxLength={selectedCountry ? Number(selectedCountry.phone_length) + 4 : 15}
      required
    />
  
  );
};

export default PhoneInput;
