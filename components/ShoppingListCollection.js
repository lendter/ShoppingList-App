import { Box, Card, ListItem, Stack } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ShoppingListView from "./ShoppingListView";
import ModalShoppingList from "./ModalShoppingList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShoppingListCollection(){
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/lists',
      );
      console.log(result);
      let resultData = [];
      Object.keys(result.data).forEach(function(e){
        resultData.push(result.data[e]);
      });
      setData(resultData);
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{width: "100%", height:"100vh", background: "whitesmoke"}}>
       <ButtonAppBar></ButtonAppBar>
        <Stack sx={{position:"absolute", top: "65px", width: "100%"}}>
          {data.map((e, index) => (
            <ListItem onClick={() => setList(e.name)} sx={{fontSize: "2rem", border: "1px solid lightgrey" ,width: "100%"}} key={index}><label>{e.name}</label></ListItem>
          ))}
        </Stack>
        <ModalShoppingList></ModalShoppingList>
        </Card>
      </Box>
    </View>
  );
}

function setList(listName){
  window.localStorage.setItem("shoppingList", listName);
  window.location.reload();
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });