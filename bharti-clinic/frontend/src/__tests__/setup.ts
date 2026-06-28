import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() { }
  disconnect() { }
  observe() { }
  takeRecords() {
    return [];
  }
  unobserve() { }
};

// Framer-motion prop names that should NOT be passed to DOM elements
const MOTION_PROPS = new Set([
  'animate', 'initial', 'exit', 'variants', 'whileHover', 'whileInView',
  'whileTap', 'whileFocus', 'whileDrag', 'transition', 'transformTemplate',
  'layout', 'layoutId', 'layoutScroll', 'onAnimationStart', 'onAnimationComplete',
  'onUpdate', 'onDragStart', 'onDrag', 'onDragEnd', 'drag', 'dragConstraints',
  'dragElastic', 'dragMomentum', 'dragPropagation', 'dragTransition', 'custom',
  'inherit', 'onViewportEnter', 'onViewportLeave', 'viewport',
]);

function createMotionProxy(tag: string) {
  return function MockMotion({ children, ...props }: any) {
    const domProps: any = {};
    for (const [key, val] of Object.entries(props)) {
      if (!MOTION_PROPS.has(key)) {
        domProps[key] = val;
      }
    }
    return React.createElement(tag, domProps, children);
  };
}

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: createMotionProxy('div'),
    span: createMotionProxy('span'),
    h1: createMotionProxy('h1'),
    h2: createMotionProxy('h2'),
    h3: createMotionProxy('h3'),
    p: createMotionProxy('p'),
    button: createMotionProxy('button'),
    section: createMotionProxy('section'),
    canvas: createMotionProxy('canvas'),
    img: createMotionProxy('img'),
    a: createMotionProxy('a'),
    ul: createMotionProxy('ul'),
    li: createMotionProxy('li'),
    nav: createMotionProxy('nav'),
    header: createMotionProxy('header'),
    footer: createMotionProxy('footer'),
    main: createMotionProxy('main'),
    aside: createMotionProxy('aside'),
    article: createMotionProxy('article'),
    form: createMotionProxy('form'),
    input: createMotionProxy('input'),
    label: createMotionProxy('label'),
    path: createMotionProxy('path'),
    svg: createMotionProxy('svg'),
  },
  AnimatePresence: function ({ children }: any) {
    return children;
  },
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useInView: () => true,
  useMotionValue: (initial: number) => ({
    get: () => initial,
    set: vi.fn(),
    onChange: vi.fn(),
  }),
  useTransform: () => ({
    get: () => 0,
    set: vi.fn(),
  }),
}));

// Mock petalAnimation
vi.mock('../utils/petalAnimation', () => {
  return {
    PetalAnimationSystem: class MockPetalAnimationSystem {
      start() { }
      stop() { }
      handleResize() { }
      destroy() { }
      updatePetalCount() { }
    },
  };
});
