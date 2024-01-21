import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

function Button(): React.JSX.Element {
  return (
    <TouchableHighlight>
      <View className="bg-black text-center">
        <Text>Click</Text>
      </View>
    </TouchableHighlight>
  );
}

export default Button;
