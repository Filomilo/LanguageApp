import { Dimensions, StyleSheet } from "react-native";

const width=Dimensions.get("window").width;
const height=Dimensions.get("window").height;



export const darkModeMainTextColor="white";
export const darkModeBackgroundColor="#1A1A1A";
export const darkModeHeaderColor="#313131";
export const darkModePrimaryColor="#63AF66";
export const darkModeTectInputColor="#646464";

export const DarkModeColors = StyleSheet.create({
BackGroundColor:{
  backgroundColor: darkModeBackgroundColor,
},
MainTextColor:{
  color: darkModeMainTextColor
},
headerColor:{
  backgroundColor: darkModeHeaderColor
}



});



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: height/10,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  