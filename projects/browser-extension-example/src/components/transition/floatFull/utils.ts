/** 计算折叠比例 */
export function calculateCollapsedScale(
  collapse: HTMLElement,
  expand: HTMLElement
) {
  const collapsed = collapse.getBoundingClientRect();
  const expanded = expand.getBoundingClientRect();

  return {
    x: collapsed.width / expanded.width,
    y: collapsed.height / expanded.height,
  };
}

/** 计算折叠比例 */
export function calculateCollapsedScaleByRect(
  collapse: DOMRect,
  expand: DOMRect,
  extra: { x?: number; y?: number } = { x: 0, y: 0 }
) {
  return {
    x: collapse.width / (expand.width + (extra?.x ?? 0)),
    y: collapse.height / (expand.height + (extra?.y ?? 0)),
  };
}

/** 计算偏移轨迹*/
export function calculateCollapsedTranslateByRect(
  collapse: DOMRect,
  expand: DOMRect,
  extra?: { x?: number; y?: number }
) {
  const x = expand.left - (collapse.left + (extra?.x ?? 0));
  const y = expand.top - (collapse.top + (extra?.y ?? 0));

  return {
    x: Number.isNaN(x) ? 0 : x,
    y: Number.isNaN(y) ? 0 : y,
  };
}
// 创建动画
export const createEaseAnimations = (params: {
  translate: { x: number; y: number };
  scale: { x: number; y: number };
}) => {
  const { translate, scale } = params;

  // 动画
  const animationExpandAnimation: string[] = [];
  const animationCollapseAnimation: string[] = [];

  const upAnimationExpandAnimation: string[] = [];
  const upAnimationCollapseAnimation: string[] = [];

  const downAnimationExpandAnimation: string[] = [];
  const downAnimationCollapseAnimation: string[] = [];

  //
  const inAnimationExpandAnimation: string[] = [];
  const inAnimationCollapseAnimation: string[] = [];

  const outAnimationExpandAnimation: string[] = [];
  const outAnimationCollapseAnimation: string[] = [];

  for (let i = 0; i <= 100; i++) {
    const step = ease(i / 100);

    // 展开动画
    append({
      i,
      step,
      startX: 1,
      startY: 1,
      endX: scale.x,
      endY: scale.y,
      startTranslateX: 0,
      startTranslateY: 0,
      endTranslateX: translate.x,
      endTranslateY: translate.y,
      startOpacity: 0,
      endOpacity: 1,
      animation: animationExpandAnimation,
      upAnimation: upAnimationExpandAnimation,
      downAnimation: downAnimationExpandAnimation,
      inAnimation: inAnimationExpandAnimation,
      outerAnimation: outAnimationExpandAnimation,
    });

    // 收缩动画
    append({
      i,
      step,
      startX: scale.x,
      startY: scale.y,
      endX: 1,
      endY: 1,
      startTranslateX: translate.x,
      startTranslateY: translate.y,
      endTranslateX: 0,
      endTranslateY: 0,
      startOpacity: 1,
      endOpacity: 0,
      animation: animationCollapseAnimation,
      upAnimation: upAnimationCollapseAnimation,
      downAnimation: downAnimationCollapseAnimation,
      inAnimation: inAnimationCollapseAnimation,
      outerAnimation: outAnimationCollapseAnimation,
    });
  }

  function append(args: {
    i: number;
    step: number;
    startTranslateX: number;
    startTranslateY: number;
    endTranslateX: number;
    endTranslateY: number;
    startOpacity: number;
    endOpacity: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    animation: string[];
    upAnimation: string[];
    inAnimation: string[];
    outerAnimation: string[];
    downAnimation: string[];
  }) {
    const {
      i,
      step,
      startTranslateX,
      startTranslateY,
      endTranslateX,
      endTranslateY,
      animation,
      upAnimation,
      inAnimation,
      downAnimation,
      outerAnimation,
      startX,
      startY,
      endX,
      endY,
      startOpacity,
      endOpacity,
    } = args;

    const xTranslate =
      startTranslateX + (endTranslateX - startTranslateX) * step;
    const yTranslate =
      startTranslateY + (endTranslateY - startTranslateY) * step;

    const xScale = startX + (endX - startX) * step;
    const yScale = startY + (endY - startY) * step;

    const invScaleX = 1 / xScale;
    const invScaleY = 1 / yScale;

    const inOpacity = startOpacity + (endOpacity - startOpacity) * step;
    const outOpacity = 1 - inOpacity;

    animation.push(`
            ${i}% {
                transform: translate(${xTranslate}px, ${yTranslate}px);
            }
        `);

    upAnimation.push(`
            ${i}% {
                transform: scale(${invScaleX}, ${invScaleY});
            }
        `);

    downAnimation.push(`
            ${i}% {
                transform: scale(${xScale}, ${yScale});
            }
        `);

    inAnimation.push(`
            ${i}% {
                opacity: ${inOpacity};
            }
        `);

    outerAnimation.push(`
            ${i}% {
                opacity: ${outOpacity};
            }
        `);
  }

  return {
    animationExpandAnimation,
    animationCollapseAnimation,
    upAnimationExpandAnimation,
    upAnimationCollapseAnimation,
    downAnimationCollapseAnimation,
    downAnimationExpandAnimation,
    inAnimationExpandAnimation,
    inAnimationCollapseAnimation,
    outAnimationExpandAnimation,
    outAnimationCollapseAnimation,
  };
};

export function ease(v: number, pow = 4) {
  return 1 - Math.pow(1 - v, pow);
}
