import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const formFields = [
  {
    id: "f00ad6af-d890-4770-942e-a8a116f11949",
    number: 1,
    describe: "PRESSÃO ARTERIAL",
    required: false,
    active: true,
    unit: "MMHG",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-12T11:54:29.759-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "9a00c2f4-8b34-11ec-a8a3-0242ac120002",
    number: 2,
    describe: "TEMPERATURA",
    required: false,
    active: true,
    unit: "ºC",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-12T11:30:45.149-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "9a00c420-8b34-11ec-a8a3-0242ac120002",
    number: 3,
    describe: "FREQUENCIA CARDIACA",
    required: false,
    active: true,
    unit: "BPM",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-12T11:31:02.372-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "9a00c54c-8b34-11ec-a8a3-0242ac120002",
    number: 4,
    describe: "FREQUENCIA RESPIRATORIA",
    required: true,
    active: true,
    unit: "MRM",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-12T11:32:10.830-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "d00ad6af-d890-4270-942e-a8a116f11946",
    number: 5,
    describe: "PESO",
    required: false,
    active: false,
    unit: "KG",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-14T11:34:59.146-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "25d3fc9f-7ce5-4c93-b674-ae3962c3cba4",
    number: 6,
    describe: "ALTURA",
    required: false,
    active: true,
    unit: "CM",
    createdAt: "2021-09-30T16:09:41.448-03:00",
    updatedAt: "2022-07-12T11:29:11.880-03:00",
    created_by: "67fa4f33-8f31-49ca-a351-ce525c7f0547",
  },
  {
    id: "84d9629e-f358-4e07-9ee1-08ef68b5eb27",
    number: 7,
    describe: "SATURAÇÃO",
    required: true,
    active: true,
    unit: "%",
    createdAt: "2022-07-12T11:33:25.269-03:00",
    updatedAt: "2022-07-12T11:33:25.269-03:00",
    created_by: "381cac0d-f267-45e6-b7b1-b882f0af30a4",
  },
];
let count = 0;
export default function Form({ navigation }) {
  count = count + 1;
  const validation = Yup.object({
    admeasurement_subjective: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        value: Yup.string().required("É requerido"),
      })
    ),
  });
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const { fields, append } = useFieldArray({
    control,
    name: "admeasurement_subjective",
  });

  React.useEffect(() => {
    formFields.map((item) => {
      append({ id: item.id, value: "" });
    });
  }, []);
  console.log(count);
  return (
    <View style={styles.container}>
      <View>
        {fields.map((item, index) => {
          return (
            <View id={item.id} key={item.id}>
              <Controller
                control={control}
                name={`admeasurement_subjective.${index}.value`}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      mode="outlined"
                      label={formFields[index]?.describe}
                      value={value}
                      onChangeText={onChange}
                    />
                    <Text style={styles.text}>
                      {!!Object.keys(errors).length &&
                        errors?.admeasurement_subjective?.[index]?.value
                          ?.message}
                    </Text>
                  </View>
                )}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.box}>
        <Button
          mode="outlined"
          onPress={() => {
            formFields.map((item, index) => {
              if (item.required) {
                trigger(`admeasurement_subjective.${index}.value`);
              }
              console.log(errors);
            });
          }}
        >
          Enviar
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Home")}>
          Back
        </Button>
      </View>
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
  box: {
    marginTop: 20,
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
    left: 10,
    color: "tomato",
  },
});
