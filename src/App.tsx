import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addTodo } from "./api/todoApi";
import TodoList from "./components/CardList";
import { Todo } from "./types/TodoTypes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo: Omit<Todo, "id"> = {
            title,
            content,
            isDone: false,
        };
        addMutation.mutate(newTodo);
    };

    return (
        <div>
            <div className="form-container">
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label>제목</label>
                        <input
                            name="title"
                            value={title}
                            onChange={onChangeHandler}
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div>
                        <label>내용</label>
                        <input
                            name="content"
                            value={content}
                            onChange={onChangeHandler}
                            placeholder="내용을 입력하세요."
                        />
                    </div>
                    <button type="submit">추가하기</button>
                </form>
            </div>
            <TodoList isDone={false} />
            <TodoList isDone={true} />
        </div>
    );
}

export default App;
