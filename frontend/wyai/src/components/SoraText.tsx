import {styled} from 'nativewind';
import React from 'react';
import {Text} from 'react-native';

const StyledText = styled(Text);

function SoraText({
  children,
  style,
}: {
  children: React.JSX.Element;
  style?: any;
}): React.JSX.Element {
  return (
    <StyledText style={[style, {fontFamily: 'Sora'}]}>{children}</StyledText>
  );
}

export default SoraText;
