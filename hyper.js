

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routeAuth = require('./routes//routeAuth')
const routeGoods = require('./routes/routeGoods')
const routeDebt = require('./routes/routeDebt')
const routeCategory = require('./routes/routeCategory')
const { auth } = require('./middleware/authentication')
const { MONGO_URL } = require('./config/keys')


const PORT = process.env.PORT || 1000
const HOST = process.env.HOST
app.listen(PORT, HOST, () => console.log('Server is live, Alhamdulillah'))
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL, () => console.log('Connected to MongoDB'))

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: true, limit: '25mb' }))
app.use(cors({ origin: '*', credentials: true }))

app.use('/auth', routeAuth)
app.use('/goods', auth, routeGoods)
app.use('/debt', auth, routeDebt)
app.use('/category', auth, routeCategory)

app.get('/', (req, res) => {
   res.status(200).send("Assalamu 'Alaykum")
})