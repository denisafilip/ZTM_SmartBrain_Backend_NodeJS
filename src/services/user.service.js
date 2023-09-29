const {User} = require("../database/database");

class UserService {

    getAllUsers = async () => {
        return User.find();
    }

    getUserProfile = async (id) => {
        const user = User.findById(id);
        if (!user) {
            throw { message: 'User not found', status: 404 };
        }
        return user;
    }

    increaseSubmittedImageCount = async (id) => {
        return User.findByIdAndUpdate(id, { $inc: { entries: 1 } }, { new: true })
            .then(user => {
                if (user) {
                    return user.entries;
                } else {
                    throw { message: 'User not found', status: 404 };
                }
            });
    }

}

module.exports = UserService;