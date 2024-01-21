import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import SoraText from './SoraText';

function Button({children}): React.JSX.Element {
  return (
    <TouchableHighlight>
      <View className="bg-sea-green py-4 px-3 rounded-3xl">
        <SoraText className="text-center text-lg font-semibold text-light-light-green drop-shadow-lg">
          {children}
        </SoraText>
      </View>
    </TouchableHighlight>
  );
}

export default Button;
