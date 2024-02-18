import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
// import { Image } from 'expo-image'

const Bienvenida = () => {

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (

    <View style={styles.containerFull}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.message}>
          <Text style={styles.mainTitle}>Sistema de Asistencia SAAS</Text>
          <View style={styles.container}>
            <Text style={styles.parrafo}>
              Bienvenido/a a nuestro sistema de asistencia SAAS para colegios de nivel primaria y secundaria, esta aplicación es una demo que se le brinda a nuestro cliente con el objetivo que puedan hacer pruebas, testing y evaluar si la aplicacion se adecua a las necesidades de su institucion educativa.
            </Text>
            <Text style={styles.parrafo}>
              Si usted necesita de algunas funcionalidades que la aplicacion no provea, ponganse en contacto con nuestro equipo, para que puedan brindarle opciones para el desarrollo de la funcionalidad que usted necesita.
            </Text>
          </View>
        </View>
        <Text style={styles.warning}>contacte al desarrollador para cualquier pregunta acerca de la aplicación:</Text>
        <View style={styles.CardTeam}>
          <Image
            style={styles.image}
            source={require('../assets/images/frecodev.png')}
          />
          <View>
            <Text style={styles.cardName}>Franco Condori Huaraya</Text>
            <Text style={styles.rol}>Desarrollador de software</Text>
            {/* <Text style={styles.rol}>apliciones android y web</Text> */}
            <Text style={styles.number}>+51 982 752 688</Text>
            <Text style={styles.mail}>Frecodev.1992@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  message: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff"
  },
  warning: {
    marginBottom: 20,
    color: "#1c69aa"
  },
  mainTitle: {
    fontSize: 30,
    textAlign: "center",
    color: "#3e4040",
    fontWeight: "600",
    marginBottom: 20
  },
  mail: {
    color: "#778b9d"
  },
  number: {
    color: "#405c74"
  },
  rol: {
    color: "#4a81b1"
  },
  cardName: {
    fontSize: 20,
    color: "#1e384f"
  },
  containerFull: {
    padding: 20,
    flex: 1,
  },
  CardTeam: {
    // marginTop:220,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "#fff",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // elevation: 4,
    // shadowRadius: 3.05,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 300,
  },
  container: {

  },
  parrafo: {
    fontSize: 15,
    color: "#3a6182",
    textAlign: "justify",
    lineHeight: 25,
    marginBottom: 10,
  },
})

export default Bienvenida