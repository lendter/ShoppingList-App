import { Box } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ItemView from "./ItemView";
import ModalUnstyled from "./Modal";
import ShoppingListView from "./ShoppingListView";
import ModalShoppingList from "./ModalShoppingList";

export default function ConditionalRenderedComponent() {
    const BASE_URL = "http://localhost:8080/api";
    let shoppingList = window.localStorage.getItem("shoppingList");
    var request = new XMLHttpRequest();
    request.open("GET", BASE_URL + "/lists");
    request.onload = function(e){
      console.log(e);
      console.log(e.target.status);
      if(e.target.status === 204){
        console.log("NO CONTENT");
        if(shoppingList != null){
          console.log("SHOPPING LIST SELECTED: "+ shoppingList);
        }else{
          console.log("NO LIST SELECTED");
          return (
          <View style={styles.container}>
              <Box sx={{ width: "100%"}}>
                <ButtonAppBar></ButtonAppBar>
                <ShoppingListView></ShoppingListView>
              <ModalShoppingList></ModalShoppingList>
              </Box>
            </View>
            );
        }
      }else{
        console.log("LISTS ARE EXISTENT");
        return (
          <View style={styles.container}>
            <Box sx={{ width: "100%"}}>
              <ButtonAppBar></ButtonAppBar>
              <ItemView></ItemView>
            <ModalUnstyled></ModalUnstyled>
            </Box>
          </View>
        );
      }
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