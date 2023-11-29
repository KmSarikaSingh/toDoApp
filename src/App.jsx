import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from './Firebase'; 
import { AiOutlinePlus } from 'react-icons/ai';
 
import Todo from './ToDo';
import { ThemeProvider } from './assets/Components/ThemeContext';
import Content from './assets/Components/content';
import ThemeToggle from './assets/Components/ThemeToggle';
const style = {
  bg: `p-4`,
  container: `bg-slate-100 max-w-[1200px] w-full m-auto rounded-md shadow-2xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  

  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }

    // Add the new fields to the document
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      dueDate,
      priority,
      notes,
    });

    // Reset the input fields
    setInput('');
    setDueDate('');
    setPriority('');
    setNotes('');
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };
 

  return (
   <>
   <ThemeProvider>
    
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Todo'
          />
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={style.input}
            type='date'
            placeholder='Due Date'
          />
          <input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Priority'
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={style.input}
            placeholder='Additional Notes'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
    <div className="App">
    <Content />
    </div>
   <ThemeToggle />
    </ThemeProvider>
    
    </>
  );
}

export default App;

