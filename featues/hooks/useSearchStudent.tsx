import { currentDate, currentMonth, currentYear, dateConvertObjectStudent } from "../../dates/date"
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { StudentData } from "../types/types";
import { useGlobalContext, useGlobalContextDispatch } from "../context";
import { AttendanceRegister } from "../actions/actionAttendance";
const db = getFirestore(app)


const useSearchStudent = () => {
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()
const getStudent = async(id:string) => {
  dispatch({type:AttendanceRegister.STUDENT_BY_RESULT_WARNING, payload:""})
  dispatch({type:AttendanceRegister.LOADER_SEARCH_STUDENT, payload:true})
  const studentRef = doc(db, `/intituciones/${userData?.idInstitution}/students`, id);
  const docSnap = await getDoc(studentRef);
  
  if (docSnap.exists()) {
  dispatch({type:AttendanceRegister.STUDENT_BY_RESULT_WARNING, payload:""})

    dispatch({type:AttendanceRegister.STUDENT_BY_RESULT, payload:docSnap.data()})
    dispatch({type:AttendanceRegister.LOADER_SEARCH_STUDENT, payload:false})

  } else {
    // docSnap.data() will be undefined in this case
    const warning = "no se encontro estudiante con el codigo ingresado"
    dispatch({type:AttendanceRegister.STUDENT_BY_RESULT_WARNING, payload:warning})
    dispatch({type:AttendanceRegister.LOADER_SEARCH_STUDENT, payload:false})
  }
}

  return {getStudent }
}

export default useSearchStudent