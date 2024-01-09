import ConditionalRenderedComponent from './components/ConditionalRenderedComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingListCollection from './components/ShoppingListCollection';

export default function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/items',
      );
      console.log(result);
      setData(result.data);
    };

    fetchData();
  }, []);

  return data? (
    <ul>
      {data.hits.map(item => (
        <li key={item.id}>
          <label>{item.name}</label>
        </li>
      ))}
    </ul>
  ):
  (<ShoppingListCollection></ShoppingListCollection>);
  //return <ConditionalRenderedComponent></ConditionalRenderedComponent>
}
