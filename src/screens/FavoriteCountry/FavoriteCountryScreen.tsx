/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from 'MyApp/@types/navigation';
import { CountryContext } from '../../services/CountryContext';

const FavoriteCountryScreen = ({ navigation }: ApplicationScreenProps) => {
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const { selectedFavCountry, setFavCountryName } = useContext(CountryContext);
  const { darkMode: isDark, Images } = useTheme();

  // Retrieve favorite country list from local cache during initial render
  useEffect(() => {
    retrieveFavoriteCountries();
  }, []);

  // Retrieve favorite country list from local cache
  const retrieveFavoriteCountries = async () => {
    try {
      const storedFavoriteCountries = await AsyncStorage.getItem(
        'favoriteCountries',
      );
      if (storedFavoriteCountries) {
        setFavoriteCountries(JSON.parse(storedFavoriteCountries));
      }
    } catch (error) {
      // handle error
    }
  };

  // Remove country from favorite list and update to local cache
  const removeCountryFromFav = async (countryName: string) => {
    try {
      let updatedFavoriteCountries = [...favoriteCountries];
      updatedFavoriteCountries = updatedFavoriteCountries.filter(
        country => country !== countryName,
      );
      setFavoriteCountries(updatedFavoriteCountries);
      await AsyncStorage.setItem(
        'favoriteCountries',
        JSON.stringify(updatedFavoriteCountries),
      );
    } catch (error) {
      // handle error
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.cardView,
        isDark && {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderColor: 'white',
          borderWidth: 0.5,
        },
      ]}
      onPress={() => {
        setFavCountryName(item);
        navigation.goBack();
      }}
    >
      <Text style={[styles.countryText, isDark && { color: 'white' }]}>
        {item}
      </Text>
      <TouchableOpacity onPress={() => removeCountryFromFav(item)}>
        <Image
          source={isDark ? Images.icons.closeDark : Images.icons.close}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.containerStyle, isDark && { backgroundColor: '#0f0614' }]}
    >
      <View
        style={[
          styles.containerStyle,
          isDark && { backgroundColor: '#0f0614' },
        ]}
      >
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.icons.whiteBackArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Favorites</Text>
        </View>
        <View style={styles.list}>
          {favoriteCountries.length > 0 ? (
            <FlatList
              data={favoriteCountries}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyMessage, isDark && { color: 'white' }]}>
                No favorite countries found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteCountryScreen;
