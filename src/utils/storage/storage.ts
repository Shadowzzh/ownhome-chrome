export type Engine = Pick<
  chrome.storage.StorageArea,
  'clear' | 'get' | 'remove' | 'set'
>

export default class Storage implements Engine {
  engine: Engine = chrome.storage.local

  constructor() {}
  /** 清空值 */
  clear(): Promise<void>
  clear(callback?: () => void): void
  clear(callback?: any): void | Promise<void> {
    return this.engine.clear(callback)
  }

  /** 获取值 */
  get(callback: (items: { [key: string]: any }) => void): void
  get(
    keys?: string | string[] | { [key: string]: any } | null
  ): Promise<{ [key: string]: any }>
  get(
    keys: string | string[] | { [key: string]: any } | null,
    callback: (items: { [key: string]: any }) => void
  ): void
  get(keys?: any, callback?: any): void | Promise<{ [key: string]: any }> {
    return this.engine.get(keys, callback)
  }

  /** 删除值 */
  remove(keys: string | string[]): Promise<void>
  remove(keys: string | string[], callback?: () => void): void
  remove(keys: any, callback?: any): void | Promise<void> {
    this.engine.remove(keys, callback)
  }

  /** 设置值 */
  set(items: { [key: string]: any }): Promise<void>
  set(items: { [key: string]: any }, callback?: () => void): void
  set(items: any, callback?: any): void | Promise<void> {
    this.engine.remove(items, callback)
  }

  static create(params: { engine: Engine }) {
    const { engine } = params

    const storage = new Storage()
    storage.engine = engine

    return storage
  }
}
