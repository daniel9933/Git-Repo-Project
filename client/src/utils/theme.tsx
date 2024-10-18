import { DarkTheme } from '@react-navigation/native';


export const CustomTheme = {
    ...DarkTheme, // Properly extend the DarkTheme
    colors: {
      ...DarkTheme.colors, // Spread the existing dark theme colors
      background: '#0c0f14', // Customize the background color
    },
  };