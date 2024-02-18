import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Camera } from 'expo-camera'
import useSearchStudent from '../featues/hooks/useSearchStudent'
import { useGlobalContext } from '../featues/context'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Image } from 'expo-image'
import {NavigationProp, ParamListBase} from '@react-navigation/native';


interface Props {
  navigation: NavigationProp<ParamListBase>
}
const SearchStudent = ({navigation}:Props) => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [studentCode, setStudentCode] = useState("")
  const [showScanner, setShowScanner] = useState(false)
  const [scanned, setScanned] = useState(false);
  const { studentByResult, studentByResultWarning, loaderSearchStudent } = useGlobalContext()
  const { getStudent } = useSearchStudent()
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setStudentCode(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  };
  const handleShowScan = () => {
    setShowScanner(!showScanner)
  }
  useEffect(() => {
    if (studentCode.length === 8) {
      getStudent(studentCode)
      setStudentCode("")
    }
  }, [studentCode.length, studentByResult])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType='number-pad'
          style={styles.input}
          value={studentCode}
          placeholder='escanea o digita el codigo'
          onChangeText={(text) => setStudentCode(text)}
        />
        <View style={styles.iconBarcodeContainer}>
          <MaterialCommunityIcons onPress={handleShowScan} style={styles.iconBarcode} name="barcode-scan" />
        </View>
      </View>

      {
        showScanner ?
          <>
            <View style={styles.barcodebox}>
              <Camera
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
            </View>
            {scanned && <Button title={'escanear'} onPress={() => setScanned(false)} />}
          </>
          :
          null
      }
      {loaderSearchStudent ?
        <View>
          <ActivityIndicator animating={true} color="#624bff" />
          <Text style={styles.loader}>buscando codigo de alumno</Text>
        </View>
        :
        studentByResultWarning ? <Text>{studentByResultWarning}</Text> : null
      }
      {
        studentByResult.dni ?
          <Pressable style={styles.cardContainer} onPress={() => {
            navigation.navigate("Options",{id:studentByResult.dni})}}>
            <View>
              <Image
                style={styles.image}
                source={studentByResult.pictureProfile}
                // placeholder={imagen de perfil}
                contentFit="cover"
                transition={300}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}><Text style={styles.label}>dni: </Text> {studentByResult.dni}</Text>
              <Text style={styles.infoText}><Text style={styles.label}>nombre: </Text>{studentByResult.name}</Text>
              <Text style={styles.infoText}><Text style={styles.label}>apellidos: </Text>{studentByResult.lastname}</Text>
            </View>
          </Pressable>
          :
          null
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  infoText:{
    color:"#1e384f",
    textTransform:"uppercase"
  },
  info:{
    gap:10,
    justifyContent:"center"
  },
  label:{
    textTransform:"uppercase",
    color: "#969696"
  },
  cardContainer:{
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
    flexDirection:"row",
    gap:20,
    backgroundColor:"#fff",
    padding:15,
  },
  loader: {
    textAlign: "center",
    color: "#969696"
  },
  image: {
    width: 100,
    height: 100
  },
  barcodebox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 350,
    width: "100%",
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical:15
  },
  iconBarcode: {
    fontSize: 30,
    color: "#1e384f"
  },
  iconBarcodeContainer: {
    width: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    padding: 10
  },
})

export default SearchStudent