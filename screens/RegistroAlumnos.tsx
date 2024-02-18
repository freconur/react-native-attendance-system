import { Text, View, TextInput, Button, Alert, StyleSheet, ScrollView, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import React, { useEffect, useState } from 'react'
import { Picker } from "@react-native-picker/picker"
import useRegisterStudents from "../featues/hooks/useRegisterStudents"
import { useGlobalContext } from "../featues/context"
// import * as FileSystem from 'expo-file-system';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addDoc } from "firebase/firestore"
import { currentYear } from "../dates/date"

const storage = getStorage()
const RegistroAlumnos = () => {

  const testing = {}
  const { getGrades, getSections, sendPictureProfile, registerNewStudent } = useRegisterStudents()
  const { grades, sections,userData } = useGlobalContext()
  const [grade, setGrade] = useState();
  const [section, setSection] = useState();
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      dni: "",
      grade: "",
      section: "",
      pictureProfile: "",
      nameFather: "",
      nameMother: "",
      numberFather: "",
      numberMother: "",
    },
  })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri, "image")
    }
  };

  async function uploadImage(uri: string, fileType: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `/${userData?.institutionName}/${currentYear()}/${new Date}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // setProgress(progress.toFixed());
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          setUrlImage(downloadURL)
            // save record
            // await saveRecord(fileType, downloadURL, new Date().toISOString());
            ;
          // setVideo("");
        });
      }
    );
  }

  const onSubmit = (data: any) => {

    if (urlImage) {
      registerNewStudent(data, urlImage)
      alert("se registro con exito")
    } else {
      registerNewStudent(data)
      alert("se registro con exito")

    }
    setUrlImage("")
    setImage("")
    reset()
    console.log(data)
  }


  useEffect(() => {
    getGrades()
    getSections()
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.tutor}>datos del alumno</Text>
        <View style={styles.groupinput}>
          <Text style={styles.label}>nombre:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputs}
                placeholder="name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text>nombre es requerido.</Text>}
        </View>
        <View style={styles.groupinput}>
          <Text style={styles.label}>apellidos: </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputs}
                placeholder="apellidos"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastname"
          />
          {errors.lastname && <Text>apellidos es requerido.</Text>}
        </View>
        <View style={styles.groupinput}>
          <Text style={styles.label}>dni: </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType='number-pad'
                style={styles.inputs}
                placeholder="dni"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="dni"
          />
          {errors.dni && <Text>dni es requerido.</Text>}
        </View>
        <View style={styles.groupinput}>
          <Text style={styles.label}>grado: </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectDropdown
                defaultValue="GRADE"
                // buttonTextAfterSelection={(value, index) => {
                //   return value;
                // }}

                defaultButtonText={'GRADO'}
                buttonTextStyle={{
                  color: '#444',
                  textAlign: 'left',
                  fontSize: 14,
                }}
                buttonStyle={{
                  width: '100%',
                  // height: 30,
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: "#c61041",
                }}
                data={grades.map((i, index) => i.traditionalGrade)}
                onSelect={(value) => onChange(value)}
              />
            )}
            name="grade"
          />
          {errors.grade && <Text>grado es requerido.</Text>}
        </View>

        <View style={styles.groupinput}>
          <Text style={styles.label}>seccion: </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectDropdown
                buttonTextStyle={{
                  color: '#444',
                  textAlign: 'left',
                  fontSize: 14,
                }}
                defaultButtonText={'SECCION'}
                buttonStyle={{
                  width: '100%',
                  // height: 30,
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: "#c61041",
                }}
                data={sections.map(i => i.section?.toUpperCase())}
                onSelect={onChange}
              />
            )}
            name="section"
          />
          {errors.section && <Text>grado es requerido.</Text>}
        </View>
        <View style={styles.groupinput}>
          <Text style={styles.label}>foto de perfil:</Text>
          <Pressable style={styles.cargarImagen} onPress={pickImage}><Text style={styles.touchableImage}>cargar imagen</Text></Pressable>
          {
            image ?
              <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
              : null
          }

        </View>
        <View>
          <Text style={styles.tutor}>datos de padres o tutores</Text>
          <View style={styles.groupinput}>
            <Text style={styles.label}>padre o tutor: </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputs}
                  placeholder="nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nameFather"
            />
            {errors.nameFather && <Text>nombre del padre o tutor es requerido.</Text>}
          </View>
          <View style={styles.groupinput}>
            <Text style={styles.label}>numero: </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType='number-pad'
                  style={styles.inputs}
                  placeholder="numero de celular"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.slice(0, 9))}
                  value={value}
                />
              )}
              name="numberFather"
            />
            {errors.numberFather && <Text>numero del padre o tutor es requerido.</Text>}
          </View>
          <View style={styles.groupinput}>
            <Text style={styles.label}>madre o tutora: </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputs}
                  placeholder="nombre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nameMother"
            />
            {errors.nameMother && <Text>nombre de la madre o tutora es requerido.</Text>}
          </View>
          <View style={styles.groupinput}>
            <Text style={styles.label}>numero: </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType='number-pad'
                  style={styles.inputs}
                  placeholder="numero de celular"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.slice(0, 9))}
                  value={value}
                />
              )}
              name="numberMother"
            />
            {errors.numberMother && <Text>numero de la madre o tutora es requerido.</Text>}
          </View>
        </View>
      </ScrollView>
      <Pressable style={styles.buttonSubmit} onPress={handleSubmit(onSubmit)} >
        <Text style={styles.textSubmit}>registrar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableImage: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600"
  },
  cargarImagen: {
    padding: 10,
    backgroundColor: "#6699ff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  tutor: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase",
    marginVertical: 20,
  },
  scrollview: {
    marginVertical: 10,
  },
  label: {
    color: "#969696",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  groupinput: {
    marginBottom: 10,
  },
  textSubmit: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  buttonSubmit: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#0c98c6",
  },
  container: {
    padding: 10,
    flex: 1
  },
  inputs: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
})
export default RegistroAlumnos