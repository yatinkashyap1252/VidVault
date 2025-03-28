import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard"; // Add expo-clipboard for clipboard access
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const TextTweak = () => {
  const [text, setText] = useState(""); // State to store the entered text
  const [submittedText, setSubmittedText] = useState(""); // State to store the text after submission
  const [tweakText, setTweakText] = useState(""); // State to store the rewritten text
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const handleSubmit = async () => {
    if (!text) return; // Avoid submission if text is empty

    setSubmittedText(text); // Store the entered text into 'submittedText'
    setIsLoading(true); // Set loading state

    const url =
      "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28", // Put your API key here
        "x-rapidapi-host":
          "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "en",
        strength: 1,
        text: text,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse the response as JSON
      setTweakText(result.rewrite); // Set the rewritten text
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Function to copy the rewritten text to clipboard
  const handleCopy = async () => {
    if (tweakText) {
      await Clipboard.setStringAsync(tweakText); // Copy to clipboard
    } else {
      Alert.alert("No text", "There is no text to copy.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
            height: height * 0.15,
          }}
        >
          <Text style={styles.title}>TextTweak</Text>
          <Text style={styles.subtitle}>Rewrite, Rethink, Reinvent</Text>
        </View>

        {/* Text Input for the user to enter the text */}
        <TextInput
          style={styles.textInput}
          placeholder="Enter the text"
          value={text}
          onChangeText={setText}
        />

        {/* Button to submit the text */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" /> // Show loading spinner
          ) : (
            <Text style={styles.submitButtonText}>Tweak Text</Text>
          )}
        </TouchableOpacity>

        {/* Display the rewritten text after submission */}
        {tweakText && (
          <View style={styles.rewrittenTextContainer}>
            {/* Copy Button */}
            <TouchableOpacity
              onPress={handleCopy}
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                position:"absolute",
                bottom:-15,
              }}
            >
              <MaterialIcons name="content-copy" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.rewrittenText}>{tweakText}</Text>
            <Text style={styles.rewrittenTextTitle}>Tweaked Text</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for improved UI
const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 22,
    color: "#666",
    marginTop: 5,
    letterSpacing: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    width: "95%",
    marginHorizontal: "auto",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#000",
    width: "95%",
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
  rewrittenTextContainer: {
    marginTop: 30,
  },
  rewrittenTextTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    paddingRight: 10,
    textAlign: "right",
    marginTop:10
  },
  rewrittenText: {
    fontSize: 30,
    paddingLeft: 10,
    width: "95%",
    fontWeight: 700,
    color: "#000",
    marginTop: 10,
  }
});

export default TextTweak;
