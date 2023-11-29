import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';



const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  const handleToggleComplete = () => {
    toggleComplete(todo);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className={`flex items-center justify-between border rounded p-2 mb-2 ${todo.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center">
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="mr-2 cursor-pointer"
        />
        <span className={`font-semibold ${todo.completed && 'line-through text-gray-500'}`}>{todo.text}</span>
      </div>
      <div className="flex items-center">
        {todo.dueDate && <span className="text-sm text-gray-500 mr-2">{`Due: ${todo.dueDate}`}</span>}
        {todo.priority && <span className={`text-sm mr-2 ${todo.priority === 'High' ? 'text-red-500' : (todo.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500')}`}>{`Priority: ${todo.priority}`}</span>}
        {todo.notes && <span className="text-sm text-gray-500">{`Notes: ${todo.notes}`}</span>}
      </div>
      <button
        onClick={handleDeleteTodo}
        className="text-red-500 ml-2 cursor-pointer"
      >
       <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
