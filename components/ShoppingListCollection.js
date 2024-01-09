import { Box, Card, ListItem, Stack } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ShoppingListView from "./ShoppingListView";
import ModalShoppingList from "./ModalShoppingList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShoppingListCollection(){
  const [data, setData] = useState([{id: "1", name: "Einkauf"}, {id: "2", name: "Einkaufsliste"}]);
  const BASE_URL = "http://localhost:8080/api";
  let shoppingList = window.localStorage.getItem("shoppingList");
  var request = new XMLHttpRequest();
  request.open("GET", BASE_URL + "/lists");
  request.onload = function() {
    setData(shoppingList);
  }

  console.log("LISTS ARE EXISTENT");
  return (
    <View style={styles.container}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{width: "100%", height:"100vh", background: "whitesmoke"}}>
       <ButtonAppBar></ButtonAppBar>
        <Stack sx={{position:"absolute", top: "65px"}}>
          {data.map((e, index) => (
            <ListItem key={index}><label>{e.name}</label></ListItem>
          ))}
        </Stack>
        <ModalShoppingList></ModalShoppingList>
        </Card>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });