const { User } = require('../database/database.js');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class AuthService {
    signIn = async (email, password) => {
        const user = await User.findOne({ email: email });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        } else {
            throw { message: 'Wrong credentials', status: 400 };
        }
    };

    register = async (name, email, password) => {
        const newUser = new User({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, salt),
            entries: 0
        });

        const user = await User.findOne({ email: email });
        if (user) {
            throw { message: 'User already exists', status: 400 };
        } else {
            return await newUser.save();
        }
    }
}

module.exports = AuthService;