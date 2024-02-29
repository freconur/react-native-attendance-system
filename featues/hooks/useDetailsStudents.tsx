import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore'
import { Grades, Section, StudentData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/firebaseConfig';
import { useGlobalContext, useGlobalContextDispatch } from '../context';
import { currentDate, currentMonth, currentYear, getDayFromDate, getDayFromDateFalta, hoursUnixDateForDetailStudent, monthToANumber } from '../../dates/date';
import { valiteGrade } from '../../utils/validateGrade';


const useDetailsStudents = () => {
  const dispatch = useGlobalContextDispatch()
  const db = getFirestore(app)
const { userData } = useGlobalContext()
  const findStudentForDetails = async (id: string) => {
    const docRef = doc(db, `/intituciones/${userData?.idInstitution}/students`, `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch({ type: AttendanceRegister.STUDENT_DETAILS, payload: docSnap.data() })
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const getDetailsofAttendance = async (id: string,month:string) => {
    // const pathRef = doc(db,`/attendance-student/${id}/${currentYear()}/${currentMonth()}/${currentMonth()}`)
    const querySnapshot = await getDocs(collection(db, `/intituciones/${userData?.idInstitution}/attendance-student/${id}/${currentYear()}/${month}/${month}`));
    const arrivalTimeFromStudent: any = []
    querySnapshot.forEach((doc) => {

      if (doc.data().justification) {
        arrivalTimeFromStudent.push(getDayFromDate(new Date(`${currentYear()}-${monthToANumber(month)}-${doc.id} 10:34:23`)))
        // arrivalTimeFromStudent.push(getDayFromDateFalta())
      } else if (doc.data().falta) {
        console.log('month', month)
        arrivalTimeFromStudent.push(getDayFromDateFalta(new Date(`${currentYear()}-${monthToANumber(month)}-${doc.id} 10:34:23`)))
        // arrivalTimeFromStudent.push(getDayFromDateFalta(new Date("2023-12-26 10:34:23")))
      } else {
        arrivalTimeFromStudent.push(hoursUnixDateForDetailStudent(doc.data().arrivalTime))
      }
    });
    // if (arrivalTimeFromStudent) {
      arrivalTimeFromStudent.sort((a:any, b:any) => {
        const fe = Number(a.date)
        const se = Number(b.date)
        if (fe > se) {
          return 1;
        }
        if (fe < se) {
          return -1;
        }
        return 0;
      })
    // }
    dispatch({ type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT, payload: arrivalTimeFromStudent })
  }

  return { findStudentForDetails, getDetailsofAttendance }
}
export default useDetailsStudents