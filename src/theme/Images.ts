import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    icons: {
      close: require('./assets/images/close.png'),
      favorite: require('./assets/images/favIcon.png'),
      country: require('./assets/images/country.png'),
      language: require('./assets/images/language.png'),
      timezone: require('./assets/images/timezone.png'),
      area: require('./assets/images/area.png'),
      population: require('./assets/images/population.png'),
      fav: require('./assets/images/fav.png'),
      unFav: require('./assets/images/unFav.png'),
      whiteBackArrow: require('./assets/images/back.png'),
      countryDark: require('./assets/images/countryDark.png'),
      languageDark: require('./assets/images/languageDark.png'),
      timezoneDark: require('./assets/images/timezoneDark.png'),
      areaDark: require('./assets/images/areaDark.png'),
      populationDark: require('./assets/images/populationDark.png'),
      closeDark: require('./assets/images/closeDark.png'),
    },
  };
}
