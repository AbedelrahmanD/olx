import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
