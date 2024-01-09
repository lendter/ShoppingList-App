import * as React from 'react';
import { Container, Fab } from '@mui/material';

export default function ShoppingList() {
  return (
    <Fab color="primary" aria-label='add'>
        <AddIcon />
    </Fab>
  );
}
