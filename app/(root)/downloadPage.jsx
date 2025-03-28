import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const DownloadPage = () => {
  const { videoLink } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof videoLink === "string" && videoLink.trim() !== "") {
      const slicedLink = sliceUrl(videoLink);
      if (slicedLink) {
        setLoading(true);
        fetchDownloadUrl(slicedLink);
      } else {
        setError("Invalid URL format");
      }
    } else {
      setError("No valid video link provided");
    }
  }, [videoLink]);

  const sliceUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.origin + parsedUrl.pathname;
    } catch (error) {
      console.error("Error parsing URL:", error);
      return null;
    }
  };

  const fetchDownloadUrl = async (link) => {
    const url = "https://all-media-downloader1.p.rapidapi.com/all";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "76edebff8bmshfd8997a90502bb0p15a708jsnba5d56016f28",
        "X-RapidAPI-Host": "all-media-downloader1.p.rapidapi.com",
      },
      body: JSON.stringify({ url: link }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        setResult(result);
      } else {
        setError(`API Error: ${result.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleDownload = () => {
    if (result && result.url) {
      Linking.openURL(result.url);
    } else {
      console.error("No valid download URL found.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Download Video</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={styles.spinner}
        />
      ) : (
        <View style={styles.resultContainer}>
          {result ? (
            <>
              {/* Displaying Image if thumbnail exists */}
              {result.thumbnail ? (
                <Image
                  source={{ uri: result.thumbnail }}
                  style={{
                    width: width * 0.9,
                    height: height * 0.25,
                    backgroundColor: "#000",
                    borderRadius: 8,
                    marginBottom: 20,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.noThumbnailText}>No Thumbnail Available</Text>
              )}

              <Text style={styles.uploaderText}>{result.uploader}</Text>

              <TouchableOpacity
                style={styles.downloadButton}
                onPress={handleDownload}
              >
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noResultText}>No result available</Text>
          )}
        </View>
      )}

      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    paddingVertical: 10,
  },
  spinner: {
    marginVertical: 20,
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  resultItem: {
    marginVertical: 10,
  },
  uploaderText: {
    fontSize: 18,
    color: "#34495e",
    fontWeight: "600",
  },
  downloadButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noResultText: {
    fontSize: 18,
    color: "#e74c3c",
    textAlign: "center",
  },
  noThumbnailText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginVertical: 10,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default DownloadPage;
