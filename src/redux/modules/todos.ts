import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../../types/TodoTypes";

const initialState: TodoState = {
    todoList: [],
    isLoading: false,
    isError: false,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        fetchTodo: (state, action) => {
            state.todoList = action.payload;
        },
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todoList.filter((item) => item.id !== action.payload);
        },
        switchTodo: (state, action) => {
            state.todoList.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, isDone: !item.isDone };
                }
            });
        },
    },
});

export const { fetchTodo, addTodo, deleteTodo, switchTodo } =
    todosSlice.actions;
export default todosSlice.reducer;
