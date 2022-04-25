import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { defaultStyles } from 'config/styles';

interface IAppText extends TextProps {
  style?: StyleProp<TextStyle>;
}

export default function AppText({ style, ...rest }: IAppText) {
  return (
    <Text style={[defaultStyles.text, style]} {...rest}>
      {rest.children}
    </Text>
  );
}
