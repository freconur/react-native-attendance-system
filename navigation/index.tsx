import { NavigationContainer } from "@react-navigation/native"
import StackInicio from "./stackInicio"
import { useEffect } from "react"
import useAuthentication from "../featues/hooks/useAuthentication"
import { useGlobalContext } from "../featues/context"
import StackMisProductos from "./stackProductos"


export const RootNavigator = () => {
  const user = false
  const { isAuthenticated } = useGlobalContext()
  const { isLoggin } = useAuthentication()
  useEffect(() => {
    isLoggin()
  },[])
  return (
    <NavigationContainer>

      {isAuthenticated ? <StackMisProductos /> : <StackInicio />}
    </NavigationContainer>
  )
}