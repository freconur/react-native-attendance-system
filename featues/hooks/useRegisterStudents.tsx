import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore'
import { Grades, Section, StudentData } from '../types/types'
import { AttendanceRegister } from '../actions/actionAttendance'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/firebaseConfig';
import { useGlobalContext, useGlobalContextDispatch } from '../context';
import { currentYear } from '../../dates/date';
import { valiteGrade } from '../../utils/validateGrade';

const useRegisterStudents = () => {
  const db = getFirestore(app)
  const storage = getStorage()
  const dispatch = useGlobalContextDispatch()
  const { userData } = useGlobalContext()
  const registerNewStudent = async (dataFromStudent: StudentData,pictureProfileUrl?:string ) => {
    const rta = valiteGrade(`${dataFromStudent.grade}`)
      
    if(pictureProfileUrl) {

      await setDoc(doc(db, `/intituciones/${userData?.idInstitution}/students`, `${dataFromStudent.dni}`), {...dataFromStudent, pictureProfile:pictureProfileUrl,grade:rta,section:dataFromStudent.section?.toLowerCase()});
    }else {
      await setDoc(doc(db, `/intituciones/${userData?.idInstitution}/students`, `${dataFromStudent.dni}`), {...dataFromStudent, pictureProfile:"",grade:rta,section:dataFromStudent.section?.toLowerCase()});

    }
  }
  const getGrades = async () => {
    console.log('userData',userData)
    const docRef = (collection(db, `/intituciones/${userData?.idInstitution}/grades`));
    const q = query(docRef, orderBy("grade"));
    const docSnap = await getDocs(q)
    const grades: Grades[] = []
    docSnap.forEach((doc) => {
      grades.push(doc.data())
    })
    console.log('grades', grades);
    dispatch({ type: AttendanceRegister.GRADES, payload: grades })
  }

  const getSections = async () => {

    const docRef = collection(db, `/intituciones/${userData?.idInstitution}/sections`);
    const q = query(docRef, orderBy("section"))
    const docSnap = await getDocs(q)

    const sections: Section[] = []
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      sections.push(doc.data())
    });
    console.log('sections', sections);
    dispatch({ type: AttendanceRegister.SECTIONS, payload: sections })

  }

  const sendPictureProfile = async (archivoLocal: any) => {
    console.log('archivoLocal',archivoLocal)
    if(archivoLocal?.name) {
      const filesRef = ref(storage, `${currentYear()}/${archivoLocal.name}`);
      await uploadBytes(filesRef, archivoLocal);
      //obtener url de descarga
      const pictureProfileUrl = await getDownloadURL(filesRef)
      console.log(pictureProfileUrl)
      if (pictureProfileUrl) dispatch({ type: AttendanceRegister.PICTURE_PROFILE_URL, payload: pictureProfileUrl })
    }
  }
  return { registerNewStudent, getSections, getGrades, sendPictureProfile }
}

export default useRegisterStudents