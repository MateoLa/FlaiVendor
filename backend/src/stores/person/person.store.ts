import { type StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

// import { devtools, persist } from 'zustand/middleware'
// import { firebaseStorage } from '../storages/firebase.storage'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set( ({ firstName: value }), false, 'setFirstName' ),
  setLastName: (value: string) => set( ({ lastName: value }), false, 'setLastName' ),
})


export const usePersonStore = create<PersonState & Actions>()(
  // "devtools" de Redux (Tb incluído en zustand). Sirve para inspeccionar en el navegador
//  devtools
    // "persist" mantiene la información en el formulario al recargar la página.
    (persist(
      storeAPI, { 
        name: 'person-storage',
        // storage: customSessionStorage
        // storage: firebaseStorage
      }
    )
  )
)
