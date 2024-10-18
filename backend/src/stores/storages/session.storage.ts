import { StateStorage, createJSONStorage } from 'zustand/middleware'


const StorageAPI: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name)
    return data
  },
  setItem: function (name: string, value: string): void | Promise<unknown> {
    sessionStorage.setItem(name, value)
  },
  removeItem: function (name: string): void | Promise<unknown> {
    console.log('removeItem', name)
  }
}

export const customSessionStorage = createJSONStorage( () => StorageAPI )
