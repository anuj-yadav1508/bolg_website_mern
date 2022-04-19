const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        require: true
    },
    postPicture: {
        type:String,
        default:""
    },
    title: {
        type: String,
    },
    desc: {
        type:String,
    },
    category: {
        type:String,
    },
    author: {
        type:String,
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema)