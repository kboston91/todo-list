import React, {useState} from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './App.css';


function Subtask({ text, completed, onClick }) {
  return <ListGroupItem id='subtask' className={completed ? 'completed' : ''}
  onClick={onClick}>{ text }</ListGroupItem>
}

function TodoItem({ item, index, onAddSubtask, onToggleSubtask }) {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== '') {
      onAddSubtask(index, newSubtask);
      setNewSubtask('');
    }
  };
  return (
    <div>
      <ListGroupItem disabled className='todo-item'>{item.text}</ListGroupItem>
      <ul>
        {item.subtasks.map((subtask, subtaskIndex) => (
          <Subtask 
            key={subtaskIndex}
            text={subtask.text}
            completed={subtask.completed}
            onClick={() => onToggleSubtask(index, subtaskIndex)}
          />
        ))}
      </ul>
      <input
        value={newSubtask}
        onChange={(e) => setNewSubtask(e.target.value)}
        placeholder='Add subtask'
        type='text'
      />
      <button className='new-subtask' onClick={handleAddSubtask}>Add Subtask</button>
    </div>
  );
}

function TodoList({items, onAddSubtask, onToggleSubtask}){
  return (
    <ListGroup className='todo-list'>
          {items.map((item, index)=>(
            <TodoItem
              key={index}
              item={item}
              index={index}
              onAddSubtask={onAddSubtask}
              onToggleSubtask={onToggleSubtask}
            />          
          ))}
    </ListGroup>
  );
}

function App() {
  const [items,setItems] = useState([
    {text: 'make a list',
      subtasks: [
        { text: 'think', completed: false },
        { text: 'plan', completed: false },
        { text: 'gather materials', completed: false },
      ],
    }, 
    {text: 'make a list',
      subtasks: [
        { text: 'think', completed: false },
        { text: 'plan', completed: false },
        { text: 'gather materials', completed: false },
      ],
    },
  ])
  
  const [newItems, setNewItems] = useState('')
  
  const addItem = () => {
      if (newItems.trim() !== ''){
        setItems([...items, 
          {
            text:newItems,
            subtasks:[],
        },
      ]);
        setNewItems('');
      }
    };
  
  const addSubtask = (index, subtask) => {
    const updatedItems = [...items];
    updatedItems[index].subtasks.push({ text: subtask, completed: false });
    setItems(updatedItems);
  }
  const toggleSubtask = (itemIndex, subtaskIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subtasks[subtaskIndex].completed = !updatedItems[itemIndex].subtasks[subtaskIndex].completed;
    setItems(updatedItems);
  };

  return (
    <div className="todo-app">
      
        <h1 className='header'>To do List</h1>
        <p>This app serves as a resource of tasks you need to accomplish for the day.</p>
        
        
          <input 
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          placeholder='What do you need to get done?' 
          type='text'/>
          <button className='new-item' onClick={addItem}>Add to List</button>
          <TodoList items={items} onAddSubtask={addSubtask} onToggleSubtask={toggleSubtask} />
    </div>
  );
}

export default App;
