import React from 'react'
import { Todo } from './Todo'

const TodoList = ({todos, todoDelete, todoToogleCompleted, setTodoEdit}) => {
    // Manejo de Estados
   
  return (
    <div>
        <h2 className='text-right display-4'>Lista de Tareas</h2>

        {
            todos.length === 0
            ?(
                <div className='alert alert-warning'>
                    No hay tareas. Por favor agrega una {":)"}
                </div>
            )
            : (
                 todos.map((todo)=>(
                <Todo todo={todo} 
                      key={todo.id}
                      todoDelete={todoDelete}
                      todoToogleCompleted={todoToogleCompleted}    
                      setTodoEdit={setTodoEdit}                 
                    
                />
            ))
            )
        }
      
    </div>
   
  )
}

export{
    TodoList,
}