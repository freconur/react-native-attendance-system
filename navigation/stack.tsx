import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResumeAsistenciaEstudiante from "../screens/ResumeAsistenciaEstudiante";
import Registros from "../screens/Registros";

const Stack = createNativeStackNavigator()

export const StackRegistros = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Registros de asistencia de alumnos"
      // screenOptions={{ headerShown: false, tabBarActiveTintColor: 'purple' }}
    >
      <Stack.Screen
        name="Resgistros"
        component={Registros}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Resume" component={ResumeAsistenciaEstudiante} />
      {/* <Stack.Screen name="Details" component={TopTabStudent} /> */}
    </Stack.Navigator>
  )
}