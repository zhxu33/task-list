import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function TodoList({todosInfo, index, updateTodos, deleteTodos, copyTodos}) {

    const [todos, setTodos] = useState(todosInfo.list);
    const [optionDisplay, setoptionDisplay] = useState(false);
    const [sort, setSort] = useState(todosInfo.sort);
    const [nameDisplay, setNameDisplay] = useState(false);
    const [nameInput, setNameInput] = useState(todosInfo.name);
    
    useEffect(() => {
        updateTodos({name: nameInput, sort: sort, list:todos}, index);
        // eslint-disable-next-line
    }, [todos, sort, nameInput])  

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item=>(item.id === todoId ? newValue: item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const optionClick = e => {
        setoptionDisplay(!optionDisplay);
    }

    const sortClick = e => {
        if (sort < 4) {
            setSort(sort+1);
        } else{
            setSort(1);
        }
    }

    const getSortName = e => {
        if (sort === 1) {
            return "Sort by date added (newest)";
        } else if (sort === 2) {
            return "Sort by date added (oldest)";
        } else if (sort === 3) {
            return "Sort by due date";
        } else if (sort === 4) {
            return "Sort by alphabetical";
        }
    }

    const editListName = e => {
        setNameDisplay(!nameDisplay);
    }

    const handleNameChange = e => {
        setNameInput(e.target.value);
    }

  return (
    <div className = "todo-list">
       {nameDisplay ? <><input placeholder='Update your item'
                value={nameInput}
                onChange={handleNameChange}
                name='text'
                className='list-name-edit'></input> <button className='list-name-confirm' onClick = {editListName}>Confirm</button></> : <h1 className = "list-name" onClick = {editListName}
       >{nameInput}</h1>}
      <button className = "options-button option" onClick = {optionClick}>Options</button>
      {optionDisplay ? <div className = "options">
        <button className = "sort option" onClick = {() => sortClick()}>{getSortName()}</button>
        <button className = "copy option" onClick = {() => copyTodos(index)}>Copy list</button>
        <button className = "clear option" onClick = {() => setTodos([])}>Clear tasks</button>    
        <button className = "delete option" onClick = {() => deleteTodos(index)}>Delete list</button>    
      </div>: <></>}
      <TodoForm onSubmit={addTodo}/>
      <div className = "todo-tasks">
      <Todo todos={todos} sort = {sort} completeTodo={completeTodo} removeTodo ={removeTodo} updateTodo = {updateTodo} />
      </div>
    </div>
  )
}

export default TodoList
