

const { Router } = require("express");
const { auth } = require("../middleware/authentication");
const { validateDebt, Debt } = require("../models/Debt");

const router = Router()

router.get('/all', (req, res) => {
   Debt.find().populate("debts.addedBy", "username", "User")
      .then(data => {
         res.status(200).json({ data })
      }).catch(ex => console.log(ex))
})

router.post('/add', (req, res) => {
   const { debtor } = req.body
   const { error } = validateDebt(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   Debt.findOne({ debtor }).then(exist => {
      if (exist) {
         return res.status(400).json({ error: "Bu ism oldin qo'shilgan" })
      }
      const newDebtor = new Debt(req.body)
      newDebtor.save().then(data => {
         res.status(201).json({ success: "Qo'shildi", data })
      })
   }).catch(ex => console.log(ex))
})

router.put('/debtor/new/:id', (req, res) => {
   Debt.findByIdAndUpdate(req.params.id, {
      $push: {
         debts: {
            amount: req.body.amount,
            addedAt: req.body.addedAt,
            addedBy: req.user
         }
      }
   }, { new: true }).populate('debts.addedBy', "username", 'User')
      .exec((error, data) => {
         if (error) {
            return res.status(422).json({ error })
         }
         res.status(200).json({ success: "Qo'shildi", data })
      })
})


router.put('/debtor/:id', (req, res) => {
   Debt.findByIdAndUpdate(req.params.id, {
      $pull: { debts: { _id: req.body.debtId } }
   }, { new: true })
      .exec((error, result) => {
         if (error) {
            return res.status(500).json({ error })
         }

         res.status(200).json({ result })
      })
})

router.delete('/remove/:id', (req, res) => {
   Debt.findByIdAndRemove(req.params.id, {}, (error, data) => {
      if(error) {
         return res.status(500).json({error})
      }
      res.status(200).json({ success: "O'chirildi", data })
   })
})


module.exports = router