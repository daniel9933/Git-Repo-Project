import React from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Root from './_layout';


export default function index(){
  return <Redirect href = "sign-in" />
}

