import { BrowserStorage } from './adapt/browser'
import Storage from './storage'

let storageLocal: Storage, storageSync: Storage
storageLocal = storageSync = new BrowserStorage()

if (import.meta.env.PROD) {
  storageLocal = Storage.create({ engine: chrome.storage.local })
  storageSync = Storage.create({ engine: chrome.storage.sync })
}

export { storageLocal, storageSync }
