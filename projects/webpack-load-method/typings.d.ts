declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.ico'

declare module '*.module.scss' {
    const resource: Record<string, string>

    export = resource
}
