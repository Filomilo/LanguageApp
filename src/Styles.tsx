import { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { FireBaseContext } from "./config/FireBaseContext";

export const width=Dimensions.get("window").width;
export const height=Dimensions.get("window").height;





export const darkModeMainTextColor="white";
export const darkModeBackgroundColor="#1A1A1A";
export const darkModeHeaderColor="#313131";
export const darkModePrimaryColor="#63AF66";
export const darkModeTextInputColor="#646464";
export const darkModePlaceholderTextInputColor="#444444";



export const DarkModeColors = StyleSheet.create({
BackGroundColor:{
  backgroundColor: darkModeBackgroundColor,
},
MainTextColor:{
  color: darkModeMainTextColor
},
headerColor:{
  backgroundColor: darkModeHeaderColor
},
primaryColor:{
  backgroundColor: darkModePrimaryColor,
},
primaryColorText:{
  color: darkModePrimaryColor,
}
,
TextInputColorBackground:{
  backgroundColor: darkModeTextInputColor,
}

});



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1,
      backgroundColor: darkModeBackgroundColor

    },
    verticalContainer: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      rowGap: height*0.02,
      

    },
    horizontalContainer: {

      flexDirection: 'row', 
    justifyContent: 'space-evenly',
    width: width

    },
    input: {
      height: height*0.07,
      margin: 12,
      width: width*0.9,
      borderWidth: 1,
      borderRadius: width*0.02,
      padding: 10,
      backgroundColor: darkModeTextInputColor,
      color: darkModeMainTextColor
    },
    headerButton: {
      margin: 1,
      width: width/1.23,
      alignItems: 'flex-end',
    },
    rightUpperDeckButton: {
      flex: 1,
      alignItems: 'flex-end',
      marginHorizontal: width/30
    },
    deckViewTitleContainer: {
 
      marginHorizontal: width/30,
      width: width/1.5,
      
    },
    deckViewTitleText: {
     fontSize: width*0.1,
     fontWeight: "bold",
     width: width/1.24,
    },
    LineSeparator:{
      width: width*0.8,
      height: height*0.004,
      marginVertical: height*0.01,
      backgroundColor: darkModePrimaryColor,
      alignSelf: 'center'
    },
    langageText: {
      fontSize: width*0.08,
      width: width,
      textAlign: 'center',
    },
    langWords: {
      fontSize: width*0.05,
      width: width/3,
      textAlign: 'center',
    },
    BottomButtonsContainer: {
      flexDirection: 'row',
      width: width,
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      height: height*0.07,
      maxWidth: width,
    
   
    },
    BottomButton: {
      flex: 1, 
      //flexBasis: 1,
     // margin: width*0.03,
      width: width*0.45,
      height: height*0.07,
      backgroundColor: darkModeHeaderColor,
      alignItems: 'center',
      justifyContent: 'center'
  
     
    },
    BottomButtonText: {
     textAlign: 'center'
    },
    popPopButton: {
      flex: 1,
      backgroundColor: darkModeHeaderColor,
      alignItems: 'center',
      justifyContent: 'center',
      
      borderColor: darkModePrimaryColor
     
    },
    iconWithTextContainer:{
        flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    dotStyle:{
      backgroundColor: darkModePrimaryColor,
      borderRadius: width
    },
    textInput: {
      backgroundColor: darkModeTextInputColor,
      width: width*0.9,
      height: height*0.05,
      borderRadius: width *0.02,
      textAlign: 'center',
      fontSize: height*0.03,
      color: darkModeMainTextColor
    },
    radioButtonText: {
     color: darkModeMainTextColor,
     marginHorizontal: width*0.1,
     fontSize: height*0.04,
     textAlign: 'center'
    },
    resultText:{
      fontSize: width*0.4,
      color: darkModeMainTextColor
    },
    statText:{
      fontSize: width*0.05,
      color: darkModeMainTextColor,
      marginLeft: "3%"
    },
    DeckButtonContainer: {
      flex: 1,
      width: width*0.95,
      height: height* 0.16,
      backgroundColor: darkModeTextInputColor,
      alignSelf: 'center',
      borderRadius: width*0.05,
      marginVertical: height*0.01,
      flexDirection: 'row',
      margin: 100,
    },
    DeckTitleStyle: {
      color: darkModePrimaryColor,
      fontSize: height*0.03,
      margin: '5%',
      maxHeight: '40%',
      overflow: 'scroll'
    },
    DeckParamText: {
        fontSize: height*0.018,
        marginVertical: '2%',
        marginHorizontal: '7%',
        color: darkModeBackgroundColor
    },
    DeckLangText:{
      color: darkModeBackgroundColor,
      fontSize: height*0.03,
      marginVertical: width*0.019,
      marginHorizontal: width*0.03,
    },
    DeckCardText:{
      alignSelf: 'flex-end',
      color: darkModeMainTextColor,
      marginVertical: width*0.019,
      marginHorizontal: width*0.03,
      fontSize: height*0.03,
    },
    textButton:{
      width: width*0.7,
      height: height*0.08,
      backgroundColor: darkModePrimaryColor,
      borderRadius: height*0.01,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    onButtonText:{
      fontSize: height*0.03,
      color: darkModeBackgroundColor
    },
    floatingButton:{
      alignItems: 'flex-end',
        margin: width*0.05
    },
    proflePic:{
      width: width*0.35,
      height: width*0.35,
      borderRadius:  width*0.3,
    },
    proflePicList:{
      width: width*0.25,
      height: width*0.25,
      borderRadius:  width*0.3,
    },
    optionActionText:{
      fontSize: height*0.03,
      color: darkModePrimaryColor
    },
    SettingOptionText:{
        color: darkModeMainTextColor,
        fontSize: height*0.03
    },
    loginButton:{
      backgroundColor: darkModePrimaryColor,
      width: width*0.6,
      height: height*0.08,
      borderRadius: width*0.03,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginTop: height*0.02
    },
    loginButtonText:{
      fontSize: height*0.04,
      color: darkModeBackgroundColor
    },
    camera: {
      flex: 1,
      width: width,
      height: width/9*16

    },
    cameraContainer: {
      flex: 1,

    },
    cameraButtonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    cameraButton: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    }
  
   
    


    


  });
  