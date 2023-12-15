export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

export type TodoState = {
    todoList: Todo[];
    isLoading: boolean;
    isError: boolean;
};

export type SwitchArgs = {
    id: string;
    isDone: boolean;
};
