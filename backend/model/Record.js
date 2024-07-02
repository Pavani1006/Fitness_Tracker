const mongoose = require('mongoose')
const RecordSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const RecordModel = mongoose.model('records',RecordSchema )
module.exports = RecordModel