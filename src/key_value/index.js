export default class {
    constructor() {
        this.data = {}
    }

    set(key, value) {
        this.data[key] = value;
    }

    get(key) {
        return this.data[key];
    }

    delete(key) {
        if(key in this.data) {
            delete this.data[key];
            return true;
        } else {
            return false;
        }
    }
}