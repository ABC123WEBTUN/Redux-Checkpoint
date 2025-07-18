import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { addTodo } from '../store/todosSlice';

const AddTask: React.FC = () => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      dispatch(addTodo(description.trim()));
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Plus className="w-6 h-6 text-blue-600" />
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your task description..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          disabled={!description.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;