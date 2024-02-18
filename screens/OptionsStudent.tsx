import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
interface Props {
  navigation: NavigationProp<ParamListBase>
}
const OptionsStudent = ({ navigation }: Props) => {
  // const navigation = useNavigation()
  const route: any = useRoute()

  console.log(route.params.id)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>detalles</Text>
      <View style={styles.optionsContainer}>
        <Pressable
        onPress={() => {
          navigation.navigate("SearchStudent",{id:route.params.id})}}
        >
          <View style={styles.infoContainerUser}>
            <MaterialCommunityIcons style={styles.optionImage} name="card-account-details-outline" size={24} color="black" />
          </View>
          <Text style={styles.info}>Info de usuario</Text>
        </Pressable>
        <Pressable
          onPress={() => { navigation.navigate("Asistenciaxx", { id: route.params.id }) }}
        >
          <View style={styles.infoContainerAttendance}>
            <MaterialCommunityIcons style={styles.optionImage} name="calendar-account-outline" size={24} color="black" />
          </View>
          <Text style={styles.info}>Asistencia</Text>
        </Pressable>
      </View >
      <Pressable onPress={() => {
                navigation.navigate("Search")}}
              style={styles.back}>
        <Ionicons style={styles.backIcon} name="arrow-back-circle-outline" />

      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  backIcon: {
    fontSize: 40,
    color: "#1e384f"
  },
  back: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  info: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
    color: "#1e384f"
  },
  optionImage: {
    color: "#fff",
    fontSize: 90
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    position: "relative"
  },
  title: {
    textTransform: "uppercase",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 20,
    color: "#1e384f"
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignContent: "center"
  },
  infoContainerUser: {
    width: 150,
    height: 150,
    backgroundColor: "#0dbb8e",
    borderRadius: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  infoContainerAttendance: {
    width: 150,
    height: 150,
    backgroundColor: "#0d9dbb",
    borderRadius: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
})
export default OptionsStudent