import { Box } from "@mui/material";
import { StyleSheet, View } from "react-native-web";
import ButtonAppBar from "./ButtonAppBar";
import ShoppingListView from "./ShoppingListView";
import ModalShoppingList from "./ModalShoppingList";

export default function EmptyShoppingListCollection(){
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });