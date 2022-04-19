const express = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const PORT = process.env.PORT || 8800
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const multer = require('multer')
const path = require('path')

// app initialisation
const app = express()

// connecting to mongodb
connectDB()

// connecting static folder
app.use('/images', express.static(path.join(__dirname, '/public/images')))

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// multer setup
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/images')
    },
    filename:(req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})

// upload api
app.post('/api/upload', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json('File successfully uploaded')
    } catch (err) {
        console.log(err)
    }
})

// routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/posts', require('./routes/post'))


app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})