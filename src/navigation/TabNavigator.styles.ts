import { StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

export const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  sellButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  sellButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    borderWidth: 4,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
