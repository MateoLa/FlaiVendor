import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { TaskStatus } from '../interfaces';
import { useTaskStore } from '../stores';

interface Options {
  status: TaskStatus
}

export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore( state => !!state.draggingTaskId )    // !! --> convierte a booleano
  const onTaskDrop = useTaskStore ( state => state.onTaskDrop )
  const addTask = useTaskStore ( state => state.addTask )

  const [onDragOver, setOnDragOver] = useState(false)

  const handleAddTask = async() => {
    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea'
        } 
      }
    })
    if ( !isConfirmed ) return
    addTask(value, status)
  }

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setOnDragOver(true)
  }
  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setOnDragOver(false)
  }
  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setOnDragOver(false)
    onTaskDrop(status)
  }

  return {
    // Properties
    isDragging,

    // Methods
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
