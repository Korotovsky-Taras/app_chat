const KEY = 'user';

export class User {

    constructor(name) {
        this.name = name;
    }

    save() {
        localStorage.setItem(KEY, this.name);
    }

    static get() {
        let name = localStorage.getItem(KEY);

        if (name) {
            return new User(name);
        }

        return null;
    }

}