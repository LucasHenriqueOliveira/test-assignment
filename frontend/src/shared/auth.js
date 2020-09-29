class Auth {

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout = () => {
        localStorage.removeItem('token');
    }

    getToken = () => {
        return localStorage.getItem('token');
    }
}

export default new Auth();