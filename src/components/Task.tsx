import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, Edit3, Trash2, X, Save } from 'lucide-react';
import { toggleTodo, editTodo, deleteTodo } from '../store/todosSlice';
import { Todo } from '../store/todosSlice';

interface TaskProps {
  todo: Todo;
}

const Task: React.FC<TaskProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(todo.description);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    if (editDescription.trim()) {
      dispatch(editTodo({ id: todo.id, description: editDescription.trim() }));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg ${todo.isDone ? 'bg-green-50 border-l-4 border-green-500' : 'border-l-4 border-blue-500'}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.isDone
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {todo.isDone && <Check className="w-4 h-4" />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleEdit}
              className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <span
              className={`text-gray-800 ${
                todo.isDone ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.description}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;