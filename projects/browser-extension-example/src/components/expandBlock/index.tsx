import React, { useCallback, useRef, useState } from "react";
import styles from "./index.module.less";
import { useEffect } from "react";
import { useMemo } from "react";

export interface ExpandBlockProps {
  children?: React.FC<{ close: () => void }>;
  /** 父容器 */
  container: string | HTMLElement;
  /** 展开时的组件 */
  faced: React.ReactNode;
  /** 动画时长 */
  duration?: number;
  mode?: "show" | "if";

  visible?: boolean;
}

/**
 * 展开收缩组件
 * @description 用于展开收缩组件，组件展开时会充满父容器 {@link ExpandBlockProps.container}
 */
export const ExpandBlock = (props: ExpandBlockProps) => {
  const { duration = 250, mode = "show" } = props;

  // 占位块，因为展开后的组件会应用position布局，导致失去高度。所以需要占位。
  const replaceBlock = useRef<HTMLDivElement | null>(null);
  // 展开后的包裹块
  const wrapBlock = useRef<HTMLDivElement | null>(null);
  // 内容块
  const contentBlock = useRef<HTMLDivElement | null>(null);
  // faced块
  const facedBlock = useRef<HTMLDivElement | null>(null);

  // 展开后的内容块的原始位置
  const originalReact = useRef<DOMRect | undefined>(undefined);
  // 父容器的 rect
  const targetRect = useRef<DOMRect | undefined>(undefined);

  const [isExpand, setIsExpand] = useState(false);

  // 动画时长
  const transition = useMemo(() => {
    return `all ${duration / 1000}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
  }, [duration]);

  const initial = useCallback(() => {
    if (isExpand) {
      contentBlock.current?.style.setProperty("opacity", "0");
    } else {
      facedBlock.current?.style.setProperty("opacity", "1");
    }
  }, [isExpand]);

  // 取消关闭
  let abortClose = useRef<undefined | (() => void)>(undefined);
  // 取消展开
  let abortExpand = useRef<undefined | (() => void)>(undefined);

  /** 创建占位块 */
  const createReplaceBlock = (rect: DOMRect) => {
    const block = document.createElement("div");
    block.style.width = `${rect.width}px`;
    block.style.height = `${rect.height}px`;

    return block;
  };

  /** 初始化容器 */
  const initialWrap = (target: HTMLElement, react: DOMRect) => {
    target.style.position = "fixed";
    target.style.top = `${react.top}px`;
    target.style.left = `${react.left}px`;
    target.style.width = `${react.width}px`;
    target.style.height = `${react.height}px`;
  };

  /**
   * 展开
   * @param current 当前展开的组件
   * @param targetRect 父容器的 rect
   */
  const expand = useCallback(
    async (
      current: HTMLDivElement,
      targetRect: DOMRect | undefined,
      option: Pick<ExpandBlockProps, "duration">
    ) => {
      const promise = new Promise((resolve) => {
        requestAnimationFrame(async () => {
          abortClose.current?.();
          if (!current || !targetRect) return;

          current.style.top = `${targetRect.top}px`;
          current.style.left = `${targetRect.left}px`;
          current.style.width = `${targetRect.width}px`;
          current.style.height = `${targetRect.height}px`;

          current.style.setProperty("z-index", "11");

          contentBlock.current?.style.setProperty("opacity", "1");
          facedBlock.current?.style.setProperty("opacity", "0");

          // 等待动画结束
          await new Promise((r, j) => {
            abortExpand.current = j;
            setTimeout(r, option.duration);
          }).catch(() => 1);

          resolve(undefined);
        });
      });
      return promise;
    },
    []
  );

  /**
   * 收缩
   * @param current 当前展开的组件
   * @param targetRect 父容器的 rect
   */
  const close = useCallback(
    async (
      current: HTMLDivElement,
      targetRect: DOMRect | undefined,
      option: Pick<ExpandBlockProps, "duration"> & { callback?: () => void }
    ) => {
      const promise = new Promise((resolve) => {
        requestAnimationFrame(async () => {
          abortExpand.current?.();
          if (!current || !targetRect) return;

          current.style.top = `${targetRect.top}px`;
          current.style.left = `${targetRect.left}px`;
          current.style.width = `${targetRect.width}px`;
          current.style.height = `${targetRect.height}px`;

          current.style.setProperty("z-index", "10");
          contentBlock.current?.style.setProperty("opacity", "0");
          facedBlock.current?.style.setProperty("opacity", "1");

          // 等待动画结束
          await new Promise((r, j) => {
            abortClose.current = j;
            setTimeout(r, option.duration);
          }).catch(() => resolve(undefined));

          current.style.position = "static";
          current.style.top = "auto";
          current.style.left = "auto";
          current.style.width = "auto";
          current.style.height = "auto";

          option.callback?.();

          // 移除占位块
          if (replaceBlock.current) {
            replaceBlock.current.remove();
            replaceBlock.current = null;
          }

          resolve(undefined);
        });
      });
      return promise;
    },
    []
  );

  /** 点击展开块 */
  const onExpand = useCallback(
    async (target: HTMLDivElement) => {
      targetRect.current = target.getBoundingClientRect();
      originalReact.current = target.getBoundingClientRect();

      if (!wrapBlock.current || !targetRect.current) return;

      // 父容器，组件展开时宽和高会充满父容器
      const parentContainer = (() => {
        if (typeof props.container === "string") {
          return document.querySelector(props.container);
        } else {
          return props.container;
        }
      })();

      // 如果没有占位块，创建占位块
      if (!replaceBlock.current) {
        const block = createReplaceBlock(targetRect.current);
        replaceBlock.current = block;

        wrapBlock.current?.parentNode?.insertBefore(block, null);
      }

      // 初始化容器
      initialWrap(wrapBlock.current, targetRect.current);

      if (!parentContainer) return;

      const parentContainerRect = parentContainer?.getBoundingClientRect();
      expand(wrapBlock.current, parentContainerRect, { duration });

      setIsExpand(true);
    },
    [duration, expand, props.container]
  );

  const onClose = useCallback(async () => {
    if (!wrapBlock.current) return;

    await close(wrapBlock.current, originalReact.current, {
      duration,
      callback: () => setIsExpand(false),
    });

    setIsExpand(false);
  }, [close, duration]);

  const ContentBlock = (params: { style?: React.CSSProperties }) => {
    return (
      <div
        ref={contentBlock}
        key={"contentBlock"}
        style={{ transition, ...params.style }}
        className={styles.expandBlock_content}
      >
        {props.children?.({ close: onClose })}
      </div>
    );
  };

  const FacedBlock = (params: { style?: React.CSSProperties }) => {
    return (
      <div
        ref={facedBlock}
        key={"facedBlock"}
        style={{ transition, ...params.style }}
        className={styles.expandBlock_faced}
        onClick={(e) => onExpand(e.currentTarget as HTMLDivElement)}
      >
        {props.faced}
      </div>
    );
  };

  useEffect(() => {
    initial();
  }, [initial]);

  useEffect(() => {
    if (props.visible === undefined) return;
    if (props.visible) {
      if (facedBlock.current) onExpand(facedBlock.current);
    } else {
      onClose();
    }
  }, [close, expand, onClose, onExpand, props.visible]);

  return (
    <div>
      <div
        style={{ transition }}
        className={styles.expandBlock}
        ref={wrapBlock}
      >
        {mode === "show" ? (
          <>
            <ContentBlock
              style={{ display: isExpand === true ? "block" : "none" }}
            />
            <FacedBlock
              style={{ display: isExpand === false ? "block" : "none" }}
            />
          </>
        ) : (
          <>{isExpand ? <ContentBlock /> : <FacedBlock />}</>
        )}
      </div>
    </div>
  );
};
