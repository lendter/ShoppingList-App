import { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingListCollection from './components/ShoppingListCollection';
import { StyleSheet, View } from 'react-native-web';
import ShoppingItemCollection from './components/ShoppingItemCollection';
import SettingsView from './components/SettingsView';
import MailView from './components/MailView';

export default function App() {
  const [shoppingList, setShoppingList] = useState(null);
  const [tab, setTab] = useState();

  useEffect(() => {
    const getTab = async () => {
      let val = window.localStorage.getItem("tab");
      if(val){
        setTab(val);
      }
    }

    const getShoppingList = async () => {
      const list = window.localStorage.getItem("shoppingList");
      setShoppingList(list);
      return list;
    }
    getTab();
    getShoppingList();
  }, []);


  console.log("Tab",tab);
  if(tab == 1){
    console.log(shoppingList);
    return (shoppingList != null)?
    (<ShoppingItemCollection></ShoppingItemCollection>):
    (<ShoppingListCollection></ShoppingListCollection>);
  }else if(tab == 2){
    return <SettingsView></SettingsView>
  }else if(tab == 0){
    return <MailView></MailView>
  }else{
    return <ShoppingListCollection></ShoppingListCollection>;
  }
  }
