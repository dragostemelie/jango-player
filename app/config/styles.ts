import { Platform, StyleSheet } from 'react-native';

const colors = {
  primary: '#FFF',
  secondary: '#A0A0A2',
  distinctYellow: '#EAAE14',
  accentYellow: '#FF8000',
  darkBlack: '#1E2025',
  activeBlack: '#212328',
  highlightBlack: '#34363B',
  linerBlack: '#4D4F53',
  selectedGrey: '#292A30',
};

const defaultStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: '500',
    color: colors.primary,
  },
});

export { colors, defaultStyles };
