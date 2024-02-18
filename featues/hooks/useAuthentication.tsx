import { AuthenticationFormSignIn } from "../types/types"
import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword,signOut } from 'firebase/auth'
import { app } from "../../firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContextDispatch } from "../context";
import { AttendanceRegister } from "../actions/actionAttendance";
const auth = getAuth(app)
const db = getFirestore(app)


const useAuthentication = () => {
  const TOKEN_KEY = "user-jwt"
  const dispatch = useGlobalContextDispatch()

  const signIn = async (loginData:AuthenticationFormSignIn) => {
    let rta: any = {}
    try {
      rta = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)

      const data = {
        token:rta.user.accessToken,
        email:loginData.email,
        password:loginData.password
      }
      AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({
        token:rta.user.accessToken,
        email:loginData.email,
        password:loginData.password
      }))
      getUser(rta.user.uid)
      dispatch({ type: AttendanceRegister.USER_TOKEN, payload: { token: rta.user.accessToken, isAuthenticated: true } })
    } catch (error: any) {
      console.log('error de sesion', error?.message)
    }
  }
  const getUser = async (id: string) => {
    const refUser = doc(db, 'users', id as string)
    const user = await getDoc(refUser)

    // console.log('users', user.)
    if (user.exists()) {
      dispatch({
        type: AttendanceRegister.USER_DATA, payload: {
          firstname:user.data().firstname,
          pictureProfile:user.data().pictureProfile,
          institutionName:user.data().institutionName,
          idInstitution:user.data().idInstitution,
          lastname: user.data().lastname,
          name: user.data().name,
          rol: user.data().rol,
          id: user.id,
          acc: user.data().acc,
          born: user.data().fechaNacimiento,
          dni: user.data().dni,
        }
      })
    } else {
      console.log('usuario incorrecto o la contraseña no es valida.')
    }
  }
  const isLoggin = async () => {
    try {

      let jsonValue = await AsyncStorage.getItem(TOKEN_KEY);
      const userToken = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (userToken) {
        signIn({email:userToken.email, password:userToken.password})
        // dispatch({ type: AuthActionTypes.SIGN_IN, payload: { token: userToken.token } })
      }
    } catch (error) {
      console.log('error token:', error)
    }
  }

  const logout = () => {
    signOut(auth)
    AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({}))
    dispatch({ type: AttendanceRegister.USER_TOKEN, payload: { token: "", isAuthenticated: false } })

  }

  return {signIn, isLoggin, logout}
}

export default useAuthentication