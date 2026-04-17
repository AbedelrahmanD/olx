import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    height: 120,
  },
  image: {
    width: 120,
    height: '100%',
    backgroundColor: Colors.lightGray,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.red,
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 4,
  },
  bottomRow: {
    marginTop: 'auto',
  },
  location: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  time: {
    fontSize: 11,
    color: Colors.mediumGray,
    marginTop: 2,
  },
});
