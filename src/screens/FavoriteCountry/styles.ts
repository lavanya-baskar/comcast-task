import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    height: 80,
    backgroundColor: '#6e6178',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 16,
  },
  cardView: {
    height: 70,
    backgroundColor: '#e9d5f7',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryText: {
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    padding: 16,
    flex: 1,
  },
  closeIcon: {
    height: 20,
    width: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
