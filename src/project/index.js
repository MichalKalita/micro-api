/**
 * Project contains application logic and call data components
 * 
 */

import Auth from '../authentication'
import Permission from '../permission'

import KeyValue from '../key_value'

export default class {
    request(request) {
        const internal = {}

        if('auth' in request) {
            internal.auth = Auth.login(request.auth)
        }

        if(Permission.validate(request, internal)) {
            // OK request is valid
        } else {
            throw internal.error
        }

        switch(request.module) {
            case 'key_value':
                KeyValue.process(request, internal)
                break
            default:
                throw 'Module not matched'
        }
    }
}