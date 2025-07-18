import React from 'react';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <CheckSquare className="w-10 h-10 text-blue-600" />
            ToDo Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently with Redux state management
          </p>
        </div>
        
        <AddTask />
        <ListTask />
      </div>
    </div>
  );
}

export default App;