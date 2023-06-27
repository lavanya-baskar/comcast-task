import axios from 'axios';

export const fetchCountryData = async (countryName: string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,currencies,flags,languages,area,population,timezones`,
    );

    if (response.status >= 200 && response.status < 300) {
      // Success: HTTP status code is in the range 200-299
      console.log('......>response', response);
      return response.data;
    } else {
      // Error: HTTP status code is outside the range 200-299
      console.log(`......>Error: ${response.status}`);
      // You can also throw an error to handle it in the calling function
      // throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.log('......>Something went wrong');
    // throw new Error('Something went wrong');
  }
};
