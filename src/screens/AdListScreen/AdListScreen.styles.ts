import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
  emptyContainer: {
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
