import { create, StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'
// import { produce } from 'immer';
import { devtools, persist } from 'zustand/middleware'

import { v4 as uuidv4 } from 'uuid'
import type { Task, TaskStatus } from "../../interfaces";


interface TaskState {
  draggingTaskId?: string
  tasks: Record<string, Task>,

  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeAPI: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open'},
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open'},
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open'},
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks
    return Object.values(tasks).filter( task => task.status === status )
  },

/*    Requiere zustand/middleware/immer */
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status }

    set( state => { 
      state.tasks[newTask.id] = newTask
    })
/*    Requiere npm install immer
    set( produce( (state: TaskState) => {    // "produce" muta el estado
      state.tasks[newTask.id] = newTask      // La mutación actualiza el estado
    }))
*/
/*    Forma Nativa de Zustand
    set( state => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask
      }
    }))
*/
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId } )
  },

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    set( state => { 
      state.tasks[taskId].status = status    // "immer" allows to mutate states.
    })
/*    Forma Nativa de Zustand
    const tasks = get().tasks
    tasks[taskId].status = status
    set({tasks: tasks})
*/
  },

  onTaskDrop: (status: TaskStatus) => {    // combinar métodos de Store
    const taskId = get().draggingTaskId
    if (!taskId) return

    get().changeTaskStatus(taskId,status)
    get().removeDraggingTaskId()
  }
})

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(storeAPI), {
      name: 'task-storage'
      }
    )
  )
)