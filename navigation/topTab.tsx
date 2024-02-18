


import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DetailsStudent from '../screens/DetailsStudent'
import ResumeAsistenciaEstudiante from '../screens/ResumeAsistenciaEstudiante'
import SearchStudent from '../screens/SearchStudent'
import { StackDetailStudent } from './stackDetailStudent'
import Profesores from '../screens/Profesores'

const TopTab = createMaterialTopTabNavigator()
const TopTabStudent = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="alumno" component={StackDetailStudent}/>
      <TopTab.Screen name="profesores" component={Profesores}/>
      {/* <TopTab.Screen name="DetailAttendance" component={ResumeAsistenciaEstudiante}/> */}
    </TopTab.Navigator>
  )
}

export default TopTabStudent