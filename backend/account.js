// Account API
// By: Ty Koslowski

class Account {
    #name;
    #major;
    #classes;
    #profileURL;
    
    constructor(name, major) {
        if (typeof name == 'string') {
            this.#name = name;
        } // else throw error ?
        if (typeof major == 'string') {
            this.#major = major;
        } // else throw error ?
    }

    getName() {
        return this.#name;
    }

    getMajor() {
        return this.#major;
    }

    getClasses() {
        return this.#classes;
    }

    getProfileURL() {
        return this.#profileURL;
    }

    setClasses(classes) {
        if (classes.isArray()) {
            this.#classes = classes;
        }
    }

    setProfileURL(profileURL) {
        if (typeof profileURL == 'string') {
            this.#profileURL = profileURL;
        }
    }
}