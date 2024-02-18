import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Pressable style={styles.touchable}
          onPress={() => {
            navigation.navigate("Drawer Asistencia")
          }}
        >
          <View style={styles.productAsistencia}>
            <MaterialCommunityIcons style={styles.icon} name="calendar-account-outline" size={24} color="black" />
          </View>
          <Text style={styles.text}>Asistencia</Text>
        </Pressable>
        <Pressable style={styles.touchable} >
          <View style={styles.productNotas}>
            <AntDesign style={styles.icon} name="book" size={24} color="black" />
          </View>
          <Text style={styles.textDisabled}>Notas</Text>
        </Pressable>
        <Pressable style={styles.touchable} >
          <View style={styles.productNotas}>
            <MaterialCommunityIcons style={styles.icon} name="food-variant" size={24} color="black" />

          </View>
          <Text style={styles.textDisabled}>comedor</Text>
        </Pressable>
        <Pressable style={styles.touchable} >
          <View style={styles.productNotas}>
            <FontAwesome5 style={styles.icon} name="user-tie" size={24} color="black" />
          </View>
          <Text style={styles.textDisabled}>profesores</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  touchable:{
    gap:10
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#22b7d7",
    fontWeight: "600"
  },
  textDisabled: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#c6c7c6",
    fontWeight: "600"
  },
  icon: {
    fontSize: 80,
    color: "#fff",

  },
  productContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
    // backgroundColor: "green",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  productAsistencia: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#22b7d7",
    borderRadius: 300,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  productNotas: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#c6c7c6",
    borderRadius: 300,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  container: {
    padding: 10
  },
})
export default Home