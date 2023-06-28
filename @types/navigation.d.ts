import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  CountrySearchScreen: undefined;
  FavoriteCountryScreen: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
