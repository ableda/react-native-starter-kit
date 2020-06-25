import { StyleSheet } from 'react-native';

const buttonSize = 100;

export default StyleSheet.create({
  homeButton: {
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
  },
  menuButton: {
    // padding: '10%',
    borderRadius: 3,
    width: 125,
  },
});
