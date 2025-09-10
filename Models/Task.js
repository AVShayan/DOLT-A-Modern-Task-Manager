const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    task_det:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Task',taskSchema);