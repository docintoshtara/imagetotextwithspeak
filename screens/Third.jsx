import * as React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';

const Third = () => {
  const route = useRoute();
  const { imgtotext } = route.params;
  const [extractedText, setExtractedText] = useState(imgtotext); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordCount, setWordCount] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');

  useEffect(() => {
    const wordCount = calculateWordCount(extractedText);
    setWordCount(wordCount);
  }, [extractedText]);

  const calculateWordCount = (text) => {
    if (!text) {
      return {}; // Return an empty object if text is undefined or empty
    }

    const words = text.split(/\s+/);
    const wordCount = {};

    words.forEach((word) => {
      word = word.toLowerCase().replace(/[.,!?;()]/g, ''); // Normalize the word
      if (word) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    return wordCount;
  };

  const handlePlay = () => {
    if (!isSpeaking) {
      Speech.speak(extractedText, {
        language: selectedLanguage,
        pitch: 1.0,
        rate: 1.0,
        onDone: () => setIsSpeaking(false),
        onStart: () => setIsSpeaking(true),
      });
    }
  };

  const handleStop = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Extracted text:</Text>
      <Text style={styles.text1}>{extractedText}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableCell]}>Word</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Count</Text>
          </View>
          {Object.entries(wordCount).map(([word, count]) => (
            <View key={word} style={styles.tableRow}>
              <Text style={styles.tableCell}>{word}</Text>
              <Text style={styles.tableCell}>{count.toString()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Hindi" value="hi-IN" />
        <Picker.Item label="Marathi" value="mr-IN" />
        <Picker.Item label="Gujarati" value="gu-IN" />
        <Picker.Item label="Tamil" value="ta-IN" />
        <Picker.Item label="Kannada" value="kn-IN" />
      </Picker>

      <Button
        title={isSpeaking ? 'Stop' : 'Play'}
        onPress={isSpeaking ? handleStop : handlePlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default Third;
