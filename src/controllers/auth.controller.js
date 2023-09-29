const AuthService = require('../services/auth.service');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signIn = (req, res, next) => {
        const {email, password} = req.body;

        this.authService
            .signIn(email, password)
            .then(user => res.json(user))
            .catch(err => next(err));
    }

    register = (req, res, next) => {
        const {name, email, password} = req.body;

        this.authService
            .register(name, email, password)
            .then(user => res.json(user))
            .catch(err => next(err));
    }
}

module.exports = AuthController;