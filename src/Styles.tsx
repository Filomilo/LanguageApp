import { Dimensions, StyleSheet } from "react-native";

export const width=Dimensions.get("window").width;
export const height=Dimensions.get("window").height;



export const darkModeMainTextColor="white";
export const darkModeBackgroundColor="#1A1A1A";
export const darkModeHeaderColor="#313131";
export const darkModePrimaryColor="#63AF66";
export const darkModeTextInputColor="#646464";


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
      height: height/10,
      margin: 12,
      borderWidth: 1,
      padding: 10,
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
      color: darkModeMainTextColor
    }


  });
  