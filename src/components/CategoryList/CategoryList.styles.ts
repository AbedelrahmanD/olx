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
    paddingHorizontal: 12,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.black,
    lineHeight: 14,
  },
});
