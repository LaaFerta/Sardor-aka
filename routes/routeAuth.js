

const { Router } = require('express')
const { User, validateUser } = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_KEY } = require('../config/keys')

const router = Router()

router.post('/signup', (req, res) => {
   const { username, password } = req.body
   const { error } = validateUser(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }

   User.findOne({ username }).then(existUser => {
      if (existUser) {
         return res.status(400).json({ error: 'Bu nomli foydalanuvchi mavjud' })
      }
      bcrypt.hash(password, 13).then(hashed => {
         const newUser = new User(req.body)
         newUser.password = hashed
         newUser.save().then(user => {
            res.status(201).json({ success: "Muvaffaqiyatli!" })
         })
      }).catch(ex => console.log(ex))
   })
})

router.post('/signin', (req, res) => {
   const { username, password } = req.body

   if (!username || !password) {
      return res.status(401).json({ error: "Barcha qatorlarni to'ldiring" })
   }

   User.findOne({ username }).then(user => {
      if (!user) {
         return res.status(400).json({ error: "Email yoki parol noto'g'ri" })
      }
      bcrypt.compare(password, user.password).then(matched => {
         if (!matched) {
            return res.status('400').json({ error: "Email yoki parol noto'g'ri" })
         }
         const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '168h' })
         const { _id, username, role } = user
         res.status(200).json({
            token,
            user: { _id, username, role },
            success: "Muvaffiqiyatli"
         })
      }).catch(ex => console.log(ex))
   }).catch(ex => console.log(ex))
})


module.exports = router