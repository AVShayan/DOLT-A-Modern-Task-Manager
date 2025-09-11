// This REST API is designed to perform CRUD operations on Tasks.
import express from 'express';
import router from express();
import taskControlller = from '../../Controller/taskController';

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
