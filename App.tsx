// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View , StatusBar} from 'react-native';
import { RootNavigator } from './navigation';
import { GlobalContextProvider } from './featues/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import type {StatusBarStyle} from 'react-native';
export default function App(): JSX.Element[] | JSX.Element {

  const STYLES = ['default', 'dark-content', 'light-content'] as const;
  const [stylesBar, setStylesBar] = useState<StatusBarStyle>(STYLES[0])
  return (
    <GlobalContextProvider>
      {/* <SafeAreaView>  */}
      
        <StatusBar 
        backgroundColor={'#3e4040'} 

        barStyle={'light-content'}
        animated={true}
        />
        <GestureHandlerRootView style={styles.container}> 
        {/* <StatusBar backgroundColor="red"/> */}

          <RootNavigator />
        </GestureHandlerRootView>
      {/* </SafeAreaView>  */}
    </GlobalContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    // alignContent: 'center',
    // justifyContent: 'center',
  },
});
