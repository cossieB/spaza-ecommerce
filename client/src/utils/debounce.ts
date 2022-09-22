export default function(cb: (input: [any]) => void, delay = 500) {
    let timeout: NodeJS.Timeout
    return function(...args: [any]) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}