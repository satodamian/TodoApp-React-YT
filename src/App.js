import { useEffect, useState } from 'react'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

const initial_todos = [
    {   
        id:1,
        title: 'Todo #1',
        description: 'Desc del Todo#1',
        completed: false
    },
    {   
        id:2,
        title: 'Todo #2',
        description: 'Desc del Todo#2',
        completed: true
    },
]
    // Guardar en el localStorage
    const localTodos = JSON.parse(localStorage.getItem('todos'));
const App = () => {
    // Solo podemos tener uso de un solo hook dentro de un componente
    const [todos, setTodos] = useState(localTodos || initial_todos);

    //! TodoEdit(La tarea que se actualizando actualmente)
    const [todoEdit, setTodoEdit] = useState(null); //Edit

    //! UseEFFECT para el LocalStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    // Eliminar un todo
    const todoDelete = (todoId) =>{
        if(todoEdit && todoId === todoEdit.id){
            setTodoEdit(null);
        }
        const changeTodos = todos.filter((todo)=>todo.id!==todoId);
        console.log(changeTodos);
        setTodos(changeTodos);

    }

    // Actualizar tarea
    const todoUpdate = (todoEdit) =>{

        const changeTodos = todos.map((todo)=>(
            todo.id === todoEdit.id
            ? todoEdit
            : todo
        ))

        // no podemos mutar el estado para todo
        setTodos(changeTodos)
    }



    // Marcar tarea completada
    const todoToogleCompleted = (todoId)=>{
        // const changeTodos = todos.map((todo)=>{
        //     const todoEdit = {
        //         ...todo,
        //         completed : !todo.completed,
        //     }
        //     if (todo.id=== todoId){
        //         return todoEdit
        //     }else{
        //         return todo
        //     }
               
        // }) 
        const changeTodos = todos.map((todo)=>(
            (todo.id === todoId)
                    ? {
                        ...todo,
                        completed: !todo.completed,
                      }
                    : todo
        )
           )
        setTodos(changeTodos);
    }

    const todoAdd = (todo) =>{
        const NewTodo = {
            id: Date.now(),
            ...todo, //viene de formValue (title y description)
            completed: false
        }

        const changeTodos = [
            NewTodo,
            ...todos,
        ]       
        setTodos(changeTodos)
    }

  return (
    <div className='container mt-4'>
        <div className='row'>
            <div className='col-8'>
                <TodoList
                    todos={todos}
                    todoDelete={todoDelete}
                    todoToogleCompleted = {todoToogleCompleted}
                    setTodoEdit = {setTodoEdit}
                />
            </div>
            <div className='col-4'>
                <TodoForm
                    todoEdit={todoEdit}
                    todoAdd={todoAdd}
                    todoUpdate={todoUpdate}
                    setTodoEdit={setTodoEdit}
                />
            </div>
        </div>
    </div>
  )
}

export{
    App,
}
