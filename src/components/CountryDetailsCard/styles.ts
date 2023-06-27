import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconView: {
    height: 60,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  contentView: {
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#6e6178',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6e6178',
  },
  currencyView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9d5f7',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6e6178',
  },
  favContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
});

export default styles;
