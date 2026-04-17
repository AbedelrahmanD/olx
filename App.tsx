import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import { FilterProvider } from './src/context/FilterContext';

function App() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </FilterProvider>
    </LanguageProvider>
  );
}

export default App;
