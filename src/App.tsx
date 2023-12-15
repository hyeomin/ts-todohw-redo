import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import TodoList from "./components/CardList";
import { addTodo } from "./redux/modules/todos";
import { Todo } from "./types/TodoTypes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const dispatch = useDispatch();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo = {
            id: v4(),
            title,
            content,
            isDone: false,
        };
        dispatch(addTodo(newTodo));
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
                    <button>추가하기</button>
                </form>
            </div>
            <TodoList />
        </div>
    );
}

export default App;
