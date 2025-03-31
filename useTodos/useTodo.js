import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReduder'



const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: "Recoger algo",
  //   done: false
  // }
]

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodo = () => {

    const [todo, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo))
    }, [todo])

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    const totalTodos = () => {
        return todo.length
    }

    const totalPendingTodos = () => {
        return todo.filter(doing => !doing.done).length
    }

    return {
        todo,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        totalTodos,
        totalPendingTodos
    }
}
