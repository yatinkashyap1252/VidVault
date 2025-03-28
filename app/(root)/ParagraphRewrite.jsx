import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ParagraphRewrite = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [combinationCount, setCombinationCount] = useState(""); // Input for combination count
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle the API request
  const handleRewrite = async () => {
    if (!text) {
      setErrorMessage("Please enter text to rewrite.");
      return;
    }
    if (
      !combinationCount ||
      isNaN(combinationCount) ||
      parseInt(combinationCount) <= 0
    ) {
      setErrorMessage("Please enter a valid number of combinations.");
      return;
    }

    setErrorMessage(""); // Reset error message
    const url = "https://paraphrase-genius.p.rapidapi.com/dev/paraphrase/";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28",
        "x-rapidapi-host": "paraphrase-genius.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        result_type: "multiple",
      }),
    };

    setLoading(true);

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Assuming the API returns JSON response
      setResponseData(result); // Save response to state
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch paraphrases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate combinations from response data with limit
  const generateDynamicCombinations = (data, limit) => {
    if (!data || data.length === 0) return [];

    let result = [];

    // First stage: Generate base combinations by cross-product of all groups dynamically
    const generateCombinationsRecursively = (currentCombination, index) => {
      if (index === data.length) {
        result.push(currentCombination);
        return;
      }

      // Loop through the current group (data[index]) and generate combinations
      for (let i = 0; i < data[index].length; i++) {
        generateCombinationsRecursively(
          [...currentCombination, data[index][i]],
          index + 1
        );
      }
    };

    // Start generating combinations with an empty currentCombination and index 0
    generateCombinationsRecursively([], 0);

    // If the number of combinations is already equal to or less than the limit
    if (result.length >= limit) {
      return result.slice(0, limit); // Return only the required number of combinations
    }

    // Second stage: if more combinations are needed, generate random combinations
    const extraCombinations = [];
    while (result.length < limit) {
      // Randomly pick one sentence from each group
      const randomCombination = data.map(
        (group) => group[Math.floor(Math.random() * group.length)]
      );
      extraCombinations.push(randomCombination);
    }

    // Add extra combinations to the base result and return the final result
    result = result.concat(extraCombinations);
    return result.slice(0, limit); // Return only up to the limit
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
            height: height * 0.15,
          }}
        >
          <Text style={{ fontSize: 42, fontWeight: "bold", color: "#333" }}>
            Re-wordify
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: "#666",
              marginTop: 5,
              letterSpacing: 2,
            }}
          >
            Rewrite. Improve. Shine.
          </Text>
        </View>

        <TextInput
          style={{
            height: 200,
            borderRadius: 8,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            marginBottom: 15,
            paddingHorizontal: 10,
            textAlignVertical: "top",
          }}
          placeholder="Enter text to rewrite"
          multiline
          value={text}
          onChangeText={setText}
        />

        <TextInput
          style={{
            height: 50,
            borderRadius: 8,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 7,
            paddingHorizontal: 10,
          }}
          placeholder="Enter number of combinations"
          keyboardType="numeric"
          value={combinationCount}
          onChangeText={setCombinationCount}
        />

        {text && (
          <Text
            style={{
              fontSize: 10,
              width: "80%",
              color: "#939393",
              marginBottom: 30,
            }}
          >
            Enter the number of paraphrased combinations you'd like to see.
          </Text>
        )}

        {errorMessage ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          disabled={loading || !text || !combinationCount}
          onPress={handleRewrite}
          style={{
            backgroundColor: "#000",
            borderRadius: 5,
            width: "100%",
            paddingVertical: 10,
            marginHorizontal: "auto",
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "800",
              }}
            >
              Rewrite Paragraph
            </Text>
          )}
        </TouchableOpacity>

        {/* Check if responseData is valid before rendering combinations */}
        {responseData &&
          Array.isArray(responseData) &&
          responseData.length > 0 && (
            <View style={{ marginTop: 20 }}>
              {generateDynamicCombinations(
                responseData,
                parseInt(combinationCount)
              ).map((combination, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#fff", // Lighter background for better contrast
                    marginBottom: 15, // Increased spacing between combinations
                    padding: 15, // Added padding for more space inside
                    borderRadius: 12, // More rounded corners for a smoother look
                    borderWidth: 1,
                    borderColor: "#ddd", // Lighter border color
                    shadowColor: "#000", // Added shadow for depth
                    shadowOffset: { width: 0, height: 2 }, // Subtle shadow effect
                    shadowOpacity: 0.1, // Light opacity for shadow
                    shadowRadius: 5, // Slightly bigger shadow radius
                    elevation: 3, // For Android devices to display shadow
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#333", // Dark text for better readability
                      lineHeight: 24, // Increased line height for better readability
                      fontWeight: "500", // Slightly bolder text for emphasis
                      textAlign: "left", // Ensure text is aligned to the left for consistency
                    }}
                  >
                    {combination.join("\n")}
                  </Text>
                </View>
              ))}
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParagraphRewrite;