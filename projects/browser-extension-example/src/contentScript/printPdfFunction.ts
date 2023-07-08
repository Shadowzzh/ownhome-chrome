import { printPdf } from '../utils'

let rightClickTarget: HTMLElement | null = null

export const printPdfFunction = {
    watch: () => {
        document.body.addEventListener('mousedown', (e) => {
            if (e.button !== 2 || !e.target) return

            rightClickTarget = e.target as HTMLElement
        })
    },
    print: () => {
        if (!rightClickTarget) return
        printPdf({ dom: rightClickTarget })
    }
}
