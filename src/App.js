import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {

  const storedtodoList = JSON.parse(localStorage.getItem('todoList'))
  const [todoList, setTodoList] = useState(Array.isArray(storedtodoList) ? storedtodoList : [{name: "What's the plan for today?", sort: 1, list: []}]);

  console.log(todoList);

  useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]) 
  
  const addClicked = () => {
    setTodoList([...todoList, {name: "What's the plan for today?", sort: 1, list: []}])
  }

  const updateTodos = (todos, index) => {
    let res = [...todoList];
    res[index] = todos;
    setTodoList(res);
  }

  const deleteTodos = (index) => {
    let res = [...todoList];
    if (res.length === 1) {
      return;
    }
    res.splice(index, 1);
    setTodoList(res);
    window.location.reload(false);
  }

  const copyTodos = (index) => {
    let res = [...todoList];
    let adding = res[index];
    res.push(adding);
    setTodoList(res);
  }

  return (
    <div className = "app">
      {todoList.map((todos, index) => (
        <div className="todo-app" key = {index}>
          <TodoList todosInfo = {todos} index = {index} updateTodos = {updateTodos} deleteTodos = {deleteTodos} copyTodos = {copyTodos}/>
        </div>
      ))}
    <button className = 'add-button' onClick = {addClicked}>Add new list</button>
    </div>
  );
}

export default App;
