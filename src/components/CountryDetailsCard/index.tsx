/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-default-props */
// React
import React from 'react';
import { Text, View, Image } from 'react-native';
import { useTheme } from '../../hooks';

// Styles
import styles from './styles';

interface CountryDetailsCardProps {
  /**
   * The `titleText` prop renders the title
   */
  titleText: string;
  /**
   * The `value` prop renders the country details
   */
  value: string;
  /**
   * The `icon` prop renders the icon
   */
  icon?: any;
  /**
   * The `isCurrency` prop check if its currency field or not
   */
  isCurrency?: boolean;
  /**
   * The `currencySymbol` prop contains currency symbol
   */
  currencySymbol?: String;
}

/**
 * CountryDetailsCard Component will render button
 * @param {CountryDetailsCardProps} props
 * @returns {JSX.Element}
 */
const CountryDetailsCard: React.FC<CountryDetailsCardProps> = ({
  titleText = '',
  value = '',
  icon = '',
  isCurrency = false,
  currencySymbol = '',
}) => {
  const { darkMode: isDark } = useTheme();
  return (
    <View style={styles.card}>
      {isCurrency ? (
        <View
          style={[
            styles.currencyView,
            isDark && { backgroundColor: '#6e6178' },
          ]}
        >
          <Text style={[styles.currencySymbol, isDark && { color: 'white' }]}>
            {currencySymbol}
          </Text>
        </View>
      ) : (
        <View style={styles.iconView}>
          <Image source={icon} style={styles.icon} />
        </View>
      )}

      <View style={styles.contentView}>
        <Text style={[styles.value, isDark && { color: 'white' }]}>
          {value}
        </Text>
        <Text
          style={[
            styles.title,
            isDark && { color: 'rgba(255, 255, 255, 0.5)' },
          ]}
        >
          {titleText}
        </Text>
      </View>
    </View>
  );
};

export default CountryDetailsCard;
