import React, {useState} from 'react'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import TodoForm from './TodoForm'

function Todo({todos, sort, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        date: '',
        color: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: '',
            date: '',
            color: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    const dateFormat = date => {
        if (date === "") {
            return "";
        } else {
            let formatting = new Date(date)
            let format = formatting.toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
            return format.replace(",", "");
        }
    }

    let sortedTodos = [...todos];
    if (sort === 2) {
        sortedTodos = todos.slice().reverse();
    } else if (sort === 3) {
        sortedTodos.sort((a,b) => {
            let date = new Date(a.date)
            let date2 = new Date(b.date)
            if (a.date === "") {;
                date = new Date(8640000000000000);
            }
            if (b.date === "") {
                date2 = new Date(8640000000000000);
            }
            return date>date2 ? 1 : -1;
        });
    } else if (sort === 4) {
        sortedTodos.sort((a,b) => a.text>b.text ? 1:-1)
    }

  return (sortedTodos.map((todo,index) => (
    <div style={todo.color === "" ? {} : {'background': todo.color }} 
    className={todo.isComplete ? 'todo-row complete' :'todo-row'} key ={index}> 
    <div className='complete-button' key={todo.id} onClick={()=>completeTodo(todo.id)}>{todo.text}</div>
    <div className='date-display'>{dateFormat(todo.date)}</div>
    <div className="icons">
        <RiCloseCircleLine onClick = {() => removeTodo(todo.id)} className='delete-icon' />
        <TiEdit onClick = {() => setEdit({id: todo.id, value:todo.text, date: todo.date, color: todo.color})} className='edit-icon' />
    </div>
    </div>
  )));
}

export default Todo
