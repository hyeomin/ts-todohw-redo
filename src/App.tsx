import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from "./components/CardList";
import { Todo } from "./types/TodoTypes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todoList, setTodoList] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/todos`);
            console.log(response.data);
            setTodoList(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

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

        try {
            await axios.post(`http://localhost:4000/todos`, newTodo);
            fetchTodos();
            setTitle("");
            setContent("");
        } catch (error) {
            console.log("Error:", error);
        }
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
            <TodoList
                fetchTodos={fetchTodos}
                todoList={todoList}
                isDone={false}
            />
            <TodoList
                fetchTodos={fetchTodos}
                todoList={todoList}
                isDone={true}
            />
        </div>
    );
}

export default App;
