import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection:"column",
    gap:20
  },
  infoUserContainer:{
    // height:"30%",
  },
  logoutButton: {
    // backgroundColor: "blue",
    padding:10,
    flexDirection:"row",
    // justifyContent:"center",
    alignContent:"center",
    color: "#1e384f",
    gap:10,
  },
  logoutText:{
    color: "#1e384f",
    lineHeight:30
  },
  optionsDrawer: {
    // backgroundColor:"green",
    // flexDirection: "column",
    gap: 50,
    height:"auto",
  },
  pictureProfile: {
    width: 100,
    height: 100
  },
  textButton: {
    color: "#1e384f"
  },
  buttonIntroduccion: {
    backgroundColor: "rgba(208,236,211,0.5270483193277311)",
    padding: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "rgba(208,227,236,0.5270483193277311)",
    padding: 20,
    borderRadius: 5,
  },
  buttonMyProducts:{
    backgroundColor: "rgba(210,215,28,0.4643188120672376)",
    padding: 20,
    borderRadius: 5,
  },
  containerButtons: {
    // backgroundColor: "red",
    marginTop: 10,
    flexDirection: "column",
    gap: 20,
    // height:500
  },
  info: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    color: "#1e384f",
    fontSize: 20,
    textAlign: "center",
    textTransform: "capitalize"
  },
  rol: {
    color: "#969696",
    fontSize: 17,
    textAlign: "center",
    textTransform: "capitalize"
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleSchool: {
    fontSize: 25,
    color: "#1e384f",
    textAlign: "center",
    textTransform: "capitalize"
  },
  image: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 50,
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 300,
    backgroundColor: "green",
    width: 100,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  
})