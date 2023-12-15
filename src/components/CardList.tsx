import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/config/configStore";
import {
    __deleteTodo,
    __fetchTodos,
    __switchTodo,
} from "../redux/modules/todos";

function CardList({ isDone }: { isDone: boolean }) {
    const dispatch: AppDispatch = useDispatch();
    const todoList = useAppSelector((state) => state.todoList);

    useEffect(() => {
        dispatch(__fetchTodos());
    }, []);

    const onSwitchStatusHandler = async (id: string, isDone: boolean) => {
        dispatch(__switchTodo({ id, isDone }));
    };

    const onDeleteHandler = async (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            dispatch(__deleteTodo(id));
        }
    };

    if (!todoList) {
        return <div>Loading ...</div>;
    }

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
