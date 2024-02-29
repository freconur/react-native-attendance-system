

import { View, Text, FlatList, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useGlobalContext } from '../featues/context'
import { useNavigation, useRoute } from '@react-navigation/native'
import useDetailsStudents from '../featues/hooks/useDetailsStudents'
import { styles } from './styles/resumeAsistenciaEstudiante'
import { EnableMonths, currentMonth } from '../dates/date'
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { attendanceState } from '../utils/AttendanceState'

interface Props {
  navigation: NavigationProp<ParamListBase>
}
const ResumeAsistenciaEstudiante = ({ navigation }: Props) => {
  const route: any = useRoute()
  const [month, setMonth] = useState(currentMonth())
  const { studentDetails, resumeAttendanceStudent } = useGlobalContext()
  const { findStudentForDetails, getDetailsofAttendance } = useDetailsStudents()
  useEffect(() => {
    findStudentForDetails(route.params.id)
    getDetailsofAttendance(route.params.id, month)
  }, [month, route.params.id])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Resumen de ${studentDetails.name}`
    })
  }, [studentDetails.name])

  console.log('arrivalTimeFromStudent',resumeAttendanceStudent)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Picker
          // mode="dropdown"
          style={styles.select}
          selectedValue={month}
          onValueChange={(text) => setMonth(text)}
        >
          {/* <Picker.Item label={month} value={month}/> */}
          {
            EnableMonths()?.map((sec, index) => {
              return (
                <Picker.Item key={index} label={sec?.toUpperCase()} value={sec} />
              )
            })}
        </Picker>
        {
          route.params.path === "registro" ?
            null
            :
            <Pressable onPress={() => {
              navigation.navigate("Options", { id: route.params.id })
            }}
              style={styles.back}>
              <Ionicons style={styles.backIcon} name="arrow-back-circle-outline" />
            </Pressable>
        }
      </View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>fecha</Text>
        <Text style={styles.headerLabel}>dia</Text>
        <Text style={styles.headerLabel}>ingresos</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View>
          {
            resumeAttendanceStudent ?

            resumeAttendanceStudent?.map((item, index) => {
              return (
                <View style={styles.rowListContainer} key={index}>
                  <Text style={styles.rowDate}>{item?.date}</Text>
                  <Text style={styles.row}>{item?.day}</Text>
                  {/* <Text style={attendanceState(item.attendance) ? styles.rowAttendance : styles.rowAttendanceLate}>{item.attendance}</Text> */}
                  <Text>{item?.attendance}</Text>
                </View>
              )
            })
            : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResumeAsistenciaEstudiante