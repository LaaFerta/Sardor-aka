

const { Router } = require("express");
const { auth } = require("../middleware/authentication");
const { Goods, validateGoods } = require("../models/Goods");
const uploadPhoto = require("./Uploader");

const router = Router()

router.post('/upload/photo', (req, res) => {
   uploadPhoto(req.body.photo, req.body.folder)
      .then(imgUrl => {
         res.status(201).json({ imgUrl })
      }).catch(ex => {
         res.status(500).json({ error: ex })
      })
})

router.get('/all', auth, (req, res) => {
   Goods.find().then(data => {
      res.status(200).json({ data })
   }).catch(ex => console.log(ex))
})

router.post('/add', (req, res) => {
   const { error } = validateGoods(req.body)
   if (error) {
      return res.status(422).json({ error: error.details[0].message })
   }

   const newGoods = new Goods(req.body)
   newGoods.save().then(data => {
      res.status(201).json({ success: "Qo'shildi", data })
   }).catch(ex => console.log(ex))
})

router.put('/edit/:id', (req, res) => {
   const { error } = validateGoods(req.body)
   if (error) {
      return res.status(422).json({ error: error.details[0].message })
   }
   Goods.findByIdAndUpdate({ _id: req.params.id }, {
      $set: req.body
   }, { new: true }, (error, data) => {
      if (error) {
         return res.status(500).json("Serverda xatolik")
      }
      res.status(200).json({ success: "Yangilandi", data })
   })
})

router.delete('/remove/:id', (req, res) => {
   Goods.findByIdAndRemove(req.params.id, {}, (error, data) => {
      if (error) {
         return res.status(400).json({ error })
      }
      res.status(200).json({ success: "O'chirildi", data })
   })
})

router.get('/category/:name', (req, res) => {
   Goods.find({ tag: req.params.name })
      .then(data => {
         res.status(200).json({ data })
      }).catch(ex => console.log(ex))
})


module.exports = router