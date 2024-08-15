import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInsScreen/SignInScreen';
import SignUpScreen from './src/screens/SignInsScreen/SignUpScreen';

export default function App(){
  return (
    <View style={styles.root}>
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1 ,
    backgroundColor: '#0c0f14',
    justifyContent: 'center',
  },
});

