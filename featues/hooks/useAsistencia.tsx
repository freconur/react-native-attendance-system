import { currentDate, currentMonth, currentYear, dateConvertObjectStudent } from "../../dates/date"
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { StudentData } from "../types/types";
import axios from 'axios'
import { useGlobalContext, useGlobalContextDispatch } from "../context";
import { AttendanceRegister } from "../actions/actionAttendance";
const db = getFirestore(app)
const URL_API = "https://whatsapp-api-production-da60.up.railway.app"


export const useAsistencia = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()

  const studentArrivalTime = async (studentCode: string) => {
    const arrivalTimeRef = doc(db, `/intituciones/${userData?.idInstitution}/attendance-student/${studentCode}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
    await setDoc(arrivalTimeRef, { arrivalTime: new Date() })
  }

  const getStudentData = async (studentCode: string, Data: StudentData[]) => {
    console.log('studentCode',studentCode)
    console.log('userData?.idInstitution',userData?.idInstitution)
    dispatch({ type: AttendanceRegister.LOADER_ASISTENCIA, payload: true })
    const refData = doc(db, `/intituciones/${userData?.idInstitution}/students`, studentCode as string)
    const studentData = await getDoc(refData)
    if (studentData.exists()) {
      console.log('numberPhone', `51${studentData.data().numberFather}@c.us`)
      studentArrivalTime(studentCode)
      // const studentsData:StudentData[] = Data
      Data?.unshift(studentData.data())
      // POST DE ENVIO DE WHATYSAPP AL NUMERO DEL PADRE DE FAMILIA
      if (studentData.data().numberFather) {
        try {
          axios
            // .post(`/api/whatsapp`,
            .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberFather}@c.us`,
                message: `sr. ${studentData.data().nameFather}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }

      if (studentData.data().numberMother) {
        try {
          axios
            .post(`${URL_API}/message`,
              {
                phoneNumber: `51${studentData.data().numberMother}@c.us`,
                message: `sra. ${studentData.data().nameMother}, el estudiante ${studentData.data().name} ${studentData.data().lastname}, acaba de ingresar al colegio a las ${dateConvertObjectStudent(new Date())}.`
              })
        } catch (error) {
          console.log('error', error)
        }
      }
      dispatch({ type: AttendanceRegister.ATTENDANCE_REGISTER, payload: Data })
      dispatch({ type: AttendanceRegister.LOADER_ASISTENCIA, payload: false })

    }else {
      console.log('no se encontro estudiante')
    }

  }

  return { getStudentData }
}