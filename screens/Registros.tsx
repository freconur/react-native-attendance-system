import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import useRegisterStudents from '../featues/hooks/useRegisterStudents';
import { useGlobalContext } from '../featues/context';
import useRegistroAsistencias from '../featues/hooks/useRegistroAsistencias';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateConvertObject } from '../dates/date';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Image } from 'expo-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { attendanceState } from '../utils/AttendanceState';
import { styles } from './styles/registros'
interface Props {
  navigation: NavigationProp<ParamListBase>
}
const Registros = ({ navigation }: Props) => {
  const [section, setSection] = useState();
  const [grade, setGrade] = useState();
  const [filterGrade, setFilterGrade] = useState();
  const [filterSection, setFilterSection] = useState();
  const { sections, grades, studentsByGradeAndSection, loaderRegistrosAsistencia, justificacionMotivoModal, justificacionFaltaModal } = useGlobalContext()
  const { getSections, getGrades } = useRegisterStudents()
  const { filterRegisterByGradeAndSection, justificacionInfoByStudent, showJustificaconFaltaModal, showJustificacionMotivo } = useRegistroAsistencias()
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState<any>("date")
  const [dniStudent, setDniStudent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const resultAttendance = (value: string, dni: string) => {
    if (value === "justificado") {
      return <Pressable onPress={() => { justificacionInfoByStudent(dni, `${date}`); showJustificacionMotivo(!justificacionMotivoModal) }}>
        <Text>{value}</Text>
      </Pressable>
    } else if (value === "falto") {
      return (
        <View>
          <Text>{value}</Text><Pressable onPress={() => { showJustificaconFaltaModal(!justificacionFaltaModal); setDniStudent(dni as string) }}><Text>J</Text></Pressable>
        </View>
      )
    } else {
      return <View><Text style={styles.ingresoText}>{value}</Text></View>
    }
  }

  const showMode = (modeToDshow: string) => {
    setShowDatePicker(true)
    setMode(modeToDshow)
  }
  const onChange = (e: any, selectedDate: any) => {
    setDate(selectedDate)
    setShowDatePicker(false)
  }
  useEffect(() => {
    if (grade && section) {
      filterRegisterByGradeAndSection(grade, section, `${date.getDate()}`)
    } else {
      console.log('no se encontro registros')
    }
  }, [section, grade, date.getDate()])
  useEffect(() => {
    getSections()
    getGrades()
  }, [])
  // console.log('studentsByGradeAndSection', studentsByGradeAndSection)

  return (
    <View style={styles.container}>
      <View style={styles.buttonDateContainer}>
        <Pressable
          onPress={() => showMode("date")}
          style={styles.buttonDate}>
          <Text style={styles.buttonDateText}>{dateConvertObject(date).date.toString().padStart(2, "0")}/{dateConvertObject(date).month}/{dateConvertObject(date).year}</Text>
        </Pressable>
      </View>

      {
        showDatePicker ?
          <DateTimePicker
            // testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange} />
          :
          null
      }
      <View style={styles.selectContainer}>
        <Picker
          style={styles.select}
          selectedValue={grade}
          onValueChange={(itemValue, itemIndex) =>
            setGrade(itemValue)
          }>
          <Picker.Item label="GRADO" value="GRADO" />
          {grades?.map((gr, index) => {
            return (
              <Picker.Item key={index} label={gr.traditionalGrade?.toUpperCase()} value={Number(gr.grade)} />
            )
          })}
        </Picker>
        <Picker
          // mode="dropdown"
          style={styles.select}
          selectedValue={section}
          onValueChange={(text) => setSection(text)}
        >
          <Picker.Item label="SECCION" value="SECCION" />
          {
            sections?.map((sec, index) => {
              return (
                <Picker.Item key={index} label={sec?.section?.toUpperCase()} value={sec?.section as string} />
              )
            })}
        </Picker>

      </View>
      {
        loaderRegistrosAsistencia ?
          <View>
            <ActivityIndicator animating={true} color="#624bff" />
            <Text style={styles.loader}>cargando...</Text>
          </View>
          :
          null
      }
      <View style={styles.header}>
        <Text style={styles.order}>#</Text>
        <Text style={styles.dni}>dni</Text>
        <Text style={styles.apellidos}>apelidos y nombre</Text>
        <Text style={styles.ingreso}>ingreso</Text>
        <Text style={styles.salida}>salida</Text>
      </View>
      <ScrollView>
        <View style={styles.containeInfoStudent}>
          {
            studentsByGradeAndSection.length ?
              studentsByGradeAndSection?.map((student, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Resume", { id: student.dni, path: "registro" },)
                    }}
                    key={student.dni}
                    style={styles.card}>
                    <Text style={styles.textCardOrder}>{index + 1}</Text>
                    <Text style={styles.textCardDni}>{student.dni}</Text>
                    <Text style={styles.textCardName}>{student.lastname} {student.name}</Text>
                    {/* <Text style={attendanceState(student.attendanceByDate) ? styles.textCardAttendance : styles.textCardLate}>{student.attendanceByDate}</Text> */}
                    <Text style={attendanceState(student.attendanceByDate) ? styles.textCardAttendance : styles.textCardLate}>
                      {
                        resultAttendance(student.attendanceByDate as string, student.dni as string)
                      }
                    </Text>
                    <Text style={styles.textCardLastname}></Text>
                  </Pressable>
                )
              })
              :
              <Text style={styles.warningRegistros}>no se encontro registros</Text>
          }

        </View>
      </ScrollView>
    </View >
  )
}


export default Registros