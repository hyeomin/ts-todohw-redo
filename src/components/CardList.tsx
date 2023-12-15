import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteTodo, fetchTodos, switchTodo } from "../api/todoApi";
import { Todo } from "../types/TodoTypes";

function CardList({ isDone }: { isDone: boolean }) {
    const { isLoading, data: todoList } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });

    const queryClient = useQueryClient();

    const switchMuation = useMutation({
        mutationFn: switchTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const onSwitchStatusHandler = (id: string, isDone: boolean) => {
        switchMuation.mutate({ id, isDone });
    };

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const onDeleteHandler = (id: string) => {
        const confirmed = window.confirm("삭제하시겠습니까?");
        if (confirmed) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="card-container">
            <h2>{isDone ? "Done" : "In Progress"}</h2>
            {todoList
                .filter((item: Todo) => item.isDone === isDone)
                .map((item: Todo) => {
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
