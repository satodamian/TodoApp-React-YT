import React from 'react'

const Todo = ({todo, todoDelete, todoToogleCompleted, setTodoEdit}) => {
    // console.log(props)
  return (
    <div className='card mt-2'>
            <div className='card-body'>
                <h3 className='card-title text-right'>
                    {todo.title}
                    <button 
                        className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-danger'}`}
                        onClick={()=>todoToogleCompleted(todo.id)}>
                        {todo.completed ? 'Terminado' : 'Terminar'}
                    </button>
                </h3>
                <p className='card-text text-right'>
                   {todo.description}
                </p>
                <hr></hr>
                <div className='d-flex justify-content-end'>
                <button 
                    className='btn btn-outline-primary'
                    onClick={()=>setTodoEdit(todo)}
                    >
                    Editar
                </button>
                <button 
                    className='btn btn-sm btn-outline-danger'
                    onClick={()=>todoDelete(todo.id)}
                    >
                    Eliminar
                </button>
                
                </div>
            </div>
        </div>
  )
}

export{
    Todo,
}
