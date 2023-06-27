import React, { useState, useEffect, useContext } from "react";
import styles from "./styles";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgUri } from "react-native-svg";
import { ApplicationScreenProps } from "MyApp/@types/navigation";
import { fetchCountryData } from "../../services/countryService";
import { useTheme } from "../../hooks";
import { CountryContext } from "../../services/CountryContext";
import CountryDetailsCard from "../../components/CountryDetailsCard/index";

interface FlagData {
  png: string;
  svg: string;
  alt: string;
}

interface NameData {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

interface CurrencyData {
  name: string;
  symbol: string;
}

interface LanguageData {
  [key: string]: string;
}

interface CountryData {
  flags: FlagData;
  name: NameData;
  currencies: {
    [key: string]: CurrencyData;
  };
  capital: string[];
  languages: LanguageData;
  area: number;
  population: number;
  timezones: string[];
}

const CountrySearchScreen = ({ navigation }: ApplicationScreenProps) => {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState<CountryData[] | null>(null);
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [areaInSquareKilometers, setAreaInSquareKilometers] = useState("");
  const [areaInSquareMiles, setAreaInSquareMiles] = useState("");
  const [isShowPlaceHolder, shouldShowPlaceholder] = useState(true);
  const { selectedFavCountry, setFavCountryName } = useContext(CountryContext);
  const { darkMode: isDark, Images } = useTheme();

  // To Retrieve favorite country list from cache to handle isAddedToFavorite value
  useEffect(() => {
    const retrieveFavoriteCountries = async () => {
      try {
        const storedFavoriteCountries = await AsyncStorage.getItem(
          "favoriteCountries"
        );
        if (storedFavoriteCountries) {
          setFavoriteCountries(JSON.parse(storedFavoriteCountries));
        }
      } catch (error) {
        // Handle error
      }
    };
    retrieveFavoriteCountries(); // Call the function during initial render
    const onScreenFocus = () => {
      retrieveFavoriteCountries(); // Call the function when screen is focused
    };
    // Subscribe to the focus event
    const unsubscribe = navigation.addListener("focus", onScreenFocus);
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigation]);

  // To get currency and area info after getting response from API
  useEffect(() => {
    if (countryData) {
      getCurrency();
      getArea();
    }
  }, [countryData]);


  // To clear search input field if countryName is empty
  useEffect(() => {
    if (countryName == "") {
      clearSearch();
    }
  }, [countryName]);

  // To show country details if user select any country from favorite list based on selectedFavCountry context value
  useEffect(() => {
    if (selectedFavCountry !== "") {
      showCountryDetails(selectedFavCountry);
    }
  }, [selectedFavCountry]);

  // Set country data selectedFavCountry value gets changed 
  const showCountryDetails = async (countryName: string) => {
    setCountryName(selectedFavCountry);
    const cachedData = await retrieveData(countryName);
    setIsAddedToFavorite(true);
    if (cachedData) {
      setCountryData(cachedData);
    }
  };

  // retrieve country data from API or cache
  const handleSearch = async () => {
    setCountryData(null);
    if (countryName !== "") {
      setIsLoading(true);
      try {
        const cachedData = await retrieveData(countryName);
        const isCountryFavorite = favoriteCountries.includes(countryName);
        setIsAddedToFavorite(isCountryFavorite);
        if (cachedData) {
          setCountryData(cachedData);
        } else {
          const data = await fetchCountryData(countryName);
          if (data !== undefined) {
            setCountryData(data);
            await storeData(countryName, data);
          }
        }
        setIsLoading(false);
        shouldShowPlaceholder(false);
      } catch (error) {
        Alert.alert("Error", "Something went wrong.");
        setIsLoading(false);
        shouldShowPlaceholder(false);
      }
    }
  };

  // Reset fields
  const clearSearch = () => {
    setCountryName("");
    setCountryData(null);
    shouldShowPlaceholder(true);
  };

  // Get and formate language
  const getLanguages = () => {
    if (countryData && countryData.length > 0) {
      const languages = Object.values(countryData[0].languages);
      return languages.join(", ");
    }
    return "";
  };

  // Get and formate currency value
  const getCurrency = () => {
    if (countryData && countryData.length > 0) {
      const currencies = countryData[0].currencies;
      const currencyCode = Object.keys(currencies)[0];
      setCurrencyName(currencies[currencyCode].name);
      setCurrencySymbol(currencies[currencyCode].symbol);
    }
    return "";
  };

  // Get and calculate Area in km and miles
  const getArea = () => {
    if (countryData && countryData.length > 0) {
      const area = countryData[0].area;
      setAreaInSquareKilometers(area.toFixed(2));
      setAreaInSquareMiles((area * 0.386102).toFixed(2));
    }
    return "";
  };

  // Add API response to local cache
  const storeData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Handle error
    }
  };

  // Retrieve search result by local cache
  const retrieveData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data != null ? JSON.parse(data) : null;
    } catch (error) {
      // Handle error
      return null;
    }
  };

  // Add or remove favorite country to cache
  const handleAddToFavorite = async () => {
    try {
      if (!countryData) {
        return;
      }
      const countryName = countryData[0].name.common;
      const isCountryFavorite = favoriteCountries.includes(countryName);
      let updatedFavoriteCountries = [...favoriteCountries];
      if (isCountryFavorite) {
        // Remove the country from the favorite list
        updatedFavoriteCountries = updatedFavoriteCountries.filter(
          (country) => country !== countryName
        );
      } else {
        // Add the country to the favorite list
        updatedFavoriteCountries.push(countryName);
      }
      setFavoriteCountries(updatedFavoriteCountries);
      setIsAddedToFavorite(!isCountryFavorite);

      // Store the updated favorite country list in storage
      await AsyncStorage.setItem(
        "favoriteCountries",
        JSON.stringify(updatedFavoriteCountries)
      );
    } catch (error) {
      // Handle error
    }
  };

  // Navigate to favorite country list screen
  const navigateToFavList = () => {
    clearSearch();
    setFavCountryName("");
    navigation.navigate("FavoriteCountryScreen", { country: "countryName" });
  };

  return (
    <SafeAreaView
      style={[styles.containerStyle, isDark && { backgroundColor: "#0f0614" }]}
    >
      <View
        style={[
          styles.containerStyle,
          isDark && { backgroundColor: "#0f0614" },
        ]}
      >
        <View
          style={[styles.headerView, isDark && { backgroundColor: "#6e6178" }]}
        >
          <View
            style={[
              styles.inputContainer,
              isDark && {
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 0.6)",
                borderWidth: 1,
              },
            ]}
          >
            <TextInput
              placeholder="Enter a country name"
              placeholderTextColor={"#999c9e"}
              style={[styles.textInput, isDark && { color: "white" }]}
              value={countryName}
              onChangeText={setCountryName}
              onEndEditing={handleSearch}
              maxLength={100}
              autoCorrect={false}
            />
            {countryName !== "" && (
              <TouchableOpacity onPress={clearSearch}>
                <Image
                  source={isDark ? Images.icons.closeDark : Images.icons.close}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={navigateToFavList}>
            <Image source={Images.icons.favorite} style={styles.favIcon} />
          </TouchableOpacity>
        </View>
        {countryData ? (
          <View
            style={[
              styles.countryCardContainer,
              isDark && {
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: 0.6,
              },
            ]}
          >
            <ScrollView style={styles.countryCard}>
              <View style={styles.headerView1}>
                <View style={styles.flagContainer}>
                  <SvgUri
                    width="100"
                    height="100"
                    uri={countryData[0].flags.svg}
                  />
                </View>
                <Text
                  style={[styles.countryName, isDark && { color: "white" }]}
                >
                  {countryData[0].name.common}
                </Text>
              </View>
              <CountryDetailsCard
                titleText={"Capital"}
                value={countryData[0].capital[0]}
                icon={isDark ? Images.icons.countryDark : Images.icons.country}
              />
              <CountryDetailsCard
                titleText={"Population"}
                value={countryData[0].population.toLocaleString()}
                icon={
                  isDark ? Images.icons.populationDark : Images.icons.population
                }
              />
              <CountryDetailsCard
                titleText={"Area"}
                value={`${areaInSquareKilometers} km² \n${areaInSquareMiles} sq mi`}
                icon={isDark ? Images.icons.areaDark : Images.icons.area}
              />
              <CountryDetailsCard
                titleText={"Languages spoken"}
                value={getLanguages()}
                icon={
                  isDark ? Images.icons.languageDark : Images.icons.language
                }
              />
              <CountryDetailsCard
                titleText={"Timezone(s)"}
                value={countryData[0].timezones.join(", ")}
                icon={
                  isDark ? Images.icons.timezoneDark : Images.icons.timezone
                }
              />
              <CountryDetailsCard
                titleText={"Currency"}
                value={currencyName}
                isCurrency={true}
                currencySymbol={currencySymbol}
              />
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={handleAddToFavorite}
                  style={styles.cardTouchable}
                >
                  <View style={styles.iconView}>
                    <Image source={Images.icons.fav} style={styles.icon} />
                  </View>
                  <View style={styles.favContainer}>
                    <Text style={[styles.value, isDark && { color: "white" }]}>
                      {isAddedToFavorite
                        ? "Remove to favorite"
                        : "Add to favorite"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.placeholderText}>
                {isShowPlaceHolder
                  ? "Explore countries by searching their names"
                  : "No country found"}
              </Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CountrySearchScreen;
