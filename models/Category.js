

const { Schema, model } = require('mongoose')
const Joi = require('joi')

const CategorySchema = new Schema({
   catName: {type: String, required: true}
})

const Category = model("Category", CategorySchema, "Category")

function validateCategory(cat) {
   const validCategory = Joi.object({
      catName: Joi.string().min(3).max(50).required()
   })
   return validCategory.validate(cat)
}

exports.Category = Category
exports.validateCategory = validateCategory
