const Task = require('../Models/Task');
const mongoose = require('mongoose');
// To List all the tasks of the user  /GET/task
const getAllTasks = async (req,res) => {
    const task = await Task.find();
    if(!task) return res.status(204).json({"message":"No Tasks Yet!"});
    res.json(task);
}

// To List a task by id of the user   /GET/tasks/2
const getTask = async (req,res) => {
    if(!req?.params?.id) return res.status(400).json({"message":"No ID Provided!"});
    const task = await Task.findOne({id:req.params.id}).exec();
    if(!task)
         return res.status(204).json({"message":`No Task with ID ${req.params.id}`});
    res.json(task);
}

// To Create a new task for the user     /POST/task
const createNewTask = async (req,res) => {
    if(!req?.body?.id || !req?.body?.task_det){
        return res.status(400).json({"message":"No ID OR Task Provided!"});
    }
    try{
        const result = await Task.create({
           id: req.body.id,
           task_det: req.body.task_det 
        });      
        return res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
}

// To Update a task by id for the user
const updateTask = async (req,res) => {
    if(!req?.body?.id) return res.status(400).json({"message":"No ID Provided"});
    const task = await Task.findOne({id:req.body.id}).exec();
    if(!task) return res.status(204).json({"message":`No Task with ID ${req.body.id}`});
    if(req?.body.task_det) task.task_det = req.body.task_det;
    const result = await task.save();
    res.json(result);
}
// To check if a task by id exists for the user
const checkTask = async(req,res) => {
    if(!req?.params?.id) return res.status(400).json({"message":"No ID Provided!"});
    const task = await Task.findOne({id:req.params.id}).exec();
    console.log(task);
    res.json({task});
}
// To Delete a task by id for the user
const deleteTask = async (req,res) => {
    if(!req?.body?.id) return res.status(400).json({"message":"No ID Provided"});
    const task = await Task.findOne({id:req.body.id}).exec();
    if(!task) return res.status(204).json({"message":`No Task with ID ${req.body.id}`});
    const result = await Task.deleteOne({id:req.body.id}).exec();
    res.json(result);
}

const deleteAllTasks = async(req,res) => {
    try{
        const result = await Task.deleteMany({}).exec();
        res.json(result);

    }catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createNewTask,
    updateTask,
    checkTask,
    deleteTask,
    deleteAllTasks
}