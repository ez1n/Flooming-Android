import { NativeRouter, Routes, Route } from "react-router-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './components/main';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
      <Routes>
      <Route path='/' element={<Main />}></Route>
      <StatusBar style="auto" />
      </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
