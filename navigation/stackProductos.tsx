import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import DrawerNavigatorAsistencia from "./drawer";

const Stack = createNativeStackNavigator()

const StackMisProductos = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Productos"
      component={Home}
      options={{
        headerStyle: {
          // backgroundColor: "#169ca9",
          backgroundColor:"#169ca9",
          
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      />
      <Stack.Screen 
      name="Drawer Asistencia"
      component={DrawerNavigatorAsistencia}
      options={{
        headerShown: false
      }}
      />
    </Stack.Navigator>
  )
}

export default StackMisProductos