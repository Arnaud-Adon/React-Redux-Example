const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordHelper = require('../helpers/password')

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

userSchema.pre('save', function (next) {
    const user = this;
    passwordHelper.hashPassword(user, next);
})


userSchema.methods.isPasswordEqualTo = function (externalPassword, done) {
    const user = this;
    passwordHelper.comparePassword(externalPassword, user.password, done)
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;