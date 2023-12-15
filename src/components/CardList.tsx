import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/config/configStore";
import { deleteTodo, switchTodo } from "../redux/modules/todos";

function CardList() {
    const dispatch = useDispatch();
    const todoList = useAppSelector((state) => state.todoList);

    useEffect(() => {
        console.log("todolist-->", todoList);
    }, [todoList]);

    const onSwitchStatusHandler = (id: string) => {
        const switched = todoList.map((item) => {
            if (item.id === id) {
                return { ...item, isDone: !item.isDone };
            }
            return item;
        });
        dispatch(switchTodo(id));
    };

    const onDeleteHandler = (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            dispatch(deleteTodo(id));
        }
    };

    return (
        <div className="card-container">
            <h2>In Progress</h2>
            {todoList.map((item) => {
                return (
                    <div className="single-card" key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <button onClick={() => onSwitchStatusHandler(item.id)}>
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
