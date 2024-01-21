/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from './src/pages/Homescreen';
import {StyledComponent} from 'nativewind';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer className="flex-1 bg-blue-400">
      <Stack.Navigator className="flex-1">
        <Stack.Screen name="Homescreen" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
