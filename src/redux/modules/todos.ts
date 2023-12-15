import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SwitchArgs, Todo, TodoState } from "../../types/TodoTypes";

export const __fetchTodos = createAsyncThunk(
    "fetchTodos",
    async (paylaod, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4000/todos`);
            console.log("요기는 떵크", response.data);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __addTodo = createAsyncThunk(
    "addTodo",
    async (newTodo: Omit<Todo, "id">, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/todos`,
                newTodo
            );
            const newTodoWithId = response.data;
            return thunkAPI.fulfillWithValue(newTodoWithId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deleteTodo = createAsyncThunk(
    "deleteTodo",
    async (id: string, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4000/todos/${id}`);
            return thunkAPI.fulfillWithValue(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __switchTodo = createAsyncThunk(
    "switTodo",
    async ({ id, isDone }: SwitchArgs, thunkAPI) => {
        try {
            await axios.patch(`http://localhost:4000/todos/${id}`, {
                isDone: !isDone,
            });
            return thunkAPI.fulfillWithValue({ id, isDone });
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState: TodoState = {
    todoList: [],
    isLoading: false,
    isError: false,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(__fetchTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(__fetchTodos.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(__fetchTodos.rejected, (state) => {
                state.isError = true;
            })
            .addCase(__addTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(__addTodo.fulfilled, (state, action) => {
                state.todoList.push(action.payload);
            })
            .addCase(__addTodo.rejected, (state) => {
                state.isError = true;
            })
            .addCase(__deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(__deleteTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(__deleteTodo.rejected, (state) => {
                state.isError = true;
            })
            .addCase(__switchTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(__switchTodo.fulfilled, (state, action) => {
                const todo = state.todoList.find(
                    (item) => item.id === action.payload.id
                );
                if (todo) todo.isDone = !action.payload.isDone;
            })
            .addCase(__switchTodo.rejected, (state) => {
                state.isError = true;
            });
    },
});

export default todosSlice.reducer;
