import axios from "axios";
import { SwitchArgs, Todo } from "../types/TodoTypes";

export const fetchTodos = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/todos`);
        console.log("요기는 떵크", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addTodo = async (newTodo: Omit<Todo, "id">) => {
    try {
        const response = await axios.post(
            `http://localhost:4000/todos`,
            newTodo
        );
        const newTodoWithId = response.data;
        return newTodoWithId;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTodo = async (id: string) => {
    try {
        await axios.delete(`http://localhost:4000/todos/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const switchTodo = async ({ id, isDone }: SwitchArgs) => {
    try {
        await axios.patch(`http://localhost:4000/todos/${id}`, {
            isDone: !isDone,
        });
    } catch (error) {
        console.log(error);
    }
};
