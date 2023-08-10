const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
   }, 
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    duedate: {
        required: true,
        type: Date
    },
    iscompleted: {
        required: true,
        type: Boolean
    },
})


module.exports = mongoose.model('Task', dataSchema)