/**
 * Project contains application logic and call data components
 * 
 */

import Auth from '../authentication'
import Permission from '../permission'

export default class Project {
    constructor() {
        this.auth = new Auth()
        this.permission = new Permission()

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

        this.auth.login(request)
        this.processError(request)

        if (this.permission.validate(request)) {
            // OK request is valid
            this.processError(request)
        } else {
            throw Error('Missing permission')
        }

        // Run function
        if(requestData.module in this.modules) {
            return this.modules[requestData.module](requestData)
        } else {
            throw Error(`Module '${requestData.module}' not found`)
        }

        return request.response
    }

    /**
     * Add module
     * @param {string} name 
     * @param {function} callback 
     */
    addModule(name, callback) {
        this.modules[name] = callback
    }

    processError(request) {
        if('error' in request) {
            throw Error(request.error)
        }
    }
}