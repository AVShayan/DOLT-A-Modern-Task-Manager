import mongoose from 'mongoose';
import Schema from mongoose.Schema;

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
