import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import useDetailsStudents from '../featues/hooks/useDetailsStudents'
import { NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { useGlobalContext } from '../featues/context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { convertGrade } from '../utils/validateGrade';
import { StudentData } from '../featues/types/types';


interface Props {
  navigation: NavigationProp<ParamListBase>
}
const DetailsStudent = ({ navigation }: Props) => {
  const route: any = useRoute()
  const [dataForm, setDataForm] = useState<StudentData>()
  const { findStudentForDetails } = useDetailsStudents()
  const { studentByResult } = useGlobalContext()
  useEffect(() => {
    findStudentForDetails(`${route.params?.id}`)
    setDataForm(studentByResult)
  }, [])
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {
        navigation.navigate("Options", { id: route.params.id })
      }}
        style={styles.back}>
        <Ionicons style={styles.backIcon} name="arrow-back-circle-outline" />
      </Pressable>
      <ScrollView>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={studentByResult.pictureProfile}
            // placeholder={imagen de perfil}
            contentFit="cover"
            transition={300}
          />
        </View>

        <View style={styles.groupInput}>
          <Text style={styles.label}>dni: </Text>
          <TextInput disableFullscreenUI={true} onChangeText={(text) => setDataForm({ ...dataForm, dni: text })} style={styles.input} placeholder={studentByResult?.dni?.toUpperCase()} />
        </View>
        <View style={styles.groupInput}>
          <Text style={styles.label}>nombre: </Text>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, name: text })} style={styles.input} placeholder={studentByResult?.name?.toUpperCase()} />
        </View>
        <View style={styles.groupInput}>
          <Text style={styles.label}>apellidos: </Text>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, lastname: text })} style={styles.input} placeholder={studentByResult?.lastname?.toUpperCase()} />
        </View>
        <View style={styles.containerSectionGrade}>
          <View style={styles.groupInputSectionGrade}>
            <Text style={styles.label}>grado: </Text>
            <TextInput style={styles.inputGrade} onChangeText={(text) => setDataForm({ ...dataForm, dni: text })} placeholder={convertGrade(studentByResult?.grade as string)?.toUpperCase()} />
          </View>
          <View style={styles.groupInputSectionGrade}>
            <Text style={styles.label}>seccion: </Text>
            <TextInput onChangeText={(text) => setDataForm({ ...dataForm, section: text })} style={styles.inputGrade} placeholder={studentByResult?.section?.toUpperCase()} />
          </View>
        </View>
        <View style={styles.groupInput}>
          <Text style={styles.label}>padre o tutor: </Text>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, nameFather: text })} style={styles.input} placeholder={studentByResult?.nameFather?.toUpperCase()} />
        </View>
        <View style={styles.groupInput}>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, numberFather: text })} style={styles.input} placeholder={studentByResult?.numberFather?.toUpperCase()} />
        </View>
        <View style={styles.groupInput}>
          <Text style={styles.label}>madre o tutora: </Text>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, nameMother: text })} style={styles.input} placeholder={studentByResult?.nameMother?.toUpperCase()} />
        </View>
        <View style={styles.groupInput}>
          <TextInput onChangeText={(text) => setDataForm({ ...dataForm, numberMother: text })} style={styles.input} placeholder={studentByResult?.numberMother?.toUpperCase()} />
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  containerSectionGrade:{
    flexDirection:"row",
    gap:10,
    width:"100%"
  },
  container: {
    padding: 10,
    flex: 1,
  },
  groupInput: {
    gap: 5,
    marginBottom: 10,
  },
  groupInputSectionGrade: {
    gap: 5,
    marginBottom: 10,
    width:"48%"
  },
  label: {
    textTransform: "uppercase",
    color: "#969696"
  },
  inputGrade: {
    textTransform: "uppercase",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#1e384f",
    width:"100%"
  },
  input: {
    textTransform: "uppercase",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#1e384f"
  },
  containerImage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    borderRadius: 300,
    width: 250,
    height: 250
  },
  backIcon: {
    fontSize: 40,
    color: "#1e384f"
  },
  back: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
  },
})
export default DetailsStudent