export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  ms = 300,
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}
