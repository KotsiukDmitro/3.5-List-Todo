// import img from './img.png';
import './App.css';
// import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {

  const [todo, setTodo] = useState('')
  function inputTodo(event) {
    setTodo(event.target.value)
  }

  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
  function addTodo() {
    if (todo === '') {
      return false
    }
    setTodoList([...todoList, todo])
    setTodo('')
  }
  function clear() {
    setTodoList([])
  }
  function keyDownAdd(event) {
    if (event.key === 'Enter') {
      addTodo()
    }
  }
  function deleteTodo(indexTodo) {
    const del = todoList.filter((elem, index) => {
      return (index !== indexTodo)
    })
    setTodoList(del)
  }
  const [todoEdit, setTodoEdit] = useState({})
  function editTodo(indexEditTodo, itemEditTodo) {

    const saveTodo = {}
    saveTodo.itemCurrent = itemEditTodo
    saveTodo.indexCurrent = indexEditTodo
    setTodoEdit(saveTodo)
    // Сокращенный вариант
    // setTodoEdit({itemCurrent:itemEditTodo, indexCurrent: indexEditTodo})
  }
  function saveEditTodo(event) {
    setTodoEdit({ ...todoEdit, itemCurrent: event.target.value })
  }
  function save() {
    if (todoEdit.itemCurrent === '') {
      deleteTodo(todoEdit.indexCurrent)
      setTodoEdit({})
    } else {
      const newTodoList = todoList.map((elem, i) => {
        if (i === todoEdit.indexCurrent) {
          return (todoEdit.itemCurrent)
        }
        return elem
      })
      setTodoList(newTodoList)
      setTodoEdit({})
    }

  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])


  return (<div className='container'>
    <h1 className='title' >Grocery Bud</h1>
    <div className='search'>
      <input className='input' value={todo} onChange={inputTodo} onKeyDown={keyDownAdd}></input>
      <button className='btn' onClick={addTodo}>ADD</button>
    </div>
    <ul className='list'>{todoList.map((item, index) => {

      return (<li key={item + index}>
        {index !== todoEdit.indexCurrent
          ? <div className='elementList'>{item}
            <div>
              <button className='listBtn' onClick={() => editTodo(index, item)}><i className='fa fa-pen-to-square'></i></button>
              <button className='listBtn delBtn' onClick={() => deleteTodo(index)}><i className='fa fa-trash'></i></button>
            </div>
          </div>
          : <div className='elementList'>
            <input type='text' className='inputEdit' value={todoEdit.itemCurrent} onChange={saveEditTodo}></input>
            <button className='listBtn editBtn' onClick={save}>save</button>
          </div>
        }
      </li>)
    })}
    </ul>
    <button className='clearBtn' onClick={clear}>Clear Items</button>
  </div >)
}
export default App;
