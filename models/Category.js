

const { Schema, model } = require('mongoose')
const joi = require('Joi')

const CategorySchema = new Schema({
   catName: {type: String, required: true}
})

const Category = model("Category", CategorySchema, "Category")

function validateCategory(cat) {
   const validCategory = joi.object({
      catName: joi.string().min(3).max(50).required()
   })
   return validCategory.validate(cat)
}

exports.Category = Category
exports.validateCategory = validateCategory
