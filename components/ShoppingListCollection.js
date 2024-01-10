import { Box, Card, IconButton, ListItem, Stack } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ModalShoppingList from "./ModalShoppingList";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import SimpleBottomNavigation from "./SimpleBottomBar";

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
            <ListItem onClick={() => setList(e.name)} sx={{fontSize: "2rem", border: "1px solid lightgrey" ,width: "100%"}} key={index}><label>{e.name}</label><IconButton onClick={() => deleteList(e.id)} sx={
              {
              display: "block",
              marginLeft: "auto",
              marginRight: "0"
              }
            } aria-label="delete">
            <DeleteIcon />
          </IconButton></ListItem>
          ))}
        </Stack>
        <ModalShoppingList></ModalShoppingList>
        <SimpleBottomNavigation></SimpleBottomNavigation>
        </Card>
      </Box>
    </View>
  );
}

function setList(listName){
  window.localStorage.setItem("shoppingList", listName);
  window.location.reload();
}

function deleteList(id){
  var request = new XMLHttpRequest();
  request.open("DELETE", "http://localhost:8080/api/list/"+id, false);
  request.onload = function(res) {
      console.log(res);
      window.location.reload();
  }
  request.send();
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });