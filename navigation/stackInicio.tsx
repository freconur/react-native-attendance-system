import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";

const Stack = createNativeStackNavigator()

const StackInicio = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Inicio Sesion"
      component={Login}
      options={{
        headerShown: false
      }}
      />
    </Stack.Navigator>
  )
}

export default StackInicio