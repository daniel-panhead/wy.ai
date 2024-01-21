import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import SoraText from '../components/SoraText';
import Logo from '../assets/logo.svg';

function Homescreen(): React.JSX.Element {
  return (
    <View className="w-full flex flex-col items-center">
      <SoraText className="text-lg">Text</SoraText>
      <Logo />
    </View>
  );
}

export default Homescreen;
