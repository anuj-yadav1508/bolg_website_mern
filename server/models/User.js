const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        unique: true,
        minLength:5
    },
    name: {
        type:String,
        requie:true,
    },
    email: {
        type:String,
        unique: true,
        require: true
    },
    password: {
        type:String,
        require:true,

    },
    profilePicture: {
        type:String,
        default:""
    },
    desc: {
        type:String,
        default:""
    }
},
    {timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)