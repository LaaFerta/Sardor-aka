

const { Schema, model } = require('mongoose')
const Joi = require('joi')

const UserSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   role: {type: String}
})

const User = model('User', UserSchema, 'Users')

function validateUser(user) {
   const validUser = Joi.object({
      username: Joi.string().min(5).max(32).required(),
      password: Joi.string().min(5).max(32).required(),
   })
   return validUser.validate(user)
}


exports.User = User
exports.validateUser = validateUser