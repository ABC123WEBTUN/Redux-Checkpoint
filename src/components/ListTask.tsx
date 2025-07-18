import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setFilter } from '../store/todosSlice';
import Task from './Task';
import { CheckCircle, Circle, List } from 'lucide-react';

const ListTask: React.FC = () => {
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.isDone;
    if (filter === 'notDone') return !todo.isDone;
    return true;
  });

  const completedCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;

  const handleFilterChange = (newFilter: 'all' | 'done' | 'notDone') => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <List className="w-6 h-6 text-blue-600" />
          Your Tasks
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {completedCount} of {totalCount} completed
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => handleFilterChange('notDone')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            filter === 'notDone'
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Circle className="w-4 h-4" />
          Pending ({totalCount - completedCount})
        </button>
        <button
          onClick={() => handleFilterChange('done')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            filter === 'done'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Completed ({completedCount})
        </button>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' && 'No tasks yet. Add your first task above!'}
            {filter === 'done' && 'No completed tasks yet.'}
            {filter === 'notDone' && 'No pending tasks. Great job!'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <Task key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default ListTask;