# Vid-Vault - Video Downloader App (Version 1.0)

**Vid-Vault** is a React Native mobile app that allows users to download videos from platforms like YouTube directly to their devices. The app provides an easy-to-use interface for downloading and playing videos offline. It is fast, reliable, and built using React Native for cross-platform support (iOS & Android).

## Features
- **🎥 Download Videos**: Download videos from platforms like YouTube with ease.
- **📥 Play Videos**: Watch videos directly within the app using the integrated video player.
- **💾 Direct Download**: Save videos directly to your device for offline viewing.
- **🔗 Shareable Links**: Copy and share video links for easy access with others.
- **📡 Fast and Reliable**: Experience smooth downloads with minimal waiting time.

## How It Works
1. **Start by Pasting the Video URL**: Paste the URL of the video you want to download into the input field.
2. **Fetch Video Details**: The app fetches video details from the API (All Media Downloader) and extracts the necessary video info.
3. **Play or Download**: Once the video details are fetched, you can either play the video within the app or download it to your device.
4. **Simple and Fast**: The app processes everything quickly, making video downloads hassle-free.

## Important Notes
- **Supported Platforms**: Currently, the app supports downloading videos from YouTube and other popular platforms.
- **Internet Connection**: A stable internet connection is required to fetch video data and download the videos.
- **Video Formats**: The app supports MP4 format for downloading videos. Make sure the video URL is compatible.
- **Storage Permissions**: Make sure to grant the app storage access permissions to download and store videos.
- **Legal Disclaimer**: Always ensure you have permission to download content and respect copyright laws of the respective platforms.

## Technical Specifications
- **Platform**: React Native (cross-platform for iOS and Android).
- **APIs Used**:
  - **All Media Downloader API**: Fetches video download links.
  - **Expo Router**: Handles navigation between screens in the app.
- **UI**: The design is minimalistic and user-friendly for easy navigation.

## Installation Instructions

### Prerequisites
- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed on your system.
- **Expo CLI**: Install Expo CLI globally if you don't have it already:
  ```bash
  npm install -g expo-cli

Clone the Repository
bash
Copy
git clone https://github.com/yatinkashyap1252/VidVault.git
cd VidVault
Install Dependencies
bash
Copy
npm install
Running the App
For iOS (requires macOS):

bash
Copy
expo start --ios
For Android:

bash
Copy
expo start --android
For Web:

bash
Copy
expo start --web
Building the App
To create a production build of your app, use the following command:

bash
Copy
expo build:android  # for Android
expo build:ios      # for iOS
Special Thanks
All Media Downloader API: A big shoutout to the All Media Downloader API for providing powerful backend services for video extraction. This API makes the video extraction process fast and efficient. 👏

API Documentation: All Media Downloader API Docs

React Native Community: Thanks to the React Native community for providing a robust framework for cross-platform app development.

Design Credits
UI Design: Designed by the development team to ensure a seamless user experience.

Iconography: Icons sourced from FontAwesome.

Stay Connected
Twitter: @YourAppHandle

GitHub: github.com/yatinkashyap1252/video-downloader-app

We hope you enjoy using Vid-Vault! 🚀

