import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
    marginLeft: 8,
    marginRight: 8,
  },
  listHeader: {
    paddingTop: 12,
  },
  filterBar: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    marginRight: 8,
    marginLeft: 8,
    maxWidth: 150,
  },
  filterChipText: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 4,
  },
  statusRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  showingText: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '600',
  },
  sortButton: {
    alignItems: 'center',
  },
  sortText: {
    fontSize: 12,
    color: Colors.primary,
    marginRight: 4,
    marginLeft: 4,
    fontWeight: '600',
  },
  eliteSectionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  eliteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  viewMore: {
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
