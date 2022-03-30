import { Engine } from '../storage'

export class BrowserStorage implements Engine {
  engine: Engine = this

  clear(): Promise<void>
  clear(callback?: () => void): void
  clear(callback?: any): void | Promise<void> {
    return localStorage.clear()
  }

  get(callback: (items: { [key: string]: any }) => void): void
  get(
    keys?: string | string[] | { [key: string]: any } | null
  ): Promise<{ [key: string]: any }>
  get(
    keys: string | string[] | { [key: string]: any } | null,
    callback: (items: { [key: string]: any }) => void
  ): void
  get(keys?: any, callback?: any): void | Promise<{ [key: string]: any }> {
    const item = localStorage.getItem(keys)
    return Promise.resolve({ [keys]: item ? JSON.parse(item) : null })
  }

  remove(keys: string | string[]): Promise<void>
  remove(keys: string | string[], callback?: () => void): void
  remove(keys: any, callback?: any): void | Promise<void> {
    return localStorage.removeItem(keys)
  }
  set(items: { [key: string]: any }): Promise<void>
  set(items: { [key: string]: any }, callback?: () => void): void
  set(items: any, callback?: any): void | Promise<void> {
    Object.entries(items).forEach(([k, v]) => {
      localStorage.setItem(k, JSON.stringify(v))
    })
  }
}
