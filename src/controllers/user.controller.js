const UserService = require("../services/user.service");

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    getUserProfile = async (req, res, next) => {
        const { id } = req.params;

        try {
            const user = await this.userService.getUserProfile(id);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    increaseSubmittedImageCount = async (req, res, next) => {
        const { id } = req.body;

        try {
            const entries = await this.userService.increaseSubmittedImageCount(id);
            res.json(entries);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = UserController;