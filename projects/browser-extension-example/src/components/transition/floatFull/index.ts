import {
  calculateCollapsedScaleByRect,
  calculateCollapsedTranslateByRect,
  createEaseAnimations,
} from "./utils";

export class TransitionFloatFull {
  static count = 0;
  /** 标签 */
  static tag = "TransitionFloatFull";

  /** 唯一标识符 */
  unique = 0;
  /** 是否展开 */
  expanded: boolean;
  /**  */
  animated: boolean;
  cubicBezier = [0.075, 0.82, 0.165, 1.0];

  containerDom: HTMLElement;
  enterDom: HTMLElement;
  outDom: HTMLElement;
  contentDom: HTMLElement;
  downDom: HTMLElement;
  upDom: HTMLElement;

  enterRect: DOMRect;
  containerRect: DOMRect;
  outRect: DOMRect;
  contentRect: DOMRect;
  downRect: DOMRect;
  upRect: DOMRect;

  translate: { x: number; y: number };
  scale: { x: number; y: number };

  /** 动画持续时长 */
  duration = 300;

  constructor(params: {
    containerDom: HTMLElement;
    enterDom: HTMLElement;
    contentDom: HTMLElement;
    downDom: HTMLElement;
    outDom: HTMLElement;
    upDom: HTMLElement;
    cubicBezier?: [number, number, number, number];
    duration?: number;
  }) {
    this.unique = TransitionFloatFull.count++;
    this.animated = false;
    this.expanded = false;

    this.containerDom = params.containerDom;
    this.enterDom = params.enterDom;
    this.contentDom = params.contentDom;
    this.downDom = params.downDom;
    this.outDom = params.outDom;
    this.upDom = params.upDom;

    this.enterRect = this.enterDom.getBoundingClientRect();
    this.containerRect = this.containerDom.getBoundingClientRect();
    this.contentRect = this.contentDom.getBoundingClientRect();
    this.outRect = this.outDom.getBoundingClientRect();
    this.downRect = this.downDom.getBoundingClientRect();
    this.upRect = this.upDom.getBoundingClientRect();

    if (params.duration) {
      this.duration = params.duration;
    }

    if (params.cubicBezier) {
      this.cubicBezier = params.cubicBezier;
    }

    // 计算折叠比例
    this.scale = calculateCollapsedScaleByRect(
      this.outRect,
      this.containerRect,
      {
        y: this.outRect.height,
      }
    );
    // 计算偏移轨迹
    this.translate = calculateCollapsedTranslateByRect(
      this.outRect,
      this.containerRect,
      {
        y: this.outRect.height,
      }
    );
    // 根据折叠比例，创建并设置动画
    this.setAnimationsClass({ translate: this.translate, scale: this.scale });
    // 默认关闭
    this.collapse();
    // 激活
    this.activate();
  }

  toggle() {
    if (this.expanded) {
      this.collapse();
      return;
    }

    this.expand();
  }

  async expand() {
    this.expanded = true;

    const { translate, scale } = this;

    const invX = 1 / scale.x;
    const invY = 1 / scale.y;

    this.upDom.style.transform = `scale(${invX}, ${invY})`;
    this.downDom.style.transform = `scale(${scale.x}, ${scale.y})`;
    this.contentDom.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
    this.contentDom.style.setProperty("z-index", "11");
    this.enterDom.style.opacity = "1";
    this.outDom.style.opacity = "0";

    if (!this.animated) {
      return;
    }

    await this.execAnimation({ expand: true });
  }

  async collapse() {
    this.expanded = false;

    const invTranslateX = 0;
    const invTranslateY = 0;

    this.upDom.style.transform = `scale(1, 1)`;
    this.downDom.style.transform = `scale(1, 1)`;
    this.contentDom.style.transform = `translate(${invTranslateX}px, ${invTranslateY}px)`;
    this.contentDom.style.setProperty("z-index", "10");
    this.enterDom.style.opacity = "0";
    this.outDom.style.opacity = "1";

    if (!this.animated) {
      return;
    }

    await this.execAnimation({ expand: false });
  }

  // 执行动画
  execAnimation(params: { expand: boolean }) {
    const { expand } = params;
    const {
      contentDom,
      duration,
      cubicBezier,
      outDom,
      upDom,
      enterDom,
      downDom,
    } = this;

    const setStyle = (dom: HTMLElement, name?: string) => {
      if (!name) {
        dom.style.setProperty("animation", "");
      } else {
        dom.style.setProperty("animation-name", this.genTag(name));
        dom.style.setProperty("animation-duration", `${duration / 1000}s`);
        dom.style.setProperty(
          "animation-timing-function",
          `cubic-bezier(${cubicBezier.join(",")})`
        );
      }
    };

    setStyle(contentDom);
    setStyle(outDom);
    setStyle(downDom);
    setStyle(enterDom);
    setStyle(upDom);

    // 在这里强制重新计算样式，以便类生效。
    window.getComputedStyle(downDom).transform;

    if (expand) {
      setStyle(contentDom, "animation-expanded");
      setStyle(downDom, "down-animation-expanded");
      setStyle(upDom, "up-animation-expanded");
      setStyle(enterDom, "in-animation-expanded");
      setStyle(outDom, "out-animation-expanded");
    } else {
      setStyle(contentDom, "animation-collapsed");
      setStyle(downDom, "down-animation-collapsed");
      setStyle(upDom, "up-animation-collapsed");
      setStyle(enterDom, "in-animation-collapsed");
      setStyle(outDom, "out-animation-collapsed");
    }

    return new Promise((r) => setTimeout(r, duration));
  }

  activate() {
    this.animated = true;
  }

  setAnimationsClass(params: {
    translate: { x: number; y: number };
    scale: { x: number; y: number };
  }) {
    const { translate, scale } = params;

    const className = `${TransitionFloatFull.tag}-animate-${this.unique}`;
    let animationClass = document.querySelector(`.${className}`);

    // 判断是否已经创建了动画
    if (animationClass) {
      return animationClass;
    }

    // 创建动画Class
    animationClass = document.createElement("style");
    animationClass.classList.add(className);

    const {
      animationExpandAnimation,
      animationCollapseAnimation,
      upAnimationExpandAnimation,
      upAnimationCollapseAnimation,
      inAnimationCollapseAnimation,
      inAnimationExpandAnimation,
      outAnimationCollapseAnimation,
      outAnimationExpandAnimation,
      downAnimationCollapseAnimation,
      downAnimationExpandAnimation,
    } = createEaseAnimations({
      translate,
      scale,
    });

    // 生成动画文本
    const textContent = `
            @keyframes ${this.genTag("animation-expanded")} {
                ${animationExpandAnimation.join("")}
            }

            @keyframes ${this.genTag("animation-collapsed")} {
                ${animationCollapseAnimation.join("")}
            }

            @keyframes ${this.genTag("up-animation-expanded")} {
                ${upAnimationExpandAnimation.join("")}
            }

            @keyframes ${this.genTag("up-animation-collapsed")} {
                ${upAnimationCollapseAnimation.join("")}
            }

            @keyframes ${this.genTag("down-animation-expanded")} {
                ${downAnimationExpandAnimation.join("")}
            }

            @keyframes ${this.genTag("down-animation-collapsed")} {
                ${downAnimationCollapseAnimation.join("")}
            }

            @keyframes ${this.genTag("in-animation-expanded")} {
                ${inAnimationExpandAnimation.join("")}
            }

            @keyframes ${this.genTag("in-animation-collapsed")} {
                ${inAnimationCollapseAnimation.join("")}
            }

            @keyframes ${this.genTag("out-animation-expanded")} {
                ${outAnimationExpandAnimation.join("")}
            }

            @keyframes ${this.genTag("out-animation-collapsed")} {
                ${outAnimationCollapseAnimation.join("")}
            }
        `;

    // 设置动画
    animationClass.textContent = textContent;
    document.head.appendChild(animationClass);

    return animationClass;
  }

  // 生成类名
  genTag(name: string) {
    return `${TransitionFloatFull.tag}-${name}-${this.unique}`;
  }
}
