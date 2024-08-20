import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert,Text,ActivityIndicator  } from 'react-native';
import { Button, Title, Paragraph, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Second = () => {
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const navigation = useNavigation();
  const [extractedText, setExtractedText] =  useState(""); 
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'You need to grant camera roll permissions.');
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;


    let result =
    await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
            ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
    });
if (!result.canceled) {
    // Perform OCR on the selected image
    performOCR(result.assets[0]); 

    // Set the selected image in state
    setImage(result.assets[0].uri); 
}

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImageWithCamera = async () => {

    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
    });
    if (!result.canceled) {
        performOCR(result.assets[0]); 
        setImage(result.assets[0].uri);
    }
};
const performOCR = (file) => {
    setLoading(true);
    let myHeaders = new Headers();
    // ADDD YOUR API KEY HERE 
    myHeaders.append("apikey","66KcvdAFufoNuBYIsNoJvcrwOCPtiTjj");
    myHeaders.append(
        "Content-Type",
        "multipart/form-data"
    );

    let raw = file;
    let requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: raw,
    };
    // Send a POST request to the OCR API
    fetch(
        "https://api.apilayer.com/image_to_text/upload",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {

           if (result && result["all_text"]) {
               let extractedText = result["all_text"];
               setExtractedText(extractedText);
               setLoading(false);
           } else {
               console.log("No text found in the image.");
               setExtractedText("");
           }


        })
        .catch((error) => console.log("error", error));


  };

  const handleNavigation = () => {
    const imgtotext = extractedText;
    navigation.navigate('Third', {imgtotext });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Title style={styles.title}>Image Picker</Title>
      <Paragraph style={styles.paragraph}>
        Choose an image from your gallery or take a new photo using your camera.
      </Paragraph>

      <Button
        mode="contained"
        icon="image"
        onPress={pickImageFromGallery}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Pick from Gallery
      </Button>
      <Button
        mode="contained"
        icon="camera"
        onPress={takeImageWithCamera}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Take a Picture
      </Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>{loading?(<View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>):('')}</Text>
      {extractedText && 
      <View style={styles.container1}>
      <Button  mode="contained" title="Next" onPress={handleNavigation} style={styles.button1}>  Next</Button>
    </View>
      
      
      }
    </View>
  );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
  button1: {
    width: '40%',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    marginTop: 10,
    width: '80%',
    borderRadius: 5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default Second;
