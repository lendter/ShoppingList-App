import { Box } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ShoppingListView from "./ShoppingListView";
import ModalShoppingList from "./ModalShoppingList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShoppingListCollection(){
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/lists',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Box sx={{ width: "100%"}}>
          <ButtonAppBar></ButtonAppBar>
          <ul>
            {Object.keys(data).forEach(function(e){
              console.log(data);
              console.log(data[e].name);
              <li key={data[e].id}><label>{data[e].name}</label></li>
            })}
          </ul>
          <ModalShoppingList></ModalShoppingList>
        </Box>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });