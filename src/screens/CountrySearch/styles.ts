import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#6e6178',
  },
  headerView: {
    height: 80,
    backgroundColor: '#e9d5f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    width: 300,
    height: 40,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  closeIcon: {
    height: 20,
    width: 20,
  },
  favIcon: {
    height: 40,
    width: 40,
  },
  placeholderText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 6 },
    textShadowRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  countryCardContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 30,
    borderRadius: 10,
    padding: 16,
  },
  countryCard: {
    padding: 0,
  },
  flagContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    color: '#6e6178',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cardTouchable: {
    flexDirection: 'row',
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
