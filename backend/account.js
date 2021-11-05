// Account API
// By: Ty Koslowski

class Account {
    #email;
    #password;
    #name;
    #major;
    #classes;
    #profileURL;
    
    constructor(email, password) {
        if (typeof email == 'string') {
            this.#email = email;
        } // else throw error ?
        if (typeof password == 'string') {
            this.#password = password;
        } // else throw error ?
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
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

    changeEmail(new_email) {
        if (typeof new_email == 'string') {
            this.#email = new_email;
        }
    }

    changePassword(new_password) {
        if (typeof new_password == 'string') {
            this.#password = new_password;
        }
    }

    setName(name) {
        if (typeof name == 'string') {
            this.#name = name;
        }
    }

    setMajor(major) {
        if (typeof major == 'string') {
            this.#major = major;
        }
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