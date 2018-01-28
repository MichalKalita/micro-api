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
        delete this.data[key];
    }
}