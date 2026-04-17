import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    width: 200,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.red,
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
    fontWeight: '500',
    height: 36, // For 2 lines
  },
  paramsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  paramItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paramText: {
    fontSize: 11,
    color: Colors.darkGray,
    marginLeft: 4,
  },
  location: {
    fontSize: 11,
    color: Colors.mediumGray,
    marginBottom: 4,
  },
  time: {
    fontSize: 11,
    color: Colors.mediumGray,
  },
});
