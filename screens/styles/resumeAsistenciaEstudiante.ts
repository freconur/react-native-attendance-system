import { StyleSheet,StatusBar } from "react-native";

export const styles = StyleSheet.create({
  backIcon: {
    fontSize: 40,
    color: "#1e384f"
  },
  back: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  header:{
    flexDirection:"row",
    gap:10,
    backgroundColor:"#4a34dd",
    borderRadius:10,
    width:"100%",
    padding:15,
  }, 
  headerLabel:{
    width:"33%",
    color:"#fff",
    fontWeigth:"600",
    textTransform:"uppercase",
    textAlign:"left"
  },
  container:{
    padding:10,
    flex:1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  rowListContainer:{
    flexDirection:"row",
    width:"100%",
    padding:15,
    borderBottomColor:"#f1f1f1",
    borderBottomWidth:1,
  },
  row:{
    width:"33%",
    textAlign:"left",
    textTransform:"uppercase",
  },
  rowDate:{
    width:"33%",
    textAlign:"left",
    paddingLeft:20,
  },
  rowAttendance:{
    width:"33%",
    textAlign:"left",
    paddingLeft:20,
    color:"green"
  },
  rowAttendanceLate:{
    width:"33%",
    textAlign:"left",
    paddingLeft:20,
    color:"red"
  },
  scrollView:{
    backgroundColor:"#fff",
    borderRadius:10,
    marginTop:5,
  },
  month:{
    fontSize:20,
    textTransform:"uppercase"
  },
  select: {
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    width:"50%",
    elevation: 4,
    shadowRadius: 3.05,
    textTransform: "uppercase",
    marginBottom:10,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
})