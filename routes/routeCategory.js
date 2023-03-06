

const {Router} = require('express')
const { Category, validateCategory } = require('../models/Category')

const router = Router()

router.get('/all', (req, res) => {
   Category.find().then(data => {
      res.status(200).json({data})
   }).catch(ex => console.log(ex))
})

router.post('/add', (req, res) => {
   const {error} = validateCategory(req.body)
   if(error) {
      return res.status(400).json({error: error.details[0].message})
   }
   const newCategory = new Category(req.body)
   newCategory.save().then(data => {
      res.status(201).json({success: "Qo'shildi", data})
   }).catch(ex => console.log(ex))
})

router.delete('/:name', (req, res) => {
   Category.findOneAndRemove({catName: req.params.name}, {}, (error, data) => {
      if(error) {
         return res.status(400).json({error})
      }
      res.status(200).json({success: "O'chirildi", data})
   })
})



module.exports = router