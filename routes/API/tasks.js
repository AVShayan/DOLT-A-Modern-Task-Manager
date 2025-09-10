// This REST API is designed to perform CRUD operations on Tasks.

const express = require('express');
const router = express();
const taskControlller = require('../../Controller/taskController');

router.route('/')
   .get(taskControlller.getAllTasks)
   .post(taskControlller.createNewTask)
   .put(taskControlller.updateTask)
   .delete(taskControlller.deleteTask)

router.route('/:id')
   .get(taskControlller.getTask)
   .post(taskControlller.checkTask)

router.route('/reset')
   .delete(taskControlller.deleteAllTasks)

module.exports = router;