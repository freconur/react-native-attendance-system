import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResumeAsistenciaEstudiante from "../screens/ResumeAsistenciaEstudiante";
import Registros from "../screens/Registros";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TopTabStudent from "./topTab";
import { StackRegistros } from "./stack";
import SearchStudent from "../screens/SearchStudent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { StackDetailStudent } from "./stackDetailStudent";

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

export const TabsRegistros = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Registros"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#0d7dbb",
        },
        headerTitleStyle: {
          color: "#fff",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName:any = "";
          if (route.name === "Registros") {
            iconName = "file-cabinet"
          }else if (route.name === "Buscar"){
            iconName = "account-search-outline"
          }
          return <MaterialCommunityIcons name={iconName} size={24} color={color} />
        }
      })}
    // screenOptions={({route}) =>({
    //   
    //   // tabBarActiveTintColor: '#0d7dbb',
    //   tabBarIcon:({color,size,focused}) => {
    //     let iconName;
    //     if(route)
    //   }
    // })}
    >
      <BottomTabs.Screen
        name="Registros"
        component={StackRegistros}
        // options={{
        //   tabBarLabel: 'Registros',
        //   tabBarIcon: (focused) => <MaterialCommunityIcons name="file-cabinet" size={24} color="#1c97ff" />
        // }}
      />
      <BottomTabs.Screen
        name="Buscar"
        component={TopTabStudent}
        // options={{
        //   // headerShown:false,
        //   tabBarLabel: 'Buscar',
        //   tabBarIcon: (focused) => <MaterialCommunityIcons name="account-search-outline" size={24} color="#1c97ff" />
        // }}
      />
      {/* <BottomTabs.Screen name="Details" component={TopTabStudent} /> */}
    </BottomTabs.Navigator>
  )
}