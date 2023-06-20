import React, { useCallback, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { TransitionCollapse } from '../transition/collapse'

export interface ExpandBlockProps {
    children?: React.FC<{ close: () => void }>
    /** 父容器 */
    container: string | HTMLElement
    /** 展开时的组件 */
    faced: React.ReactNode
    /** 动画时长 */
    duration?: number

    visible?: boolean
}

/**
 * 展开收缩组件
 * @description 用于展开收缩组件，组件展开时会充满父容器 {@link ExpandBlockProps.container}
 */
export const CollapseBlock = (props: ExpandBlockProps) => {
    const { duration = 300 } = props

    // 展开后的包裹块
    const wrapBlock = useRef<HTMLDivElement | null>(null)
    // 内容块
    const contentBlock = useRef<HTMLDivElement | null>(null)
    // faced块
    const facedBlock = useRef<HTMLDivElement | null>(null)

    const collapseTransition = useRef<TransitionCollapse | null>(null)

    /** 点击展开块 */
    const onExpand = useCallback(async () => {
        collapseTransition.current?.toggle()
    }, [])

    const onClose = useCallback(async () => {
        1
    }, [])

    useEffect(() => {
        if (!facedBlock.current || !contentBlock.current || !wrapBlock.current) return

        collapseTransition.current = new TransitionCollapse({
            targetDom: facedBlock.current,
            collapseDom: contentBlock.current,
            expandDom: wrapBlock.current,
            duration
        })
    }, [duration])

    const ContentBlock = (params: { style?: React.CSSProperties }) => {
        return (
            <div
                key={'contentBlock'}
                style={{ ...params.style }}
                className={styles.expandBlock_content}
            >
                {props.children?.({ close: onClose })}
            </div>
        )
    }

    const FacedBlock = (params: { style?: React.CSSProperties }) => {
        return (
            <div
                ref={facedBlock}
                key={'facedBlock'}
                style={{ ...params.style }}
                className={styles.expandBlock_faced}
                onClick={() => onExpand()}
            >
                {props.faced}
            </div>
        )
    }

    return (
        <div className={styles.expandBlock} ref={wrapBlock}>
            <div className={styles.expandBlock_inner} ref={contentBlock}>
                <FacedBlock />
                <ContentBlock />
            </div>
        </div>
    )
}
