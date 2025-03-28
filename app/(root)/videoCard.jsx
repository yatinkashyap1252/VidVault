import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions, Platform } from "react-native"
import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { Ionicons } from "@expo/vector-icons" // For the download icon
import WebView from "react-native-webview"

const { width, height } = Dimensions.get("window")

const VideoCard = () => {
  const router = useRouter()
  const { id, videoLink } = useLocalSearchParams()
  const [videoData, setVideoData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log(videoLink)
  }, [videoLink])

  useEffect(() => {
    if (!id) return

    const fetchVideoInfo = async () => {
      
      
      try {
        setIsLoading(true)
        const cachedData = await AsyncStorage.getItem(id)
        if (cachedData) {
          setVideoData(JSON.parse(cachedData))
          setIsLoading(false)
          return
        }

        const url = `https://cloud-api-hub-youtube-downloader.p.rapidapi.com/info?id=${id}`
        console.log("Hello");
        
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28",
            "x-rapidapi-host": "cloud-api-hub-youtube-downloader.p.rapidapi.com",
          },
        }

        const response = await fetch(url, options)
        const result = await response.json()

        console.log(result);
        
        setVideoData(result)
        await AsyncStorage.setItem(id, JSON.stringify(result))
      } catch (error) {
        console.error("Error fetching video info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideoInfo()
  }, [id])

  // Function to format large numbers into thousands (e.g., 1000 -> 1K)
  const formatNumber = (number) => {
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M"
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K"
    } else {
      return number
    }
  }

  // Function to format seconds into HH:MM format
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const formattedHours = hours > 0 ? `${hours}h ` : ""
    const formattedMinutes = minutes > 0 ? `${minutes}m` : ""
    return formattedHours + formattedMinutes
  }

  const convertTimeToHHMM = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const formattedHours = hours > 0 ? `${hours}:` : ""
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}${formattedMinutes}`
  }

  // Function to download the thumbnail image
  const downloadThumbnail = async (url) => {
    try {
      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your media library to save the thumbnail.")
        return
      }

      // Download the image to local storage
      const fileUri = FileSystem.documentDirectory + "thumbnail.jpg"
      const downloadedFile = await FileSystem.downloadAsync(url, fileUri)

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri)
      await MediaLibrary.createAlbumAsync("Downloads", asset, false)

      Alert.alert("Download successful", "Thumbnail has been saved to your gallery!")
    } catch (error) {
      console.error("Error downloading thumbnail:", error)
      Alert.alert("Download failed", "There was an issue downloading the thumbnail.")
    }
  }

  // console.log(videoData);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height - 100 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Loading...</Text>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 3,
                borderColor: "#000",
                borderTopColor: "#fff",
                transform: [{ rotate: "45deg" }],
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 25,
                  borderWidth: 3,
                  borderColor: "transparent",
                  borderRightColor: "#000",
                  transform: [{ rotate: "45deg" }],
                }}
              />
            </View>
          </View>
        ) : (
          <>
            <Text
              style={{
                textAlign: "center",
                fontSize: 34,
                fontWeight: "bold",
                marginBottom: 15,
                color: "#333",
              }}
            >
              Video Details
            </Text>

            {videoData ? (
              <>
                {/* Video iframe (embedded video) */}
                <View style={{ width: "100%", aspectRatio: 16 / 9, marginBottom: 30 }}>
                  {/* Header with download button */}

                  <TouchableOpacity
                    onPress={() => downloadThumbnail(videoData.thumbnails[4].url)}
                    style={{
                      backgroundColor: "#FF6347",
                      borderRadius: 50,
                      elevation: 5,
                      height: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 50,
                      zIndex: 10,
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                  >
                    <Ionicons name="download" size={34} color="white" />
                  </TouchableOpacity>

                  <WebView
                    source={{ uri: `https://www.youtube.com/embed/${id}` }}
                    style={{ flex: 1 }}
                    javaScriptEnabled={true} // Allow JavaScript for video playback
                    allowFullScreen={true} // Enable full-screen option
                    mediaPlaybackRequiresUserAction={false} // Allow auto-play without user interaction
                  />
                </View>

                {/* Video Title */}
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "#333",
                  }}
                >
                  {videoData.title}
                </Text>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#777",
                    marginBottom: 10,
                  }}
                >
                  Owner: {videoData.ownerChannelName}
                </Text>

                {/* Views & Likes */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: width * 0.43,
                      padding: 15,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#222",
                        marginBottom: 10,
                      }}
                    >
                      {formatNumber(videoData.viewCount)}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#777" }}>Views</Text>
                  </View>
                  <View
                    style={{
                      width: width * 0.43,
                      padding: 15,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      alignItems: "flex-end",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#222",
                        marginBottom: 10,
                      }}
                    >
                      {formatNumber(videoData.likes)}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#777" }}>Likes</Text>
                  </View>
                </View>

                {/* Subscribers & Duration */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: width * 0.43,
                      padding: 15,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#222",
                        marginBottom: 10,
                      }}
                    >
                      {formatNumber(videoData.author.subscriber_count)}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#777" }}>Subscribers</Text>
                  </View>
                  <View
                    style={{
                      width: width * 0.43,
                      padding: 15,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      alignItems: "flex-end",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#222",
                        marginBottom: 10,
                      }}
                    >
                      {formatDuration(videoData.lengthSeconds)}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#777" }}>Duration</Text>
                  </View>
                </View>

                {/* Chapters */}
                {videoData.chapters && videoData.chapters.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginVertical: 20,
                        color: "#1F2937",
                      }}
                    >
                      Chapters
                    </Text>

                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingBottom: 20,
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View
                        style={{
                          position: "relative",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Timeline Line */}
                        <View
                          style={{
                            height: 2,
                            backgroundColor: "#E5E7EB", // Light gray timeline line
                            position: "absolute",
                            top: 40, // Adjusted to position line behind the dots
                            left: 0,
                            right: 0,
                            zIndex: 0, // Ensure the line is behind the dots
                          }}
                        />

                        {videoData.chapters.map((item, index) => (
                          <View
                            key={index}
                            style={{
                              alignItems: "center",
                              marginRight: 40, // Increased space for better layout
                              position: "relative",
                            }}
                          >
                            {/* Chapter Dots */}
                            <TouchableOpacity onPress={() => handleChapterClick(item.start_time)}>
                              <View
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 24,
                                  backgroundColor: "#2563EB", // Professional blue color
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 2,
                                  borderColor: "#FFFFFF",
                                  zIndex: 1, // Ensure dots are above the line
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 16, // Increased font size for better visibility
                                    fontWeight: "bold",
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                  }}
                                >
                                  {convertTimeToHHMM(item.start_time)}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            {/* Chapter Title */}
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#1F2937", // Dark gray for text
                                textAlign: "center",
                                marginTop: 12,
                                maxWidth: 160, // Adjusted width to accommodate full title
                                lineHeight: 22,
                                fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto",
                                fontWeight: "500",
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  </>
                )}
                {/* Keywords */}
                {videoData.keywords && videoData.keywords.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 15,
                        color: "#333",
                      }}
                    >
                      Keywords:
                    </Text>

                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        flexDirection: "row",
                        paddingBottom: 15,
                        alignItems: "center",
                      }}
                      showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
                    >
                      {videoData.keywords.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "#f0f0f0", // Light grey background for each keyword card
                            borderRadius: 10,
                            marginRight: 15,
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#BDC3C7",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3, // Elevation for Android devices
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#007BFF", // Blue color for keywords
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </>
                )}

                {/* Category Section */}
                <View
                  style={{
                    marginBottom: 20,
                    width: "100%",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB", // Lighter gray for better consistency
                    paddingTop: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#4B5563", // Darker gray to keep it subtle but readable
                      fontWeight: "600", // Semi-bold for emphasis
                      marginBottom: 8, // Slightly reduced margin for consistency
                    }}
                  >
                    Category:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1F2937", // Dark gray for more prominence
                      fontWeight: "500", // Normal weight for content text
                    }}
                  >
                    {videoData.category}
                  </Text>
                </View>

                {/* Video Description Section */}
                <View
                  style={{
                    marginBottom: 20, // Space after description
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#4B5563", // Darker gray to keep the text readable
                      fontWeight: "600", // Semi-bold for the "Description" label
                      marginBottom: 10, // Margin for better spacing
                    }}
                  >
                    Description:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1F2937", // Dark text for description
                      lineHeight: 24, // More line height for readability
                      fontWeight: "400", // Lighter weight for the description text
                    }}
                  >
                    {videoData.description || "No description available."}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/downloadPage?videoLink=${videoLink}`)} // Ensure this passes the correct `id`
                  style={{
                    width: width * 0.8,
                    margin: "auto",
                    backgroundColor: "#000",
                    paddingVertical: 10,
                    borderRadius: 25,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 25,
                      fontWeight: 800,
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default VideoCard



// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   Alert,
//   Dimensions,
//   Platform,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import * as FileSystem from "expo-file-system";
// import * as MediaLibrary from "expo-media-library";
// import { Ionicons } from "@expo/vector-icons"; // For the download icon
// import WebView from "react-native-webview";

// const { width, height } = Dimensions.get("window");

// const VideoCard = () => {
//   const router = useRouter();
//   const { id, videoLink } = useLocalSearchParams();
//   const [videoData, setVideoData] = useState(null);

//   useEffect(() => {
//     console.log(videoLink);
//   }, [videoLink]);

//   useEffect(() => {
//     if (!id) return;

//     const fetchVideoInfo = async () => {
//       try {
//         const cachedData = await AsyncStorage.getItem(id);
//         if (cachedData) {
//           // console.log("Loaded from Cache:", id);
//           setVideoData(JSON.parse(cachedData));
//           return;
//         }

//         const url =
//           "https://cloud-api-hub-youtube-downloader.p.rapidapi.com/info?id=v4zTAkLKgm4";
//         const options = {
//           method: "GET",
//           headers: {
//             "x-rapidapi-key": process.env.RAPID_API_KEY,
//             "x-rapidapi-host": process.env.RAPID_HOST_KEY,
//           },
//         };

//         const response = await fetch(url, options);
//         const result = await response.json();
//         // console.log("API Response:", result);

//         setVideoData(result);
//         await AsyncStorage.setItem(id, JSON.stringify(result));
//       } catch (error) {
//         console.error("Error fetching video info:", error);
//       }
//     };

//     fetchVideoInfo();
//   }, [id]);

//   // Function to format large numbers into thousands (e.g., 1000 -> 1K)
//   const formatNumber = (number) => {
//     if (number >= 1e6) {
//       return (number / 1e6).toFixed(1) + "M";
//     } else if (number >= 1e3) {
//       return (number / 1e3).toFixed(1) + "K";
//     } else {
//       return number;
//     }
//   };

//   // Function to format seconds into HH:MM format
//   const formatDuration = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const formattedHours = hours > 0 ? `${hours}h ` : "";
//     const formattedMinutes = minutes > 0 ? `${minutes}m` : "";
//     return formattedHours + formattedMinutes;
//   };

//   const convertTimeToHHMM = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const formattedHours = hours > 0 ? `${hours}:` : "";
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

//     return `${formattedHours}${formattedMinutes}`;
//   };

//   // Function to download the thumbnail image
//   const downloadThumbnail = async (url) => {
//     try {
//       // Request permission to access media library
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission required",
//           "We need access to your media library to save the thumbnail."
//         );
//         return;
//       }

//       // Download the image to local storage
//       const fileUri = FileSystem.documentDirectory + "thumbnail.jpg";
//       const downloadedFile = await FileSystem.downloadAsync(url, fileUri);

//       // Save to media library
//       const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
//       await MediaLibrary.createAlbumAsync("Downloads", asset, false);

//       Alert.alert(
//         "Download successful",
//         "Thumbnail has been saved to your gallery!"
//       );
//     } catch (error) {
//       console.error("Error downloading thumbnail:", error);
//       Alert.alert(
//         "Download failed",
//         "There was an issue downloading the thumbnail."
//       );
//     }
//   };

//   // console.log(videoData);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar style="dark" />
//       <ScrollView
//         contentContainerStyle={{
//           padding: 20,
//           paddingBottom: 40,
//         }}
//       >
//         <Text
//           style={{
//             textAlign: "center",
//             fontSize: 34,
//             fontWeight: "bold",
//             marginBottom: 15,
//             color: "#333",
//           }}
//         >
//           Video Details
//         </Text>

//         {videoData ? (
//           <>
//             {/* Video iframe (embedded video) */}
//             <View
//               style={{ width: "100%", aspectRatio: 16 / 9, marginBottom: 30 }}
//             >
//               {/* Header with download button */}

//               <TouchableOpacity
//                 onPress={() => downloadThumbnail(videoData.thumbnails[4].url)}
//                 style={{
//                   backgroundColor: "#FF6347",
//                   borderRadius: 50,
//                   elevation: 5,
//                   height: 50,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   width: 50,
//                   zIndex: 10,
//                   position: "absolute",
//                   right: 10,
//                   top: 10,
//                 }}
//               >
//                 <Ionicons name="download" size={34} color="white" />
//               </TouchableOpacity>

//               <WebView
//                 source={{ uri: `https://www.youtube.com/embed/${id}` }}
//                 style={{ flex: 1 }}
//                 javaScriptEnabled={true} // Allow JavaScript for video playback
//                 allowFullScreen={true} // Enable full-screen option
//                 mediaPlaybackRequiresUserAction={false} // Allow auto-play without user interaction
//               />
//             </View>

//             {/* Video Title */}
//             <Text
//               style={{
//                 fontSize: 22,
//                 fontWeight: "bold",
//                 marginBottom: 10,
//                 color: "#333",
//               }}
//             >
//               {videoData.title}
//             </Text>

//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 700,
//                 color: "#777",
//                 marginBottom: 10,
//               }}
//             >
//               Owner: {videoData.ownerChannelName}
//             </Text>

//             {/* Views & Likes */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 width: "100%",
//                 marginBottom: 20,
//               }}
//             >
//               <View
//                 style={{
//                   width: width * 0.43,
//                   padding: 15,
//                   borderRadius: 10,
//                   borderWidth: 1,
//                   borderColor: "#ddd",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     fontWeight: "bold",
//                     color: "#222",
//                     marginBottom: 10,
//                   }}
//                 >
//                   {formatNumber(videoData.viewCount)}
//                 </Text>
//                 <Text style={{ fontSize: 16, color: "#777" }}>Views</Text>
//               </View>
//               <View
//                 style={{
//                   width: width * 0.43,
//                   padding: 15,
//                   borderRadius: 10,
//                   borderWidth: 1,
//                   borderColor: "#ddd",
//                   alignItems: "flex-end",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     fontWeight: "bold",
//                     color: "#222",
//                     marginBottom: 10,
//                   }}
//                 >
//                   {formatNumber(videoData.likes)}
//                 </Text>
//                 <Text style={{ fontSize: 16, color: "#777" }}>Likes</Text>
//               </View>
//             </View>

//             {/* Subscribers & Duration */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               <View
//                 style={{
//                   width: width * 0.43,
//                   padding: 15,
//                   borderRadius: 10,
//                   borderWidth: 1,
//                   borderColor: "#ddd",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     fontWeight: "bold",
//                     color: "#222",
//                     marginBottom: 10,
//                   }}
//                 >
//                   {formatNumber(videoData.author.subscriber_count)}
//                 </Text>
//                 <Text style={{ fontSize: 16, color: "#777" }}>Subscribers</Text>
//               </View>
//               <View
//                 style={{
//                   width: width * 0.43,
//                   padding: 15,
//                   borderRadius: 10,
//                   borderWidth: 1,
//                   borderColor: "#ddd",
//                   alignItems: "flex-end",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     fontWeight: "bold",
//                     color: "#222",
//                     marginBottom: 10,
//                   }}
//                 >
//                   {formatDuration(videoData.lengthSeconds)}
//                 </Text>
//                 <Text style={{ fontSize: 16, color: "#777" }}>Duration</Text>
//               </View>
//             </View>

//             {/* Chapters */}
//             {videoData.chapters && videoData.chapters.length > 0 && (
//               <>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     marginVertical: 20,
//                     color: "#1F2937",
//                   }}
//                 >
//                   Chapters
//                 </Text>

//                 <ScrollView
//                   horizontal
//                   contentContainerStyle={{
//                     flexDirection: "row",
//                     alignItems: "flex-start",
//                     justifyContent: "center",
//                     paddingBottom: 20,
//                   }}
//                   showsHorizontalScrollIndicator={false}
//                 >
//                   <View
//                     style={{
//                       position: "relative",
//                       flexDirection: "row",
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     {/* Timeline Line */}
//                     <View
//                       style={{
//                         height: 2,
//                         backgroundColor: "#E5E7EB", // Light gray timeline line
//                         position: "absolute",
//                         top: 40, // Adjusted to position line behind the dots
//                         left: 0,
//                         right: 0,
//                         zIndex: 0, // Ensure the line is behind the dots
//                       }}
//                     />

//                     {videoData.chapters.map((item, index) => (
//                       <View
//                         key={index}
//                         style={{
//                           alignItems: "center",
//                           marginRight: 40, // Increased space for better layout
//                           position: "relative",
//                         }}
//                       >
//                         {/* Chapter Dots */}
//                         <TouchableOpacity
//                           onPress={() => handleChapterClick(item.start_time)}
//                         >
//                           <View
//                             style={{
//                               width: 48,
//                               height: 48,
//                               borderRadius: 24,
//                               backgroundColor: "#2563EB", // Professional blue color
//                               justifyContent: "center",
//                               alignItems: "center",
//                               borderWidth: 2,
//                               borderColor: "#FFFFFF",
//                               zIndex: 1, // Ensure dots are above the line
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontSize: 16, // Increased font size for better visibility
//                                 fontWeight: "bold",
//                                 color: "#FFFFFF",
//                                 textAlign: "center",
//                               }}
//                             >
//                               {convertTimeToHHMM(item.start_time)}
//                             </Text>
//                           </View>
//                         </TouchableOpacity>

//                         {/* Chapter Title */}
//                         <Text
//                           style={{
//                             fontSize: 16,
//                             color: "#1F2937", // Dark gray for text
//                             textAlign: "center",
//                             marginTop: 12,
//                             maxWidth: 160, // Adjusted width to accommodate full title
//                             lineHeight: 22,
//                             fontFamily:
//                               Platform.OS === "ios"
//                                 ? "Helvetica Neue"
//                                 : "Roboto",
//                             fontWeight: "500",
//                           }}
//                         >
//                           {item.title}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 </ScrollView>
//               </>
//             )}
//             {/* Keywords */}
//             {videoData.keywords && videoData.keywords.length > 0 && (
//               <>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     marginBottom: 15,
//                     color: "#333",
//                   }}
//                 >
//                   Keywords:
//                 </Text>

//                 <ScrollView
//                   horizontal
//                   contentContainerStyle={{
//                     flexDirection: "row",
//                     paddingBottom: 15,
//                     alignItems: "center",
//                   }}
//                   showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
//                 >
//                   {videoData.keywords.map((item, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         backgroundColor: "#f0f0f0", // Light grey background for each keyword card
//                         borderRadius: 10,
//                         marginRight: 15,
//                         paddingVertical: 8,
//                         paddingHorizontal: 16,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         shadowColor: "#BDC3C7",
//                         shadowOffset: { width: 0, height: 3 },
//                         shadowOpacity: 0.1,
//                         shadowRadius: 5,
//                         elevation: 3, // Elevation for Android devices
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: "#007BFF", // Blue color for keywords
//                           fontWeight: "600",
//                           textAlign: "center",
//                         }}
//                       >
//                         {item}
//                       </Text>
//                     </View>
//                   ))}
//                 </ScrollView>
//               </>
//             )}

//             {/* Category Section */}
//             <View
//               style={{
//                 marginBottom: 20,
//                 width: "100%",
//                 borderTopWidth: 1,
//                 borderTopColor: "#E5E7EB", // Lighter gray for better consistency
//                 paddingTop: 15,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4B5563", // Darker gray to keep it subtle but readable
//                   fontWeight: "600", // Semi-bold for emphasis
//                   marginBottom: 8, // Slightly reduced margin for consistency
//                 }}
//               >
//                 Category:
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#1F2937", // Dark gray for more prominence
//                   fontWeight: "500", // Normal weight for content text
//                 }}
//               >
//                 {videoData.category}
//               </Text>
//             </View>

//             {/* Video Description Section */}
//             <View
//               style={{
//                 marginBottom: 20, // Space after description
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#4B5563", // Darker gray to keep the text readable
//                   fontWeight: "600", // Semi-bold for the "Description" label
//                   marginBottom: 10, // Margin for better spacing
//                 }}
//               >
//                 Description:
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: "#1F2937", // Dark text for description
//                   lineHeight: 24, // More line height for readability
//                   fontWeight: "400", // Lighter weight for the description text
//                 }}
//               >
//                 {videoData.description || "No description available."}
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={() =>
//                 router.push(`/downloadPage?videoLink=${videoLink}`)
//               } // Ensure this passes the correct `id`
//               style={{
//                 width: width * 0.8,
//                 margin: "auto",
//                 backgroundColor: "#000",
//                 paddingVertical: 10,
//                 borderRadius: 25,
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#fff",
//                   textAlign: "center",
//                   fontSize: 25,
//                   fontWeight: 800,
//                 }}
//               >
//                 Confirm
//               </Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <Text>Loading...</Text>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default VideoCard;