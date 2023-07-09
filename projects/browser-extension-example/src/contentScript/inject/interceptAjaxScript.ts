console.log('interceptAjaxScript.ts')

type ProxyFunctionName = 'open' | 'setRequestHeader' | 'send' | 'getAllResponseHeaders'

class ProxyXMLHttpRequest extends XMLHttpRequest {
    constructor() {
        super()

        for (const key in this) {
            const value = this[key]

            if (value instanceof Function) {
                const proxyFunc = new Proxy(value, {
                    apply: (target, thisArg, argArray) => {
                        const functionName = target.name as ProxyFunctionName

                        switch (functionName) {
                            case 'open':
                                break
                            case 'send':
                                this.addEventListener('load', function () {
                                    if (this.responseType !== 'blob' && this.responseText) {
                                        requestIdleCallback(() => {
                                            const { responseURL, responseText } = this

                                            window.postMessage(
                                                {
                                                    cmd: 'request-send:load',
                                                    data: {
                                                        responseURL,
                                                        responseText
                                                    }
                                                },
                                                '*'
                                            )
                                        })
                                    }
                                })

                                break
                            case 'getAllResponseHeaders':
                                break
                            case 'setRequestHeader':
                                break
                            default:
                                break
                        }

                        return Reflect.apply(target, thisArg, argArray)
                    }
                })

                this[key] = proxyFunc
            }
        }
    }
}

// eslint-disable-next-line no-global-assign
XMLHttpRequest = ProxyXMLHttpRequest
