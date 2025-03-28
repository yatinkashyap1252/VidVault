import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

const {width,height}=Dimensions.get('window')

const TextTranslate = () => {
  const [text, setText] = useState(""); // State for the input text
  const [translatedText, setTranslatedText] = useState(""); // State for the translated text
  const [srcLang, setSrcLang] = useState("en"); // State for the source language
  const [destLang, setDestLang] = useState("hi"); // State for the destination language
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [languages, setLanguages] = useState([]); // State for storing the available languages

  useEffect(() => {
    // Fetch available languages on component mount
    const fetchLanguages = async () => {
      const url = "https://google-translator9.p.rapidapi.com/v2/languages";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28", // Replace with your secure API key
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setLanguages(result.data.languages); // Set languages in state
      } catch (error) {
        console.error(error);
        Alert.alert("Failed to load languages. Please try again.");
      }
    };

    fetchLanguages();
  }, []);

  const handleTranslate = async () => {
    if (!text) {
      Alert.alert("Please enter some text to translate.");
      return;
    }
    if (!srcLang || !destLang) {
      Alert.alert("Please select both source and destination languages.");
      return;
    }

    setLoading(true);
    const url = "https://google-translator9.p.rapidapi.com/v2";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28", // Replace with your API key
        "x-rapidapi-host": "google-translator9.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: srcLang,
        target: destLang, // Set the selected target language
        format: "text",
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslatedText(result.data.translations[0].translatedText); // Set the translated text
    } catch (error) {
      console.error(error);
      Alert.alert("Translation failed, please try again.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    Clipboard.setString(translatedText);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
          height: height * 0.15,
        }}
      >
        <Text style={styles.title}>WordWave</Text>
        <Text style={{fontSize:24,}}>Bringing Words Together</Text>
      </View>

      {/* Input Text */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter text to translate"
        value={text}
        onChangeText={setText}
      />

      {/* Source Language Dropdown */}
      <Text style={styles.label}>Select Source Language</Text>
      <Picker
        selectedValue={srcLang}
        onValueChange={(itemValue) => setSrcLang(itemValue)}
        style={styles.picker}
      >
        {languages.map((lang, index) => (
          <Picker.Item
            key={index}
            label={lang.language}
            value={lang.language}
          />
        ))}
      </Picker>

      {/* Destination Language Dropdown */}
      <Text style={styles.label}>Select Destination Language</Text>
      <Picker
        selectedValue={destLang}
        onValueChange={(itemValue) => setDestLang(itemValue)}
        style={styles.picker}
      >
        {languages.map((lang, index) => (
          <Picker.Item
            key={index}
            label={lang.language}
            value={lang.language}
          />
        ))}
      </Picker>

      {/* Translate Button */}
      <TouchableOpacity onPress={handleTranslate} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Translating..." : "Translate"}
        </Text>
      </TouchableOpacity>

      {/* Loading Spinner */}
      {loading && (
        <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      )}

      {/* Translated Text */}
      {translatedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{translatedText}</Text>
          <Text style={styles.resultTitle}>Translated Text</Text>

          {/* Copy Button */}
          <TouchableOpacity
            onPress={handleCopy}
            style={{ position: "absolute", left: 10, bottom: 0 }}
          >
            <MaterialIcons name="content-copy" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  picker: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  spinner: {
    marginTop: 20,
  },
  resultContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: 40,
    padding: 20,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: 600,
    textAlign: "right",
    marginTop: 20,
    width: "50%",
    position: "absolute",
    right: 0,
    bottom: 5,
  },
  resultText: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default TextTranslate;
