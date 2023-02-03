

const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/keys')
const { User } = require('../models/User')

function logging(req, res, next) {
   const { authorization } = req.headers
   if (!authorization) {
      return res.status(401).json({ error: "Avval ro'yhatdan o'ting" })
   }
   const token = authorization.replace('dess ', '')
   jwt.verify(token, JWT_KEY, (error, payload) => {
      if (error) {
         return res.status(401).json({ error: "Avval ro'yhatdan o'ting" })
      }
      const { _id } = payload
      User.findById({ _id }).then(user => {
         req.user = user
         next()
      }).catch(ex => console.log(ex))
   })
}

async function auth(req, res, next) {
   const token = req.header('auth-token')
   if(!token) {
      return res.status(401).json({error: "Avval ro'yhatdan o'ting"})
   }
   try {
      const verified = jwt.verify(token, JWT_KEY)
      req.user = await User.findOne({_id: verified._id})
      next()
   } catch (error) {
      res.status(400).json({error: "Noto'g'ri token"})
   }
}

// exports.logging = logging
exports.auth = auth