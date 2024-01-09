import * as React from 'react';
import { ListItem, Stack } from '@mui/material';

export default function ItemView() {
  const BASE_URL = "http://localhost:8080/api";
  var request = new XMLHttpRequest();
  request.open("GET", BASE_URL + "/items");
  request.onload = function(e) {
    console.log(e);
    if(e.target.status != 204){
        return (
            <Stack spacing={2}>
                <ListItem>Item</ListItem>
            </Stack>
          );
    }else{
        return (
            <Stack spacing={2}>
                <ListItem>Item</ListItem>
            </Stack>
        );
    }
  }
  request.send();
}
