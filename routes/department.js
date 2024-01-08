const express = require('express');
var router = express.Router();
const departmentController = require('../controller/departmentController');

router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartmentsById);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
