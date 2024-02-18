import { DetailsPerDayOfStudent } from "../featues/types/types"

const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const todayDateArray = () => {
  const date: Date = new Date()
  const today = {
    momth: months[date.getMonth()],
    year: date.getFullYear()
  }
  return today
}
export const EnableMonths = () => {
  const date = new Date()
  return months.slice(0, date.getMonth() + 1)
}
export const todayDate = () => {
  const date = new Date()
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}

export const currentMonth = () => {
  const date = new Date()
  return months[date.getMonth()]
}
export const currentYear = () => {
  const date = new Date()
  return `${date.getFullYear()}`
}
export const currentDate = () => {
  const date = new Date()
  return `${date.getDate()}`
}
export const functionDateConvert = (date: Date) => {
  // console.log(`${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`)
  return `${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`
}
export const functionDateToPrinter = (date: Date) => {
  // console.log(`${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`)
  // console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
  return (`Fecha: ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}  Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}
export const functionBirthdayDate = (date: Date) => {
  const seconds = date.toString().slice(18, 27)
  const nanoseconds = date.toString().slice(42, 49)
  const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
  const birthdayUser = new Date(rta)
  return `${birthdayUser.getDate()} de ${months[birthdayUser.getMonth()]} del ${birthdayUser.getFullYear()}`
}
export const getDayFromDateFalta = (date: Date) => {
  const detailsPerDayOfStudent = {
    day: days[date.getDay()],
    date: `${date.getDate()}`,
    attendance: "falta"
  }
  return detailsPerDayOfStudent
}
export const getDayFromDate = (date: Date) => {
  const detailsPerDayOfStudent = {
    day: days[date.getDay()],
    date: `${date.getDate()}`,
    attendance: "justificado"
  }
  return detailsPerDayOfStudent
}
export const monthToANumber = (mes: string) => {
  if (mes === "enero") return "1"
  if (mes === "febrero") return "2"
  if (mes === "marzo") return "3"
  if (mes === "abril") return "4"
  if (mes === "mayo") return "5"
  if (mes === "junio") return "6"
  if (mes === "julio") return "7"
  if (mes === "agosto") return "8"
  if (mes === "setiembre") return "9"
  if (mes === "octubre") return "10"
  if (mes === "noviembre") return "11"
  if (mes === "diciembre") return "12"
}

export const hoursUnixDate = (date: Date) => {
  const hourSeconds = new Date(Number(date?.toString().slice(18, 28)) * 1000)
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    return `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const hour = new Date(rta)
    return `${hour.getHours().toString().padStart(2, "0")}:${hour.getMinutes().toString().padStart(2, "0")}:${hour.getSeconds().toString().padStart(2, "0")}${hour.getHours() < 12 ? "am" : "pm"}`
  }
}
export const hoursUnixDateForDetailStudent = (date: Date) => {
  const seconds = date?.toString().slice(18, 28)
  const nanoseconds = date?.toString().slice(42, 49)
  const hourSeconds = new Date(Number(date?.toString().slice(18, 28)) * 1000)
  // console.log('hourSecondsksk', hourSeconds)
  if (seconds?.length > 0 && Number(nanoseconds[0]) === 0) {
    const detailsPerDayOfStudent = {
      day: days[hourSeconds.getDay()],
      date: `${hourSeconds.getDate()}`,
      attendance: `${hourSeconds.getHours().toString().padStart(2, "0")}:${hourSeconds.getMinutes().toString().padStart(2, "0")}:${hourSeconds.getSeconds().toString().padStart(2, "0")}${hourSeconds.getHours() < 12 ? "am" : "pm"}`
    }
    return detailsPerDayOfStudent
  } else {
    const rta = (Number(seconds) + Number(nanoseconds) / 1000000000) * 1000
    const fecha = new Date(rta)
    const detailsPerDayOfStudent = {
      day: days[fecha.getDay()],
      date: `${fecha.getDate()}`,
      attendance: `${fecha.getHours().toString().padStart(2, "0")}:${fecha.getMinutes().toString().padStart(2, "0")}:${fecha.getSeconds().toString().padStart(2, "0")}${fecha.getHours() < 12 ? "am" : "pm"}`
    }
    return detailsPerDayOfStudent
  }
}
export const dateConvertObject = (date: Date) => {
  return {
    date: date.getDate(),
    month: months[date.getMonth()],
    year: Number(date.getFullYear())
  }
}

export const dateConvertObjectStudent = (date: Date) => {
  console.log('date.getHours()', date.getHours())
  console.log('date.getHours()', `${date.getHours() < 12 ? "am" : "pm"}`)
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()}${date.getHours() < 12 ? "am" : "pm"} el dia ${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}
export const numberToNameMonth = (value: number) => {
  // const date = new Date()
  return months[value]
}