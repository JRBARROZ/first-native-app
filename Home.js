import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("List");
        }}
      >
        List
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: 10,
        }}
        onPress={() => {
          navigation.navigate("Form");
        }}
      >
        Form
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 60,
    flex: 1,
  },
});
export default Home;
