import "./App.css";
import { useRef, useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import localStorage from "./components/LocalStorage";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

const Localinit = () => {
  if(window.localStorage.getItem("todos") !== null){
      const localString = window.localStorage.getItem("todos");
      const localData = JSON.parse(localString);
      return localData;
  } else {
      const localData = [];
      const localString = JSON.stringify(localData);
      window.localStorage.setItem("todos", localString);
      return localData;
  }
}

const Localupdate = (todos) => {
  const localString = JSON.stringify(todos);
  window.localStorage.setItem("todos", localString);
}

function App() {

  const [todos, setTodos] = useState(Localinit()); // todo list
  // local inits
  const idRef =  useRef(todos.length===0 ? 0 : todos[0].id+1); // 갯수 - id // 새로운 아이디 값


  const onCreate = (content) => { // todo 를 추가해주는 함수
    const newTodo = {
      id: idRef.current++, // id
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    // setTodos([newTodo, ...todos]); //를 쓰면 반영되는 시점이 새로운 onCreate가 작동할 때임

    // local
    Localupdate(newTodos);
    //Localupdate(todos); //를 쓰면 반영되는 시점이 달라서 반영이 늦음

  };

  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(
      //todos.map():기존의 배열을 변경하는 메소드
      //...todo: targetId와 일치하지 않는 값들의 그대로 유지
      todos.map((todo) =>
        todo.id === targetId
          ? { ...todo, isDone: !todo.isDone, date : new Date().getTime() } // 원래 값의 반대로 변경
          : todo //삼항연산자
      )


    );
  };

  const onDelete = (targetId) => {

    setTodos(
      todos.filter((todo) => todo.id !==targetId)
    );
    // id 수는 줄이면 안 됨. 지우는 순서에 따라 번호가 겹칠 수 있음

    // local
    const newTodos = todos.filter((todo) => todo.id !==targetId);
    Localupdate(newTodos);
  }

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      {/* App컨포넌트의 자식 -> List컴포턴트의 id체크박스 
      -> TodoItem의 id체크여부 요소에서 제어 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;