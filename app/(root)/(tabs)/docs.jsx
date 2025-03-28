import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Documents = () => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Vid-Vault</Text>
        <Text style={styles.subtitle}>📱 Video Downloader App</Text>
        <Text style={styles.description}>
          Welcome to the Vid-Vault! This app allows users to download videos
          directly from various platforms and play them within the app itself.
          It is user-friendly, fast, and leverages powerful APIs to provide a
          seamless experience for video lovers.
        </Text>

        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>🎥 Download Videos</Text>: Easily
          download videos from different video platforms.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>📥 Play Videos</Text>: Watch your
          videos directly within the app using an integrated video player.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>💾 Direct Download</Text>: Click on the
          "Download" button to save videos directly to your device.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>🔗 Shareable Links</Text>: Copy and
          share video links for easy access.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>📡 Fast and Reliable</Text>: Enjoy
          smooth downloads and playback with minimal waiting time.
        </Text>

        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.text}>
          1. <Text style={styles.heading}>Start by Pasting the Video URL</Text>:
          Simply paste the URL of the video you want to download into the input
          field. The app automatically processes the URL and extracts the
          necessary details.
        </Text>
        <Text style={styles.text}>
          2. <Text style={styles.heading}>Fetch Video Details</Text>: Once the
          URL is processed, the app fetches the video details from an external
          API. This includes information such as the video uploader and download
          URL.
        </Text>
        <Text style={styles.text}>
          3. <Text style={styles.heading}>Play or Download</Text>: Tap the “Play
          Video” button to watch the video within the app, or tap the “Download”
          button to save the video to your device for offline viewing.
        </Text>
        <Text style={styles.text}>
          4. <Text style={styles.heading}>Simple and Fast</Text>: The entire
          process is smooth and fast, allowing users to quickly download and
          enjoy videos.
        </Text>

        <Text style={styles.sectionTitle}>Important Notes</Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Supported Platforms</Text>: Currently,
          the app supports video downloads from various popular platforms like
          YouTube, Vimeo, and more.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Internet Connection</Text>: An active
          internet connection is required to fetch the video data and download
          it.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Video Formats</Text>: The app supports
          downloading videos in **MP4** format. Please ensure that the video URL
          is compatible with the supported formats.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Storage Permissions</Text>: To download
          and store videos on your device, ensure that the app has the necessary
          permissions for storage access.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Legal Disclaimer</Text>: Please use
          this app responsibly. Ensure that you have permission to download the
          content, respecting the copyright laws of the respective platforms.
        </Text>

        <Text style={styles.sectionTitle}>Technical Specifications</Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>Platform</Text>: React Native
          (Cross-platform for iOS and Android)
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>APIs Used</Text>:{"\n"} - All Media
          Downloader API (for fetching video download links)
          {"\n"} - Expo Router (for navigation between pages)
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>App Flow</Text>:{"\n"} 1. User inputs
          video URL →{"\n"} 2. App fetches video data →{"\n"} 3. User can either
          download or play the video.
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>UI</Text>: Minimalistic and
          user-friendly design for easy navigation.
        </Text>

        <Text style={styles.sectionTitle}>Special Thanks</Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>All Media Downloader API</Text>: A big
          shoutout to the **All Media Downloader** API for providing the
          powerful backend services to fetch video download links. This API
          makes the video extraction process fast and efficient. 👏
          {"\n"} <Text style={styles.heading}>[API Documentation]</Text>
          <Text style={styles.link}>
            {"\n"}(https://rapidapi.com/all-media-downloader1.p.rapidapi.com)
          </Text>
        </Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>React Native Community</Text>: Thank
          you to the React Native community for providing such a robust
          framework for building cross-platform apps.
        </Text>

        <Text style={styles.sectionTitle}>Design Credits</Text>
        <Text style={styles.text}>
          - <Text style={styles.heading}>UI Design</Text>: Designed with love by
          the development team to ensure a seamless user experience.
          {"\n"} - <Text style={styles.heading}>Iconography</Text>: Icons
          sourced from [FontAwesome]
          <Text style={styles.link}>{"\n"}(https://fontawesome.com/)</Text>
          {"\n"} for a clean and modern look.
        </Text>

        <Text style={styles.sectionTitle}>Stay Connected</Text>
        <Text style={styles.text}>
          {"\n"} - **Twitter**:
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://twitter.com/YourAppHandle")}
          >
            @YourAppHandle
          </Text>
          {"\n"} - **GitHub**:
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://github.com/your-username/video-downloader-app"
              )
            }
          >
            github.com/your-username/video-downloader-app
          </Text>
        </Text>

        <Text style={styles.lastText}>
          We hope you enjoy using the Vid-Vault!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    color: "#2c3e50",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222",
  },
  subtitle: {
    fontSize: 18,
    color: "#34495e",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  lastText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});

export default Documents;
