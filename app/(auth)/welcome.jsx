import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useRef } from "react";
import { WelcomeScreen } from "../../constants/welcomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
  const router = useRouter();
  const swiperRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {WelcomeScreen.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.headline}>{item.headline}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.buttonContainer}>
              {index < WelcomeScreen.length - 1 ? (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => swiperRef.current.scrollBy(1)}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => router.replace("/sign-in")}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>

            {index < WelcomeScreen.length - 1 && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => router.replace("/sign-in")}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = {
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
    color: "#111",
  },
  headline: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
    color: "#555",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.15,
    width: "100%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  startButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  skipButton: {
    position: "absolute",
    bottom: height * 0.08,
    alignSelf: "center",
  },
  skipText: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "underline",
  },
  dot: {
    width: 15,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 2,
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#007bff",
    marginHorizontal: 2,
  },
};

export default Welcome;
