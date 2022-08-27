import { useEffect, useState } from 'react'

// los hooks se usan dentro del componente
  const initialformValues = {
    title: '',
    description: '',
  }

const TodoForm = ({todoAdd, todoEdit, todoUpdate, setTodoEdit}) => {
    const [formValues, setformValues] = useState(initialformValues);

    // Desectructo desde mi estado inicial (formValues)
    const {title, description} = formValues; 

    // ! ESTADO INTERNO DEL FORMULARIO si es que hay un error
    
    const [error, setError] = useState(null);
    // ! ESTADO INTERNO DEL FORMULARIO si es que el proceso es exitoso
    const [success, setSuccessM] = useState(null);

    // ! UseEFFECT para que nuestra informacion pueda alamcenarse dentro de nuestro input de nuestro formulario
    useEffect(() => {
        if (todoEdit){
          setformValues(todoEdit);
          
        }else{
          setformValues(initialformValues);
        }
      
    }, [todoEdit]) //Todo Edit cambie entonces ejecuta el cuerpo, []se ejecutara una vez
    



    // Cuando llamamos una funcion desde un evento, nuestro primer valor es el mismo evento
    const handleInputChange = ({target}) =>{
      const {name, value} = target;
      // console.log(target.value);
        setformValues({
            ...formValues,
            [name]: value,
        })
      
    }
    // console.log(formValues);

  const handleSubmit = (e) =>{
      e.preventDefault();
    
      // SI ES UNA CADENA VACIA
      // .trim no acepta espacios como letras
      if((title.trim() && description.trim()) === ''){
        setError('Falta indicar un titulo y/o descripcion')
        return;
      }
      //? Actualizar tarea
      if(todoEdit){
        todoUpdate(formValues);
        setSuccessM('Actualizado con exito')


      }else{
        todoAdd(formValues);
        setSuccessM('Agregado con exito') //tod: SSe agrego con exito
        setformValues(initialformValues);//todo:  Cuando se agrega una tarea y quiero borrar campos
      }

      //? Agregar tarea
      todoAdd(formValues);
      
     
      
      setTimeout(() => {
        setSuccessM(null);
        
      }, 2000);
  }

  return (
      <div>
        <h2 className='text-center display-5'>{todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>

        {
          todoEdit && 
          <button
            onClick={()=>setTodoEdit(null)}
            className='btn btn-sm btn-warning mb-2'
            > Cancelar Edicion
          </button>
        }
        
        <form onSubmit={handleSubmit}>
            <input 
              type="text"
              placeholder='Titulo'
              className='form-control' 
              value={title}
              name="title"  //debe tener el mismo del nombre del atributo dentro de nuestro objeto (estado)
              onChange={handleInputChange}
              />

              <textarea 
                placeholder='Descripcion'
                className='form-control mt-2'
                value={description}
                name="description" //debe tener el mismo del nombre del atributo dentro de nues (estado)
                onChange={handleInputChange}
                >
              </textarea>  

              <button
                 className='btn btn-primary btn-block mt-2'
                 >{todoEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}
              </button>
        </form>
        {
            error && (
              <div className='alert alert-danger mt-2'>
                        {error}
              </div>
            )
        }

        {
          success && (
              <div className='alert alert-success mt-2'>
                {success}
              </div>
          )
        }
        
      </div>
  )
}


export{
    TodoForm,
}