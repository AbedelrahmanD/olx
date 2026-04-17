import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInfo: {
    marginLeft: 12,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  filterButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterText: {
    marginLeft: 4,
    fontWeight: '600',
    color: Colors.black,
  },
  list: {
    flex: 1,
  },
});
