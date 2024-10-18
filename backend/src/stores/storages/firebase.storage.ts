import { StateStorage, createJSONStorage } from 'zustand/middleware'

const firebaseUrl = 'https://zustand-dashboard-storag-8f7bd-default-rtdb.firebaseio.com/dashboard'


const StorageAPI: StateStorage = {

  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then( res => res.json() )
      return JSON.stringify( data )
    } catch(error) {
      throw error
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then( res => res.json() )

    console.count('data')
    // Observamos que se da una condición de carrera http al apretar cada tecla.
    // El problema es ¿qué valor se almacena si llega antes el último valor y luego un valor previo???
    // AXIOS evita esto implementando el Abort Controller (Se cancela la petición anterior si hay una nueva).
    return
  },

  removeItem: function (name: string): void | Promise<unknown> {
    console.log('removeItem', name)
  }
}

export const firebaseStorage = createJSONStorage( () => StorageAPI )
