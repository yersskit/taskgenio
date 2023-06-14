import React, { useState } from 'react';
import Board from '../components/Board/Board';

function BoardView() {
  //todo: habilitar persistencia del orden de los items
  //todo: habilitar persistencia del orden de los containers
  //todo: habilitar persistencia del parent de cada item
  //todo: pasar data de cada item para mostrar controles dentro del item

  const [items, setItems] = useState({
    'To Do': [
      {
        id: '1',
        data: {
          title: 'Item 1',
          description: 'Description 1',
          priority: 'high',
          owner: '648954d533b1a0f1e659',
          createdBy: '648955049b4335a609fd',
          dueDate: '',
          parent: null,
          type: 'task_type',
          tasks: [
            {
              description: 'Task 1',
              completed: true,
              assignedTo: '6489554d9b67ca496f53'
            },
            {
              description: 'Task 4',
              completed: false,
              assignedTo: '648955375b4c4e69baa6'
            }
          ],
          userStories: [],
          diagrams: []
        }
      }
    ],
    'In Progress': [
      {
        id: '2',
        data: {
          title: 'Item 2',
          description: 'Description 2',
          priority: 'high',
          owner: '64895523732371a9d41e',
          createdBy: '648955049b4335a609fd',
          dueDate: '',
          parent: null,
          type: 'task_type',
          tasks: [
            {
              description: 'Task 1',
              completed: true,
              assignedTo: '648955375b4c4e69baa6'
            },
            {
              description: 'Task 4',
              completed: false,
              assignedTo: '648955629fd327b76c01'
            }
          ],
          userStories: [],
          diagrams: []
        }
      }
    ]
  });

  return <Board items={items} setItems={setItems} />;
}

export default BoardView;
