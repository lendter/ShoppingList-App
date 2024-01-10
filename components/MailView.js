import { Box, Card, IconButton, ListItem, Stack } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ModalUnstyled from "./Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleBottomNavigation from "./SimpleBottomBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MailView(){
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        const getShoppingList = async () => {
            const list = window.localStorage.getItem("shoppingList");
            return list;
          }
          const fetchListItems = async (shoppingList) => {
            const result = await axios(
              'http://localhost:8080/api/items/list/name/'+ shoppingList,
            );
            console.log(result);
            let resultData = [];
            Object.keys(result.data).forEach(function(e){
              resultData.push(result.data[e]);
            });
            setListItems(resultData);
          };

          getShoppingList().then((result) => fetchListItems(result));
    }, [])

    return (<View style={styles.container}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{width: "100%", height:"100vh", background: "whitesmoke"}}>
       <ButtonAppBar></ButtonAppBar>
        <Stack sx={{position:"absolute", top: "65px", width: "100%"}}>
          {listItems.map((e, index) => (
            <ListItem sx={{fontSize: "2rem", border: "1px solid lightgrey" ,width: "100%"}} key={index}><label>{e.articleName}</label><IconButton onClick={() => deleteItem(e.id)} sx={
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
        <ModalUnstyled></ModalUnstyled>
        <SimpleBottomNavigation></SimpleBottomNavigation>
        </Card>
      </Box>
    </View>);
}

function deleteItem(id){
    var request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:8080/api/items/"+id, false);
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