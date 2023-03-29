export const HRM_PATH = '/__webpack_HMR__'
export const HOST = '127.0.0.1'
export const PORT = 3601
export const HMR_URL = encodeURIComponent(`http://${HOST}:${PORT}${HRM_PATH}`)
// !: 必须指定 path 为 devServer 的地址，不然的话热更新 client 会向 chrome://xxx 请求
export const HMRClientScript = `@lukeapage/webpack-hot-middleware/client?path=${HMR_URL}&reload=true&overlay=true`
