const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url : String,
    shortUrl : String,
    dateCreated: {
        type: String,
        default: Date.now
    },
    visitors : [
        {
            type : String
        }
    ]
})

const Url = mongoose.model('Url',urlSchema);

module.exports = Url;