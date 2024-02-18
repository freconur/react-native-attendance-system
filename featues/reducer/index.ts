import { AttendanceRegister } from "../actions/actionAttendance";
import { AttendanceAction, Student, StudentData } from "../types/types";



export const attendance = (state: Student, action: AttendanceAction) => {
  switch (action.type) {
    case AttendanceRegister.USER_DATA:
      return {
        ...state,
        userData:action.payload
      }
    case AttendanceRegister.USER_TOKEN:
      return {
        ...state,
        token:action.payload.token,
        isAuthenticated:action.payload.isAuthenticated
      }
    case AttendanceRegister.LOADER_SEARCH_STUDENT:
      return {
        ...state,
        loaderSearchStudent:action.payload
      }
    case AttendanceRegister.STUDENT_BY_RESULT_WARNING:
      return {
        ...state,
        studentByResultWarning:action.payload
      }
    case AttendanceRegister.STUDENT_BY_RESULT:
      return {
        ...state,
        studentByResult:action.payload
      }
    case AttendanceRegister.RESUME_ATTENDANCE_STUDENT:
    return {
      ...state,
      resumeAttendanceStudent:action.payload
    }
    case AttendanceRegister.STUDENT_DETAILS:
      return {
        ...state,
        studentDetails:action.payload
      }
    case AttendanceRegister.LOADER_REGISTROS_ASISTENCIA:
      return {
        ...state,
        loaderRegistrosAsistencia:action.payload
      }
    case AttendanceRegister.LOADER_ASISTENCIA:
      return {
        ...state,
        loaderAsistencia:action.payload
      }
    case AttendanceRegister.ATTENDANCE_REGISTER:
      return {
        ...state,
        studentsData: action.payload
      }

    case AttendanceRegister.GRADES:
      return {
        ...state,
        grades: action.payload
      }
    case AttendanceRegister.SECTIONS:
      return {
        ...state,
        sections: action.payload
      }
    case AttendanceRegister.PICTURE_PROFILE_URL:
      return {
        ...state,
        pictureProfileUrl: action.payload
      }
    case AttendanceRegister.STUDENT_BY_GRADE_AND_SECTION:
      return {
        ...state,
        studentsByGradeAndSection:action.payload
      }
    default:
      return state
  }
}