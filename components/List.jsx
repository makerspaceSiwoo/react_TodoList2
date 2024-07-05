import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete  }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData(); // 검색 결과 todo list - 렌더링 할 때마다 함수가 실행됨

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              //App컨포넌트에서 받은 Update를 TodoItem에 넘겨줌
              onUpdate={onUpdate} 
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;