import * as React from 'react';
import { ListItem, Stack } from '@mui/material';

export default function ShoppingListView() {
  const BASE_URL = "http://localhost:8080/api";
  var request = new XMLHttpRequest();
  console.log("ShoppingListView");
  request.open("GET", BASE_URL + "/lists");
  request.onload = function(e) {
    console.log(e);
    if(e.target.status != 204){
        return (
            <Stack spacing={2}>
                <ListItem>List</ListItem>
            </Stack>
          );
    }else{
        var res = e.target.result;
        return (
            <Stack spacing={2}>
              res.forEach(element = {
                <ListItem>element.name</ListItem>
              });
            </Stack>
        );
    }
  }
  request.send();
}
