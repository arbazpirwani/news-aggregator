export const debounce = (fn, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this, ...args: []) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};