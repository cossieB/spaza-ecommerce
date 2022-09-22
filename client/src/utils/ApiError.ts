export default class ApiError extends Error {
    constructor (readonly message: string, readonly code: number) {
        super(message)
        this.code = code
    }
}