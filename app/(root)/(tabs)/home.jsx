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

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <StatusBar style="dark" />
      <TouchableOpacity onPress={()=>router.push('/(root)/VideoPage')} >
        <Text>Video page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/(root)/ParagraphRewrite')} >
        <Text>Paragraph rewrite</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/(root)/TextTweak')} >
        <Text>Text rewrite</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/(root)/TextTranslate')} >
        <Text>Text Translate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/(root)/EVPage')} >
        <Text>EV Charging Finder</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
