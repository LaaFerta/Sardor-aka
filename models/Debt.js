

const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types
const Joi = require('joi')

const DebtSchema = new Schema({
   debtor: { type: String, required: true },
   debts: [{
      amount: { type: Number, required: true },
      addedBy: {type: ObjectId, ref: 'User'},
      addedAt: {type: Date, required: true}
   }]
})

const Debt = model("Debt", DebtSchema, "Debts")

function validateDebt(debt) {
   const validDebt =  Joi.object({
      debtor: Joi.string().min(5).max(100).required(),
      amount: Joi.object().keys({
         amount: Joi.number().min(3).max(7).required(),
         addedAt: Joi.date()
      })
   })
   return validDebt.validate(debt)
}

exports.Debt = Debt
exports.validateDebt = validateDebt