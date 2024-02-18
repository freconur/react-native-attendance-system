
import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import { attendance } from "../reducer";
import { AttendanceAction, Student, UserToken, UserData } from "../types/types";
interface Props {
  children: ReactNode
}
const initialState: Student = {
  studentsData: [],
  testing:23,
  sections: [],
  grades: [],
  pictureProfileUrl:"",
  studentsByGradeAndSection:[],
  loaderAsistencia:false as boolean,
  loaderRegistrosAsistencia: false as boolean,
  studentDetails:{},
  resumeAttendanceStudent:[],
  studentByResultWarning: "",
  studentByResult: {},
  loaderSearchStudent:false,
  token:{} ,
  isAuthenticated:false,
  userData:{} ,
  justificacionMotivoModal:false
}

export const GlobalContext = createContext<[Student, Dispatch<AttendanceAction>]>([initialState, () => { }])
// export const Attendance = createContext<Student>({studentData: {}})

export const useGlobalContext = () => useContext(GlobalContext)[0]
export const useGlobalContextDispatch = () => useContext(GlobalContext)[1]

export const GlobalContextProvider = ({ children }: Props) => {

  return (
    <GlobalContext.Provider value={useReducer(attendance, initialState)}>
      {children}
    </GlobalContext.Provider>
  )
}