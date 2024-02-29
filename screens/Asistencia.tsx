import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image';
import React, { createRef, useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAsistencia } from '../featues/hooks/useAsistencia'
import { useGlobalContext, useGlobalContextDispatch } from '../featues/context'
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { convertGrade } from '../utils/validateGrade';
import { FontAwesome5 } from '@expo/vector-icons';
const Asistencia = () => {
  const [studenCode, setStudenCode] = useState("")
  const { getStudentData } = useAsistencia()
  const { studentsData, loaderAsistencia } = useGlobalContext()
  const [showScanner, setShowScanner] = useState(false)
  const [scanned, setScanned] = useState(false);
  const focusRef = createRef<any>()
  const [hasPermission, setHasPermission] = useState<any>(null);
  const handleShowScan = () => {
    setShowScanner(!showScanner)
  }
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setStudenCode(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  };
  useEffect(() => {
    if (studenCode.length === 8) {
      getStudentData(studenCode, studentsData)
      setStudenCode("")
    }
  }, [studenCode.length, studentsData])
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [])
  return (
    <View style={styles.container}>
      {/* <Text>Asistencias</Text> */}
      <View style={styles.barcodeInputContainer}>
        <TextInput
          ref={focusRef}
          value={studenCode}
          style={styles.input}
          placeholder='codigo de alumno'
          autoCapitalize="none"
          onChangeText={(text) => setStudenCode(text)}
          keyboardType='number-pad'
        />
        <View style={styles.iconBarcodeContainer}>
          <MaterialCommunityIcons onPress={handleShowScan} style={styles.iconBarcode} name="barcode-scan" size={32} color="green" />
        </View>
      </View>
      {
        showScanner ?
          <>
            <View style={styles.barcodebox}>
              {/* <BarCodeScanner */}
              <Camera
                style={StyleSheet.absoluteFillObject}
                // style={[StyleSheet.absoluteFillObject,styles.cameraBarcodeScannerWrapper]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
            </View>
            {scanned && <Button title={'escanear'} onPress={() => setScanned(false)} />}
          </>
          :
          null
      }
      {loaderAsistencia ?
        <View>
          <ActivityIndicator animating={true} color="#624bff" />
          <Text style={styles.loader}>generando asistencia</Text>
        </View>
        :
        null
      }
      <ScrollView>
        <View style={styles.cardContainer}>
          {studentsData.length ?
            studentsData?.map((student, index) => {
              return (
                <View key={index} style={styles.card}>
                  <View>
                    {
                      student.pictureProfile ?
                        <Image
                          style={styles.image}
                          source={student.pictureProfile}
                          // placeholder={imagen de perfil}
                          contentFit="cover"
                          transition={300}
                        />
                        :
                        <View style={styles.userWithoutPicutre}>
                          <FontAwesome5 style={styles.pictureProfile} name="user-alt" />
                        </View>

                    }
                  </View>
                  <View>
                    <Text style={styles.textCard}><Text style={styles.textLabel}>dni: </Text>{student.dni}</Text>
                    <Text style={styles.textCard}><Text style={styles.textLabel}>nombre: </Text> {student.name}</Text>
                    <Text style={styles.textCard}><Text style={styles.textLabel}>apellido: </Text> {student.lastname}</Text>
                    <Text style={styles.textCard}><Text style={styles.textLabel}>grado: </Text> {convertGrade(`${student.grade}`)}</Text>
                    <Text style={styles.textCard}><Text style={styles.textLabel}>seccion: </Text> {student.section}</Text>
                  </View>
                </View>
              )
            })
            :
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>escanea el codigo del estudiante para tomar su asistencia</Text>
            </View>
          }
        </View>
      </ScrollView>
    </View >
  )
}
const styles = StyleSheet.create({
  loader: {
    textAlign: "center",
    color: "#969696"
  },
  pictureProfile: {
    fontSize: 80,
    color: "#cff0ff",
    width: 100,
    heigth: 100,
    textAlign: "center"
  },
  userWithoutPicutre: {
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    heigth: 100,
    padding: 10,
    backgroundColor: "#67badf"
  },
  warningText: {
    color: "#969696",
    textAlign: "center"
  },
  warningContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // backgroundColor:"#fff",
    // width:"100%",
    // height:"95%",
    flex: 1
  },
  container: {
    padding: 10,
    flex: 1
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
  textLabel: {
    color: "#969696"
  },
  cardContainer: {
    gap: 15,
    flex: 1,
    padding: 5,
  },
  textCard: {
    fontSize: 15,
    textTransform: "uppercase",
  },
  card: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  image: {
    width: 100,
    height: 100
  },
  input: {
    marginVertical: 4,
    height: 40,
    width: 330,
    borderWidth: 0,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    // borderWidth:"none",
  },
  barcodeInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15
  },
  iconBarcodeContainer: {
    paddingLeft: 5,
    width: 30,
    height: 30
  },
  iconBarcode: {
    width: 30,
    height: 30,
    color: "#4a4a4a",
    fontSize: 30,
    // width: "100%",
    // height: "100%",
  },
})
export default Asistencia