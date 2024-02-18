import React, { Children } from 'react'
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer"
import Asistencia from '../screens/Asistencia'
import Registros from '../screens/Registros'
import RegistroAlumnos from '../screens/RegistroAlumnos'
import { StackRegistros } from './stack'
import { TabsRegistros } from './tabs'
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Bienvenida from '../screens/Bienvenida'
import { useGlobalContext } from '../featues/context'
import { Image } from 'expo-image'
import { MaterialIcons } from '@expo/vector-icons';
import useAuthentication from '../featues/hooks/useAuthentication'
// import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { styles } from './styles/drawer'

interface Props {
  navigation: any
}
const Drawer = createDrawerNavigator()
const DrawerNavigatorAsistencia = () => {
  <StatusBar
    backgroundColor="red"
    barStyle={'default'}
    animated={true}
  />
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuItems {...props} />}
    >
      <Drawer.Screen
        name="Introduccion"
        component={Bienvenida}
        options={{
          headerStyle: {
            // backgroundColor: "#169ca9",
            backgroundColor: "#ffc417",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <Drawer.Screen
        name="Registros de asistencia"
        component={TabsRegistros}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#169ca9",
            // backgroundColor:"#ffc417",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <Drawer.Screen
        name="Tomar Asistencia"
        component={Asistencia}
        options={{
          headerStyle: {
            backgroundColor: "#169ca9",
            // backgroundColor:"#ffc417",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />

      <Drawer.Screen
        name="Registro de Alumno"
        component={RegistroAlumnos}
        options={{
          headerStyle: {
            backgroundColor: "#169ca9",
            // backgroundColor:"#ffc417",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />

    </Drawer.Navigator>
  )
}

const MenuItems = ({ navigation }: Props) => {

  const { userData } = useGlobalContext()
  const { logout } = useAuthentication()
  console.log('userData', userData)
  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.infoUserContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleSchool}>{userData?.institutionName}</Text>
        </View>
        <View style={styles.info}>
          <View >
            <View style={styles.imageContainer}>
              {userData?.pictureProfile ?
                <Image
                  style={styles.pictureProfile}
                  source={userData.pictureProfile}
                  placeholder="imagen de perfil"
                  contentFit="cover"
                  transition={300}
                />
                :
                <Text style={styles.image}>F</Text>
              }
            </View>
          </View>
          <View>
            <Text style={styles.name}>{userData?.name} {userData?.firstname} {userData?.lastname}</Text>
            <Text style={styles.rol}>{userData?.rol}</Text>
          </View>
        </View>

      </View>

      <View style={styles.optionsDrawer}>
        <ScrollView>
          <View style={styles.containerButtons}>
            <Pressable
              onPress={() => navigation.navigate('Introduccion')}
              style={styles.buttonIntroduccion}
            >
              <Text style={styles.textButton}>Inicio</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Registros de asistencia')}
              style={styles.button}
            >
              <Text style={styles.textButton}>Registros</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Tomar Asistencia')}
              style={styles.button}
            >
              <Text style={styles.textButton}>Tomar asistencia</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Registro de Alumno')}
              style={styles.button}
            >
              <Text style={styles.textButton}>Registro de alumno</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Productos')}
              style={styles.buttonMyProducts}
            >
              <Text style={styles.textButton}>Mis productos</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable onPress={logout} style={styles.logoutButton}>
          <MaterialIcons style={styles.logoutText} size={25} name="logout" />
          <Text style={styles.logoutText}>cerrar sesión</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  )
}

export default DrawerNavigatorAsistencia