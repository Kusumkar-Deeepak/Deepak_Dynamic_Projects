// import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-5">
        <h1 className="text-3xl font-bold mb-4">Welcome to the To-Do App</h1>
        <p className="text-xl mb-6">Keep track of your tasks easily!</p>
        <Link
          to="/todos"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Todo List
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
