'use strict'
;(self['webpackChunk_projects_webpack_easy'] =
    self['webpackChunk_projects_webpack_easy'] || []).push([
    ['main'],
    {
        './src/A.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.r(__webpack_exports__)
            __webpack_require__.d(__webpack_exports__, {
                a: () => a
            })
            const a = () => {
                return 'a'
            }
        },

        './src/main.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.r(__webpack_exports__)
            var _A__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/A.js')

            const main = () => {
                ;(0, _A__WEBPACK_IMPORTED_MODULE_0__.a)()
                __webpack_require__
                    .e('src_B_js')
                    .then(__webpack_require__.bind(__webpack_require__, './src/B.js'))
                    .then(({ b }) => b())
            }

            main()
        }
    },
    (__webpack_require__) => {
        var __webpack_exec__ = (moduleId) => __webpack_require__((__webpack_require__.s = moduleId))
        var __webpack_exports__ = __webpack_exec__('./src/main.js')
    }
])
