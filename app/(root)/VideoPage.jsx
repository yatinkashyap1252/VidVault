import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { StatusBar } from "expo-status-bar";
  import { useRouter } from "expo-router";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const { width, height } = Dimensions.get("window");
  
  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };
  
  const VideoPage = () => {
    const router = useRouter();
    const [videoLink, setVideoLink] = useState("");
  
    const handleSearch = async () => {
      if (!videoLink.trim()) {
        alert("Please enter a valid video link!");
        return;
      }
  
      const videoId = extractVideoId(videoLink);
      if (!videoId) {
        alert("Invalid YouTube link!");
        return;
      }
  
      console.log("Extracted Video ID:", videoId);
  
      // Check if video data exists in AsyncStorage
      const cachedData = await AsyncStorage.getItem(videoId);
      if (cachedData) {
        console.log("Using Cached Data for Video ID:", videoId);
      }
  
      router.push(`/videoCard?id=${videoId}&videoLink=${videoLink}`);
      setVideoLink("");
    };
  
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <StatusBar style="dark" />
  
        {/* App Name & Tagline */}
        <View style={{ alignItems: "center", marginVertical: 20, height: height * 0.15 }}>
          <Text style={{ fontSize: 42, fontWeight: "bold", color: "#333" }}>
            VidVault
          </Text>
          <Text style={{ fontSize: 22, color: "#666", marginTop: 5, letterSpacing: 2 }}>
            Download, Save, Enjoy
          </Text>
        </View>
  
        <View style={{ height: height * 0.55, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginBottom: 20 }}>
          {/* Input Field */}
          <TextInput
            style={{
              width: width * 0.9,
              height: 50,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 15,
              fontSize: 16,
              backgroundColor: "#f9f9f9",
            }}
            placeholder="Paste the video link here..."
            value={videoLink}
            onChangeText={setVideoLink}
          />
  
          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              width: width * 0.9,
              backgroundColor: "#000",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default VideoPage;
  