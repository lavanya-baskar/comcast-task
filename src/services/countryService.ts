import axios from 'axios';

export const fetchCountryData = async (countryName: string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,currencies,flags,languages,area,population,timezones`,
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      // throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    // throw new Error('Something went wrong');
  }
};
