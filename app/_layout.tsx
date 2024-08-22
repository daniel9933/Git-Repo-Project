import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';


const CustomTheme = {
  ...DarkTheme, // Properly extend the DarkTheme
  colors: {
    ...DarkTheme.colors, // Spread the existing dark theme colors
    background: '#0c0f14', // Customize the background color
  },
};

export default function Root(){

  return (
    <ThemeProvider value = {CustomTheme}>
      <Stack>
        <Slot/>
      </Stack>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f14',
  },
});

