import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'; // Importing date-fns for date formatting

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => {
        toast.error('Error fetching todos!');
        console.error(error);
      });
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!input.trim()) {
      toast.error('Please enter a task!');
      return;
    }

    const newTodo = {
      title: input,
      description: '', // Adjust based on your backend schema
    };

    axios
      .post('http://localhost:5000/api/todos', newTodo)
      .then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setInput('');
        toast.success('Task added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding task!');
        console.error(error);
      });
  };

  // Toggle completion status of a todo
  const toggleCompletion = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    axios
      .put(`http://localhost:5000/api/todos/${id}`, updatedTodo)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? response.data : todo
          )
        );
        toast.info('Task status updated!');
      })
      .catch((error) => {
        toast.error('Error updating task status!');
        console.error(error);
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        toast.error('Task deleted!');
      })
      .catch((error) => {
        toast.error('Error deleting task!');
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">To-Do List</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border rounded-md mr-2 w-80"
          placeholder="Enter a new task"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Task
        </button>
      </div>
      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks added yet!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center justify-between p-4 border rounded-md ${
                todo.completed ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.title}
              </span>
              <span className="text-sm text-gray-500">
                {/* Format the createdAt date */}
                {todo.createdAt &&
                  format(new Date(todo.createdAt), 'dd MMM yyyy, HH:mm')}
              </span>
              <div>
                <button
                  onClick={() => toggleCompletion(todo._id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600 transition"
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoPage;
