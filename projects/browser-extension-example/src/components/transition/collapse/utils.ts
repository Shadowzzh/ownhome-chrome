/** 计算折叠比例 */
export function calculateCollapsedScale(collapse: HTMLElement, expand: HTMLElement) {
    const collapsed = collapse.getBoundingClientRect()
    const expanded = expand.getBoundingClientRect()
    return {
        x: collapsed.width / expanded.width,
        y: collapsed.height / expanded.height
    }
}

export function ease(v: number, pow = 4) {
    return 1 - Math.pow(1 - v, pow)
}

export function easeOutQuart(v: number) {
    return bezier(v, 0.165, 0.84, 0.44, 1.0)
}

export function easeOutCirc(v: number) {
    return bezier(v, 0.075, 0.82, 0.165, 1.0)
}

export function bezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const u: number = 1 - t
    const tt: number = t * t
    const uu: number = u * u
    const uuu: number = uu * u
    const ttt: number = tt * t

    const p: number = uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3

    return p
}

/** 缓动函数 */
export function createKeyframeAnimation(collapse: HTMLElement, expand: HTMLElement) {
    const { x, y } = calculateCollapsedScale(collapse, expand)

    let animation = ''
    let inverseAnimation = ''

    for (let step = 0; step <= 100; step++) {
        // 将步骤值重新映射为缓和值。
        const easedStep = ease(step / 100)

        // 计算元素的缩放比例。
        const xScale = x + (1 - x) * easedStep
        const yScale = y + (1 - y) * easedStep

        animation += `${step}% {
        transform: scale(${xScale}, ${yScale});
      }`

        // 现在反过来。
        const invXScale = 1 / xScale
        const invYScale = 1 / yScale

        inverseAnimation += `${step}% {
        transform: scale(${invXScale}, ${invYScale});
      }`
    }

    return `
        @keyframes facedAnimation {
          ${animation}
        }
        @keyframes contentsAnimation {
          ${inverseAnimation}
        }`
}
