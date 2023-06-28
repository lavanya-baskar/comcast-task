import React, { createContext, useState, ReactNode } from 'react';

interface CountryContextProps {
  selectedFavCountry: string;
  setFavCountryName: React.Dispatch<React.SetStateAction<string>>;
}

export interface CountryProviderProps {
  children: ReactNode;
}

export const CountryContext = createContext<CountryContextProps>({
  selectedFavCountry: '',
  setFavCountryName: () => {},
});

export const CountryProvider = ({ children }: CountryProviderProps) => {
  const [selectedFavCountry, setFavCountryName] = useState('');

  return (
    <CountryContext.Provider value={{ selectedFavCountry, setFavCountryName }}>
      {children}
    </CountryContext.Provider>
  );
};
