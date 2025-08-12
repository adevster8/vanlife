import React from "react";
import { Image, StyleSheet, View } from "react-native";

const BrandHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/transparent-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default BrandHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC", // match your top strip background
    height: 70, // same height as top strip
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)", // subtle divider like your UI
  },
  logo: {
    width: 160,
    height: 50,
  },
});
