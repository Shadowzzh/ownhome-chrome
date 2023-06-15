import { ease } from './utils'

export class TransitionCollapse {
    static unique = 0
    static tag = 'TransitionCollapse'

    collapseDom: HTMLElement
    expandDom: HTMLElement
    targetDom: HTMLElement

    collapsed = { x: 0, y: 0 }
    duration = 300

    animated = false

    expanded = false
    static collapsed: any

    constructor(params: {
        collapseDom: HTMLElement
        targetDom: HTMLElement
        expandDom: HTMLElement
        duration?: number
    }) {
        const { collapseDom, expandDom, targetDom } = params

        this.collapseDom = collapseDom
        this.expandDom = expandDom
        this.targetDom = targetDom

        if (params.duration) {
            this.duration = params.duration
        }

        // 计算折叠比例
        this.collapsed = TransitionCollapse.calculateScales(targetDom, expandDom)
        // 根据折叠比例，设置动画
        this.setEaseAnimation({ collapsed: this.collapsed })

        // 默认关闭
        this.collapse()

        this.activate()
    }

    collapse() {
        this.expanded = false

        const { x, y } = this.collapsed

        const invX = 1 / x
        const invY = 1 / y

        this.expandDom.style.transform = `scale(${x}, ${y})`
        this.collapseDom.style.transform = `scale(${invX}, ${invY})`

        if (!this.animated) {
            return
        }

        this.execAnimation({ expand: false })
    }

    expand() {
        this.expanded = true

        this.collapseDom.style.transform = `scale(1, 1)`
        this.expandDom.style.transform = `scale(1, 1)`

        if (!this.animated) {
            return
        }

        this.execAnimation({ expand: true })
    }

    activate() {
        this.animated = true
    }

    toggle() {
        if (this.expanded) {
            this.collapse()
            return
        }

        this.expand()
    }

    // 执行动画
    execAnimation(params: { expand: boolean }) {
        const { expand } = params
        const { expandDom, collapseDom } = this

        const setStyle = (dom: HTMLElement, name?: string) => {
            if (!name) {
                dom.style.setProperty('animation', '')
                return
            }

            dom.style.setProperty('animation-name', TransitionCollapse.generateClassTag(name))
            dom.style.setProperty('animation-duration', `${this.duration / 1000}s`)
            dom.style.setProperty(
                'animation-timing-function',
                'cubic-bezier(0.075, 0.82, 0.165, 1)'
            )
        }

        setStyle(collapseDom)
        setStyle(expandDom)

        // 在这里强制重新计算样式，以便类生效。
        window.getComputedStyle(this.collapseDom).transform

        if (expand) {
            setStyle(expandDom, 'contents-expanded')
            setStyle(collapseDom, 'faced-expanded')
        } else {
            setStyle(expandDom, 'contents-collapsed')
            setStyle(collapseDom, 'faced-collapsed')
        }
    }

    // 设置动画
    setEaseAnimation(params: { collapsed: { x: number; y: number } }) {
        const { collapsed } = params
        TransitionCollapse.unique++

        const className = `collapse-ease-${TransitionCollapse.unique}`
        let collapseEase = document.querySelector(`.${className}`)

        // 判断是否已经创建了动画
        if (collapseEase) {
            return collapseEase
        }

        // 创建动画
        collapseEase = document.createElement('style')
        collapseEase.classList.add(className)

        const textContent = TransitionCollapse.createEaseAnimations({ collapsed })
        collapseEase.textContent = textContent

        document.head.appendChild(collapseEase)

        return collapseEase
    }

    // 生成类名
    static generateClassTag(name: string) {
        return `${TransitionCollapse.tag}-${name}-${TransitionCollapse.unique}`
    }

    /** 计算折叠比例 */
    static calculateScales(collapseDom: HTMLElement, expandDom: HTMLElement) {
        const collapsed = collapseDom.getBoundingClientRect()
        const expanded = expandDom.getBoundingClientRect()

        return {
            x: collapsed.width / expanded.width,
            y: collapsed.height / expanded.height
        }
    }

    // 创建动画
    static createEaseAnimations(params: { collapsed: { x: number; y: number } }) {
        // content的动画
        const facedCollapseAnimation: string[] = []
        const facedExpandAnimation: string[] = []

        // faced的动画
        const contentsExpandAnimation: string[] = []
        const contentsCollapseAnimation: string[] = []

        for (let i = 0; i <= 100; i++) {
            const step = ease(i / 100)

            // 展开动画
            append({
                i,
                step,
                startX: params.collapsed.x,
                startY: params.collapsed.y,
                endX: 1,
                endY: 1,
                outerAnimation: contentsExpandAnimation,
                innerAnimation: facedExpandAnimation
            })

            // 收缩动画
            append({
                i,
                step,
                startX: 1,
                startY: 1,
                endX: params.collapsed.x,
                endY: params.collapsed.y,
                outerAnimation: contentsCollapseAnimation,
                innerAnimation: facedCollapseAnimation
            })
        }

        function append(args: {
            i: number
            step: number
            startX: number
            startY: number
            endX: number
            endY: number
            outerAnimation: string[]
            innerAnimation: string[]
        }) {
            const { i, step, startX, startY, endX, endY, outerAnimation, innerAnimation } = args

            const xScale = startX + (endX - startX) * step
            const yScale = startY + (endY - startY) * step

            const invScaleX = 1 / xScale
            const invScaleY = 1 / yScale

            outerAnimation.push(`
              ${i}% {
                transform: scale(${xScale}, ${yScale});
              }`)

            innerAnimation.push(`
              ${i}% {
                transform: scale(${invScaleX}, ${invScaleY});
              }`)
        }

        return `
          @keyframes ${TransitionCollapse.generateClassTag('faced-expanded')} {
            ${facedExpandAnimation.join('')}
          }

          @keyframes ${TransitionCollapse.generateClassTag('contents-expanded')} {
            ${contentsExpandAnimation.join('')}
          }

          @keyframes ${TransitionCollapse.generateClassTag('faced-collapsed')} {
            ${facedCollapseAnimation.join('')}
          }

          @keyframes ${TransitionCollapse.generateClassTag('contents-collapsed')} {
            ${contentsCollapseAnimation.join('')}
          }`
    }
}
