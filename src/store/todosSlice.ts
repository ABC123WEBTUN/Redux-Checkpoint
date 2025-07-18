import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  description: string;
  isDone: boolean;
  createdAt: number;
}

export interface TodosState {
  todos: Todo[];
  filter: 'all' | 'done' | 'notDone';
}

const initialState: TodosState = {
  todos: [],
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        description: action.payload,
        isDone: false,
        createdAt: Date.now(),
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; description: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.description = action.payload.description;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'done' | 'notDone'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;