import React, { useCallback, useEffect, useRef } from "react";
import styles from "./index.module.less";
import { TransitionFloatFull } from "../transition/floatFull";

export interface ExpandBlockProps {
  children?: React.FC<{ close: () => void }>;
  /** 父容器 */
  container: string | HTMLElement;
  /** 展开时的组件 */
  facade: React.ReactNode;
  /** 动画时长 */
  duration?: number;

  visible?: boolean;
}

/**
 * 展开收缩组件
 * @description 用于展开收缩组件，组件展开时会充满父容器 {@link ExpandBlockProps.container}
 */
export const FloatFullBlock = (props: ExpandBlockProps) => {
  const { duration = 400 } = props;

  // 展开后的包裹块
  const wrapBlock = useRef<HTMLDivElement | null>(null);
  const downBlock = useRef<HTMLDivElement | null>(null);
  const upBlock = useRef<HTMLDivElement | null>(null);
  // 内容块
  const contentBlock = useRef<HTMLDivElement | null>(null);
  // 门面块
  const facadeBlock = useRef<HTMLDivElement | null>(null);

  const transitionFloatFull = useRef<TransitionFloatFull | null>(null);

  /** 点击展开块 */
  const onExpand = useCallback(async () => {
    transitionFloatFull.current?.expand();
  }, []);

  /** 点击关闭块 */
  const onClose = useCallback(async () => {
    transitionFloatFull.current?.collapse();
  }, []);

  useEffect(() => {
    // 父容器，组件展开时宽和高会充满父容器
    const parentContainer = (() => {
      if (typeof props.container === "string") {
        return document.querySelector(props.container);
      } else {
        return props.container;
      }
    })() as HTMLDivElement;

    if (
      !facadeBlock.current ||
      !contentBlock.current ||
      !wrapBlock.current ||
      !downBlock.current ||
      !upBlock.current
    )
      return;

    transitionFloatFull.current = new TransitionFloatFull({
      containerDom: parentContainer,
      contentDom: wrapBlock.current,
      upDom: upBlock.current,
      downDom: downBlock.current,
      enterDom: contentBlock.current,
      outDom: facadeBlock.current,
      duration,
    });
  }, [duration, props.container]);

  const ContentBlock = (params: { style?: React.CSSProperties }) => {
    return (
      <div
        ref={contentBlock}
        style={{ ...params.style }}
        className={styles.content}
      >
        {props.children?.({ close: onClose })}
      </div>
    );
  };

  const FacedBlock = (params: { style?: React.CSSProperties }) => {
    return (
      <div
        ref={facadeBlock}
        style={{ ...params.style }}
        className={styles.facade}
        onClick={() => onExpand()}
      >
        {props.facade}
      </div>
    );
  };

  return (
    <div className={styles.wrap} ref={wrapBlock}>
      <div className={styles.upBlock} ref={upBlock}>
        <div className={styles.downBlock} ref={downBlock}>
          <FacedBlock />
          <ContentBlock />
        </div>
      </div>
    </div>
  );
};
