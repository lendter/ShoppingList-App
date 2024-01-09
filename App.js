import ConditionalRenderedComponent from './components/ConditionalRenderedComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EmptyShoppingListCollection from './components/EmptyShoppingListCollection';

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
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  ):
  (<EmptyShoppingListCollection></EmptyShoppingListCollection>);
  //return <ConditionalRenderedComponent></ConditionalRenderedComponent>
}
