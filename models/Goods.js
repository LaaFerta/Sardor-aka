

const { Schema, model, Types } = require("mongoose");
const Joi = require('joi')

const GoodsSchema = new Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   purchased: {type: Number, required: true},
   category: {type: String, required: true},
   imgUrl: { type: String },
   updatedAt: {type: Date, required: true}
})

const Goods = model('Goods', GoodsSchema, 'Goods')

function validateGoods(goods) {
   const validGoods = Joi.object({
      name: Joi.string().min(2).max(70).required(),
      price: Joi.number().min(500).max(9999999).required(),
      purchased: Joi.number().min(100).max(9999999).required(),
      category: Joi.string().min(3).max(50),
      imgUrl: Joi.string(),
      updatedAt: Joi.date().required()
   })
   return validGoods.validate(goods)
}

exports.Goods = Goods
exports.validateGoods = validateGoods