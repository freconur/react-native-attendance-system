import { ReactNode } from "react"
import { AttendanceRegister } from '../actions/actionAttendance'
export type AuthProviderProps = {
  children: React.ReactNode
}
export interface UserData {
  born?: Date,
  dni?:string,
  name?:string
  firstname?:string,
  lastname?:string,
  id?:string,
  institutionName?:string,
  idInstitution?:string,
  pictureProfile?:string,
  rol?:string,
  acc?:string
}
export type UserToken = {
  token: string | null,
  isAuthenticated: boolean | null
}
export interface StudentData {
  nameFather?: string,
  nameMother?: string,
  numberFather?: string,
  numberMother?: string,
  dni?: string,
  pictureProfile?: string,
  grade?: string,
  name?: string,
  lastname?: string,
  lastname2?: string,
  qr?: string,
  section?: string,
  cellPhone?: string,
  currentAttendance?: Date,
  attendanceByDate?: string
}
export interface Section {
  section?: string
}
export interface Grades {
  grade?: string,
  traditionalGrade?: string
}
export type Student = {
  studentsData: StudentData[],
  testing: number,
  sections: Section[],
  grades: Grades[],
  pictureProfileUrl: string,
  studentsByGradeAndSection: StudentData[],
  loaderAsistencia: boolean,
  loaderRegistrosAsistencia: boolean,
  studentDetails: StudentData
  resumeAttendanceStudent: DetailsPerDayOfStudent[]
  studentByResultWarning: string,
  studentByResult: StudentData,
  loaderSearchStudent: boolean,
  token?:UserToken | {},
  isAuthenticated:boolean,
  userData?:UserData,
  justificacionMotivoModal:boolean,
  justificacionFaltaModal: boolean,
  loadingConfirmationJustification:boolean,
  studentDataConfirmation:JustificacionStudent,
}
export interface JustificationValue {
  justification: string
}
export interface DetailsPerDayOfStudent {
  day: string,
  date: string,
  attendance: string,
}
export interface JustificacionStudent {
  arrivalTime?: string,
  justification?: boolean,
  justificationMotive?: string,
  id?: string
}
export type AttendanceAction =
  | { type: AttendanceRegister.ATTENDANCE_REGISTER; payload: StudentData[] }
  | { type: AttendanceRegister.GRADES; payload: Grades[] }
  | { type: AttendanceRegister.SECTIONS; payload: Section[] }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.PICTURE_PROFILE_URL; payload: string }
  | { type: AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION; payload: StudentData[] }
  | { type: AttendanceRegister.LOADER_ASISTENCIA; payload: boolean }
  | { type: AttendanceRegister.LOADER_REGISTROS_ASISTENCIA; payload: boolean }
  | { type: AttendanceRegister.STUDENT_DETAILS; payload: StudentData }
  | { type: AttendanceRegister.RESUME_ATTENDANCE_STUDENT; payload: DetailsPerDayOfStudent[] }
  | { type: AttendanceRegister.STUDENT_BY_RESULT; payload: StudentData }
  | { type: AttendanceRegister.STUDENT_BY_RESULT_WARNING; payload: string }
  | { type: AttendanceRegister.LOADER_SEARCH_STUDENT; payload: boolean }
  | { type: AttendanceRegister.USER_TOKEN; payload: UserToken }
  | { type: AttendanceRegister.USER_DATA; payload: UserData }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_MOTIVO; payload: JustificacionStudent }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_MODAL; payload: boolean }
  | { type: AttendanceRegister.SHOW_JUSTIFICACION_FALTA_CONFIRMATION_MODAL; payload: boolean }
  | { type: AttendanceRegister.LOADING_CONFIRMATION_JUSTIFICATION; payload: boolean }
export type AuthenticationFormSignIn = {
  email: string,
  password: string
}