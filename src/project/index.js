/**
 * Project contains application logic and call data components
 * 
 */
export default class Project {
    constructor() {
        this.modules = {}
    }

    /**
     * Process request
     * @param {*} requestData 
     * @returns response data
     */
    request(requestData) {
        const request = {}
        request.data = requestData
        request.auth = {}
        request.response = {}

        // Run function
        if(requestData.module in this.modules) {
            return this.modules[requestData.module](requestData)
        } else {
            throw Error(`Module '${requestData.module}' not found`)
        }
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