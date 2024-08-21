import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';



const Root = () => {
  return (
    //<ThemeProvider value = {DarkTheme}>
      <slot/>
   // </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f14',
  },
});

