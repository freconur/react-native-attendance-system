import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, where } from 'firebase/firestore'
import { Grades, JustificacionStudent, JustificationValue, Section, StudentData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useGlobalContext, useGlobalContextDispatch } from '../context';
import { app } from '../../firebase/firebaseConfig';
import { currentMonth, currentYear, hoursUnixDate } from '../../dates/date';


const useRegistroAsistencias = () => {
  const db = getFirestore(app)
  const dispatch = useGlobalContextDispatch()
const { userData } = useGlobalContext()
  async function getDataStudentsByDate(students: StudentData[], date: string) {
    const studentsArray: StudentData[] = []

    await Promise.all(students.map(async (student) => {
      const refAttendance = doc(db, `/intituciones/${userData?.idInstitution}/attendance-student/${student.dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`)
      const attendance = await getDoc(refAttendance)
      // const newData = { ...student, attendanceByDate: attendance.exists() ? hoursUnixDate(attendance.data().arrivalTime) : "no ingreso" }
      const newData = { ...student, attendanceByDate: attendance.exists() ? attendance.data().justification ? "justificado" : attendance.data().arrivalTime === null ? "falto" : hoursUnixDate(attendance.data().arrivalTime) : "falto" }
      return studentsArray.push(newData)
    }))
    if (studentsArray) {
      studentsArray.sort((a:any, b:any) => {
        const fe:string = a && a.lastname
        const se:string = b && b.lastname

        if (fe > se) {
          return 1;
        } 
        // if(fe && se) {}
        if (fe < se) {
          return -1;
        }
        return 0;
      })
    }
    return studentsArray
  }
  // const showJustificationMotivoModal = (value:boolean) => {
  //   dispatch({type:AttendanceRegister.SHOW_JUSTIFICATION_MOTIVO, payload:!value})
  // }
  const loadingConfirmationJustification = (value:boolean) => {
    dispatch({type:AttendanceRegister.LOADING_CONFIRMATION_JUSTIFICATION, payload:value})
  }
  const justificarFalta = async (id: string, date: string, justication: string) => {
    dispatch({type:AttendanceRegister.LOADING_CONFIRMATION_JUSTIFICATION, payload:true})

    console.log('data',{id:id, date:date, justication:justication})
    const attendanceRef = doc(db, `/intituciones/${userData?.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    //deberia crear un modal con campos para poner un motivo de la falta 
    await setDoc(attendanceRef, { arrivalTime: "justificado", justification: true, justificationMotive: justication })
    .then(response => {
    dispatch({type:AttendanceRegister.LOADING_CONFIRMATION_JUSTIFICATION, payload:false})
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL, payload: false})

    });
  }
  const justificacionInfoByStudent = async (id: string, date: string) => {
    const attendanceRef = doc(db, `/intituciones/${userData?.idInstitution}/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}/${date}`);
    const docSnap = await getDoc(attendanceRef);
    // console.log('docSnap',docSnap.data())
    const rta: JustificacionStudent = { ...docSnap.data(), id: docSnap.id }
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO, payload: rta })
  }
  const showJustificaconFaltaModal = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL, payload: !value })
  }
  const showJustificacionMotivo = (value: boolean) => {
    dispatch({ type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL, payload: !value })
  }
  const filterRegisterByGradeAndSection = async (grade: string, section: string, date: string) => {
    console.log({'grade':grade, 'section':section, 'date':date} )
    dispatch({type:AttendanceRegister.LOADER_REGISTROS_ASISTENCIA, payload:true})
    const refStudents = collection(db, `/intituciones/${userData?.idInstitution}/students`)
    const q1 = query(refStudents, where("grade", "==", `${grade}`), where("section", "==", `${section}`));
    const docSnap = await getDocs(q1)
    const studentsFilter: StudentData[] = []
    
    
    console.log('docSnap.docs', docSnap.docs)
    docSnap?.forEach(async (rta) => {
      // const refAttendance = doc(db, `/attendance-student/${rta.data().dni}/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`)
      // const attendance = await getDoc(refAttendance)
      // const newData = { ...rta.data(), attendanceByDate: attendance.exists() ? hoursUnixDate(attendance.data().arrivalTime) : "no ingreso" }
      studentsFilter.push(rta.data())
    })
    const rta = await getDataStudentsByDate(studentsFilter, date)
    if(rta){
      dispatch({type:AttendanceRegister.LOADER_REGISTROS_ASISTENCIA, payload:false})
      dispatch({ type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION, payload: rta })
    }

  }



  return { filterRegisterByGradeAndSection, showJustificacionMotivo, justificacionInfoByStudent, showJustificaconFaltaModal, justificarFalta, loadingConfirmationJustification}
}

export default useRegistroAsistencias