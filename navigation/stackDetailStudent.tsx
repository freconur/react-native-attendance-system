import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchStudent from "../screens/SearchStudent";
import OptionsStudent from "../screens/OptionsStudent";
import { currentMonth } from "../dates/date";
import ResumeAsistenciaEstudiante from "../screens/ResumeAsistenciaEstudiante";
import DetailsStudent from "../screens/DetailsStudent";

const Stack = createNativeStackNavigator()

export const StackDetailStudent = () => {

  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        options={{
          headerShown: false
        }}
        component={SearchStudent}
      />
        <Stack.Screen
          name="Options"
          component={OptionsStudent}
          options={{
            // presentation:"containedModal",
            headerShown:false
          }}
        />
      <Stack.Screen
        name="SearchStudent"
        options={{
          headerShown: false
        }}
        component={DetailsStudent}
      />
      
      <Stack.Screen
        name="Asistenciaxx"
        component={ResumeAsistenciaEstudiante}
        options={{
          // presentation:"containedModal",
          headerShown:false
        }}
      />
    </Stack.Navigator>
  )
}