class Auth {

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('email');
    }

    getToken = () => {
        return localStorage.getItem('token');
    }

    getEmail = () => {
        return localStorage.getItem('email');
    }

    getId = () => {
        return localStorage.getItem('_id');
    }
}

export default new Auth();