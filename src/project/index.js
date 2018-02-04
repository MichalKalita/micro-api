/**
 * Project contains application logic and call data components
 *
 */
export default class Project {
    constructor() {
        // List of functions to run before request
        this.before = []

        // Map name => function
        this.modules = {}
    }

    /**
     * Process request
     * @param {*} request
     * @returns response data
     */
    request(request) {
        if(request === undefined) request = {}

        // Runs all before callbacks
        this.before.forEach(fn => fn(request))

        // Find module
        const module = request.module ? request.module : ''
        if(module in this.modules) {
            // Run module
            return this.modules[module](request)
        } else {
            throw Error(`Module '${module}' not found`)
        }
    }

    /**
     * Register callback to run before request
     * @param {function} callback
     */
    beforeRequest(callback) {
        this.before.push(callback)
    }

    /**
     * Add module
     * @param {string} name
     * @param {function} callback
     */
    addModule(name, callback) {
        this.modules[name] = callback
    }
}