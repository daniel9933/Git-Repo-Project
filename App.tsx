import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInsScreen/SignInScreen';

export default function App(){
  return (
    <View style={styles.root}>
      <SignInScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1 ,
    backgroundColor: '#F9FBFC',
    justifyContent: 'center',
  },
});

