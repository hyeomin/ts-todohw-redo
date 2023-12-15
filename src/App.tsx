import { useState } from "react";
import { v4 } from "uuid";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    type Todo = {
        id: string;
        title: string;
        content: string;
        isDone: boolean;
    };

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
        console.log(newTodo);
        setTodoList([...todoList, newTodo]);
    };

    const onSwitchStatusHandler = (id: string) => {
        const switched = todoList.map((item) => {
            if (item.id === id) {
                return { ...item, isDone: !item.isDone };
            }
            return item;
        });
        setTodoList(switched);
    };

    const onDeleteHandler = (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            const deleted = todoList.filter((item) => {
                return item.id !== id;
            });
            setTodoList(deleted);
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
                    <button>추가하기</button>
                </form>
            </div>
            <div className="card-container">
                <h2>In Progress</h2>
                {todoList.map((item) => {
                    return (
                        <div className="single-card" key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <button
                                onClick={() => onSwitchStatusHandler(item.id)}
                            >
                                {item.isDone ? "취소" : "완료"}
                            </button>
                            <button onClick={() => onDeleteHandler(item.id)}>
                                삭제
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
