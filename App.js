import { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingListCollection from './components/ShoppingListCollection';
import { StyleSheet, View } from 'react-native-web';
import { Box, Card, ListItem, Stack } from '@mui/material';
import ButtonAppBar from './components/ButtonAppBar';
import ModalUnstyled from './components/Modal';

export default function App() {
  const [shoppingList, setShoppingList] = useState(null);
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    const getShoppingList = async () => {
      const list = window.localStorage.getItem("shoppingList");
      setShoppingList(list);
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
  }, []);

  return shoppingList? (
    <View style={styles.container}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{width: "100%", height:"100vh", background: "whitesmoke"}}>
       <ButtonAppBar></ButtonAppBar>
        <Stack sx={{position:"absolute", top: "65px", width: "100%"}}>
          {listItems.map((e, index) => (
            <ListItem sx={{fontSize: "2rem", border: "1px solid lightgrey" ,width: "100%"}} key={index}><label>{e.articleName}</label></ListItem>
          ))}
        </Stack>
        <ModalUnstyled></ModalUnstyled>
        </Card>
      </Box>
    </View>
  ):
  (<ShoppingListCollection></ShoppingListCollection>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
