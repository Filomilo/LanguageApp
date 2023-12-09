import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DarkModeColors, height, styles, width } from '../Styles';
import { FireBaseContext } from '../config/FireBaseContext';
import LoadingScreen from './LoadingScreen';



const FilePickerScren=()=> {
  const [image, setImage] = useState(null);
    const [statusCommunicate,setStatsusCommunicate]=useState("");
    const [isLaoding,setIsLoading]=useState(false);


  const {uploadNewFile} = useContext(FireBaseContext);



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const accpet=async ()=>{
    console.log("accpet")
    setIsLoading(true)
    if( await uploadNewFile(image))
    {
        setStatsusCommunicate("succesfuly sent file")
        decline();
    }
    else
    {
        setStatsusCommunicate("somehtign went worng whene sending file")
    }
    setIsLoading(false)
  }

  const decline=()=>{
    console.log("decline")
    setImage(null);
  
}

  const ButtonPick=()=>{
    return(
        <View>
                  <View style={[styles.BottomButtonsContainer, {}]}>
<Pressable onPress={pickImage}>
    <View style={[styles.BottomButton,DarkModeColors.primaryColor]}>
        <Text style={styles.BottomButtonText}>
        Pick an image
        </Text>
    </View>
</Pressable>
</View>
        </View>
    )
  }

  const FileAccpet=()=>{
    return(
        <View>
                  <View style={[styles.BottomButtonsContainer, {}]}>
<Pressable onPress={decline}>
    <View style={[styles.BottomButton,DarkModeColors.primaryColor]}>
        <Text style={styles.BottomButtonText}>
       decline
        </Text>
    </View>
</Pressable>


<Pressable onPress={accpet}>
    <View style={[styles.BottomButton,DarkModeColors.primaryColor]}>
        <Text style={styles.BottomButtonText}>
        accept
        </Text>
    </View>
</Pressable>

</View>
        </View>
    )
  }

if(isLaoding)
{
    return(
        <LoadingScreen />
    )
}

  return (
    <View style={[styles.mainContainer,{flex: 1} ]}>
     <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
      {image && <Image source={{ uri: image }} style={{ width: width*0.8, height:  width*0.8, borderRadius:width }} />}
        <Text style={{color: 'white'}}>
            {statusCommunicate}
        </Text>
     
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
      {image ? <FileAccpet /> : <ButtonPick />}
</View>
</View>



  );
}

export default FilePickerScren;