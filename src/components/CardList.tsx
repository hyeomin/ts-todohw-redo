import axios from "axios";
import { TodoListProps } from "../types/TodoTypes";

function CardList({ fetchTodos, todoList, isDone }: TodoListProps) {
    const onSwitchStatusHandler = async (id: string, isDone: boolean) => {
        await axios.patch(`http://localhost:4000/todos/${id}`, {
            isDone: !isDone,
        });
        fetchTodos();
    };

    const onDeleteHandler = async (id: string) => {
        try {
            const confirmed = window.confirm("삭제하시겠습니까?");
            if (confirmed) {
                await axios.delete(`http://localhost:4000/todos/${id}`);
            }
            fetchTodos();
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className="card-container">
            <h2>{isDone ? "Done" : "In Progress"}</h2>
            {todoList
                .filter((item) => item.isDone === isDone)
                .map((item) => {
                    return (
                        <div className="single-card" key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <button
                                onClick={() =>
                                    onSwitchStatusHandler(item.id, item.isDone)
                                }
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
    );
}

export default CardList;
