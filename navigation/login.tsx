import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import useAuthentication from '../featues/hooks/useAuthentication';
const Login = () => {
  const { signIn } = useAuthentication()
  const [loginData, setLoginData] = useState({email:"",password:""})
  return (
    <SafeAreaView style={styles.safearea}>
        <View >

          <Text style={styles.title}>Inicio de Sesión</Text>
          <View style={styles.containerInput}>
            <View style={styles.inputGroup}>
              <SimpleLineIcons style={styles.icon} name="user" size={24} color="black" />
              <TextInput 
              style={styles.input} 
              placeholder="USUARIO" 
              onChangeText={(text) => setLoginData({...loginData,email:text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons style={styles.icon} name="key-outline" size={24} color="black" />
              <TextInput 
              style={styles.input} 
              placeholder="CONTRASEÑA" 
              onChangeText={(text) => setLoginData({...loginData,password:text})}
              inputMode='numeric'
              />
            </View>
            <Pressable 
            style={styles.touchable}
            onPress={() => signIn(loginData)}
            >
              <Text style={styles.textbutton}>ingresar</Text>
            </Pressable>
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textbutton: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#272343",
    fontWeight: "600",
  },
  touchable: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#e3f6f5",
    padding: 15,
    boxShadow: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
    marginTop: 30,
  },
  icon: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#272343",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 20
  },
  safearea: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  containerInput: {
    width: "100%",
    gap: 20,

  },
  input: {
    width: "70%",
    paddingTop: 15
  },
})
export default Login