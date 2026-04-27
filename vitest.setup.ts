import "@testing-library/jest-dom";

// Mock IntersectionObserver (not available in jsdom)
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
