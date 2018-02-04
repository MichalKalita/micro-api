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
    }

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
        request.response = {msg: 'Hello :)'}

        return request.response
    }

    processError(request) {
        if('error' in request) {
            throw Error(request.error)
        }
    }
}