import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeeef',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#002f34',
    textAlign: 'center',
  },
  list: {
    paddingVertical: 0,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeeef',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f4f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  nameWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
  },
  subText: {
    fontSize: 11,
    color: '#666',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  regionBadge: {
    backgroundColor: '#e1f5fe',
  },
  cityBadge: {
    backgroundColor: '#e8f5e9',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  regionBadgeText: {
    color: '#01579b',
  },
  cityBadgeText: {
    color: '#2e7d32',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#00a49f',
    fontSize: 14,
  }
});
