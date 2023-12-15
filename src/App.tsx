import { useState } from "react";
import { useDispatch } from "react-redux";
import TodoList from "./components/CardList";
import { AppDispatch } from "./redux/config/configStore";
import { __addTodo } from "./redux/modules/todos";
import { Todo } from "./types/TodoTypes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch: AppDispatch = useDispatch();

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
        dispatch(__addTodo(newTodo));
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
