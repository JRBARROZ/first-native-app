import { faker } from "@faker-js/faker";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

function List({ navigation }) {
  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  function createData(quantity) {
    const persons = [];
    for (let i = 0; i < quantity; i++) {
      persons.push({
        name: faker.name.firstName(),
        phone: faker.phone.number(),
      });
    }
    return persons;
  }
  React.useEffect(() => {
    setList(createData(50));
  }, []);

  function handleListEnd() {
    setTimeout(() => {
      setList((list) => [...list, ...createData(20)]);
    }, 3000);
  }
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
        }}
      >
        List Count: {list.length || 0} - Page {page}
      </Text>
      <FlatList
        data={list}
        onEndReached={() => {
          setPage((page) => page + 1);
          handleListEnd();
        }}
        ListFooterComponent={
          <View>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Carregando...
            </Text>
          </View>
        }
        style={{
          borderColor: "red",
          height: 400,
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}
        ListEmptyComponent={
          <View>
            <Text>Lista Vazia</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View key={index} style={styles.listItem}>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Text>{item.phone}</Text>
            </View>
          </View>
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Home")}
        style={{
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        Back
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default List;
