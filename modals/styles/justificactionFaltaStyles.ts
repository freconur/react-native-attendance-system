import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  justificationModal: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  loader:{
    textAlign:"center",
    color:"#969696"
  },
  container:{
    backgroundColor:"#e7edff",
    padding:10,
    borderRadius:5,
  },
  textLabel:{
    color: "#969696"
  },
  warningSaleModalText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 21,
    color: "#969696"
  },
  input: {
    paddingLeft:10,
    width: "100%",
    marginTop: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: {
      shadowColor: "black",
      shadowOffset: {
        width: 6,
        height: 6
      },
      shadowOpacity: 0.6,
      shadowRadius: 4
    }
  },
  agreeJustificationText:{
    width:150,
    backgroundColor:"#1550ff",
    borderRadius:5,
    padding:10,
    color:"#fff",
    textAlign:"center",
    textTransform:"uppercase"
  },
  agreeJustificationTextDisabled:{
    backgroundColor:"#d0d0d0",
    borderRadius:5,
    padding:10,
    color:"#fff",
    width:150,
    textAlign:"center",
    textTransform:"uppercase"
  },
  cancelJustiticationText: {
    color: "#ff5f39",
    textAlign:"center",
    width:150,
    textTransform:"uppercase"
  },
  containerButtons:{
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    width:"100%",
    gap:10,
    marginTop:10
    
  }
})