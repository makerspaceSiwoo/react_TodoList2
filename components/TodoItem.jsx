import "./TodoItem.css";

const TodoItem = ({
  id,
  isDone,
  content,
  date, // todo
  onUpdate,
  onDelete,
}) => {
  const onChangeCheckbox = () => { // checkbox 누르면 
    onUpdate(id); //Updates넘겨받음

  };

  const ifisdone = () => {
    if(isDone){
      return (<div className="content" style={{opacity:0.5}}><del>{content}</del>&emsp;<em>Done</em></div>);
    }else{
      return ( <div className="content">{content}</div>);
    }
  }

  

  return (
    <div className="TodoItem">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      {isDone ? <div className="content" style={{opacity:0.5}}><del>{content}</del>&emsp;<em>Done</em></div>:
      <div className="content">{content}</div>}


      <div className="date">
        {new Date(date).toLocaleDateString()}
        &emsp;
        {new Date(date).toLocaleTimeString("ko-KR")}
      </div>
      <button onClick={() => {onDelete(id) }}>삭제</button>
    </div>
  );
};

export default TodoItem;