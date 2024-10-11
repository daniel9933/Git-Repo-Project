import React from 'react';
import { Stack } from 'expo-router';
import {ThemeProvider } from '@react-navigation/native';
import { CustomTheme } from '../src/utils/theme';

export default function Root(){

  return (
    <ThemeProvider value = {CustomTheme}>
      <Stack/>
    </ThemeProvider>
  )
}

