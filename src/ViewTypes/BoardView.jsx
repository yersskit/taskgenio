import React, { useState } from 'react';
import Board from '../components/Board/Board';

function BoardView() {
  //todo: habilitar persistencia del orden de los items
  //todo: habilitar persistencia del orden de los containers
  //todo: habilitar persistencia del parent de cada item
  //todo: pasar data de cada item para mostrar controles dentro del item

  const [items, setItems] = useState({
    A: [
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' }
    ],
    B: [
      { id: '3', content: 'Item 3' },
      { id: '4', content: 'Item 4' }
    ],
    C: [
      { id: '5', content: 'Item 5' },
      { id: '6', content: 'Item 6' }
    ],
    D: [
      { id: '7', content: 'Item 7' },
      { id: '8', content: 'Item 8' }
    ]
  });

  return <Board items={items} setItems={setItems} />;
}

export default BoardView;
