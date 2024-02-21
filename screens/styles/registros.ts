import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ingresoTextContainer:{
  //   flexDirection:"row",
  //   justifyContent:"center",
  //   alignItems:"center",
  //   backgroundColor:"#67badf"
  // },
  faltaContainer: {
    flexDirection:'row',
    gap:2,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"blue",
    marginRight:2
  },
  jota:{
    padding:2,
    backgroundColor:"#ffed00",
    height:20,
    width:20,
    borderRadius:5,
    textAlign:"center",
  },
  ingresoText:{
    fontSize:11,
    textAlign:"center",
    // marginLeft:20
  },
  textCardOrder:{
    fontSize:11,
    color:"#a3b1b4",
    width:"5%",
  },
  textCardDni:{
    fontSize:11,
    color:"#a3b1b4",
    width:"18%",
  },
  textCardName:{
    fontSize:11,
    color:"#a3b1b4",
    width:"55%",
    textTransform:"uppercase"
  },
  textCardLastname:{
    fontSize:11,
    color:"#a3b1b4",
  },
  header:{
    width:"100%",
    padding:1,
    flexDirection:"row",
    gap:1,
    backgroundColor:"#e3f6f5",
    borderWidth:1,
    borderColor:"#a3b1b4"
  },
  order:{
    width:"5%",
    // padding:5,
    textAlign:"center",
    textTransform:"uppercase",
    fontSize:11,
    lineHeight:40
  },
  dni:{
    width:"20%",
    textAlign:"center",
    textTransform:"uppercase",
    fontSize:11,
    lineHeight:40,
    // backgroundColor:"red"
  },
  apellidos:{
    width:"40%",
    textAlign:"center",
    textTransform:"uppercase",
    fontSize:11,
    lineHeight:40
  },
  ingreso:{
    width:"40%",
    textAlign:"center",
    textTransform:"uppercase",
    fontSize:11,
    lineHeight:40
  },
  salida:{
    width:"20%",
    textAlign:"center",
    textTransform:"uppercase",
    fontSize:11,
    lineHeight:40
  },
  warningRegistros:{
    textAlign:"center",
    color:"#969696",
    marginVertical:10,

  },
  loader:{
    textAlign:"center",
    color:"#969696"
  },
  pictureProfile:{
    fontSize:80,
    color:"#cff0ff",
    width:100,
    heigth:100,
    textAlign:"center"
  },
  userWithoutPicutre:{
    margin:"auto",
    justifyContent:"center",
    alignItems:"center",
    width:100,
    heigth:100,
    padding:10,
    backgroundColor:"#67badf"
  },
  containeInfoStudent: {
    // gap: 10
  },
  info: {
    // alignItems:"center",
    justifyContent: "center",
    flexDirection:"row",
    gap:1
  },
  container: {
    flex: 1,
    padding: 10
  },
  textLabel: {
    color: "#969696"
  },
  cardContainer: {
    gap: 15,
    padding: 5
  },
  textCard: {
    fontSize: 15,
    width: "10%",
    textTransform: "uppercase",
  },
  textCardLate:{
    color:"red"

  },
  textCardAttendance:{
    fontSize: 15,
    // width: 200,
    textTransform: "uppercase",
    color:"green"
  },
  card: {
    padding: 10,
    flexDirection: "row",
    gap: 1,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  image: {
    width: 100,
    height: 100
  },
  buttonDateText: {
    fontSize: 20,
    color: "#969696",
    textTransform: "capitalize"
  },
  buttonDate: {
    backgroundColor: "#fff",
    borderRadius: 5,
    // width:120,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
  },
  buttonDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20
  },
  selectContainer: {
    flexDirection:"row",
    marginBottom: 15,
    gap: 10,
  },
  select: {
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 3.05,
    textTransform: "uppercase",
    width:"49%",
  },

  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})