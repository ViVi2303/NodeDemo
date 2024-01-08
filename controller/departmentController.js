const department = require('../schema/department');

const getDepartments = async (req, res) => {
  const departments = await department.find();
  if (!department) {
    return res.status(404).json({
      status: false,
      message: 'No department found',
    });
  }
  res.status(200).json({
    status: true,
    message: 'Get departments successfully',
    data: departments,
  });
};
const getDepartmentsById = async (req, res) => {
  const departments = await department.findById(req.params.id);
  if (!department) {
    return res.status(404).json({
      status: false,
      message: 'No department found',
    });
  }
};
const createDepartment = async (req, res) => {
  const newDepartment = await department.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Create department successfully',
    data: newDepartment,
  });
};
const updateDepartment = async (req, res) => {
  const department = await department.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Update department successfully',
    data: department,
  });
};
const deleteDepartment = async (req, res) => {
  const department = await department.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: true,
    message: 'Delete department successfully',
    data: department,
  });
};
module.exports = {
  getDepartments,
  getDepartmentsById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
